<template>
    <singlebox :post="post" :stat="stat" v-loading="loading">
        <template slot="single-header">
            <div class="u-meta u-sub-block">
                <em class="u-label">心法</em>
                <span class="u-value">
                    <img class="u-icon-xf" :src="xficon_id | xficon" :alt="xf" />
                    {{ xf }}
                </span>
            </div>
            <div class="u-meta u-sub-block">
                <em class="u-label">资料片</em>
                <span class="u-value">{{ post.zlp || post.meta_1 || '未知'}}</span>
            </div>
        </template>
        <!-- 文集+联合创作者 -->
        <Creators class="m-creators" :postId="id" :postType="post.post_type" />
        <Collection
            class="m-collection"
            :id="post.post_collection"
            :defaultVisible="post.collection_collapse"
        />
        <!-- 宏内容 -->
        <div class="m-single-macro" v-if="visible">
            <el-tabs v-model="active" type="card">
                <el-tab-pane v-for="(item, i) in data" :key="i" :name="i + ''">
                    <!-- tab -->
                    <span class="u-label" slot="label">
                        <img class="u-icon" :src="item.icon | iconURL" />
                        <b>{{ item.name }}</b>
                    </span>
                    <!-- 宏 -->
                    <el-divider content-position="left" v-if="item.macro">宏</el-divider>
                    <div class="u-usage" v-if="item.desc">{{ item.desc }}</div>
                    <div
                        class="u-macro macro-box"
                        :class="{ withUsage: item.desc }"
                        v-if="item.macro"
                    >
                        <macro
                            :ctx="item.macro"
                            :lang="lang"
                            :name="post.author + '#' + item.name"
                        />
                    </div>
                    <!-- 奇穴 镇派 -->
                    <template v-if="item.talent">
                        <el-divider content-position="left">{{ client === 'origin' ? '镇派' : '奇穴' }}</el-divider>
                        <div class="m-single-talent-container">
                            <template v-if="client === 'origin'">
                                <render-talent :talent-code="item.talent"></render-talent>
                            </template>
                            <div v-else class="u-talent talent-box" :id="`talent-box-${i}`"></div>
                        </div>
                        <div class="u-panel u-talent-panel" v-if="item.talent">
                            <el-button
                                class="u-talent-panel-copycode"
                                icon="el-icon-s-tools"
                                plain
                                size="mini"
                                v-clipboard:copy="item.talent"
                                v-clipboard:success="onCopy"
                                v-clipboard:error="onError"
                            >复制{{ client === 'origin' ? '镇派' : '奇穴' }}编码</el-button>
                            <el-button
                                v-if="client !== 'origin'"
                                class="u-talent-panel-copytxt"
                                icon="el-icon-document-copy"
                                plain
                                size="mini"
                                v-clipboard:copy="getTalentTXT(i)"
                                v-clipboard:success="onCopy"
                                v-clipboard:error="onError"
                            >复制奇穴文字</el-button>
                            <el-button
                                v-if="client !== 'origin'"
                                class="u-talent-panel-copysq"
                                icon="el-icon-scissors"
                                plain
                                size="mini"
                                v-clipboard:copy="getTalentSQ(item.talent)"
                                v-clipboard:success="onCopy"
                                v-clipboard:error="onError"
                            >复制奇穴序列</el-button>
                        </div>
                    </template>
                    <!-- 急速 -->
                    <el-divider content-position="left" v-if="item.speed">急速</el-divider>
                    <div class="u-speed" v-if="item.speed">{{ item.speed }}</div>
                </el-tab-pane>
            </el-tabs>
            <!-- 配装 -->
            <template v-if="hasPz">
                <el-divider content-position="left">配装</el-divider>
                <div class="u-equipbox">
                    <!-- <Equip :id="item.equip" v-if="item.equip_type == 'jx3box'" /> -->
                    <pz class="m-macro-pz" :raw="pz"></pz>
                </div>
            </template>
        </div>
        <!-- 盒币组件 -->
        <Thx
            class="m-thx"
            slot="single-append"
            :postId="id"
            postType="macro"
            :userId="author_id"
            :adminBoxcoinEnable="true"
            :userBoxcoinEnable="true"
        />
    </singlebox>
