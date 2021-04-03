<template>
    <div class="m-list-side">
        <!-- 群号 -->
        <RightSideMsg>
            <em>宏作者交流群</em> :
            <strong>
                <a href="https://jq.qq.com/?_wv=1027&k=CAiizina" v-if="client == 'origin'">590349918</a>
                <a href="https://jq.qq.com/?_wv=1027&k=ZAsOkzUq" v-else>297985102</a>
            </strong>
        </RightSideMsg>

        <!-- 排行榜 -->
        <minirank />

        <!-- 其他链接 -->
        <div class="m-side-links">
            <h3 class="c-sidebar-right-title">
                <img class="u-icon" svg-inline src="../assets/img/side/puzzle.svg" />
                帮助文档
            </h3>
            <div class="c-sidebar-right-list" v-if="links && links.length">
                <a
                    v-for="(item, i) in links"
                    :key="i"
                    class="u-item"
                    :href="item.link"
                    target="_blank"
                >
                    <i class="el-icon-collection"></i>
                    {{ item.label }}
                </a>
            </div>
        </div>

        <!-- <Github_REPO REPO="fb" coder="8"></Github_REPO> -->
    </div>
</template>

<script>
import minirank from "@/components/minirank.vue";
import { getLinks } from "@/service/helper.js";
export default {
    name: "list_side",
    props: [],
    data: function () {
        return {
            links: [],
        };
    },
    computed: {
        client: function () {
            return this.$store.state.client;
        },
    },
    methods: {},
    mounted: function () {
        getLinks().then((res) => {
            this.links = res.data.data.menu_group.menus;
        });
    },
    components: {
        minirank,
    },
};
</script>

<style lang="less">
@import "../assets/css/list_side.less";
</style>
