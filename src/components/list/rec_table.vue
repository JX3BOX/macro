<template>
    <div class="m-index-rec">
        <h5 class="u-title">
            <span><i class="el-icon-star-off"></i>当前版本编辑推荐</span>
        </h5>
        <div class="u-ac" v-html="ac"></div>
        <el-row>
            <el-col :span="6" v-for="(item, i) in data" :key="i">
                <div class="u-rec">
                    <a
                        :href="item.link"
                        target="_blank"
                        :style="highLight(item.color)"
                        v-reporter="{
                            data: {
                                href: macroLink(item.link),
                            },
                            caller: 'macro_suggest',
                        }"
                    >
                        <img :src="iconLink(item.icon)" v-if="item.icon" onerror="this.src='https://img.jx3box.com/image/xf/0.png'"/>
                        {{ item.label }}
                    </a>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { getMenuGroup, getBread } from "@/service/helper.js";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
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
            ac: "",
        };
    },
    computed: {
        client: function () {
            return this.$store.state.client;
        },
    },
    methods: {
        macroLink(link) {
            const prefix = this.client == 'std' ? 'www' : 'origin';
            return `${prefix}:${link}`
        },
        init: function () {
            let suffix = this.client == "origin" ? "-origin" : "";
            getMenuGroup("macro-rec" + suffix).then((res) => {
                this.data = res.data.data.menus || [];

                let _fix = this.data.length % 4;
                if (_fix) {
                    for (let i = 0; i < 4 - _fix; i++) {
                        this.data.push(empty_item);
                    }
                }
            });
            getBread("macro-ac" + suffix).then((res) => {
                this.ac = res.data.data.html;
            });
        },
        highLight: function (val) {
            if (val) {
                return "color:" + val + ";font-weight:bold;";
            }
            return "";
        },
        iconLink: function (val) {
            return __imgPath + "image/xf/" + val + ".png";
        },
    },
    watch: {
        client: {
            immediate: true,
            handler: function () {
                this.init();
            },
        },
    },
};
</script>

<style lang="less">
.m-index-rec {
    @border: #dfe6f7;

    background-color: #fafbfc;
    border: 1px solid @border;
    border-bottom: none;
    .r(4px);

    .u-title {
        margin: 0;
        .x;
        .fz(12px, 2.5);
        border-bottom: 1px solid @border;
        span {
            color: #fff;
            background-color: #6f42c1;
            font-weight: normal;
            padding: 2px 5px;
            .r(2px);
        }
    }
    .u-ac {
        border-bottom: 1px solid @border;
        padding: 10px;
        .fz(12px,2);
        .x;
        white-space: pre-wrap;
    }
    .u-rec {
        img {
            .size(20px);
            .y;
        }
        // border:1px solid @border;
        border-right: 1px solid @border;
        border-bottom: 1px solid @border;
        a {
            .nobreak;
            .db;
            .fz(12px, 20px);
            padding: 8px 10px;
            &:hover {
                .bold;
                color: @pink;
                background-color: #fff;
            }
            .h(20px);
        }
    }
    .el-col:nth-child(4n) {
        .u-rec {
            border-right: 0;
        }
        // .ml(-1px);
        // .mt(-1px);
    }
}
@media screen and (max-width: @phone) {
    .m-index-rec .el-col {
        .w(50%);
    }
    .m-index-rec .el-col:nth-child(2n) .u-rec {
        border-right: none;
    }
}
</style>
