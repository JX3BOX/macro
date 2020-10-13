<template>
    <div class="m-single-side" v-if="$store.state.status">
        <!-- 云端宏 -->
        <h2 class="m-cloud-name">
            云端宏
            <a class="u-help" href="/tool/?pid=18152#/" target="_blank"><i class="el-icon-question"></i>如何使用?</a>
        </h2>
        <div class="m-single-meta" v-if="data.length">
            <div class="u-data" v-for="(feed, i) in data" :key="feed + i">
                <feed class="u-feed" :author="author.name" :name="feed.name" :subtype="subtype"/>
                <!-- <span class="u-desc">{{ feed.desc }}</span> -->
            </div>
        </div>

        <div id="directory"></div>
    </div>
</template>

<script>
import _ from 'lodash'
import feed from "@/components/feed.vue";
export default {
    name: "single_side",
    props: [],
    data: function() {
        return {
        };
    },
    computed: {
        author : function (){
            return this.$store.state.author
        },
        data : function (){
            return _.get(this.$store.state.post.post_meta,'data') || [];
        },
        subtype : function (){
            return _.get(this.$store.state.post,'post_subtype') || '通用'
        }
    },
    methods: {
        
    },
    filters : {
    },
    mounted: function() {
        
    },
    components : {
        feed,
    }
};
</script>

<style lang="less">
    @import "../assets/css/meta.less";
</style>
