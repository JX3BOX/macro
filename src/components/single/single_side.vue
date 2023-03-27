<template>
    <div class="m-single-side">
        <PostTopic v-if="id" type="macro" :id="~~id" />
        <div class="m-single-macroindex">
            <!-- 云端宏 -->
            <h2 class="m-cloud-name">
                云端宏
                <a class="u-help" href="/tool/18152" target="_blank"> <i class="el-icon-question"></i>如何使用? </a>
            </h2>
            <div class="m-single-meta" v-if="data.length">
                <div class="u-data" v-for="(feed, i) in data" :key="feed + i">
                    <feed class="u-feed" :author="author" :name="feed.name" :subtype="subtype" />
                </div>
            </div>
        </div>
        <PostDirectory id="directory" />
        <PostCollection v-if="showSideCollection" :store="collection_data" />
    </div>
</template>

<script>
import feed from "@/components/feed.vue";
import PostDirectory from '@jx3box/jx3box-common-ui/src/single/PostDirectory.vue'
import PostCollection from '@jx3box/jx3box-common-ui/src/single/PostCollection.vue'
import PostTopic from '@jx3box/jx3box-common-ui/src/single/PostTopic.vue'
export default {
    name: "single_side",
    props: ['id'],
    data: function() {
        return {
        };
    },
    components : {
        PostDirectory,
        PostCollection,
        PostTopic,
        feed,
    },
    computed : {
        hasDirectory : function (){
            return this.$store.state.extend?.directory
        },
        showSideCollection : function (){
            let hasCollection = this.$store.state.post?.post_collection
            let foldTopCollection = !this.$store.state.post?.collection_collapse
            return hasCollection && foldTopCollection
        },
        collection_data : function (){
            return this.$store.state.extend?.collection_data
        },

        data: function() {
            return this.$store.state.post?.post_meta?.data || [];
        },
        subtype: function() {
            return this.$store.state.post?.post_subtype || "通用";
        },
        author : function (){
            return this.$store.state.post?.author_info?.display_name || this.$store.state.post?.author
        }
    },
};
</script>

<style lang="less">
.m-single-side {
    padding: 20px;
}
.m-single-directory {
    .mb(20px);
}


.m-single-macroindex{
    .mb(20px);
}

.m-cloud-name{
    font-weight:300;
    margin:0 0 10px 0;

    .u-help{
        color:#888;
        &:hover{
            color:@color-link;
        }
        .mt(5px);
        .fz(12px);
        font-weight:normal;
        .fr;
        i{
            .mr(3px);
        }
    }
}

.m-single-meta{
    // margin:20px;
    border:1px solid @primary;
    .r(4px);
    padding:20px;
    background-color:#faffff;

    .u-data{
        .fz(13px,24px);
        .pr;
        .mb(10px);
        .clearfix;
        .nobreak;

        &:last-child{
            .mb(0);
        }
    }

    .u-feed{
        .y(top);
        .mr(10px);
        .pointer;
        .dbi;
        .h(24px);
    }

    .u-desc{
        .lh(24px);
    }

    .w-mark{
        white-space: nowrap;
        .db;
        overflow: hidden;
    }
    .w-mark-key,.w-mark-value{
        .dbi;.y(top);
        float:none;
    }
}
</style>
