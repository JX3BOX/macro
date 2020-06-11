<template>
    <div class="m-single-box" :loading="loading">
        <!-- 头部 -->
        <header class="m-single-header">
            <!-- 标题 -->
            <div class="m-single-title">
                <a class="u-title u-sub-block" :href="url">{{ title }}</a>
            </div>

            <!-- 信息 -->
            <div class="m-single-info">
                <!-- 用户名 -->
                <div class="u-author u-sub-block">
                    <i class="u-author-icon"
                        ><img svg-inline src="../assets/img/single/author.svg"
                    /></i>
                    <a class="u-name" :href="author_link">{{ author_name }}</a>
                </div>

                <!-- 自定义字段 -->
                <div class="u-meta u-sub-block">
                    <em class="u-label">心法</em>
                    <span class="u-value">
                        <img
                            class="u-icon-xf"
                            :src="xficon_id | xficon"
                            :alt="xf"
                        />
                        {{ xf }}
                    </span>
                </div>
                <div class="u-meta u-sub-block">
                    <em class="u-label">资料片</em>
                    <span class="u-value">
                        {{ formatMeta("zlp") }}
                    </span>
                </div>

                <!-- 发布日期 -->
                <span class="u-podate u-sub-block" title="发布日期">
                    <i class="u-icon-podate"
                        ><img svg-inline src="../assets/img/single/podate.svg"
                    /></i>
                    <time>{{ post_date }}</time>
                </span>

                <!-- 最后更新 -->
                <span class="u-modate u-sub-block" title="最后更新">
                    <i class="u-icon-modate"
                        ><img svg-inline src="../assets/img/single/modate.svg"
                    /></i>
                    <time>{{ update_date }}</time>
                </span>

                <!-- 编辑 -->
                <a class="u-edit u-sub-block" :href="edit_link" v-if="canEdit">
                    <i class="u-icon-edit el-icon-edit-outline"></i>
                    <span>编辑</span>
                </a>
            </div>

            <!-- 操作 -->
            <div class="m-single-panel">
                <Fav />
            </div>
        </header>

        <!-- 宏内容 -->
        <div class="m-single-macro">
            <el-tabs v-model="active" type="card" @tab-click="changeTab">
                <el-tab-pane v-for="(item, i) in data" :key="i" :name="i + ''">
                    <!-- tab -->
                    <span class="u-label" slot="label">
                        <img class="u-icon" :src="item.icon | iconURL" />
                        <b>{{ item.name }}</b>
                    </span>
                    <!-- 奇穴 -->
                    <el-divider content-position="left">奇穴</el-divider>
                    <div class="u-talent talent-box" :id="`talent-box-${i}`"></div>
                    <div class="u-panel u-talent-panel">
                        <el-button
                            icon="el-icon-s-tools"
                            plain
                            size="mini"
                            v-clipboard:copy="item.talent"
                            v-clipboard:success="onCopy"
                            v-clipboard:error="onError"
                            >复制奇穴编码</el-button
                        >
                        <el-button
                            icon="el-icon-document-copy"
                            plain
                            size="mini"
                            v-clipboard:copy="getTalentTXT(i)"
                            v-clipboard:success="onCopy"
                            v-clipboard:error="onError"
                            >复制奇穴文字</el-button
                        >
                        <el-button
                            icon="el-icon-scissors"
                            plain
                            size="mini"
                            v-clipboard:copy="getTalentSQ(item.talent)"
                            v-clipboard:success="onCopy"
                            v-clipboard:error="onError"
                            >复制奇穴序列</el-button
                        >
                    </div>
                    <!-- 宏 -->
                    <el-divider content-position="left">宏</el-divider>
                    <div class="u-macro macro-box">
                        <macro :data="item.macro"/>
                    </div>
                    <!-- 急速 -->
                    <el-divider content-position="left">推荐急速</el-divider>
                    <div class="u-speed">
                        {{item.speed}}
                    </div>
                    <!-- 说明 -->
                    <el-divider content-position="left">特别说明</el-divider>
                    <div class="u-desc">
                        {{item.desc}}
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>

        <!-- 文章前 -->
        <div class="m-single-prepend">
            <!-- 摘要 -->
            <div class="m-single-excerpt" v-if="excerpt">
                <el-divider content-position="left">Excerpt</el-divider>
                {{ excerpt }}
            </div>
        </div>

        <!-- 文章内容 -->
        <div class="m-single-post">
            <el-divider content-position="left">JX3BOX</el-divider>
            <div class="m-single-content">
                <Article
                    :content="post.post_content"
                    directorybox="#directory"
                />
            </div>
        </div>

        <!-- 文章后 -->
        <div class="m-single-append"></div>

        <!-- 评论 -->
        <div class="m-single-comment">
            <el-divider content-position="left">评论</el-divider>
            <Comment :post-id="id" />
        </div>

        <!-- 底部 -->
        <footer class="m-single-footer">
            <!-- <ins
                class="adsbygoogle"
                style="display:block;max-width:100%;overflow:hidden;margin:10px;"
                data-ad-client="ca-pub-4388499329141185"
                data-ad-slot="1787190081"
                data-ad-format="auto"
                data-full-width-responsive="true"
            ></ins> -->
        </footer>
    </div>
