<template>
    <div class="u-macro-inner">
        <div class="w-jx3macro" v-html="content"></div>
        <div class="u-panel u-macro-panel">
            <el-button
                class="u-macro-panel-copy"
                icon="el-icon-document-copy"
                plain
                size="mini"
                v-clipboard:copy="copytext"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
            >复制宏内容</el-button>
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
                v-clipboard:copy="copyname"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
            >复制云端宏</el-button>
            <a
                class="u-macro-panel-test el-button el-button--mini is-plain"
                v-if="isSuperAdmin"
                :href="'https://pull.j3cx.com/api/macro/query?name=' + testname + '&_no_cache'"
                target="_blank"
            >
                <i class="el-icon-video-play"></i> 测试云端同步
            </a>
        </div>
    </div>
</template>

<script>
import macro from "@jx3box/jx3box-macro";
import "@jx3box/jx3box-macro/macro.css";
import dict from "@jx3box/jx3box-dict/dict.json";
import User from "@jx3box/jx3box-common/js/user";
import { getNewDict } from "@/service/helper.js";
export default {
    name: "macro",
    props: ["ctx", "lang", "name"],
    data: function () {
        return {
            data: "",
            code: "",
            data_tw: "",
            code_tw: "",
            status: 1, //默认简体
            flag: false, //是否已被转换过
            dict,
            isSuperAdmin: User.isSuperAdmin(),
        };
    },
    watch: {
        ctx: function (ctx) {
            if (ctx) {
                this.data = ctx;
                this.code = this.parse(ctx);
            }
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
    },
    methods: {
        onCopy: function (val) {
            this.$notify({
                title: "复制成功",
                message: "复制宏成功",
                type: "success",
            });
        },
        onError: function () {
            this.$notify.error({
                title: "复制失败",
                message: "请手动复制",
            });
        },
        translate(data) {
            if (data && data.length) {
                let _data = "";
                for (let f of data) {
                    let i = dict.cn.indexOf(f);
                    if (i >= 0) {
                        _data += dict.tr[i];
                    } else {
                        _data += f;
                    }
                }
                return _data;
            }
            return "";
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
            if (!this.flag) {
                this.callTranslator();
                this.flag = true;
            }
            this.status = ~~!this.status;
        },
    },
    created: function () {
        getNewDict().then((res) => {
            this.dict = res.data;
        }).finally(() => {
            if (this.ctx) {
                this.data = this.ctx;
                this.code = this.parse(this.ctx);
            }
        })
    },
    components: {},
};
</script>
