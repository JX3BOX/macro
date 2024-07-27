<template>
    <app-layout slug="talent">
        <div class="m-talent">
            <div class="m-talent-header">
                <h1 class="m-talent-title">奇穴模拟器</h1>
                <div class="m-talent-panel">
                    <el-radio-group v-model="finalClient">
                        <el-radio-button label="std">旗舰</el-radio-button>
                        <el-radio-button label="wujie">无界</el-radio-button>
                    </el-radio-group>
                    <div class="m-talent-version">
                        <span class="u-label">选择版本</span>
                        <el-select
                            v-model="version"
                            placeholder="请选择游戏版本"
                            @change="reload"
                            popper-class="m-talent__pop"
                        >
                            <el-option
                                v-for="item in versions"
                                :key="item.version"
                                :label="item.name"
                                :value="item.version"
                            >
                                <div class="m-talent__option">
                                    <span class="u-label">{{ item.name }}</span>
                                    <span class="u-version">{{ item.version }}</span>
                                </div>
                            </el-option>
                        </el-select>
                    </div>
                    <div class="u-toolbar" v-if="isLogin">
                        <!-- <el-button plain @click="showList = false" icon="el-icon-refresh-left" size="small" v-if="showList">返回</el-button> -->
                        <!-- <el-button type="primary" @click="showList = true" icon="el-icon-setting" size="small" v-else>我的预设</el-button> -->
                        <el-button type="primary" @click="drawer = true" icon="el-icon-setting" size="small"
                            >我的预设</el-button
                        >
                    </div>
                </div>
            </div>
            <div class="m-talent-wrapper">
                <h2 class="m-talent-subtitle">选择心法</h2>
                <div class="m-talent-xf">
                    <el-radio v-for="(item, i) in xfMaps" v-model="xf" :label="item.name" :key="i" @change="reload">
                        <img class="u-pic" :src="xficon(item.id)" :alt="item.name" />
                        <span class="u-txt">{{ item.name }}</span>
                    </el-radio>
                </div>
                <h2 class="m-talent-subtitle">配置奇穴</h2>
                <div class="qx-container"></div>
                <h2 class="m-talent-subtitle">奇穴编码</h2>
                <div class="m-talent-code">
                    <el-input placeholder="粘贴编码亦可自动解析奇穴" v-model="code" @change="parseSchema">
                        <span slot="prepend" @click="copy(code)" class="u-copy">
                            <i class="el-icon-document-copy"></i>
                            点击复制
                        </span>
                    </el-input>
                </div>
                <div class="m-talent-code" v-if="isEditor">
                    <h2 class="m-talent-subtitle">配装编码</h2>
                    <el-input placeholder="配装器编码" v-model="pzcode">
                        <span slot="prepend" @click="copy(pzcode)" class="u-copy">
                            <i class="el-icon-document-copy"></i>
                            点击复制
                        </span>
                    </el-input>
                </div>
                <div class="m-talent-op" v-if="isLogin">
                    <el-button
                        type="primary"
                        :icon="currentSchema ? 'el-icon-check' : 'el-icon-document-add'"
                        @click="save"
                        >{{ currentSchema ? "保存" : "保存为预设" }}</el-button
                    >
                    <el-button
                        v-if="isEditing"
                        type="success"
                        icon="el-icon-document-add"
                        class="u-btn"
                        @click="saveAs"
                        plain
                        >另存为</el-button
                    >
                </div>
            </div>

            <talent-drawer v-if="isLogin" :drawer="drawer" @update-drawer="updateDrawer" @use="use"></talent-drawer>
        </div>
    </app-layout>
</template>

