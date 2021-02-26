<template>
    <div class="m-info">
        <div class="m-info-notice">
            <!-- <span class="u-item" href="" target="_blank">🌈 自用宏将会被设为私有状态,不影响游戏内加载</span> -->
        </div>

        <div class="m-info-router" v-if="mode == 'list'">
            <router-link title="云端宏" to="/"><i class="el-icon-collection"></i></router-link>
            <router-link title="排行榜" to="/rank"><i class="el-icon-s-data"></i></router-link>
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
    computed: {
        mode: function() {
            return this.$store.state.mode;
        },
    },
    methods: {},
    mounted: function() {}
};
</script>

<style lang="less">
@import '../assets/css/info.less';
</style>
