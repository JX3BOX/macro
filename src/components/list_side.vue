<template>
    <div class="m-list-side">
        <!-- 群号 -->
        <RightSideMsg>
            <em>宏作者交流群</em> :
            <strong>
                <a href="https://jq.qq.com/?_wv=1027&k=ZAsOkzUq">297985102</a>
            </strong>
        </RightSideMsg>

        <!-- 排行榜 -->
        <minirank />

        <!-- 其他链接 -->
        <div class="m-side-links">
            <h3 class="c-sidebar-right-title" style="border-bottom:none;">
                <img class="u-icon" svg-inline src="../assets/img/side/puzzle.svg" />
                帮助文档
            </h3>
            <el-collapse class="u-groups" v-model="activeDocGroup">
                <el-collapse-item title="入门帮助" name="newbie">
                    <div class="u-docs">
                        <a
                            v-for="(item, i) in macro_newbie"
                            :key="i"
                            class="u-doc"
                            :href="item.link"
                            target="_blank"
                        >
                            <i class="el-icon-collection"></i>
                            {{ item.label }}
                        </a>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="发布指南" name="senior">
                    <div class="u-docs">
                        <a
                            v-for="(item, i) in macro_senior"
                            :key="i"
                            class="u-doc"
                            :href="item.link"
                            target="_blank"
                        >
                            <i class="el-icon-collection"></i>
                            {{ item.label }}
                        </a>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="辅助工具" name="tools">
                    <div class="u-docs">
                        <a
                            v-for="(item, i) in macro_tools"
                            :key="i"
                            class="u-doc"
                            :href="item.link"
                            target="_blank"
                        >
                            <i class="el-icon-collection"></i>
                            {{ item.label }}
                        </a>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>

        <!-- <Github_REPO REPO="fb" coder="8"></Github_REPO> -->
    </div>
</template>

<script>
import minirank from "@/components/minirank.vue";
import { getMenuGroups } from "@/service/helper.js";
export default {
    name: "list_side",
    props: [],
    data: function () {
        return {
            activeDocGroup: "",
            'macro_newbie': [],
            'macro_senior': [],
            'macro_tools': [],
        };
    },
    computed: {
        client: function () {
            return this.$store.state.client;
        },
    },
    methods: {},
    mounted: function () {
        getMenuGroups(['macro_newbie','macro_senior','macro_tools']).then((res) => {
            let data = res.data.data.data || {}
            for(let key in data){
                this[key] = data[key]['menus']
            }
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
