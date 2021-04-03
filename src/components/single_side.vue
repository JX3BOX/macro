<template>
    <div class="m-single-side">
        <div class="m-single-macroindex">
            <!-- 云端宏 -->
            <h2 class="m-cloud-name">
                云端宏
                <a class="u-help" href="/tool/18152/" target="_blank">
                    <i class="el-icon-question"></i>如何使用?
                </a>
            </h2>
            <div class="m-single-meta" v-if="data.length">
                <div class="u-data" v-for="(feed, i) in data" :key="feed + i">
                    <feed
                        class="u-feed"
                        :author="post.author"
                        :name="feed.name"
                        :subtype="subtype"
                    />
                    <!-- <span class="u-desc">{{ feed.desc }}</span> -->
                </div>
            </div>
        </div>

        <div id="directory"></div>

        <div class="m-single-collection" v-if="collection_id && collection">
            <div class="u-title">
                <i class="el-icon-connection"></i> 关联
            </div>
            <ul class="u-list" v-if="collection_posts.length">
                <li v-for="(item, i) in collection_posts" :key="i">
                    <el-tooltip class="item" effect="dark" :content="item.title" placement="left">
                        <a :href="item | showLink" target="_blank">
                            <i class="el-icon-link"></i>
                            {{ item.title || '-' }}
                        </a>
                    </el-tooltip>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import feed from "@/components/feed.vue";
import { getCollection } from "@/service/helper.js";
import { getLink } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "single_side",
    props: [],
    data: function () {
        return {
            collection: "",
        };
    },
    computed: {
        post: function () {
            return this.$store.state.post;
        },
        data: function () {
            return _.get(this.$store.state.post.post_meta, "data") || [];
        },
        subtype: function () {
            return _.get(this.$store.state.post, "post_subtype") || "通用";
        },
        collection_id: function () {
            let id = ~~this.$store.state.post.post_collection;
            if (!id || isNaN(id)) id = 0;
            return id;
        },
        collection_posts: function () {
            return (this.collection && this.collection.posts) || [];
        },
    },
    watch: {
        collection_id: {
            immediate: true,
            handler: function () {
                this.loadCollection();
            },
        },
    },
    methods: {
        loadCollection: function () {
            getCollection(this.collection_id).then((res) => {
                this.collection = res.data.data.collection || [];
            });
        },
    },
    filters: {
        showLink: function (item) {
            if (item.type == "custom") {
                return item.url;
            } else {
                return getLink(item.type, item.id);
            }
        },
    },
    mounted: function () {},
    components: {
        feed,
    },
};
</script>

<style lang="less">
@import "../assets/css/meta.less";
.m-single-side {
    padding: 20px;
}
.m-single-director {
    .mb(20px);
}
.m-single-collection {
    .u-title {
        font-weight: 300;
        font-size: 20px;
    }
    .u-list {
        list-style: none;
        padding: 10px 20px;
        margin: 0;
        li {
            .fz(13px, 36px);
        }
        a {
            .db;
            transition: 0.15s ease-in-out;
            .nobreak;
            &:hover {
                background-color: #e6f0fb;
            }
        }
    }
}
</style>
