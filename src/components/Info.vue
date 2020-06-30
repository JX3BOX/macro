<template>
    <div class="m-info">
        <div class="m-info-notice">
            <a class="u-item" href="https://www.jx3box.com/tool/14671/" target="_blank">🌈 云端宏发布指南</a>
            <router-link class="u-item" title="排行榜" to="/rank">⚽️ 排行榜上线</router-link>
            <!-- <span class="u-item" href="/macro/#/">✨ <span>即将上线</span> · 云端宏一键同步</span> -->
            <!-- <span class="u-item" href="/house/#/rank">⚽️ <span>即将上线</span> · 云端宏排行榜</span> -->
        </div>

        <div class="m-info-router">
            <router-link title="云端宏" to="/"><i class="el-icon-collection"></i></router-link>
            <router-link title="排行榜" to="/rank"><i class="el-icon-s-data"></i></router-link>
            <router-link title="我的宏仓库" to="/bucket"><i class="el-icon-receiving"></i></router-link>
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
