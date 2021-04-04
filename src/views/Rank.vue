<template>
    <div class="v-rank" v-loading="loading">
        <div class="m-macro-rank-full m-macro-rank" v-if="!!subtype">
            <el-table
                :data="mount_data"
                :default-sort="{ prop: 'value.7days', order: 'descending' }"
                :row-class-name="highlight"
                :fit="true"
                key="mounttable"
            >
                <el-table-column type="index" label="👑" width="48"></el-table-column>
                <el-table-column prop="downloadStr" label="云端宏" sortable>
                    <template slot-scope="scope">
                        <div class="u-cell-feed">
                            <img class="u-icon-xf" :src="kungfuid | xficon" />
                            <a class="u-feed" :href="postLink(scope.row.pid)" target="_blank">
                                {{ scope.row.author }}#{{
                                scope.row.item_version
                                }}
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
                            {{
                            (trending(scope.row) * 100).toFixed(2) + "%"
                            }}
                        </i>
                        <i class="el-icon-bottom u-trending" v-if="trending(scope.row) < 0">
                            {{
                            (trending(scope.row) * 100).toFixed(2) + "%"
                            }}
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
            >
                <el-table-column type="index" label="👑" width="48"></el-table-column>
                <el-table-column prop="downloadStr" label="云端宏" sortable>
                    <template slot-scope="scope">
                        <img class="u-icon-xf" :src="scope.row.xf | xficon" />
                        <a
                            class="u-feed"
                            :href="postLink(scope.row.pid)"
                            target="_blank"
                        >{{ scope.row.downloadStr }}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="7days" label="7天" sortable width="100"></el-table-column>
                <el-table-column prop="30days" label="30天" sortable width="100"></el-table-column>
                <el-table-column prop="yesterday" label="昨日" sortable width="100"></el-table-column>
                <el-table-column prop="before2" label="前日" sortable width="100"></el-table-column>
                <el-table-column prop="trending" label="趋势" :formatter="trending" width="100">
                    <template slot-scope="scope">
                        <i class="el-icon-top u-trending" v-if="trending(scope.row) > 0">
                            {{
                            (trending(scope.row) * 100).toFixed(2) + "%"
                            }}
                        </i>
                        <i class="el-icon-bottom u-trending" v-if="trending(scope.row) < 0">
                            {{
                            (trending(scope.row) * 100).toFixed(2) + "%"
                            }}
                        </i>
                        <span class="u-trending u-trending-keep" v-if="trending(scope.row) == 0">-</span>
                    </template>
                </el-table-column>
            </el-table>
            <el-alert class="m-rank-tips" title="可在侧边栏指定心法以查看对应心法排名" type="warning" show-icon></el-alert>
        </div>
    </div>
</template>

<script>
import { getRank, getOverview } from "../service/rank";
import xfmap from "@jx3box/jx3box-data/data/xf/xf.json";
import {
    __ossMirror,
    __imgPath,
    __ossRoot,
} from "@jx3box/jx3box-common/data/jx3box.json";
import { getLink } from "@jx3box/jx3box-common/js/utils";
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
        kungfuid: function () {
            return this.subtype ? xfmap[this.subtype]["id"] : 0;
        },
    },
    methods: {
        trending: function (row, column) {
            let trending = "";
            if (this.kungfuid) {
                trending =
                    (row.value.before2 - row.value.yesterday) /
                    row.value.yesterday;
            } else {
                trending = (row.before2 - row.yesterday) / row.yesterday;
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
            getRank(this.kungfuid)
                .then((data) => {
                    this.mount_data = data;
                    this.$forceUpdate()
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        loadOverview: function () {
            this.loading = true;
            getOverview()
                .then((data) => {
                    this.data = this.fixnull(data);
                    this.$forceUpdate()
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
    },
    filters: {
        xficon: function (id) {
            return __imgPath + "image/xf/" + id + ".png";
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
    mounted: function () {},
    components: {},
};
</script>

<style lang="less">
@import "../assets/css/rank.less";
</style>
