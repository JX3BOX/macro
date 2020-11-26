<template>
    <singlebox :post="post" :author="author" :stat="stat" v-loading="loading">
        <template slot="single-header">
            <div class="u-meta u-sub-block">
                <em class="u-label">心法</em>
                <span class="u-value">
                    <img
                        class="u-icon-xf"
                        :src="xficon_id | xficon"
                        :alt="xf"
                    />
                    {{ xf }}
                </span>
            </div>
            <div class="u-meta u-sub-block">
                <em class="u-label">资料片</em>
                <span class="u-value">
                    {{ formatMeta("zlp") }}
                </span>
            </div>
        </template>
        <!-- 宏内容 -->
        <div class="m-single-macro">
            <el-tabs v-model="active" type="card" @tab-click="changeTab">
                <el-tab-pane v-for="(item, i) in data" :key="i" :name="i + ''">
                    <!-- tab -->
                    <span class="u-label" slot="label">
                        <img class="u-icon" :src="item.icon | iconURL" />
                        <b>{{ item.name }}</b>
                    </span>
                    <!-- 宏 -->
                    <el-divider content-position="left" v-if="item.macro"
                        >宏</el-divider
                    >
                    <div class="u-usage" v-if="item.desc">{{ item.desc }}</div>
                    <div
                        class="u-macro macro-box"
                        :class="{ withUsage: item.desc }"
                        v-if="item.macro"
                    >
                        <macro :ctx="item.macro" :lang="lang" :name="author.name + '#' + item.name"/>
                    </div>
                    <!-- 奇穴 -->
                    <el-divider content-position="left" v-if="item.talent"
                        >奇穴</el-divider
                    >
                    <div
                        class="u-talent talent-box"
                        :id="`talent-box-${i}`"
                    ></div>
                    <div class="u-panel u-talent-panel" v-if="item.talent">
                        <el-button
                            icon="el-icon-s-tools"
                            plain
                            size="mini"
                            v-clipboard:copy="item.talent"
                            v-clipboard:success="onCopy"
                            v-clipboard:error="onError"
                            >复制奇穴编码</el-button
                        >
                        <el-button
                            icon="el-icon-document-copy"
                            plain
                            size="mini"
                            v-clipboard:copy="getTalentTXT(i)"
                            v-clipboard:success="onCopy"
                            v-clipboard:error="onError"
                            >复制奇穴文字</el-button
                        >
                        <el-button
                            icon="el-icon-scissors"
                            plain
                            size="mini"
                            v-clipboard:copy="getTalentSQ(item.talent)"
                            v-clipboard:success="onCopy"
                            v-clipboard:error="onError"
                            >复制奇穴序列</el-button
                        >
                    </div>
                    <!-- 配装 -->
                    <el-divider content-position="left" v-if="item.equip && item.equip_type">配装方案</el-divider>
                    <div class="u-equipbox">
                        <Equip :id="item.equip" v-if="item.equip_type == 'jx3box'"/>
                    </div>
                    <!-- 急速 -->
                    <el-divider content-position="left" v-if="item.speed"
                        >推荐急速</el-divider
                    >
                    <div class="u-speed" v-if="item.speed">
                        {{ item.speed }}
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </singlebox>
</template>

<script>
import {__ossRoot,__ossMirror,__iconPath,__imgPath} from '@jx3box/jx3box-common/js/jx3box.json'
import singlebox from "@jx3box/jx3box-page/src/cms-single";
import { getPost } from "../service/post.js";
import { getStat, postStat } from "../service/stat.js";
// 子模块
import macro from "@/components/macro.vue";
import xfmap from "@jx3box/jx3box-data/data/xf/xf.json";
import talent from "@jx3box/jx3box-talent";
import Equip from '@jx3box/jx3box-editor/src/Equip.vue'

export default {
    name: "single",
    props: [],
    data: function() {
        return {
            loading: false,

            post: {},
            stat: {},
            meta: {},
            author: {},
            lang : 'cn',

            data: [],

            active: "0",
            talents: [],
        };
    },
    computed: {
        id: function() {
            return this.$store.state.pid;
        },
        xf: function() {
            return _.get(this.post, "post_subtype");
        },
        xficon_id: function() {
            return this.xf && xfmap[this.xf]["id"];
        },
    },
    methods: {
        formatMeta: function(key) {
            let val = _.get(this.meta, key);
            if (Array.isArray(val)) {
                return val.toString();
            } else {
                return val;
            }
        },
        changeTab: function() {},
        onCopy: function(val) {
            this.$notify({
                title: "复制成功",
                message: "复制内容 : " + val.text,
                type: "success",
            });
        },
        onError: function() {
            this.$notify.error({
                title: "复制失败",
                message: "请手动复制",
            });
        },
        getTalentSQ: function(talent) {
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
        getTalentTXT: function(i) {
            return this.talents[i];
        },
    },
    filters: {
        xficon: function(val) {
            return __imgPath + "image/xf/" + val + ".png";
        },
        iconURL: function(val) {
            return __iconPath + "icon/" + val + ".png";
        },
    },
    created: function() {
        if (this.id) {
            this.loading = true;
            getPost(this.id, this)
                .then((res) => {
                    this.post = this.$store.state.post = res.data.data.post;
                    this.meta = this.$store.state.meta =
                        res.data.data.post.post_meta;
                    this.author = this.$store.state.author =
                        res.data.data.author;
                    this.data = (this.meta && this.meta.data) || [];
                    this.lang = this.meta && this.meta.lang
                    this.$store.state.status = true;
                })
                .then(() => {
                    if (this.data.length) {
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
                    }
                })
                .finally(() => {
                    this.loading = false;
                });

            getStat(this.id).then((data) => {
                if (data) this.stat = this.$store.state.stat = data;
            });
            postStat(this.id);
        }
    },
    components: {
        macro,
        singlebox,
        Equip
    },
};
</script>

<style lang="less">
@import "../assets/css/single.less";
@import "../assets/css/macro.less";
</style>
