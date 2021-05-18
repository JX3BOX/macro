<template>
    <div class="m-bucket">
        <div class="m-bucket-list" v-if="isLogin" v-loading="loading">
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
                <div class="m-archive-search" slot="search-after">
                    <a :href="publish_link" class="u-publish el-button el-button--primary">+ 发布作品</a>
                    <el-input placeholder="请输入搜索内容" v-model="search" class="input-with-select">
                        <span slot="prepend">关键词</span>
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </div>
                <!-- 列表 -->
                <div class="m-archive-list" v-if="data.length">
                    <ul class="u-list">
                        <li class="u-item" v-for="(item, i) in data" :key="i">
                            <a
                                class="u-favtitle"
                                :href="item.post_id | postLink"
                                :target="target"
                            ><i class="el-icon-star-off"></i> {{ item.post_title || "无标题" }}</a>
                            <span class="u-favdate">
                                <i class="el-icon-date"></i>
                                <time>
                                    {{
                                    item.post_updated | dateFormat
                                    }}
                                </time>
                            </span>
                        </li>
                    </ul>
                </div>
            </listbox>
        </div>
        <!-- 未登录 -->
        <div class="m-archive-noright" v-else>
            <div class="u-tip-login el-alert el-alert--warning is-light">
                <i class="el-alert__icon el-icon-warning"></i>
                <span>
                    使用宏收藏夹，请先
                    <a :href="login_url">登录</a>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import listbox from "@jx3box/jx3box-page/src/cms-list.vue";
import { cms as mark_map } from "@jx3box/jx3box-common/data/mark.json";
import _ from "lodash";
import User from "@jx3box/jx3box-common/js/user";
import { getMyPost } from "../service/post.js";
import { getFavPosts } from "../service/helper.js";
import dateFormat from "../utils/dateFormat";
import {
    __ossMirror,
    __Links,
    __iconPath,
    __imgPath,
    __ossRoot,
    __visibleMap,
} from "@jx3box/jx3box-common/data/jx3box";
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
    name: "Bucket",
    props: [],
    data: function () {
        return {
            uid: User.getInfo().uid,
            isLogin: User.isLogin(),

            loading: false, //加载状态

            search: "",
            searchType: "title",

            data: [], //数据列表
            page: 1, //当前页数
            pages:1,
            total: 1, //总条目数
            per: 10, //每页条目
            // order: "", //排序模式
            // mark: "", //筛选模式
            appendMode: false, //追加模式

            filter_visible: false,
            order_visible: false,

            drawer: false,
            drawer_title: "",
            drawer_content: "",
            drawer_link: "",
        };
    },
    computed: {
        subtype: function () {
            return this.$route.query.subtype;
        },
        params: function () {
            let params = {
                page: ~~this.page || 1,
                type: "macro",
                limit : this.per
            };
            if (this.search) {
                params.keyword = this.search;
            }
            return params;
        },
        target: function () {
            return buildTarget();
        },
        login_url: function () {
            return __Links.account.login + "?redirect=" + location.href;
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
            getFavPosts(this.params)
                .then((res) => {
                    if (this.appendMode) {
                        this.data = this.data.concat(res.data.data.data);
                    } else {
                        this.data = res.data.data.data;
                    }
                    this.total = res.data.data.total;
                    this.pages = res.data.data.last_page;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        changePage: function (i) {
            this.appendMode = false;
            this.page = i;
            window.scrollTo(0, 0);
        },
        appendPage: function (i) {
            this.appendMode = true;
            this.page = i;
        },
        filter: function (o) {
            this.appendMode = false;
            this[o["type"]] = o["val"];
        },
        showBanner: function (val) {
            return val ? showMinibanner(val) : this.defaultBanner;
        },
        showIcon: function (val) {
            return __iconPath + "icon/" + val + ".png";
        },
        loadMacro(author, m, id) {
            this.drawer = true;
            this.drawer_title = author + "#" + m.name;
            this.drawer_content = m.macro;
            this.drawer_link = "./" + id;
        },
    },
    filters: {
        dateFormat: function (val) {
            return dateFormat(new Date(val * 1000));
        },
        showAvatar: function (val) {
            return showAvatar(val);
        },
        authorLink: function (val) {
            return authorLink(val);
        },
        postLink: function (val) {
            return "./" + val;
        },
        isHighlight: function (val) {
            return val ? `color:${val};font-weight:600;` : "";
        },
        showMark: function (val) {
            return mark_map[val];
        },
        xficon: function (val) {
            if (!val || val == "其它") val = "通用";
            let xf_id = xfmap[val]["id"];
            return __imgPath + "image/xf/" + xf_id + ".png";
        },
        visibleTxt: function (val) {
            return __visibleMap[val];
        },
    },
    watch: {
        params: {
            deep: true,
            handler: function () {
                this.loadPosts();
            },
        },
        "$route.query.page": function (val) {
            this.page = ~~val;
        },
    },
    created: function () {
        this.page = ~~this.$route.query.page || 1;
        this.isLogin && this.loadPosts();
    },
    components: {
        // macro,
        listbox,
    },
};
</script>

<style scoped lang="less">
@import "../assets/css/list.less";
@import "../assets/css/bucket.less";
.m-archive-list{
    .u-item{
        padding:10px 0;
    }
}
.u-favtitle{
    .fl;
    .fz(14px);
}
.u-favdate{
    .fr;
    .fz(12px);
    color:#999;
}
</style>