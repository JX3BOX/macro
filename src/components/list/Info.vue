<template>
    <div class="m-info">
        <div class="m-info-router">
            <router-link title="云端宏" to="/"><i class="el-icon-collection"></i></router-link>
            <router-link title="我的宏" to="/bucket"><i class="el-icon-receiving"></i></router-link>
            <router-link title="收藏夹" to="/fav"><i class="el-icon-star-off"></i></router-link>
            <router-link title="亲友宏" to="/landspace"><i class="el-icon-sugar"></i></router-link>
            <router-link title="排行榜" to="/rank"><i class="el-icon-data-analysis"></i></router-link>
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
    },
    methods: {},
    mounted: function() {}
};
</script>

<style lang="less">
@import "~@/assets/css/info.less";
</style>
