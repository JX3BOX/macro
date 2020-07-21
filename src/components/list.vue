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
            <template slot="filter">
                <a
                    :href="publish_link"
                    class="u-publish el-button el-button--primary el-button--small"
                >
                    + 发布云端宏
                </a>
                <!-- 角标过滤 -->
                <markBy @filter="filter"></markBy>
                <!-- 语言过滤 -->
                <menuBy @filter="filter" :data="langs" type="lang" placeholder="语言"></menuBy>
                <!-- 排序过滤 -->
                <orderBy @filter="filter"></orderBy>
            </template>
            <!-- 搜索 -->
            <div class="m-archive-search" slot="search-after">
                <el-input
                    placeholder="请输入关键词"
                    v-model="search"
                    class="input-with-select"
                    @change="loadPosts"
                >
                    <el-select
                        v-model="searchType"
                        slot="prepend"
                        placeholder="请选择"
                        @change="loadPosts"
                    >
                        <el-option label="作者" value="authorname"></el-option>
                        <el-option label="标题" value="title"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
            <!-- 列表 -->
            <div class="m-archive-list" v-if="data.length">
                <ul class="u-list">
                    <li class="u-item" v-for="(item, i) in data" :key="i">
                        <!-- 标题 -->
                        <h2
                            class="u-post"
                            :class="{ isSticky: item.post.sticky }"
                        >
                            <img
                                class="u-icon"
                                :src="item.post.post_subtype | xficon"
                                :alt="item.post.post_subtype"
                                :title="item.post.post_subtype"
                            />

                            <!-- <Mark class="u-feed" :label="item.author.name"/> -->

                            <!-- 标题文字 -->
                            <a
                                class="u-title"
                                :style="item.post.color | isHighlight"
                                :href="item.post.ID | postLink"
                                :target="target"
                                >{{ item.post.post_title || "无标题" }}</a
                            >

                            <!-- 角标 -->
                            <span
                                class="u-marks"
                                v-if="item.post.mark && item.post.mark.length"
                            >
                                <i
                                    v-for="mark in item.post.mark"
                                    class="u-mark"
                                    :key="mark"
                                    >{{ mark | showMark }}</i
                                >
                            </span>
                        </h2>

                        <!-- 字段 -->
                        <div class="u-content">
                            <ul
                                class="m-macro-list-item-meta"
                                v-if="
                                    item.post.post_meta &&
                                        item.post.post_meta.data &&
                                        item.post.post_meta.data.length
                                "
                            >
                                <li
                                    class="u-macro"
                                    v-for="(m, i) in item.post.post_meta.data"
                                    :key="i"
                                >
                                    <img
                                        class="u-macro-icon"
                                        :src="showIcon(m.icon)"
                                    />
                                    <el-tooltip
                                        effect="dark"
                                        :content="'点击快捷查看 · ' + m.name"
                                        placement="top-start"
                                    >
                                        <span
                                            class="u-macro-name"
                                            @click="
                                                loadMacro(
                                                    item.author.name,
                                                    m,
                                                    item.post.ID
                                                )
                                            "
                                            >{{ m.name }}</span
                                        >
                                    </el-tooltip>
                                </li>
                            </ul>
                        </div>

                        <!-- 时间 -->
                        <div class="u-misc">
                            <!-- 作者 -->
                            <!-- <div class="u-author">
                            <img
                                class="u-author-avatar"
                                :src="item.author.avatar | showAvatar"
                                :alt="item.author.name"
                            />

                            <a
                                class="u-author-name"
                                :href="item.author.uid | authorLink"
                                target="_blank"
                                >{{ item.author.name }}</a
                            >
                        </div> -->
                            <span class="u-date">
                                <i class="el-icon-date"></i>
                                <time>{{
                                    item.post.post_modified | dateFormat
                                }}</time>
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
        </listbox>
        <!-- 快捷查看宏 -->
        <el-drawer
            class="m-macro-drawer"
            title="云端宏"
            :visible.sync="drawer"
            :append-to-body="true"
        >
            <div class="u-box">
                <h2 class="u-title">{{ drawer_title }}</h2>
                <macro :ctx="drawer_content" />
                <a
                    :href="drawer_link"
                    class="u-skip el-button el-button--primary"
                    ><i class="el-icon-copy-document"></i> 查看详情</a
                >
            </div>
        </el-drawer>
    </div>
