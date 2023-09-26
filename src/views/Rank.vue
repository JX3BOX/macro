<template>
    <div class="v-rank" v-loading="loading">
        <div class="m-macro-rank-full m-macro-rank" v-if="!!subtype">
            <el-table
                :data="mount_data"
                :default-sort="{ prop: 'value.7days', order: 'descending' }"
                :row-class-name="highlight"
                :fit="true"
                key="mounttable"
                border
                stripe
            >
                <el-table-column type="index" label="" width="40">
                    <template slot-scope="scope">
                        <span class="u-order">{{ scope.$index + 1 }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="downloadStr" label="云端宏" sortable>
                    <template slot-scope="scope">
                        <div class="u-cell-feed">
                            <img class="u-icon-xf" :src="xficon(scope.row.xf)" />
                            <a
                                class="u-feed"
                                :href="getMacroLink(scope.row.pid, scope.row.item_version)"
                                target="_blank"
                                v-reporter="{
                                    data: {
                                        href: `${prefix}:` + getMacroLink(scope.row.pid, scope.row.item_version),
                                    },
                                    caller: 'macro_rank',
                                }"
                            >
                                {{ scope.row.author }}#{{ scope.row.item_version }}
                            </a>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="value.7days" label="7天" sortable width="100">
                    <template slot-scope="scope">{{ scope.row.value["7days"] }}</template>
                </el-table-column>
                <el-table-column prop="value.30days" label="30天" sortable width="100">
                    <template slot-scope="scope">{{ scope.row.value["30days"] }}</template>
                </el-table-column>
                <el-table-column prop="value.yesterday" label="昨日" sortable width="100">
                    <template slot-scope="scope">{{ scope.row.value["yesterday"] }}</template>
                </el-table-column>
                <el-table-column prop="value.before2" label="前日" sortable width="100">
                    <template slot-scope="scope">{{ scope.row.value["before2"] }}</template>
                </el-table-column>
                <el-table-column prop="trending" label="趋势" :formatter="trending" width="100">
                    <template slot-scope="scope">
                        <i class="el-icon-top u-trending" v-if="trending(scope.row) > 0">
                            {{ (trending(scope.row) * 100).toFixed(2) + "%" }}
                        </i>
                        <i class="el-icon-bottom u-trending" v-if="trending(scope.row) < 0">
                            {{ (trending(scope.row) * 100).toFixed(2) + "%" }}
                        </i>
                        <span class="u-trending u-trending-keep" v-if="trending(scope.row) == 0">-</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="m-macro-rank-full m-macro-rank" v-else>
            <el-table
                :data="data"
                :default-sort="{ prop: '7days', order: 'descending' }"
                :row-class-name="highlight"
                key="alltable"
                border
                stripe
            >
                <el-table-column type="index" label="" width="40">
                    <template slot-scope="scope">
                        <span class="u-order">{{ scope.$index + 1 }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="downloadStr" label="云端宏" sortable>
                    <template slot-scope="scope">
                        <img class="u-icon-xf" v-if="scope.row" :src="xficon(scope.row.xf)" />
                        <a
                            class="u-feed"
                            :href="getMacroLink(scope.row.pid, scope.row.downloadStr.split('#')[1])"
                            target="_blank"
                            v-reporter="{
                                data: {
                                    href: `${prefix}:` +  getMacroLink(scope.row.pid, scope.row.downloadStr.split('#')[1]),
                                },
                                caller: 'macro_rank',
                            }"
                            >{{ scope.row.downloadStr }}</a
                        >
                    </template>
                </el-table-column>
                <el-table-column prop="7days" label="7天" sortable width="100"></el-table-column>
                <el-table-column prop="30days" label="30天" sortable width="100"></el-table-column>
                <el-table-column prop="yesterday" label="昨日" sortable width="100"></el-table-column>
                <el-table-column prop="before2" label="前日" sortable width="100"></el-table-column>
                <el-table-column prop="trending" label="趋势" :formatter="trending" width="100">
                    <template slot-scope="scope">
                        <i class="el-icon-top u-trending" v-if="trending(scope.row) > 0">
                            {{ (trending(scope.row) * 100).toFixed(2) + "%" }}
                        </i>
                        <i class="el-icon-bottom u-trending" v-if="trending(scope.row) < 0">
                            {{ (trending(scope.row) * 100).toFixed(2) + "%" }}
                        </i>
                        <span class="u-trending u-trending-keep" v-if="trending(scope.row) == 0">-</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import { getRank, getOverview } from "../service/rank";
import xfmap from "@jx3box/jx3box-data/data/xf/xf.json";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import { getLink } from "@jx3box/jx3box-common/js/utils";
import { getMacroLink } from "@/utils/misc.js";
export default {
    name: "Rank",
    props: [],
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
        //     return this.subtype ? xfmap[this.subtype]["id"] : 0;
        // },
        client: function () {
            return this.$store.state.client;
        },
        prefix: function (){
            return this.client == 'std' ? 'www' : 'origin'
        }
    },
    methods: {
        getMacroLink,
        trending: function (row, column) {
            let trending = "";
            if (this.kungfuid) {
                trending = (row.value.yesterday - row.value.before2) / row.value.yesterday;
            } else {
                trending = (row.yesterday - row.before2) / row.yesterday;
            }
            if (!isFinite(trending)) trending = 0;
            return isNaN(trending) ? "N/A" : trending.toFixed(4);
        },
        fixnull: function (data) {
            let _data = [];
            data.forEach((item) => {
                if (item["7days"] && item.pid) {
                    _data.push(item);
                }
            });
            return _data;
        },
        postLink: function (val) {
            return getLink("macro", val);
        },
        loadRank: function () {
            this.loading = true;
            getRank(this.subtype, this.client)
                .then((data) => {
                    this.mount_data = data.filter((item) => item.xf);
                    this.$forceUpdate();
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        loadOverview: function () {
            this.loading = true;
            getOverview(this.client)
                .then((data) => {
                    this.data = this.fixnull(data);
                    this.$forceUpdate();
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        highlight({ row, rowIndex }) {
            if (rowIndex < 3) {
                return "t1";
            } else if (rowIndex >= 3 && rowIndex < 10) {
                return "t2";
            } else if (rowIndex >= 10 && rowIndex < 20) {
                return "t3";
            }
            return "";
        },
        xficon: function (id) {
            const xf = xfmap[id];
            return __imgPath + "image/xf/" + xf.id + ".png";
        },
    },
    watch: {
        subtype: {
            immediate: true,
            handler: function () {
                this.subtype ? this.loadRank() : this.loadOverview();
            },
        },
    },
};
</script>

<style lang="less">
@import "../assets/css/rank.less";
</style>
