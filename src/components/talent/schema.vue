<template>
    <div>
        <el-input placeholder="点击自动复制" v-model="code" @click="copy(code)">
            <template slot="prepend">{{ config.desc + "·" + config.name }}</template>
            <template slot="append">点击复制</template>
        </el-input>
    </div>
</template>

<script>
import { copy } from "@/utils/clipboard";
export default {
    name: "schema",
    props: ["config", "version", "xf"],
    data: function() {
        return {};
    },
    computed: {
        code: function() {
            let _code = {
                version: this.version,
                xf: this.xf,
                sq: this.config.sq,
            };
            return JSON.stringify(_code);
        },
    },
    methods: {
        copy: function(val) {
            copy(val, { success_message: "奇穴编码复制成功" });
        },
    },
    mounted: function() {},
    components: {},
};
</script>
