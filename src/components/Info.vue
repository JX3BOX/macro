<template>
    <div class="m-info">
        <div class="m-info-notice">
            <!-- <span class="u-item" href="" target="_blank">🌈 自用宏将会被设为私有状态,不影响游戏内加载</span> -->
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
