<template>
    <div class="m-list-side">

        <!-- 群号 -->
        <RightSideMsg>
            <em>宏作者交流群</em> :
            <strong><a href="https://jq.qq.com/?_wv=1027&k=ZAsOkzUq">297985102</a></strong>
        </RightSideMsg>

        <!-- 排行榜 -->
        <div class="m-side-rank">
            <h3 class="c-sidebar-right-title">
                <img class="u-icon" svg-inline src="../assets/img/side/rank.svg" />
                云端宏排行榜
                <router-link class="u-more" to="/rank">完整榜单 &raquo;</router-link>
            </h3>
        </div>

        <!-- 其他链接 -->
        <div class="m-side-links">
            <h3 class="c-sidebar-right-title">
                <img class="u-icon" svg-inline src="../assets/img/side/puzzle.svg" />
                相关链接
            </h3>
            <div class="c-sidebar-right-list">
                <!-- TODO:云端宏相关教程 -->
                <a class="u-item" href="https://www.jx3box.com/tool/14671/" target="_blank">云端宏食用指南</a>
                <a class="u-item" href="https://www.jx3box.com/tool/265" target="_blank">宏命令完整参考手册</a>
                <a class="u-item" href="https://www.jx3box.com/tool/166" target="_blank">官方宏命令解析规则</a>
                <a class="u-item" href="https://www.jx3box.com/tool/264" target="_blank">如何使用剑三宏？</a>
                <a class="u-item" href="https://www.jx3box.com/tool/280" target="_blank">简易鼠标宏设置教程</a>
            </div>
        </div>

        <!-- <Github_REPO REPO="fb" coder="8"></Github_REPO> -->
    </div>
</template>

<script>

export default {
    name: "list_side",
    props: [],
    data: function() {
        return {
        };
    },
    computed: {},
    methods: {
    },
    mounted: function() {
    },
    components: {},
};
</script>

<style lang="less">
@import "../assets/css/list_side.less";
</style>