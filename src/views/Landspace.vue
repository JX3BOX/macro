<template>
    <div class="m-archive-box" v-loading="loading">
        <!-- 已登录 -->
        <div class="m-bucket" v-if="isLogin">
            <!-- 搜索 -->
            <common-header
                @filterImperceptibly="filterImperceptibly"
                @filterMeta="filterMeta"
                @search="onSearch"
                :canFilter="false"
            ></common-header>
            <!-- 提醒 -->
            <el-alert title="此处仅显示亲友设置为“仅亲友可见”的宏。" type="info" show-icon></el-alert>
            <!-- 列表 -->
            <div class="m-archive-list" v-if="data && data.length">
                <ul class="u-list">
                    <list-item
                        v-for="(item, i) in data"
                        :key="i + item"
                        :item="item"
                        :order="order"
                        @loadMacro="loadMacro"
                    />
                </ul>
            </div>

            <!-- 空 -->
            <el-alert v-else class="m-archive-null" title="没有找到相关条目" type="info" center show-icon></el-alert>

            <!-- 下一页 -->
            <el-button
                class="m-archive-more"
                v-show="hasNextPage"
                type="primary"
                @click="appendPage"
                :loading="loading"
                icon="el-icon-arrow-down"
                >加载更多</el-button
            >

            <!-- 分页 -->
            <el-pagination
                class="m-archive-pages"
                background
                layout="total, prev, pager, next, jumper"
                :hide-on-single-page="true"
                :page-size="per"
                :total="total"
                :current-page.sync="page"
                @current-change="changePage"
            ></el-pagination>
        </div>
        <!-- 未登录 -->
        <div class="m-archive-noright" v-else>
            <div class="u-tip-login el-alert el-alert--warning is-light">
                <i class="el-alert__icon el-icon-warning"></i>
                <span>
                    使用亲友限定分享仓库，请先
                    <a :href="login_url">登录</a>
                </span>
            </div>
        </div>
        <!-- 快捷查看宏 -->
        <el-drawer class="m-macro-drawer" title="云端宏" :visible.sync="drawer" :append-to-body="true">
            <div class="u-box">
                <h2 class="u-title">{{ drawer_title }}</h2>
                <macro :ctx="drawer_content" :name="drawer_title" :id="drawer_id" />
                <a :href="drawer_link" class="u-skip el-button el-button--primary">
                    <i class="el-icon-copy-document"></i> 查看详情
                </a>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import { getFriendsPosts as getPosts } from "@/service/post";
import User from "@jx3box/jx3box-common/js/user";
import { __Links } from "@jx3box/jx3box-common/data/jx3box.json";

import listItem from "@/components/list/list_item.vue";
import macro from "@/components/macro.vue";
import CommonHeader from "@/components/common-header.vue";
export default {
    name: "LandspaceBucket",
    props: [],
    data: function () {
        return {
            loading: false, //加载状态
            data: [], //数据列表

            page: 1, //当前页数
            per: 10, //每页条目
            total: 1, //总条目数
            pages: 1, //总页数
            number_queries: ["per", "page"],

            subtype: "", //子类别
            order: "update", //排序模式
            mark: "", //筛选模式
            client: this.$store.state.client, //版本选择
            search: "", //搜索字串
            lang: "", //语言

            drawer: false,
            drawer_title: "",
            drawer_content: "",
            drawer_link: "",
            drawer_id: "",

            langs: {
                cn: "简体中文",
                tr: "繁體中文",
            },

            uid: User.getInfo().uid,
            isLogin: User.isLogin(),
        };
    },
    computed: {
        // 是否显示加载更多
        hasNextPage: function () {
            return this.pages > 1 && this.page < this.total;
        },
        // 请求关联参数
        query: function () {
            return {
                subtype: this.subtype,
                order: this.order,
                mark: this.mark,
                client: this.client,
                search: this.search,
                lang: this.lang,
            };
        },
        // 分页相关参数
        pg_queries: function () {
            return {
                page: this.page,
                per: this.per,
            };
        },
        // 重置页码参数
        reset_queries: function () {
            return [this.subtype, this.search];
        },
        login_url: function () {
            return __Links.account.login + "?redirect=" + location.href;
        },
    },
    methods: {
        // 构建最终请求参数
        buildQuery: function (appendMode) {
            if (appendMode) {
                this.page += 1;
            }
            let _query = {
                per: this.per,
                page: this.page,
            };

            for (let key in this.query) {
                if (this.query[key] !== undefined && this.query[key] !== "" && this.query[key] !== null) {
                    if (key == "search") {
                        _query.search = this.query.search.trim();
                    } else {
                        _query[key] = this.query[key];
                    }
                }
            }

            return _query;
        },
        onSearch: function (search) {
            this.search = search;
        },
        // 加载数据
        loadData: function (appendMode = false) {
            let query = this.buildQuery(appendMode);
            console.log("[cms-list]", "<loading data>", query);

            this.loading = true;
            return getPosts(query)
                .then((res) => {
                    if (appendMode) {
                        this.data = this.data.concat(res.data?.data?.list);
                    } else {
                        this.data = res.data?.data?.list;
                    }
                    this.total = res.data?.data?.total;
                    this.pages = res.data?.data?.pages;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        // 路由绑定
        replaceRoute: function (extend) {
            return this.$router
                .push({ name: this.$route.name, query: Object.assign({}, this.$route.query, extend) })
                .then(() => {
                    window.scrollTo(0, 0);
                })
                .catch((err) => {});
        },
        // 条件过滤
        filterMeta: function (o) {
            this.replaceRoute({ [o["type"]]: o["val"], page: 1 });
        },
        // 条件过滤（不附加路由）
        filterImperceptibly: function (o) {
            this[o["type"]] = o["val"];
        },
        // 翻页加载
        changePage: function (i) {
            this.loadData();
            this.replaceRoute({ page: i });
        },
        // 追加加载
        appendPage: function () {
            this.loadData(true);
        },
        // 打开抽屉
        loadMacro([author, m, id]) {
            this.drawer = true;
            this.drawer_title = author + "#" + m.name;
            this.drawer_content = m.macro;
            this.drawer_link = "/macro/" + id + "?tab=" + m.name;
            this.drawer_id = id;
        },
    },
    watch: {
        // 加载路由参数
        "$route.query": {
            deep: true,
            immediate: true,
            handler: function (query) {
                if (Object.keys(query).length) {
                    console.log("[cms-list]", "<route query change>", query);
                    for (let key in query) {
                        // for:element分页组件兼容性问题
                        if (this.number_queries.includes(key)) {
                            this[key] = ~~query[key];
                        } else {
                            this[key] = query[key];
                        }
                    }
                }
            },
        },
        // 重置分页参数
        reset_queries: {
            deep: true,
            handler: function () {
                console.log("[cms-list]", "<reset page>");
                this.page = 1;
            },
        },
        // 监听请求参数
        query: {
            deep: true,
            immediate: true,
            handler: function (query) {
                console.log("[cms-list]", "<request query change>", query);
                this.isLogin && this.loadData();
            },
        },
    },
    components: {
        listItem,
        macro,
        CommonHeader,
    },
};
</script>

<style lang="less">
@import "../assets/css/bucket.less";
</style>
