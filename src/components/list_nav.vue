<template>
    <div class="m-list-nav">

        <h5 class="u-title">心法导航<a class="u-more" :href="root">全部心法 &raquo;</a></h5>
        <ul class="m-macro-nav u-list">
            <li class="u-item" v-for="(item,i) in xfmap" :key="i">
                <a class="u-link" :href="navLink(item.name)" :class="{on:isActive(item.name)}">
                    <i class="u-pic"><img :src="item.id | xficon" :alt="item.name"></i>
                    <span class="u-txt">{{item.name}}</span>
                </a>
            </li>
        </ul>

        <h5 class="u-title">在线应用</h5>
        <div class="m-nav-group">
            <a href="/app/macroeditor" target="_blank">
                <img svg-inline src="../assets/img/list/macroeditor.svg" />
                <span>智能宏编辑器</span>
                <!-- <i class="u-mark isnew">全新上线</i> -->
            </a>
        </div>
    </div>
</template>

<script>
import xfmap from '@jx3box/jx3box-data/data/xf/xf.json'
import {__ossMirror,__imgPath,__ossRoot} from '@jx3box/jx3box-common/js/jx3box.json'
export default {
    name: "list_nav",
    props: [],
    data: function() {
        return {
            xfmap,
        };
    },
    computed: {
        root : function (){
            return './'// + '#' + this.$route.path
        }
    },
    methods: {
        isActive : function (name){
            return this.$store.state.subtype == name
        },
        navLink : function (val){
            return `./?subtype=${val}` + '#' + this.$route.path
        }
    },
    filters : {
        xficon : function (val){
            return __imgPath + 'image/xf/' + val + '.png'
        },
    },
    mounted: function() {},
    components : {
        
    }
};
</script>

<style lang="less">
    @import '../assets/css/list_nav.less';
</style>