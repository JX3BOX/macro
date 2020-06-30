<template>
    <el-tabs class="m-tabs" v-model="view" @tab-click="changeView">
        <el-tab-pane label="云端宏" name="index">
            <span slot="label">
                <i class="el-icon-collection"></i>
                <b>云端宏</b>
                <em class="u-hot">全新版本</em>
            </span>
        </el-tab-pane>
        <el-tab-pane label="我的宏仓库" name="bucket">
            <span slot="label">
                <i class="el-icon-receiving"></i>
                <b>私人宏仓库</b>
                <em class="u-ready">私人专属</em>
            </span>
        </el-tab-pane>
        <el-tab-pane label="排行榜" name="rank">
            <span slot="label">
                <i class="el-icon-s-data"></i>
                <b>排行榜</b>
                <!-- <em class="u-new">全新上线</em> -->
                <!-- <em class="u-ready">即将推出</em> -->
            </span>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
export default {
    name: "tabs",
    props: [],
    data: function() {
        return {
            view: "index",
        };
    },
    watch : {
        $route : function (_route){
            this.view = _route.name
        }
    },
    computed: {},
    methods: {
        changeView: function() {
            this.$router.push({ name: this.view });
        },
    },
};
</script>

<style lang="less">
@import "../assets/css/tabs.less";
</style>
