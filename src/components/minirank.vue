<template>
    <div class="m-macro-rank-mini m-macro-rank">
        <h3 class="c-sidebar-right-title">
            <img class="u-icon" svg-inline src="../assets/img/side/rank.svg" />排行榜
            <span class="u-more" @click="viewRank">查看更多 &raquo;</span>
        </h3>
        <ul class="u-list">
            <li v-for="(item, j) in data" :key="j">
                <a class="u-link" :href="item.pid | postLink">
                <span class="u-order">{{ j + 1 }}</span>
                <span class="u-name"
                    >{{ item.author
                    }}#{{ item.v }}</span
                >
                <span class="u-per">
                    <em class="u-count">+ {{item["7days"]}}</em>
                    <!-- <i
                        class="el-icon-top u-trending"
                        v-if="trending(item) > 0"
                        >{{ (trending(item) * 100).toFixed(2) + "%" }}</i
                    >
                    <i
                        class="el-icon-bottom u-trending"
                        v-if="trending(item) < 0"
                        >{{ (trending(item) * 100).toFixed(2) + "%" }}</i
                    >
                    <span
                        class="u-trending u-trending-keep"
                        v-if="trending(item) == 0"
                        >-</span
                    > -->
                </span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import { getOverview} from "../service/rank";
export default {
    name: "rank",
    data: function() {
        return {
            data: [],
        };
    },
    computed: {},
    methods: {
        viewRank : function (){
            this.$router.push({ name: 'rank' });
        }
    },
    filters : {
        postLink : function (pid){
            return '/macro?pid=' + pid
        }
    },
    mounted: function() {
        getOverview(10).then((data) => {
            this.data = data.slice(0,10);
        });
    },
    components: {},
};
</script>

<style lang="less">
@import "../assets/css/rank.less";
</style>