<script>
import xfmap from "@jx3box/jx3box-data/data/xf/xf.json";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import JX3_QIXUE from "@jx3box/jx3box-talent";
import $ from "jquery";
import schemas from "@/assets/data/schemas.json";
import cloneDeep from "lodash/cloneDeep";
import { getTalentVersions, addTalent, putTalent } from "@/service/talent.js";
import User from "@jx3box/jx3box-common/js/user";
import talentDrawer from "@/components/talent/talent_drawer.vue";
import { copy } from "@/utils/clipboard";
import AppLayout from "@/layout/AppLayout.vue";
export default {
    name: "Talent",
    props: [],
    data: function () {
        return {
            activeName: "common",
            xf: "其它",
            sq: "1,1,1,1,1,1,1,1,1,1,1,1",
            driver: "",
            code: "",
            pzcode: "",

            version: "",
            versions: [],
            schemas,

            isLogin: User.isLogin(),
            isEditor: false,
            showList: false,
            drawer: false,

            currentSchema: "",
            finalClient: "std",
        };
    },
    computed: {
        schema_group: function () {
            return schemas[this.xf];
        },
        mount: function () {
            return xfmap[this.xf]?.id;
        },
        params: function () {
            const { mount, version, code, pzcode, xf } = this;
            return {
                client: "std",
                type: "talent",
                mount,
                version,
                code: JSON.parse(code),
                pzcode: JSON.parse(pzcode),
                xf,
            };
        },
        xfMaps: function () {
            const xfMaps = cloneDeep(xfmap);
            delete xfMaps["山居剑意"];
            delete xfMaps["通用"];
            return xfMaps;
        },
        isEditing: function () {
            return !!this.currentSchema;
        },
    },
    methods: {
        updateDrawer: function (val) {
            this.drawer = val;
        },
        parseSchema: function () {
            this.driver.then((talent) => {
                // 为空不操作
                if (!this.code) return;

                let _schema = {};
                try {
                    _schema = JSON.parse(this.code);
                    talent.load(_schema);
                    this.$message({
                        message: "编码解析成功",
                        type: "success",
                    });
                } catch (e) {
                    this.$message.error("编码格式错误");
                }
            });
        },
        reload: function (schema) {
            this.currentSchema = "";
            this.driver.then((talent) => {
                talent.load({
                    version: this.version,
                    xf: this.xf,
                    sq: this.sq,
                    editable: true,
                    client: this.finalClient,
                });
            });
        },
        copy: function (val) {
            if (!val) return;
            copy(val, { success_message: "复制奇穴编码成功" });
        },

        // 预设方案
        save: function () {
            if (!this.mount) {
                this.$notify({
                    type: "warning",
                    title: "提醒",
                    message: "暂未选择心法，请先选择心法",
                });
                return;
            }

            if (this.isEditing) {
                putTalent(this.currentSchema.id, {
                    ...this.params,
                }).then(() => {
                    this.$notify({
                        type: "success",
                        title: "成功",
                        message: "修改成功",
                    });
                });
            } else {
                this.$prompt("请输入方案名称", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    inputErrorMessage: "输入不能为空",
                    inputValidator: (value) => {
                        // 点击按钮时，对文本框里面的值进行验证
                        if (!value) {
                            return "输入不能为空";
                        }
                    },
                }).then(({ value }) => {
                    addTalent({
                        ...this.params,
                        name: value,
                    }).then(() => {
                        this.$notify({
                            type: "success",
                            title: "成功",
                            message: "保存成功",
                        });
                    });
                });
            }
        },
        saveAs: function () {
            this.$prompt("方案另存为", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                inputErrorMessage: "输入不能为空",
                inputValue: this.currentSchema?.name,
                inputValidator: (value) => {
                    // 点击按钮时，对文本框里面的值进行验证
                    if (!value) {
                        return "输入不能为空";
                    }
                },
            }).then(({ value }) => {
                addTalent({
                    ...this.params,
                    name: value,
                }).then(() => {
                    this.$notify({
                        type: "success",
                        title: "成功",
                        message: "保存成功",
                    });
                });
            });
        },
        use: function (item) {
            this.code = JSON.stringify(item.code);
            this.pzcode = JSON.stringify(item.pzcode);

            const parseCode = JSON.parse(this.code);

            this.xf = parseCode.xf;

            this.currentSchema = item;

            this.parseSchema();
        },
        init: function () {
            getTalentVersions(this.finalClient).then((res) => {
                this.versions = res.data;
                this.version = this.versions && this.versions.length && this.versions[0]["version"];

                this.driver = new JX3_QIXUE({
                    version: this.version,
                    editable: true,
                    client: this.finalClient,
                });
                const vm = this;
                $(document).on("JX3_QIXUE_Change", function (e, ins) {
                    let __data = {};
                    __data.version = ins.version;
                    __data.xf = ins.xf;
                    __data.sq = ins.sq.join(",");
                    vm.code = JSON.stringify(ins.code);

                    vm.pzcode = JSON.stringify(ins.overview);
                });
            });
        },
        xficon: function (id) {
            return __imgPath + "image/xf/" + id + ".png";
        },
    },
    mounted: function () {
        this.init();
        this.isEditor = User.isEditor();
    },
    watch: {
        page: function () {
            this.isLogin && this.loadList();
        },
        finalClient: function (val) {
            this.pzcode = "";
            this.code = "";
            this.xf = "其它";
            if (val == "std") {
                this.sq = "1,1,1,1,1,1,1,1,1,1,1,1";
            }
            if (val == "wujie") {
                this.sq = "1,1,1,1";
            }
            this.init();
        },
    },
    components: {
        talentDrawer,
        AppLayout,
    },
};
</script>

<style lang="less">
@import "~@/assets/css/talent.less";
</style>
