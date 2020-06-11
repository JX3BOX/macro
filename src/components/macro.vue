<template>
    <div class="u-macro-inner">
        <div class="w-jx3macro" v-html="content"></div>
        <div class="u-panel u-macro-panel">
            <el-button
                icon="el-icon-document-copy"
                plain
                size="mini"
                v-clipboard:copy="copytext"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
                >复制宏内容</el-button
            >
            <el-button icon="el-icon-refresh" plain size="mini" @click="run">
                <span v-if="status">轉換為繁體</span>
                <span v-else>转换为简体</span>
            </el-button>
        </div>
    </div>
</template>

<script>
import macro from "@jx3box/jx3box-macro";
import dict from "@jx3box/jx3box-data/data/app/dict.json";
export default {
    name: "macro",
    props: ["data"],
    data: function() {
        return {
            code: "",
            data_tw: "",
            code_tw: "",
            status: 1, //默认简体
            flag : false,    //是否已被转换过
        };
    },
    computed: {
        content : function (){
            return this.status ? this.code : this.code_tw
        },
        copytext : function (){
            return this.status ? this.data : this.data_tw
        }
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
                let _data = "";
                for(let f of data){
                    let i = dict.cn.indexOf(f);
                    if (i >= 0) {
                        _data += dict.tw[i];
                    } else {
                        _data += f;
                    }
                }
                return _data;
            }
            return "";
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
        run : function (){
            if(!this.flag){
                this.callTranslator()
                this.flag = true
            }
            this.status = ~~!this.status
        }
    },
    mounted: function() {
        if (this.data) {
            this.code = this.parse(this.data);
        }
    },
    components: {},
};
</script>
