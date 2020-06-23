<template>
    <div class="v-rank" v-loading="loading">
        <div class="m-macro-rank-full m-macro-rank">
            <el-table
                :data="data"
                :default-sort="{ prop: '7days', order: 'descending' }"
                :row-class-name="highlight"
            >
                <el-table-column type="index" label="👑" width="48">
                </el-table-column>
                <el-table-column
                    prop="downloadStr"
                    label="云端宏"
                    sortable
                >
                    <template slot-scope="scope">
                        <img class="u-icon-xf" :src="scope.row.xf | xficon">
                        <a class="u-feed"
                            :href="postLink(scope.row.pid)" target="_blank"
                            >{{scope.row.downloadStr}}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="7days" label="7天" sortable>
                </el-table-column>
                <el-table-column prop="30days" label="30天" sortable >
                </el-table-column>
                <el-table-column prop="yesterday" label="昨日" sortable >
                </el-table-column>
                <el-table-column prop="before2" label="前日" sortable >
                </el-table-column>
                <el-table-column
                    prop="trending"
                    label="趋势"
                    :formatter="trending"
                >
                    <template slot-scope="scope">
                        <i
                            class="el-icon-top u-trending"
                            v-if="trending(scope.row) > 0"
                            >{{
                                (trending(scope.row) * 100).toFixed(2) + "%"
                            }}</i
                        >
                        <i
                            class="el-icon-bottom u-trending"
                            v-if="trending(scope.row) < 0"
                            >{{
                                (trending(scope.row) * 100).toFixed(2) + "%"
                            }}</i
                        >
                        <span
                            class="u-trending u-trending-keep"
                            v-if="trending(scope.row) == 0"
                            >-</span
                        >
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="view" label="详情" width="120">
                    <template slot-scope="scope">
                        <a
                            :href="postLink(scope.row.pid)"
                            class="el-button el-button--default is-plain el-button--mini"
                            >查看详情<i class="el-icon-arrow-right"></i
                        ></a>
                    </template>
                </el-table-column> -->
            </el-table>
        </div>
        <el-alert
            class="m-rank-tips"
            v-if="!kungfuid"
            title="可在侧边栏指定心法以查看对应心法排名"
            type="info"
            show-icon
        >
        </el-alert>
    </div>
</template>

<script>
import { getRank, getOverview } from "../service/rank";
import xfmap from "@jx3box/jx3box-data/data/xf/xf.json";
import {__ossMirror,__imgPath} from '@jx3box/jx3box-common/js/jx3box.json'
export default {
    name: "Rank",
    props: [],
    data: function() {
        return {
            data: [],
            loading: false,
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
        trending: function(row, column) {
            // let trending_1 = (row.before3 - row.before2) / row.before2;
            let trending = (row.before2 - row.yesterday) / row.yesterday;
            // let average = (trending_1 + trending_2) / 2;
            return isNaN(trending) ? "N/A" : trending.toFixed(4);
        },
        fixnull : function (data){
            let _data = [];
            data.forEach((item) => {
                if (item["7days"]) {
                    _data.push(item);
                }
            });
            return _data;
        },
        postLink: function(val) {
            return "./?pid=" + val;
        },
        loadRank: function() {
            this.loading = true;
            getRank(this.kungfuid)
                .then((data) => {
                    this.data = this.fixnull(data);
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        loadOverview: function() {
            this.loading = true;
            getOverview()
                .then((data) => {
                    this.data = this.fixnull(data);
                })
                .catch((err) => {
                    console.log(err);
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
    filters : {
        xficon : function (id){
            return __imgPath + 'image/xf/' + id + '.png'
        }
    },
    created: function() {
        this.kungfuid ? this.loadRank() : this.loadOverview();
    },
    components: {},
};
</script>

<style lang="less">
@import "../assets/css/rank.less";
</style>