</template>

<script>
import listbox from "@jx3box/jx3box-page/src/cms-list.vue";
import { cms as mark_map } from "@jx3box/jx3box-common/js/mark.json";
import _ from "lodash";
import { getPosts } from "../service/post";
import dateFormat from "../utils/dateFormat";
import {
    __ossMirror,
    __iconPath,
    __imgPath,
    __ossRoot,
} from "@jx3box/jx3box-common/js/jx3box";
import xfmap from "@jx3box/jx3box-data/data/xf/xf.json";
import macro from "@/components/macro.vue";
import {
    showAvatar,
    authorLink,
    showMinibanner,
    publishLink,
    buildTarget,
} from "@jx3box/jx3box-common/js/utils";
export default {
    name: "list",
    props: [],
    data: function() {
        return {
            loading: false, //加载状态

            search: "",
            searchType: "authorname",

            data: [], //数据列表
            page: 1, //当前页数
            total: 1, //总条目数
            pages: 1, //总页数
            per: 18, //每页条目

            order: "",  //排序
            mark: "",   //角标
            lang : '',  //语言

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
        subtype: function() {
            return this.$store.state.subtype;
        },
        params: function() {
            let params = {
                per: this.per,
                subtype: this.subtype,
            };
            if (this.search) {
                params[this.searchType] = this.search;
            }
            if (this.order) {
                params.order = this.order;
            }
            if (this.mark) {
                params.mark = this.mark;
            }
            if (this.lang) {
                params.meta_4 = this.lang;
            }
            return params;
        },
        target: function() {
            return buildTarget();
        },
        // 根据栏目定义
        defaultBanner: function() {
            return "";
        },
        publish_link: function(val) {
            return publishLink("macro");
        },
    },
    methods: {
        loadPosts: function(i = 1, append = false) {
            let query = Object.assign(this.params, {
                page: i,
            });
            this.loading = true;
            getPosts(query, this)
                .then((res) => {
                    if (append) {
                        this.data = this.data.concat(res.data.data.list);
                    } else {
                        window.scrollTo(0, 0);
                        this.data = res.data.data.list;
                    }
                    this.total = res.data.data.total;
                    this.pages = res.data.data.pages;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        changePage: function(i) {
            this.loadPosts(i);
        },
        appendPage: function(i) {
            this.loadPosts(i, true);
        },
        filter : function (o){
            this[o['type']] = o['val']
            this.loadPosts();
        },
        showBanner: function(val) {
            return val ? showMinibanner(val) : this.defaultBanner;
        },
        showIcon: function(val) {
            return __ossRoot + "icon/" + val + ".png";
            // return __ossMirror + "icon/" + val + ".png";
        },
        loadMacro(author, m, id) {
            this.drawer = true;
            this.drawer_title = author + "#" + m.name;
            this.drawer_content = m.macro;
            this.drawer_link = "./?pid=" + id;
        },
    },
    filters: {
        dateFormat: function(val) {
            return dateFormat(new Date(val));
        },
        showAvatar: function(val) {
            return showAvatar(val);
        },
        authorLink: function(val) {
            return authorLink(val);
        },
        postLink: function(val) {
            return "./?pid=" + val;
        },
        isHighlight: function(val) {
            return val ? `color:${val};font-weight:600;` : "";
        },
        showMark: function(val) {
            return mark_map[val];
        },
        xficon: function(val) {
            if (!val || val == "其它") val = "通用";
            let xf_id = xfmap[val]["id"];
            return __ossRoot + "image/xf/" + xf_id + ".png";
        },
    },
    created: function() {
        this.loadPosts(1);
    },
    components: {
        macro,
        listbox,
    },
};
</script>

<style lang="less">
@import "../assets/css/list.less";
</style>
