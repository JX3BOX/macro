<template>
    <el-tabs class="m-tabs" v-model="view" @tab-click="changeView">
        <el-tab-pane label="云端宏" name="index">
            <span slot="label">
                <i class="el-icon-collection"></i>
                <b>云端宏</b>
                <em class="u-new">轻松同步</em>
            </span>
        </el-tab-pane>
        <el-tab-pane label="我的宏仓库" name="bucket">
            <span slot="label" class="u-label">
                <i class="el-icon-receiving"></i>
                <b>个人宏仓库</b>
                <!-- <em class="u-pop" v-if="isLogin">{{ count }}</em> -->
                <!-- <em class="u-ready" v-else>私人专属</em> -->
            </span>
        </el-tab-pane>
        <el-tab-pane label="我收藏的宏" name="fav">
            <span slot="label" class="u-label">
                <i class="el-icon-star-off"></i>
                <b>宏收藏夹</b>
            </span>
        </el-tab-pane>
        <el-tab-pane label="亲友分享的宏" name="landspace">
            <span slot="label" class="u-label">
                <i class="el-icon-sugar"></i>
                <b>亲友的宏</b>
            </span>
        </el-tab-pane>
        <el-tab-pane label="排行榜" name="rank">
            <span slot="label">
                <i class="el-icon-data-analysis"></i>
                <b>排行榜</b>
                <!-- <em class="u-new">全新上线</em> -->
                <!-- <em class="u-ready">即将推出</em> -->
            </span>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
import User from "@jx3box/jx3box-common/js/user";
// import { getMyPostCount } from "@/service/post.js";
export default {
    name: "tabs",
    props: [],
    data: function () {
        return {
            view: "index",
            isLogin: User.isLogin(),
        };
    },
    watch: {
        '$route': {
            handler: function (_route) {
                this.view = _route.name;
            },
            immediate: true,
            deep: true,
        },
    },
    computed: {
        count: function () {
            return this.$store.state.my_macro_count;
        },
    },
    methods: {
        changeView: function () {
            this.$router.push({ name: this.view, query: Object.assign({}, this.$route.query, { page: 1 }) });
        },
    },
    created: function () {
        // User.isLogin() &&
        //     getMyPostCount().then((res) => {
        //         this.$store.state.my_macro_count = res.data.data.macro || 0;
        //     });
    },
};
</script>

<style lang="less">
@import "../assets/css/tabs.less";
</style>