</template>

<script>
import {
    __ossRoot,
    __ossMirror,
    __iconPath,
    __imgPath,
} from "@jx3box/jx3box-common/data/jx3box.json";
import singlebox from "@jx3box/jx3box-page/src/cms-single";
import { getPost } from "../service/post.js";
import { getStat, postStat } from "@jx3box/jx3box-common/js/stat";
import { getLink } from "@jx3box/jx3box-common/js/utils.js";
// 子模块
import macro from "@/components/macro.vue";
import xfmap from "@jx3box/jx3box-data/data/xf/xf.json";
import talent from "@jx3box/jx3box-talent";
// import Equip from "@jx3box/jx3box-editor/src/Equip.vue";
import pz from "@/components/pz.vue";

import RenderTalent from "@jx3box/jx3box-talent2/src/RenderTalent2.vue";
import Collection from "@jx3box/jx3box-common-ui/src/single/Collection.vue";
import Creators from "@jx3box/jx3box-common-ui/src/single/Creators.vue";

export default {
    name: "single",
    props: [],
    data: function () {
        return {
            loading: false,

            post: {},
            stat: {},
            lang: "cn",

            data: [],

            active: "0",
            talents: [],
        };
    },
    computed: {
        id: function () {
            return this.$store.state.id;
        },
        author_id: function () {
            return this.post?.post_author || 0;
        },
        xf: function () {
            return _.get(this.post, "post_subtype");
        },
        xficon_id: function () {
            return this.xf && xfmap[this.xf]?.id;
        },
        visible: function () {
            return this.post._check;
        },
        client: function () {
            return this.$store.state.client;
        },
        pz: function () {
            return this.post?.pz;
        },
        hasPz: function () {
            return this.post?.pz?.some((item) => {
                return !!item.id;
            });
        },
    },
    methods: {
        onCopy: function (val) {
            this.$notify({
                title: "复制成功",
                message: "复制内容 : " + val.text,
                type: "success",
            });
        },
        onError: function () {
            this.$notify.error({
                title: "复制失败",
                message: "请手动复制",
            });
        },
        getTalentSQ: function (talent) {
            if (talent) {
                try {
                    let _parsed = JSON.parse(talent);
                    return _parsed.sq;
                } catch (e) {
                    console.log(e);
                }
            } else {
                return "";
            }
        },
        getTalentTXT: function (i) {
            return this.talents[i];
        },
    },
    filters: {
        xficon: function (val) {
            return __imgPath + "image/xf/" + val + ".png";
        },
        iconURL: function (val) {
            return __iconPath + "icon/" + val + ".png";
        },
    },
    created: function () {
        if (this.id) {
            this.loading = true;
            getPost(this.id)
                .then((res) => {
                    this.post = this.$store.state.post = res.data.data;
                    this.data = this.post.post_meta && this.post.post_meta.data;
                    this.$store.state.client = this.post?.client;
                    this.$store.state.user_id = this.post.post_author;
                    document.title = this.post.post_title;
                })
                .then(() => {
                    if (this.data && this.data.length) {
                        if (this.client !== "origin") {
                            // 正式服
                            this.data.forEach((item, i) => {
                                let container = `#talent-box-${i}`;
                                let schema = item.talent;
                                if (schema) {
                                    try {
                                        schema = JSON.parse(schema);
                                        schema.container = container;

                                        let ins = new talent(schema);
                                        ins.then((t) => {
                                            this.talents.push(t.txt.toString());
                                        });
                                    } catch (e) {
                                        this.$notify.error({
                                            title: "错误",
                                            message: "奇穴编码解析失败",
                                            position: "bottom-right",
                                        });
                                    }
                                }
                            });
                        } else {
                        }
                    }
                })
                .finally(() => {
                    this.loading = false;
                });

            // let prefix = this.client == "origin" ? "origin" : "";
            getStat("macro", this.id).then((res) => {
                this.stat = res.data;
            });
            postStat("macro", this.id);
        }
    },
    components: {
        macro,
        singlebox,
        // Equip,
        RenderTalent,
        Collection,
        Creators,
        pz,
    },
};
</script>

<style lang="less">
@import "../assets/css/single.less";
@import "../assets/css/macro.less";
</style>
