<template>
    <div class="m-macro-inner">
        <template v-if="data">
            <div class="w-jx3macro" v-html="content"></div>
            <div class="u-panel u-macro-panel">
                <el-button
                    class="u-macro-panel-copy"
                    icon="el-icon-document-copy"
                    plain
                    size="mini"
                    @click="copy(copytext)"
                    >复制宏内容</el-button
                >
                <el-button
                    icon="el-icon-refresh"
                    plain
                    size="mini"
                    @click="run"
                    v-if="isCN"
                    class="u-macro-panel-translate"
                >
                    <span v-if="status">轉換為繁體</span>
                    <span v-else>转换为简体</span>
                </el-button>
                <el-button
                    class="u-macro-panel-copyname"
                    icon="el-icon-cloudy"
                    plain
                    type="primary"
                    size="mini"
                    @click="copy(copyname, 'cloud')"
                    >复制云端宏</el-button
                >
                <a
                    class="u-macro-panel-test el-button el-button--mini is-plain"
                    v-if="isSuperAdmin || isAuthor"
                    :href="'https://pull.j3cx.com/api/macro/query?name=' + testname + '&_no_cache'"
                    target="_blank"
                    title="默认存在1分钟缓存，如需要即时生效请点击此按钮"
                >
                    <i class="el-icon-video-play"></i> 云端同步刷新
                </a>
                <!-- <el-checkbox
                    v-if="isLogin"
                    v-model="auto_thx"
                    size="mini"
                    class="u-auto-thx"
                    border
                    :true-label="1"
                    :false-label="0"
                    @change="onAuthThxChange"
                    >自动感谢</el-checkbox
                > -->
            </div>
            <div class="u-count">
                字数：
                <b>{{ count }}</b>
            </div>
        </template>
        <!-- 宏是空的的时候会直接显示上一个不够合理 -->
        <template v-else>
            <el-alert type="warning" show-icon :closable="false">
                <div class="u-empty-text" slot="title">Σ(ﾟдﾟlll)&nbsp;&nbsp;&nbsp;糟糕，这个宏是空的！</div>
            </el-alert>
        </template>
    </div>
</template>

<script>
import macro from "@jx3box/jx3box-macro";
import "@jx3box/jx3box-macro/macro.css";
import dict from "@jx3box/jx3box-dict/output/skill.json";
import User from "@jx3box/jx3box-common/js/user";
import { copy } from "@/utils/clipboard";
import { reportNow } from "@jx3box/jx3box-common/js/reporter";
import { POST } from "@jx3box/jx3box-comment-ui/src/service";
import { postStat } from "@jx3box/jx3box-common/js/stat";
export default {
    name: "macro",
    props: ["ctx", "lang", "name", "id", "canComment"],
    data: function () {
        return {
            data: "",
            code: "",
            data_tw: "",
            code_tw: "",
            status: true, //默认简体
            dict,
            isSuperAdmin: User.isSuperAdmin(),

            // auto_thx: 0,
        };
    },
    watch: {
        ctx: function (ctx) {
            this.data = ctx;
            this.code = this.parse(ctx);
            this.callTranslator();
        },
    },
    computed: {
        content: function () {
            return this.status ? this.code : this.code_tw;
        },
        copytext: function () {
            return this.status ? this.data : this.data_tw;
        },
        copyname: function () {
            return this.name || "";
        },
        testname: function () {
            return this.name && this.name.replace("#", "-");
        },
        isCN: function () {
            if (!this.lang) {
                return true;
            } else {
                return this.lang == "cn";
            }
        },
        count: function () {
            return this.data.length;
        },
        isAuthor: function () {
            return User.isLogin() && User.getInfo().uid == this.$store.state.user_id;
        },
        client: function () {
            return this.$store.state.client;
        },
        prefix: function () {
            return this.client == "std" ? "www" : "origin";
        },
        baseAPI() {
            return `/api/comment/post/article/${this.id}`;
        },
        isLogin() {
            return User.isLogin();
        },
    },
    methods: {
        copy: function (text, type = "") {
            copy(text, { success_message: "复制宏成功" }).then(() => {
                reportNow({
                    caller: type ? "macro_copy_cloud" : "macro_copy",
                    data: {
                        href: `${this.prefix}:/macro/${this.id}`,
                    },
                });

                // if (this.auto_thx && User.isLogin() && this.canComment) {
                //     this.autoReply();
                // }
                this.autoLike();
            });
        },
        translate(data) {
            if (data && data.length) {
                dict["cn"].forEach((item, i) => {
                    if (data.includes(item)) {
                        data = data.replace(new RegExp(item, "g"), dict["tr"][i]);
                    }
                });
            }
            return data;
        },
        callTranslator: function () {
            if (this.data) {
                this.data_tw = this.translate(this.data);
                this.code_tw = this.parse(this.data_tw);
            }
        },
        parse: function (data) {
            if (data) {
                try {
                    let ins = new macro(data);
                    return ins.code;
                } catch (e) {
                    console.log(e);
                    return "";
                }
            } else {
                return "";
            }
        },
        run: function () {
            this.status = !this.status;
        },
        // onAuthThxChange() {
        //     localStorage.setItem("auto_thx", this.auto_thx);
        // },
        // autoReply: function () {
        //     POST(`${this.baseAPI}/comment`, null, {
        //         attachmentList: [],
        //         content: "抱走，谢谢楼主，么么哒#嘴",
        //         is_template: 1,
        //     })
        //         .then((responseJSON) => {
        //             if (responseJSON && ~~responseJSON.code > 0) {
        //                 this.$notify({
        //                     title: "评论失败",
        //                     message: responseJSON.msg || "",
        //                     type: "error",
        //                     duration: 3000,
        //                     position: "bottom-right",
        //                 });
        //                 return;
        //             }
        //             this.$notify({
        //                 title: "",
        //                 message: "评论成功!",
        //                 type: "success",
        //                 duration: 3000,
        //                 position: "bottom-right",
        //             });
        //         })
        //         .catch(() => {});
        // },
        // 自动点赞
        autoLike: function () {
            postStat("macro", this.id, "likes");
        },
    },
    created: function () {
        this.data = this.ctx;
        this.code = this.parse(this.ctx);
        this.callTranslator();

        // this.auto_thx = ~~localStorage.getItem("auto_thx") || 0;
    },
    components: {},
};
</script>

<style lang="less">
.m-macro-inner {
    .pr;
    .u-empty-text {
        margin-top: -2px;
    }
    .u-count {
        .pa;
        .rb(5px, 10px);
        .fz(12px);
        color: #aaa;
        b {
            color: @color-link;
        }
    }
    .u-macro-panel {
        .flex;
    }
    .u-auto-thx {
        margin-left: 10px;
        .flex;
        align-items: center;
        .el-checkbox__input {
            .pr;
            top: 1.5px;
        }
    }
}
@media screen and (max-width: @phone) {
    .m-macro-inner .u-count {
        .pa;
        .rt(0,-68px);
        background-color: #fff;
        bottom: auto;
        padding: 0 5px;
    }
}
</style>
