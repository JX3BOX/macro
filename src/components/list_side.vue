<template>
    <div class="m-list-side">
        <!-- 群号 -->
        <RightSideMsg>
            <em>宏作者交流群</em> :
            <strong
                ><a href="https://jq.qq.com/?_wv=1027&k=ZAsOkzUq"
                    >297985102</a
                ></strong
            >
        </RightSideMsg>

        <!-- 排行榜 -->
        <minirank />

        <!-- 其他链接 -->
        <div class="m-side-links">
            <h3 class="c-sidebar-right-title">
                <img
                    class="u-icon"
                    svg-inline
                    src="../assets/img/side/puzzle.svg"
                />
                相关链接
            </h3>
            <div class="c-sidebar-right-list">
                <a
                    class="u-item"
                    href="/tool/?pid=14671"
                    target="_blank"
                    ><i class="el-icon-collection"></i> 云端宏指南</a
                >
                <a
                    class="u-item"
                    href="/tool/?pid=265"
                    target="_blank"
                    ><i class="el-icon-collection"></i> 宏命令完整参考手册</a
                >
                <a
                    class="u-item"
                    href="/tool/?pid=264"
                    target="_blank"
                    ><i class="el-icon-warning-outline"></i> 如何使用剑三宏？</a
                >
                <a
                    class="u-item"
                    href="/tool/?pid=280"
                    target="_blank"
                    ><i class="el-icon-warning-outline"></i> 简易鼠标宏设置教程</a
                >
            </div>
        </div>

        <!-- <Github_REPO REPO="fb" coder="8"></Github_REPO> -->
    </div>
</template>

<script>
import minirank from '@/components/minirank.vue'
export default {
    name: "list_side",
    props: [],
    data: function() {
        return {};
    },
    computed: {},
    methods: {},
    mounted: function() {},
    components: {
        minirank
    },
};
</script>

<style lang="less">
@import "../assets/css/list_side.less";
</style>
