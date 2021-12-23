<template>
    <div class="m-macro-list" v-loading="loading">
        <listbox
            :data="data"
            :total="total"
            :pages="pages"
            :per="per"
            :page="page"
            @appendPage="appendPage"
            @changePage="changePage"
        >
            <!-- 搜索 -->
            <div class="m-archive-search" slot="search-before">
                <a :href="publish_link" class="u-publish el-button el-button--primary">+ 发布作品</a>
                <el-input placeholder="请输入搜索内容" v-model="search" class="input-with-select">
                    <span slot="prepend">关键词</span>
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
            <!-- 过滤 -->
            <template slot="filter">
                <!-- 版本过滤 -->
                <clientBy @filter="filter" :type="client"></clientBy>
                <!-- 角标过滤 -->
                <markBy @filter="filter"></markBy>
                <!-- 资料片 -->
                <!-- <zlpBy @filter="filter" :client="client"></zlpBy> -->
                <!-- 语言过滤 -->
                <menuBy @filter="filter" :data="langs" type="lang" placeholder="语言"></menuBy>
                <!-- 排序过滤 -->
                <orderBy @filter="filter"></orderBy>
            </template>
            <!-- 推荐 -->
            <rec-table v-if="isIndex && !search" />
            <!-- 列表 -->
            <div class="m-archive-list" v-if="data.length">
                <ul class="u-list">
                    <li class="u-item" v-for="(item, i) in data" :key="i">
                        <!-- 标题 -->
                        <h2 class="u-post" :class="{ isSticky: item.sticky }">
                            <img
                                class="u-icon"
                                :src="item.post_subtype | xficon"
                                :alt="item.post_subtype"
                                :title="item.post_subtype"
                            />

                            <!-- <Mark class="u-feed" :label="item.author"/> -->

                            <!-- 标题文字 -->
                            <a
                                class="u-title"
                                :style="item.color | isHighlight"
                                :href="item.ID | postLink"
                                :target="target"
                            >{{ item.post_title || "无标题" }}</a>

                            <!-- 角标 -->
                            <span class="u-marks" v-if="item.mark && item.mark.length">
                                <i
                                    v-for="mark in item.mark"
                                    class="u-mark"
                                    :key="mark"
                                >{{ mark | showMark }}</i>
                            </span>
                        </h2>

                        <!-- 字段 -->
                        <div class="u-content">
                            <ul
                                class="m-macro-list-item-meta"
                                v-if="
                                    item.post_meta &&
                                        item.post_meta.data &&
                                        item.post_meta.data.length
                                "
                            >
                                <li class="u-macro" v-for="(m, i) in item.post_meta.data" :key="i">
                                    <img class="u-macro-icon" :src="showIcon(m.icon)" />
                                    <el-tooltip
                                        effect="dark"
                                        :content="'点击快捷查看 · ' + m.name"
                                        placement="top-start"
                                    >
                                        <span
                                            class="u-macro-name"
                                            @click="loadMacro(item.author_info.display_name,m,item.ID) "
                                        >{{ m.name || '未命名' }}</span>
                                    </el-tooltip>
                                </li>
                            </ul>
                        </div>

                        <!-- 时间 -->
                        <div class="u-misc">
                            <!-- 作者 -->
                            <div class="u-author">
                                <!-- <img
                                    class="u-author-avatar"
                                    :src="item.author.avatar | showAvatar"
                                    :alt="item.author.name"
                                />-->
                                <a
                                    class="u-author-name"
                                    :href="item.post_author | authorLink"
                                    target="_blank"
                                >{{ item.author_info.display_name }}</a>
                            </div>
                            <span class="u-date">
                                <i class="el-icon-date"></i>
                                <time v-if="order == 'update'">{{item.post_modified | dateFormat}}</time>
                                <time v-else>{{item.post_date | dateFormat}}</time>
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
        </listbox>
        <!-- 快捷查看宏 -->
        <el-drawer class="m-macro-drawer" title="云端宏" :visible.sync="drawer" :append-to-body="true">
            <div class="u-box">
                <h2 class="u-title">{{ drawer_title }}</h2>
                <macro :ctx="drawer_content" :name="drawer_title" />
                <a :href="drawer_link" class="u-skip el-button el-button--primary">
                    <i class="el-icon-copy-document"></i> 查看详情
                </a>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import listbox from "@jx3box/jx3box-common-ui/src/single/cms-list.vue";
