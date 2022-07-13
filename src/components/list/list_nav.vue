<template>
    <div class="m-list-nav">
        <h5 class="u-title">
            心法导航
            <router-link class="u-more" :to="{ query: { subtype: '' } }">全部心法 &raquo;</router-link>
        </h5>
        <ul class="m-macro-nav u-list">
            <li class="u-item" v-for="(item, i) in xfmaps" :key="i" v-show="item.client.includes(client)">
                <router-link class="u-link" :to="{ query: { subtype: item.name } }" :class="{on:isActive(item)}">
                    <i class="u-pic">
                        <img :src="item.id | xficon" :alt="item.name" />
                    </i>
                    <span class="u-txt">{{ item.name }}</span>
                </router-link>
            </li>
        </ul>

        <h5 class="u-title">在线应用</h5>
        <div class="m-nav-group">
            <a href="/app/macroeditor" target="_blank">
                <img class="u-icon" svg-inline src="../../assets/img/list/macroeditor.svg" />
                <span>智能宏编辑器</span>
                <!-- <i class="u-mark isnew">全新上线</i> -->
            </a>
        </div>
    </div>
</template>

<script>
import xfmap from "@jx3box/jx3box-data/data/xf/xf.json";
import { __ossMirror, __imgPath, __ossRoot } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    name: "list_nav",
    computed: {
        client: function() {
            return this.$store.state.client;
        },
        xfmaps() {
            delete xfmap['山居剑意']
            return xfmap
        }
    },
    methods: {
        isActive : function (item){
            return item.name == this.$route.query.subtype
        }
    },
    filters: {
        xficon: function(val) {
            return __imgPath + "image/xf/" + val + ".png";
        },
    },
    mounted: function() {},
    components: {},
};
</script>

<style lang="less">
@import "../../assets/css/nav.less";
</style>
