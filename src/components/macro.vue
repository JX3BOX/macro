<template>
    <div class="u-macro-inner">
        <div class="w-jx3macro" v-html="content"></div>
        <div class="u-panel u-macro-panel">
            <el-button class="u-macro-panel-copy" icon="el-icon-document-copy" plain size="mini" v-clipboard:copy="copytext" v-clipboard:success="onCopy" v-clipboard:error="onError"
                >复制宏内容</el-button
            >
            <el-button icon="el-icon-refresh" plain size="mini" @click="run" v-if="isCN" class="u-macro-panel-translate">
                <span v-if="status">轉換為繁體</span>
                <span v-else>转换为简体</span>
            </el-button>
            <el-button class="u-macro-panel-copyname" icon="el-icon-cloudy" plain type="primary" size="mini" v-clipboard:copy="copyname" v-clipboard:success="onCopy" v-clipboard:error="onError"
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
        </div>
        <div class="u-count">
            字数：
            <b>{{ count }}</b>
        </div>
    </div>
</template>

<script>
import macro from "@jx3box/jx3box-macro";
import "@jx3box/jx3box-macro/macro.css";
import dict from "@jx3box/jx3box-dict/output/skill.json";
import User from "@jx3box/jx3box-common/js/user";
// import { getNewDict } from "@/service/helper.js";
export default {
    name: "macro",
    props: ["ctx", "lang", "name"],
    data: function() {
        return {
            data: "",
            code: "",
            data_tw: "",
            code_tw: "",
            status: true, //默认简体
            flag: false, //是否已被转换过
            dict,
            isSuperAdmin: User.isSuperAdmin(),
        };
    },
    watch: {
        ctx: function(ctx) {
            if (ctx) {
                this.data = ctx;
                this.code = this.parse(ctx);
            }
        },
    },
    computed: {
        content: function() {
            return this.status ? this.code : this.code_tw;
        },
        copytext: function() {
            return this.status ? this.data : this.data_tw;
        },
        copyname: function() {
            return this.name || "";
        },
        testname: function() {
            return this.name && this.name.replace("#", "-");
        },
        isCN: function() {
            if (!this.lang) {
                return true;
            } else {
                return this.lang == "cn";
            }
        },
        count: function() {
            return this.data.length;
        },
        isAuthor: function() {
            return User.getInfo().uid == this.$store.state.user_id;
        },
    },
    methods: {
        onCopy: function(val) {
            this.$notify({
                title: "复制成功",
                message: "复制宏成功",
                type: "success",
            });
        },
        onError: function() {
            this.$notify.error({
                title: "复制失败",
                message: "请手动复制",
            });
        },
        translate(data) {
            if (data && data.length) {
                dict['cn'].forEach((item,i) => {
                    if(data.includes(item)){
                        data = data.replace(new RegExp(item,'g'),dict['tr'][i])
                    }
                })
            }
            return data;
        },
        callTranslator: function() {
            if (this.data) {
                this.data_tw = this.translate(this.data);
                this.code_tw = this.parse(this.data_tw);
            }
        },
        parse: function(data) {
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
        run: function() {
            if (!this.flag) {
                this.callTranslator();
                this.flag = true;
            }
            this.status = !this.status;
        },
    },
    created: function() {
        // getNewDict()
        //     .then((res) => {
        //         this.dict = res.data;
        //     })
        //     .finally(() => {
        if (this.ctx) {
            this.data = this.ctx;
            this.code = this.parse(this.ctx);
        }
        // });
    },
    components: {},
};
</script>

<style scoped lang="less">
.u-macro-inner {
    .pr;
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
</style>