</template>

<script>
// 助手函数
import _ from "lodash";
import dateFormat from "../utils/dateFormat";
import { authorLink, editLink } from "@jx3box/jx3box-common/js/utils.js";
// 变量模块
import { __Links, __ossMirror } from "@jx3box/jx3box-common/js/jx3box.json";
import User from "@jx3box/jx3box-common/js/user.js";
// 子模块
import macro from "@/components/macro.vue";
import xfmap from "@jx3box/jx3box-data/data/xf/xf.json";
import talent from "@jx3box/jx3box-talent";
// 数据服务
import { getPost } from "../service/post.js";

export default {
    name: "single",
    props: [],
    data: function() {
        return {
            loading: false,

            post: {},
            setting: {},
            meta: {},
            author: {},

            data: [],

            active: "0",
            talents : []
        };
    },
    computed: {
        done: function() {
            return this.$store.state.status;
        },
        id: function() {
            return this.$store.state.pid;
        },
        title: function() {
            return _.get(this.post, "post_title") || "无标题";
        },
        url: function() {
            return location.href;
        },
        author_link: function() {
            return authorLink(_.get(this.author, "uid"));
        },
        author_name: function() {
            return _.get(this.author, "name") || "匿名";
        },
        post_date: function() {
            return dateFormat(new Date(_.get(this.post, "post_date")));
        },
        update_date: function() {
            return dateFormat(new Date(_.get(this.post, "post_modified")));
        },
        edit_link: function() {
            return editLink(
                _.get(this.post, "post_type"),
                _.get(this.post, "ID")
            );
        },
        canEdit: function() {
            return (
                _.get(this.post, "post_author") == User.getInfo().uid ||
                User.getInfo().group > 60
            );
        },
        excerpt: function() {
            return _.get(this.post, "post_excerpt");
        },

        xf: function() {
            return _.get(this.post, "post_subtype");
        },
        xficon_id: function() {
            return this.xf && xfmap[this.xf]["id"];
        },
    },
    methods: {
        formatMeta: function(key) {
            let val = _.get(this.meta, key);
            if (Array.isArray(val)) {
                return val.toString();
            } else {
                return val;
            }
        },
        changeTab: function() {},
        onCopy: function(val) {
            this.$notify({
                title: "复制成功",
                message: "复制内容 : " + val.text,
                type: "success",
            });
        },
        onError: function() {
            this.$notify.error({
                title: "复制失败",
                message: "请手动复制",
            });
        },
        getTalentSQ: function(talent) {
            if (talent) {
                try {
                    let _parsed = JSON.parse(talent);
                    return _parsed.sq;
                } catch (e) {
                    console.log(e);
                }
            } else {
                return "";
            }
        },
        getTalentTXT : function (i){
            return this.talents[i]
        }
    },
    filters: {
        xficon: function(val) {
            return __ossMirror + "image/xf/" + val + ".png";
        },
        iconURL: function(val) {
            return __ossMirror + "icon/" + val + ".png";
        },
    },
    created: function() {
        if (this.id) {
            this.loading = true;
            getPost(this.id)
                .then((res) => {
                    this.post = this.$store.state.post = res.data.data.post;
                    this.meta = this.$store.state.meta =
                        res.data.data.post.post_meta;
                    this.setting = this.$store.state.setting =
                        res.data.data.post;
                    this.author = this.$store.state.author =
                        res.data.data.author;
                    this.data = (this.meta && this.meta.data) || [];
                    this.$store.state.status = true;
                })
                .then(() => {
                    if (this.data.length) {
                        this.data.forEach((item, i) => {
                            let container = `#talent-box-${i}`;
                            let schema = item.talent;
                            if (schema) {
                                try {
                                    schema = JSON.parse(schema);
                                    schema.container = container;

                                    let ins = new talent(schema);
                                    ins.then((t) => {
                                        this.talents.push(t.txt.toString())
                                    })
                                } catch (e) {
                                    this.$notify.error({
                                        title: "错误",
                                        message: "奇穴编码解析失败",
                                        position: "bottom-right",
                                    });
                                }
                            }
                        });
                    }
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    },
    components: {
        macro
    },
};
</script>

<style lang="less">
@import "../assets/css/single.less";
@import "../assets/css/macro.less";
</style>
