<template>
    <div class="m-index-rec">
        <h5 class="u-title"><span>当前版本编辑推荐</span></h5>
        <div class="u-ac" v-html="ac"></div>
        <el-row>
            <el-col :span="6" v-for="(item,i) in data" :key="i">
                <div class="u-rec">
                    <a :href="item.link" target="_blank" :style="item.color | highLight">
                        <img :src="item.icon | iconLink" v-if="item.icon"/>
                        {{item.label}}
                    </a>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { getMenuGroup,getBread } from "@/service/helper.js";
import { iconLink } from "@jx3box/jx3box-common/js/utils";
const empty_item = {
    color: "",
    label: "",
    link: "",
    icon: "",
};
export default {
    name: "rec_table",
    props: [],
    components: {},
    data: function () {
        return {
            data: [],
            ac : ''
        };
    },
    computed: {
        client : function (){
            return this.$store.state.client
        }
    },
    methods: {},
    filters: {
        highLight: function (val) {
            if (val) {
                return "color:" + val + ";font-weight:bold;";
            }
            return "";
        },
        iconLink,
    },
    created: function () {},
    mounted: function () {
        let suffix = this.client == 'origin' ? '-origin' : ''
        getMenuGroup("macro-rec" + suffix).then((res) => {
            this.data = res.data.data.menu_group.menus || [];

            let _fix = this.data.length % 4;
            if (_fix) {
                for (let i = 0; i < 4 - _fix; i++) {
                    this.data.push(empty_item);
                }
            }
        });
        getBread('macro-ac' + suffix).then((res) => {
            this.ac = res.data.data.breadcrumb.html
        })
    },
};
</script>

<style lang="less">
@import "../assets/css/rec_table.less";
</style>