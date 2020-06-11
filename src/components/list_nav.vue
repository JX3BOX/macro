<template>
    <div class="m-list-nav">

        <h5 class="u-title">心法导航</h5>
        <ul class="m-macro-nav u-list">
            <li class="u-item" v-for="(item,i) in xfmap" :key="i">
                <a class="u-link" href="">
                    <i class="u-pic"><img :src="item.id | xficon" :alt="item.name"></i>
                    <span class="u-txt">{{item.name}}</span>
                </a>
            </li>
        </ul>

        <h5 class="u-title">在线应用</h5>
        <div class="m-nav-group">
            <router-link to="/store">
                <img svg-inline src="../assets/img/logo.svg" />
                <span>我的宏仓库</span>
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
    },
    filters : {
        xficon : function (val){
            return __ossMirror + 'image/xf/' + val + '.png'
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