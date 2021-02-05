<template>
    <div class="m-macro-rank-mini m-macro-rank">
        <h3 class="c-sidebar-right-title">
            <img
                class="u-icon"
                svg-inline
                src="../assets/img/side/rank.svg"
            />排行榜
            <span class="u-more" @click="viewRank">查看更多 &raquo;</span>
        </h3>
        <ul class="u-list" v-if="kungfuid">
            <li v-for="(item, j) in mount_data" :key="j">
                <a class="u-link" :href="item.pid | postLink">
                    <span class="u-order" :class="highlight(j)">{{
                        j + 1
                    }}</span>
                    <span class="u-name">{{ item.author }}#{{ item.item_version }}</span>
                    <span class="u-per">
                        <em class="u-count">+ {{ item.value["7days"] }}</em>
                    </span>
                </a>
            </li>
        </ul>
        <ul class="u-list" v-else>
            <li v-for="(item, j) in data" :key="j">
                <a class="u-link" :href="item.pid | postLink">
                    <span class="u-order" :class="highlight(j)">{{
                        j + 1
                    }}</span>
                    <span class="u-name">{{ item.author }}#{{ item.v }}</span>
                    <span class="u-per">
                        <em class="u-count">+ {{ item["7days"] }}</em>
                    </span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import { getOverview, getRank } from "../service/rank";
import xfmap from "@jx3box/jx3box-data/data/xf/xf.json";
import { getLink } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "rank",
    data: function() {
        return {
            data: [],
            mount_data : []
        };
    },
    computed: {
        subtype: function() {
            return this.$store.state.subtype || "";
        },
        kungfuid: function() {
            return this.subtype ? xfmap[this.subtype]["id"] : 0;
        },
    },
    methods: {
        viewRank: function() {
            this.$router.push({ name: "rank" });
        },
        highlight: function(i) {
            if (i == 0) {
                return "t1";
            } else if (i == 1) {
                return "t2";
            } else if (i == 2) {
                return "t3";
            }
        },
    },
    filters: {
        postLink: function(pid) {
            return getLink("macro", pid);
        },
    },
    mounted: function() {
        if (this.subtype) {
            getRank(this.kungfuid, 10).then((data) => {
                this.mount_data = data.slice(0, 10);
            });
        } else {
            getOverview(10).then((data) => {
                this.data = data.slice(0, 10);
            });
        }
    },
    components: {},
};
</script>

<style lang="less">
@import "../assets/css/rank.less";
</style>