import rec_table from '@/components/rec_table.vue'
import { cms as mark_map } from "@jx3box/jx3box-common/data/mark.json";
import _ from "lodash";
import { getPosts } from "@/service/post";
import dateFormat from "@/utils/dateFormat";
import {
    __ossMirror,
    __iconPath,
    __imgPath,
    __ossRoot,
} from "@jx3box/jx3box-common/data/jx3box";
import xfmap from "@jx3box/jx3box-data/data/xf/xf.json";
import macro from "@/components/macro.vue";
import {
    showAvatar,
    authorLink,
    showBanner,
    publishLink,
    buildTarget,
    getAppType,
} from "@jx3box/jx3box-common/js/utils";
export default {
    name: "list",
    props: [],
    data: function () {
        return {
            loading: false, //加载状态

            search: "",

            data: [], //数据列表
            page: 1, //当前页数
            total: 1, //总条目数
            pages: 1, //总页数
            per: 18, //每页条目
            appendMode: false, //追加模式

            order: "update", //排序
            mark: "", //角标
            lang: "", //语言
            zlp: "", //资料片
            client: this.$store.state.client, //版本选择

            drawer: false,
            drawer_title: "",
            drawer_content: "",
            drawer_link: "",

            langs: {
                cn: "简体中文",
                tr: "繁體中文",
            },
            
        };
    },
    computed: {
        isIndex: function () {
            return !this.$route.query.subtype;
        },
        subtype: function () {
            return this.$route.query.subtype;
        },
        resetParams : function (){
            return [this.subtype,this.search,this.mark,this.lang,this.zlp,this.client]
        },
        params: function () {
            let params = {
                per: this.per,
                page: ~~this.page || 1,
            };
            let optionalParams = [
                "subtype",
                "search",
                "order",
                "mark",
                "lang",
                "zlp",
                "client",
            ];
            optionalParams.forEach((item) => {
                if (this[item]) {
                    params[item] = this[item];
                }
            });
            if (this.subtype) {
                params.sticky = 1;
            }
            return params;
        },
        target: function () {
            return buildTarget();
        },
        // 根据栏目定义
        defaultBanner: function () {
            return "";
        },
        publish_link: function (val) {
            return publishLink("macro");
        },
    },
    methods: {
        loadPosts: function () {
            this.loading = true;
            getPosts(this.params, this)
                .then((res) => {
                    if (this.appendMode) {
                        this.data = this.data.concat(res.data.data.list);
                    } else {
                        this.data = res.data.data.list;
                    }
                    this.total = res.data.data.total;
                    this.pages = res.data.data.pages;
                })
                .finally(() => {
                    this.appendMode = false
                    this.loading = false;
                });
        },
        changePage: function (i) {
            this.page = i;
            window.scrollTo(0, 0);
        },
        appendPage: function (i) {
            this.appendMode = true;
            this.page = i;
        },
        filter: function (o) {
            this[o["type"]] = o["val"];
        },
        showBanner: function (val) {
            return val ? showBanner(val) : this.defaultBanner;
        },
        showIcon: function (val) {
            return __iconPath + "icon/" + val + ".png";
        },
        loadMacro(author, m, id) {
            this.drawer = true;
            this.drawer_title = author + "#" + m.name;
            this.drawer_content = m.macro;
            this.drawer_link = "./" + id  + '?tab=' + m.name;
        },
    },
    filters: {
        dateFormat: function (val) {
            return dateFormat(new Date(val));
        },
        showAvatar: function (val) {
            return showAvatar(val);
        },
        authorLink: function (val) {
            return authorLink(val);
        },
        postLink: function (val) {
            return location.origin + "/macro/" + val;
        },
        isHighlight: function (val) {
            return val ? `color:${val};font-weight:600;` : "";
        },
        showMark: function (val) {
            return mark_map[val];
        },
        xficon: function (val) {
            if (!val || val == "其它") val = "通用";
            let xf_id = xfmap[val]?.id;
            return __imgPath + "image/xf/" + xf_id + ".png";
        },
    },
    watch: {
        subtype : function (){
            this.search = ''  
        },
        client : function (val){
            this.zlp = ''
            this.$store.state.client = val == 'origin' ? 'origin' : 'std'
        },
        resetParams: function () {
            this.page = 1;
        },
        params: {
            deep: true,
            immediate: true,
            handler: function () {
                this.loadPosts();
            },
        },
        "$route.query.page": function (val) {
            this.page = ~~val;
        },
        '$route.query.subtype' : function (val){
            this.$store.state.subtype = val
        }
    },
    created: function () {
        this.page = ~~this.$route.query.page || 1;
    },
    components: {
        macro,
        listbox,
        'rec-table' : rec_table
    },
};
</script>

<style lang="less">
@import "../assets/css/list.less";
</style>
