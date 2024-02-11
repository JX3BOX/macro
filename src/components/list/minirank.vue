<template>
    <div class="m-macro-rank-mini m-macro-rank" v-loading="loading">
        <h3 class="m-side-title">
            <div class="u-title"><img class="u-icon" svg-inline src="@/assets/img/side/rank.svg" />排行榜</div>
            <span class="u-more" @click="viewRank">查看更多<i class="el-icon-d-arrow-right"></i></span>
        </h3>
        <ul class="u-list" v-if="subtype">
            <li v-for="(item, j) in mount_data" :key="j">
                <a
                    class="u-link"
                    :href="getMacroLink(item.pid, item.item_version)"
                    v-reporter="{
                        data: {
                            href: macroLink(getMacroLink(item.pid, item.item_version)),
                        },
                        caller: 'macro_rank_top',
                    }"
                >
                    <span class="u-order" :class="highlight(j)">{{ j + 1 }}</span>
                    <span class="u-name">{{ item.author }}#{{ item.item_version }}</span>
                    <span class="u-per">
                        <em class="u-count"><i class="el-icon-sunny"></i> {{ item.value["7days"] }}</em>
                    </span>
                </a>
            </li>
        </ul>
        <ul class="u-list" v-else>
            <li v-for="(item, j) in data" :key="j" :title="`${item.author}#${item.v}`">
                <a
                    class="u-link"
                    :href="getMacroLink(item.pid, item.v)"
                    v-reporter="{
                        data: {
                            href: macroLink(getMacroLink(item.pid, item.v)),
                            item_type: item.xf
                        },
                        caller: 'macro_rank_top',
                    }"
                >
                    <span class="u-order" :class="highlight(j)">{{ j + 1 }}</span>
                    <span class="u-name">{{ item.author }}#{{ item.v }}</span>
                    <span class="u-per">
                        <em class="u-count"><i class="el-icon-sunny"></i> {{ item["7days"] }}</em>
                    </span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import { getOverview, getRank } from "../../service/rank";
import xfmap from "@jx3box/jx3box-data/data/xf/xf.json";
import { getLink } from "@jx3box/jx3box-common/js/utils";
import { getMacroLink } from "@/utils/misc.js";
export default {
    name: "rank",
    data: function () {
        return {
            data: [],
            mount_data: [],
            loading: false,
        };
    },
    computed: {
        subtype: function () {
            return this.$route.query.subtype || "";
        },
        // kungfuid: function () {
        //     return this.subtype ? xfmap[this.subtype]["id"] : -1;
        // },
        client: function () {
            return this.$store.state.client;
        },
    },
    methods: {
        viewRank: function () {
            this.$router.push({ name: "rank" });
        },
        highlight: function (i) {
            if (i == 0) {
                return "t1";
            } else if (i == 1) {
                return "t2";
            } else if (i == 2) {
                return "t3";
            }
        },
        getMacroLink,
        macroLink(link) {
            const prefix = this.client == 'std' ? 'www' : 'origin';
            return `${prefix}:${link}`
        },
    },
    watch: {
        subtype: {
            immediate: true,
            handler: function (subtype) {
                this.loading = true;
                if (subtype) {
                    getRank(this.subtype, this.client, 10)
                        .then((data) => {
                            this.mount_data = data.slice(0, 10);
                        })
                        .finally(() => {
                            this.loading = false;
                        });
                } else {
                    getOverview(this.client, 10)
                        .then((data) => {
                            this.data = data.slice(0, 10);
                        })
                        .finally(() => {
                            this.loading = false;
                        });
                }
            },
        },
    },
    mounted: function () {},
    components: {},
};
</script>

<style lang="less">
@import "~@/assets/css/rank.less";
</style>
