<template>
    <div class="m-list-nav">

        <h5 class="u-title">心法导航<a class="u-more" href="./">全部心法 &raquo;</a></h5>
        <ul class="m-macro-nav u-list">
            <li class="u-item" v-for="(item,i) in xfmap" :key="i">
                <a class="u-link" :href="item.name | navLink" :class="{on:isActive(item.name)}">
                    <i class="u-pic"><img :src="item.id | xficon" :alt="item.name"></i>
                    <span class="u-txt">{{item.name}}</span>
                </a>
            </li>
        </ul>

        <h5 class="u-title">在线应用</h5>
        <div class="m-nav-group">
            <router-link to="/bucket">
                <img svg-inline src="../assets/img/logo.svg" />
                <span>私人宏仓库</span>
                <i class="u-mark isnew">全新上线</i>
            </router-link>
            <router-link to="/editor">
                <img svg-inline src="../assets/img/logo.svg" />
                <span>在线编辑器</span>
                <i class="u-mark ispending">即将推出</i>
            </router-link>
        </div>
    </div>
</template>

<script>
import xfmap from '@jx3box/jx3box-data/data/xf/xf.json'
import {__ossMirror} from '@jx3box/jx3box-common/js/jx3box.json'
export default {
    name: "list_nav",
    props: [],
    data: function() {
        return {
            xfmap,
        };
    },
    computed: {
    },
    methods: {
        isActive : function (name){
            return this.$store.state.subtype == name
        }
    },
    filters : {
        xficon : function (val){
            return __ossMirror + 'image/xf/' + val + '.png'
        },
        navLink : function (val){
            return `./?subtype=${val}`
        }
    },
    mounted: function() {},
    components : {
        
    }
};
</script>

<style lang="less">
    @import '../assets/css/list_nav.less';
</style>