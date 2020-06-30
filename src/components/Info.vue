<template>
    <div class="m-info">
        <div class="m-info-notice">
            <a class="u-item" href="/tool?pid=14671" target="_blank">🌈 云端宏发布指南</a>
            <a class="u-item" href="/app/macroeditor" target="_blank">⚽️ 智能宏编辑器上线</a>
        </div>

        <div class="m-info-router">
            <router-link title="云端宏" to="/"><i class="el-icon-collection"></i></router-link>
            <router-link title="排行榜" to="/rank"><i class="el-icon-s-data"></i></router-link>
            <router-link title="私人宏仓库" to="/bucket"><i class="el-icon-receiving"></i></router-link>
            <a title="宏编辑器" href="/app/macroeditor" target="_blank"><i class="el-icon-setting"></i></a>
        </div>
    </div>
</template>

<script>
export default {
    name: "Info",
    props: [],
    data: function() {
        return {};
    },
    computed: {},
    methods: {},
    mounted: function() {}
};
</script>

<style lang="less">
@import '../assets/css/info.less';
</style>
