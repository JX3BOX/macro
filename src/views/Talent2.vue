<template>
    <app-layout slug="talent2">
        <div class="m-talent m-talent2">
            <div class="m-talent-header">
                <h1 class="m-talent-title">镇派模拟器</h1>
                <div class="m-talent-panel">
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
                        <el-button type="primary" @click="drawer = true" icon="el-icon-setting" size="small"
                            >我的预设</el-button
                        >
                    </div>
                </div>
            </div>
            <div class="m-talent-wrapper">
                <h2 class="m-talent-subtitle">选择心法</h2>
                <div class="m-talent-xf">
                    <el-radio
                        v-for="(item, i) in xfMaps"
                        v-model="xf"
                        :label="item.name"
                        :key="i"
                        @change="reload"
                        v-show="isOrigin(item)"
                    >
                        <img class="u-pic" :src="xficon(item.id)" :alt="item.name" />
                        <span class="u-txt">{{ item.name }}</span>
                    </el-radio>
                </div>
                <h2 class="m-talent-subtitle">配置镇派</h2>
                <div class="m-talent2-box">
                    <div class="m-talent2-main-title">镇派经脉模拟器</div>
                    <template v-if="xf">
                        <div
                            class="m-talent2-surplus"
                            :class="[total - totalCount > 0 ? '' : 'm-talent2-surplus-empty']"
                        >
                            剩余点数 :
                            <span>{{ surplus }}</span>
                        </div>
                        <div class="m-talent2-main">
                            <!-- LEFT -->
                            <div class="m-talent2-left">
                                <div
                                    class="m-talent2-content"
                                    :style="{
                                        'background-image': xf ? `url(${talentBg('left', 1)})` : '',
                                    }"
                                    :class="{ 'is-single': isSingle }"
                                >
                                    <div class="m-talent2-title">
                                        <img class="m-talent2-xf-icon" :src="xficon(xfContent[0])" />
                                        <span class="m-talent2-title-count">{{ lCount }}</span>
                                        <span class="m-talent2-title-name">{{ l_name }}</span>
                                    </div>
                                    <div
                                        class="m-talent2-content-row"
                                        v-for="(row, index) in talentContent.left"
                                        :key="'l' + index"
                                    >
                                        <template v-for="(item, i) in row">
                                            <div
                                                v-if="item"
                                                :key="i"
                                                class="m-talent2-content-item"
                                                :class="[
                                                    {
                                                        'm-talent2-content-item-skill': item.type === 'skill',
                                                    },
                                                    canOperate(index, 'left') ? '' : 'm-talent2-content-item-disabled',
                                                    item.pretab ? 'm-talent2-pretab' : '',
                                                    isMutex(item, index, i, 'left')
                                                        ? 'm-talent2-content-item-disabled'
                                                        : '',
                                                ]"
                                                @mouseover="item && $set(item, 'on', true)"
                                                @mouseleave="item && $set(item, 'on', false)"
                                            >
                                                <div
                                                    @click="leftTalentAdd(item, index, i)"
                                                    @click.right.prevent="leftTalentDecrease(index, i, item)"
                                                    :class="[
                                                        !canLeftItemOperate(index, i)
                                                            ? item && item.type === 'skill'
                                                                ? 'm-talent2-skill-unselected'
                                                                : 'm-talent2-unselected'
                                                            : 'm-talent2-selected',
                                                        item && item.type === 'skill' ? '' : 'm-talent2-talent',
                                                        !surplus && item && !Number(l_data[index][i])
                                                            ? item.type === 'skill'
                                                                ? 'm-talent2-skill-unselected'
                                                                : 'm-talent2-unselected'
                                                            : '',
                                                        isMutex(item, index, i, 'left') && item
                                                            ? item.type === 'skill'
                                                                ? 'm-talent2-skill-unselected'
                                                                : 'm-talent2-unselected'
                                                            : '',
                                                    ]"
                                                >
                                                    <!-- HAS PARENT -->
                                                    <span
                                                        v-if="
                                                            item.pretab &&
                                                            item.pretab > isLeftParentAdd(index, i) &&
                                                            canLeftItemOperate(index, i)
                                                        "
                                                        :class="
                                                            item && item.type === 'skill' ? 'is-add-skill' : 'is-add'
                                                        "
                                                    ></span>
                                                    <!-- TOTAL ZERO -->
                                                    <span
                                                        v-if="!surplus && !Number(l_data[index][i])"
                                                        :class="
                                                            item && item.type === 'skill' ? 'is-add-skill' : 'is-add'
                                                        "
                                                    ></span>

                                                    <img
                                                        class="talent-img"
                                                        :class="{ 'skill-img': item && item.type === 'skill' }"
                                                        :src="talentIcon(item.icon)"
                                                        :alt="item.name"
                                                    />

                                                    <img
                                                        v-if="isMutex(item, index, i, 'left')"
                                                        class="u-mutex-img"
                                                        src="../assets/img/talent2/mutex.png"
                                                        alt=""
                                                    />
                                                </div>
                                                <!-- COUNT -->
                                                <span
                                                    v-if="Number(l_data[index][i])"
                                                    class="m-talent2-content-item-count"
                                                    :class="[
                                                        Number(l_data[index][i]) < item.max
                                                            ? 'm-talent2-content-item-count-under'
                                                            : '',
                                                    ]"
                                                >
                                                    {{ l_data[index][i] }}
                                                </span>

                                                <!-- DESC popover -->
                                                <span class="m-talent2-pop" :class="item && item.on ? 'on' : ''">
                                                    <b class="m-talent2-name">
                                                        <span>
                                                            {{ item.name }}
                                                            <small class="u-talent2-id" v-if="item.id"
                                                                >(ID: {{ item.id }})</small
                                                            >
                                                        </span>
                                                        <span class="m-talent2-number">
                                                            第{{ Number(l_data[index][i]) + "/" + item.max }}重
                                                        </span>
                                                    </b>
                                                    <!-- <b class="m-talent2-type">
                                                            {{ item.type === 'talent' ? '被动招式': '主动招式' }}
                                                        </b>-->

                                                    <span
                                                        class="m-talent2-desc"
                                                        v-html="
                                                            !Number(l_data[index][i]) || xf === '通用'
                                                                ? item.desc[0]
                                                                : item.desc[l_data[index][i] - 1]
                                                        "
                                                    >
                                                    </span>
                                                    <span
                                                        v-if="
                                                            Number(l_data[index][i]) &&
                                                            Number(l_data[index][i]) < item.max
                                                        "
                                                        class="m-talent2-desc-next"
                                                    >
                                                        <span v-if="xf !== '通用'" class="m-next-text">下一重：</span>
                                                        <span>
                                                            {{ item.desc[l_data[index][i]] }}
                                                        </span>
                                                    </span>
                                                    <span v-if="Number(l_data[index][i]) === item.max" class="m-max"
                                                        >该招式已练至最高境界</span
                                                    >
                                                    <span class="m-talent-retrogress" v-if="Number(l_data[index][i])"
                                                        >右键点击遗忘</span
                                                    >
                                                </span>
                                            </div>
                                            <div v-else :key="'empty-' + i" class="m-talent2-content-item-empty"></div>
                                        </template>
                                    </div>
                                </div>
                            </div>

                            <!-- RIGHT -->
                            <div class="m-talent2-right" v-if="!isSingle">
                                <div
                                    class="m-talent2-content"
                                    :style="{
                                        'background-image': xf ? `url(${talentBg('right', 1)})` : '',
                                    }"
                                >
                                    <div class="m-talent2-title">
                                        <img class="m-talent2-xf-icon" :src="xficon(xfContent[1])" />
                                        <span class="m-talent2-title-count">{{ rCount }}</span>
                                        <span class="m-talent2-title-name">{{ r_name }}</span>
                                    </div>
                                    <div
                                        class="m-talent2-content-row"
                                        v-for="(row, index) in talentContent.right"
                                        :key="'r' + index"
                                    >
                                        <template v-for="(item, i) in row">
                                            <div
                                                v-if="item"
                                                class="m-talent2-content-item"
                                                :class="[
                                                    {
                                                        'm-talent2-content-item-skill': item.type === 'skill',
                                                    },
                                                    !canOperate(index, 'right')
                                                        ? 'm-talent2-content-item-disabled'
                                                        : '',
                                                    item.pretab ? 'm-talent2-pretab' : '',
                                                    isMutex(item, index, i, 'right')
                                                        ? 'm-talent2-content-item-disabled'
                                                        : '',
                                                ]"
                                                :key="i"
                                                @mouseover="item && $set(item, 'on', true)"
                                                @mouseleave="item && $set(item, 'on', false)"
                                            >
                                                <div
                                                    @click="rightTalentAdd(item, index, i)"
                                                    @click.right.prevent="rightTalentDecrease(index, i, item)"
                                                    :class="[
                                                        !canRightItemOperate(index, i)
                                                            ? item.type === 'skill'
                                                                ? 'm-talent2-skill-unselected'
                                                                : 'm-talent2-unselected'
                                                            : 'm-talent2-selected',
                                                        item.type === 'skill' ? '' : 'm-talent2-talent',
                                                        !surplus && !Number(r_data[index][i])
                                                            ? item.type === 'skill'
                                                                ? 'm-talent2-skill-unselected'
                                                                : 'm-talent2-unselected'
                                                            : '',
                                                        isMutex(item, index, i, 'right') ? 'm-talent2-unselected' : '',
                                                    ]"
                                                >
                                                    <!-- HAS PARENT -->
                                                    <span
                                                        v-if="
                                                            item.pretab &&
                                                            !isRightParentAdd(index, i) &&
                                                            canRightItemOperate(index, i)
                                                        "
                                                        :class="item.type === 'skill' ? 'is-add-skill' : 'is-add'"
                                                    ></span>
                                                    <!-- TOTAL ZERO -->
                                                    <span
                                                        v-if="!surplus && !Number(r_data[index][i])"
                                                        :class="item.type === 'skill' ? 'is-add-skill' : 'is-add'"
                                                    ></span>

                                                    <img
                                                        class="talent-img"
                                                        :class="{
                                                            'skill-img': item.type === 'skill',
                                                        }"
                                                        :src="talentIcon(item.icon)"
                                                        :alt="item.name"
                                                    />
                                                </div>
                                                <!-- COUNT -->
                                                <span
                                                    v-if="Number(r_data[index][i])"
                                                    class="m-talent2-content-item-count"
                                                    :class="[
                                                        Number(r_data[index][i]) < item.max
                                                            ? 'm-talent2-content-item-count-under'
                                                            : '',
                                                    ]"
                                                >
                                                    {{ r_data[index][i] }}
                                                </span>

                                                <!-- DESC -->
                                                <span class="m-talent2-pop" :class="item && item.on ? 'on' : ''">
                                                    <b class="m-talent2-name">
                                                        <span>
                                                            {{ item.name }}
                                                            <small class="u-talent2-id" v-if="item.id"
                                                                >(ID: {{ item.id }})</small
                                                            >
                                                        </span>
                                                        <span class="m-talent2-number">
                                                            第{{ Number(r_data[index][i]) + "/" + item.max }}重
                                                        </span>
                                                    </b>
                                                    <!-- <b class="m-talent2-type">
                                                            {{ item.type === 'talent' ? '被动招式': '主动招式' }}
                                                        </b>-->
                                                    <span
                                                        class="m-talent2-desc"
                                                        v-html="
                                                            !Number(r_data[index][i]) || xf === '通用'
                                                                ? item.desc[0]
                                                                : item.desc[r_data[index][i] - 1]
                                                        "
                                                    >
                                                    </span>
                                                    <span
                                                        v-if="
                                                            Number(r_data[index][i]) &&
                                                            Number(r_data[index][i]) < item.max
                                                        "
                                                        class="m-talent2-desc-next"
                                                    >
                                                        <span v-if="xf !== '通用'" class="m-next-text">下一重：</span>
                                                        <span>
                                                            {{ item.desc[r_data[index][i]] }}
                                                        </span>
                                                    </span>
                                                    <span v-if="Number(r_data[index][i]) === item.max" class="m-max"
                                                        >该招式已练至最高境界</span
                                                    >
                                                    <span class="m-talent-retrogress" v-if="Number(r_data[index][i])"
                                                        >右键点击遗忘</span
                                                    >
                                                </span>
                                            </div>
                                            <div v-else class="m-talent2-content-item-empty" :key="'empty-' + i"></div>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="m-talent2-actions" :class="{ 'is-single': isSingle }">
                            <div
                                class="reset-btn"
                                :class="!totalCount ? 'm-talent2-actions-btn-disabled' : 'm-talent2-actions-btn'"
                                @click="reload"
                            >
                                重置
                            </div>
                        </div>
                    </template>
                </div>
                <h2 class="m-talent-subtitle">镇派编码</h2>
                <div class="m-talent-code">
                    <el-input placeholder="粘贴编码亦可自动解析奇穴" v-model="code" @change="parseSchema">
                        <span slot="prepend" @click="copy(code)" class="u-copy">
                            <i class="el-icon-document-copy"></i>
                            点击复制
                        </span>
                    </el-input>
                </div>
                <template v-if="isAdmin">
                    <h2 class="m-talent-subtitle">配装编码</h2>
                    <el-input placeholder="配装器编码" v-model="pzcode">
                        <span slot="prepend" @click="copy(pzcode)" class="u-copy">
                            <i class="el-icon-document-copy"></i>
                            点击复制
                        </span>
                    </el-input>
                </template>
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

            <talent-drawer
                v-if="isLogin"
                :drawer="drawer"
                type="talent2"
                :client="client"
                @update-drawer="updateDrawer"
                @use="use"
            ></talent-drawer>
        </div>
    </app-layout>
</template>

<script>
import { __ossMirror, __imgPath, __ossRoot, __iconPath, __node } from "@jx3box/jx3box-common/data/jx3box.json";
// 所有心法的配置
import { defaultXf, defaultConfigs } from "@jx3box/jx3box-talent2/src/default.json";

import User from "@jx3box/jx3box-common/js/user";
import { addTalent, putTalent } from "@/service/talent.js";
import { iconLink } from "@jx3box/jx3box-common/js/utils";
import { copy } from "@/utils/clipboard";

import talentDrawer from "@/components/talent/talent_drawer.vue";
import AppLayout from "@/layout/AppLayout.vue";
export default {
    name: "Talent2",
    data: function () {
        return {
            activeName: "common",
            xf: "",
            code: "0",
            pzcode: "",
            begin: "left",
            l_name: "山川",
            r_name: "日月",
            version: "",
            versions: [], // 版本列表
            talents: {}, // 镇派数据
            total: 0,
            l_data: ["0000", "0000", "0000", "0000", "0000", "0000"],
            r_data: ["0000", "0000", "0000", "0000", "0000", "0000"],
            series_open_need: 0,

            // 心法字符串对应的心法id，用于左右背景
            xfContent: [],
            // 心法镇派或技能
            talentContent: {
                left: [],
                right: [],
            },
            condition: [], // 激活条件
            // mutex: [], // 互斥关系

            isLogin: User.isLogin(),
            isAdmin: false,
            showList: false,
            drawer: false,

            currentShemaName: "",
            currentSchema: "",

            // 初始化请求
            isInit: true,

            talentOriginData: {},
        };
    },
    computed: {
        client() {
            return "origin";
        },
        // 是否为单心法
        isSingle: function () {
            return !this.talentContent.left || !this.talentContent.right;
        },
        lCount: function () {
            return this.l_data.length
                ? this.l_data
                      .map((l) => l.split(""))
                      .flat()
                      .reduce((prev, current) => Number(prev) + Number(current))
                : 0;
        },
        rCount: function () {
            return this.r_data.length
                ? this.r_data
                      .map((l) => l.split(""))
                      .flat()
                      .reduce((prev, current) => Number(prev) + Number(current))
                : 0;
        },
        leftLastIndex: function () {
            let index = 0;
            for (let i = this.l_data.length - 1; i > 0; i--) {
                if (Number(this.l_data[i])) {
                    index = i;
                    break;
                }
            }
            return index;
        },
        rightLastIndex: function () {
            let index = 0;
            for (let i = this.r_data.length - 1; i > 0; i--) {
                if (Number(this.r_data[i])) {
                    index = i;
                    break;
                }
            }
            return index;
        },
        totalCount: function () {
            return this.lCount + this.rCount;
        },
        talent2Data: function () {
            return this.begin === "left"
                ? this.l_data.concat(this.r_data).join(",")
                : this.r_data.concat(this.l_data).join(",");
        },
        surplus: function () {
            return this.total - this.totalCount;
        },
        mount: function () {
            return this.xfMaps[this.xf]?.id;
        },
        params: function () {
            const { mount, version, code, pzcode, xf } = this;
            return {
                // 保证在正式服创建的镇派也是只在怀旧服使用
                client: "origin",
                type: "talent2",
                mount,
                version,
                code: JSON.parse(code),
                pzcode: JSON.parse(pzcode),
                xf,
            };
        },
        xfMaps: function () {
            let xfMaps = {};
            xfMaps["通用"] = {
                name: "通用",
                id: 0,
                force: 0,
                school: 0,
                client: ["all", "std", "origin"],
            };
            if (this.talentOriginData && this.talentOriginData.mount && this.talentOriginData.mount.length) {
                const mount = this.talentOriginData.mount;
                mount.forEach((item) => {
                    if (item.talent_tabs.length && item.first) {
                        xfMaps[item.mount_name] = {
                            name: item.mount_name,
                            id: item.mount_id,
                            force: item.force_id,
                            school: item.school_id,
                            client: ["all", "std", "origin"],
                        };
                    }
                });
            }
            return xfMaps;
        },
        xfConfigs: function () {
            let xfConfigs = {};
            xfConfigs["通用"] = {
                begin: "left",
                content: [0, 0],
                talent: ["山川", "日月"],
                condition: [0, 5, 10, 15, 20, 25, 25],
            };
            if (this.talentOriginData && this.talentOriginData.mount && this.talentOriginData.mount.length) {
                this.talentOriginData.mount.forEach((item) => {
                    if (item.talent_tabs.length || item.first) {
                        const content = item.talent_tabs.map((item) => this.getMountId(item));
                        xfConfigs[item.mount_name] = {
                            begin: item.talent_tabs[0] === item.first ? "left" : "right",
                            content: content,
                            talent: item.talent_tabs,
                        };
                    }
                });
            } else {
                return null;
            }
            return xfConfigs;
        },
        isEditing: function () {
            return !!this.currentSchema;
        },
        // 互斥关系对象
        mutexObj: function () {
            const mutexObj = {};
            if (this.talentOriginData && this.talentOriginData.mutex) {
                Object.values(this.talentOriginData.mutex).forEach((item) => {
                    Object.entries(item).forEach(([key, value]) => {
                        mutexObj[key] = value;
                    });
                });
            }
            return mutexObj;
        },
    },
    methods: {
        updateDrawer: function (val) {
            this.drawer = val;
        },
        getPreTab(talentId) {
            const condition = this.talentOriginData.condition;
            for (const key in condition) {
                const d = condition[key];
                if (d[talentId] && Object.values(d[talentId].PreviousTab).length) {
                    return Object.values(d[talentId].PreviousTab)[0];
                }
            }
            return "";
        },
        getnAllPoint(talentId) {
            const condition = this.talentOriginData.condition;
            for (const key in condition) {
                const d = condition[key];
                if (d[talentId]) {
                    return d[talentId].nAllPoint;
                }
            }
            return "";
        },
        getNeedLevel(talentId) {
            const condition = this.talentOriginData.condition;
            for (const key in condition) {
                const d = condition[key];
                if (d[talentId]) {
                    return d[talentId].nNeedLevel;
                }
            }
            return "";
        },
        getMountId(xf) {
            const d = this.talentOriginData.mount.find((item) => item.first === xf);
            if (d) {
                return d.mount_id;
            } else {
                return d;
            }
        },
        getIcon(key) {
            return __imgPath + "image/box/" + key + ".svg";
        },
        reload: function () {
            this.currentSchema = "";
            const ldata = this.l_data.map((item) => "0".repeat(item.length));
            const rdata = this.r_data.map((item) => "0".repeat(item.length));
            this.l_data = ldata;
            this.r_data = rdata;
        },
        reset: function () {},
        // 生成code
        renderCode: function () {
            const { version, xf, talent2Data, l_data, r_data, talentContent } = this;
            const _code = {
                version,
                xf,
                sq: talent2Data,
            };
            this.code = JSON.stringify(_code);

            const _pzcode = [];

            l_data.forEach((l, lIndex) => {
                const leftCode = l.split("").map((c) => parseInt(c));

                leftCode.forEach((code, codeIndex) => {
                    const talent = talentContent.left?.[lIndex]?.[codeIndex];
                    let _talent = {
                        id: talent?.id || 0,
                        icon: talent?.icon || "",
                        level: code,
                        name: talent?.name || "",
                    };

                    _pzcode.push(_talent);
                });
            });

            r_data.forEach((r, rIndex) => {
                const rightCode = r.split("").map((c) => parseInt(c));

                rightCode.forEach((code, codeIndex) => {
                    const talent = talentContent.right?.[rIndex]?.[codeIndex];
                    let _talent = {
                        id: talent?.id || 0,
                        icon: talent?.icon || "",
                        level: code,
                        name: talent?.name || "",
                    };

                    _pzcode.push(_talent);
                });
            });

            this.pzcode = JSON.stringify(_pzcode);
        },
        copy(val) {
            copy(val, { success_message: "编码复制成功" });
        },
        isOrigin: function (item) {
            return item["client"].includes("origin");
        },
        parseSchema: function () {
            try {
                const xfConfigs = this.xfConfigs;
                const _code = JSON.parse(this.code);
                this.version = _code.version;
                this.xf = _code.xf;

                const val = this.xf;
                this.xfContent = xfConfigs[val]?.content;
                this.begin = xfConfigs[val]?.begin;

                this.talentContent.left = this.talents[xfConfigs[val].talent[0]];
                this.l_name = xfConfigs[val]?.talent[0];

                this.talentContent.right = this.talents[xfConfigs[val].talent[1]];
                this.r_name = xfConfigs[val]?.talent[1];

                const _sq = _code.sq.split(",");

                const row_len = this.talentContent.left.length;

                if (this.begin === "left") {
                    this.l_data = _sq.slice(0, row_len);
                    this.r_data = _sq.slice(row_len, _sq.length);
                } else if (this.begin === "right") {
                    this.r_data = _sq.slice(0, row_len);
                    this.l_data = _sq.slice(row_len, _sq.length);
                }
            } catch (e) {
                this.$message.error("编码格式错误");
            }
        },
        // talent 单项逻辑
        // -------------------
        /**
         * 判断该行是否可点
         * @param {number} rowIndex 行号
         * @param {string} target 左右区域
         * @returns {boolean} true表示可以编辑
         */
        canOperate: function (rowIndex, target) {
            if (target === "left") {
                return this.lCount >= this.condition?.[rowIndex];
            } else {
                return this.rCount >= this.condition?.[rowIndex];
            }
        },
        /**
         * 判断left该项是否可点
         * @param {number} rowIndex 行号
         * @param {number} colIndex 列号
         * @returns {boolean} 是否可以修改
         */
        canLeftItemOperate: function (rowIndex, colIndex) {
            let canOperate = false;
            // 初始为left的第一行点亮
            if (this.begin === "left") {
                if (!rowIndex) {
                    canOperate = true;
                } else if (this.lCount > 0 && this.lCount >= (this.condition?.[rowIndex] || 0)) {
                    canOperate = true;
                }
            } else if (this.begin === "right") {
                if (
                    this.rCount >= this.series_open_need &&
                    this.lCount >= 0 &&
                    this.lCount >= (this.condition?.[rowIndex] || 0)
                ) {
                    canOperate = true;
                }
            }

            return canOperate;
        },
        /**
         * 判断left该项父项是否加点
         */
        isLeftParentAdd: function (rowIndex, colIndex) {
            if (!this.talentContent.left[rowIndex - 1][colIndex]) {
                return this.isLeftParentAdd(rowIndex - 1, colIndex);
            }
            return Number(this.l_data?.[rowIndex - 1]?.[colIndex]);
        },
        /**
         * talent left 增加层数
         * @param {Object} item talent
         * @param {number} rowIndex 行号
         * @param {number} colIndex 列号
         */
        leftTalentAdd: function (item, rowIndex, colIndex) {
            if (!this.canOperate(rowIndex, "left")) return;
            if (this.isMutex(item, rowIndex, colIndex, "left")) return;

            // 当父项有层数，才可以进行增加层数操作
            if (item?.pretab && item?.pretab > this.isLeftParentAdd(rowIndex, colIndex)) {
                this.$message.warning({
                    message: "要激活该天赋需要先激活对应的上层天赋",
                });
                return;
            }

            const { max, parent } = item;

            if (this.begin === "right") {
                if (this.rCount < this.series_open_need) {
                    this.$message.warning({
                        message: `主天赋需要先激活${this.series_open_need}点，才能激活本区域的天赋`,
                    });
                    return;
                }
            }

            // HACK: 此处的parent是不是只用判断是否有就好
            if (parent?.length) {
                const [p] = parent;
                const pTalent = Number(this.l_data[p.row][p.index]);

                if (!pTalent) {
                    this.$message({
                        type: "warning",
                        message: "该天赋存在前置天赋，需先激活前置天赋",
                    });
                    return;
                }
            }

            // 限定最大加点数
            if (this.totalCount >= this.total) {
                this.$message({
                    type: "warning",
                    message: "最大加点数为" + this.total,
                });
                return;
            }

            let current = Number(this.l_data[rowIndex][colIndex]);

            if (current < max) {
                current++;
                // 替换指定talent的层数
                const row = this.l_data[rowIndex].split("");

                row[colIndex] = String(current);

                this.l_data.splice(rowIndex, 1, row.join(""));
                item.count = current;
            } else {
                this.$message({
                    type: "warning",
                    message: "该天赋已达最高层数",
                });
            }
        },
        /**
         * talent left 减少层数
         * @param {number} rowIndex 行号
         * @param {number} colIndex 列号
         * @param {Array} item 操作对象
         */
        leftTalentDecrease: function (rowIndex, colIndex, item) {
            let current = Number(this.l_data[rowIndex][colIndex]);

            if (current > 0) {
                if (rowIndex < this.l_data.length - 1) {
                    let currentCount = 0;
                    // 当前行之前的行
                    const currentArr = this.l_data.slice(0, rowIndex + 1);
                    // 左边或右边总共的点数
                    const targetCount = this.l_data
                        .map((l) => l.split(""))
                        .flat()
                        .reduce((prev, current) => Number(prev) + Number(current));

                    // 当前行之前的行的点数
                    currentCount = currentArr
                        .map((l) => l.split(""))
                        .flat()
                        .reduce((prev, current) => Number(prev) + Number(current));

                    if (currentCount <= this.condition[this.leftLastIndex] && targetCount > currentCount) {
                        this.$message.warning({
                            title: "提醒",
                            message: "不能再减啦",
                        });
                        return;
                    }
                }
                current--;
                // 替换指定talent的层数9
                const row = this.l_data[rowIndex].split("");

                row[colIndex] = String(current);

                item.count = current;

                this.l_data.splice(rowIndex, 1, row.join(""));
            }
        },
        /**
         * 判断right该项是否可点
         * @param {number} rowIndex 行号
         * @param {number} index 列号
         * @returns {boolean} 是否可以修改
         */
        canRightItemOperate: function (rowIndex, colIndex) {
            let canOperate = false;
            // 初始为left的第一行点亮
            if (this.begin === "right") {
                if (!rowIndex) {
                    canOperate = true;
                } else if (this.rCount > 0 && this.rCount >= (this.condition?.[rowIndex] || 0)) {
                    canOperate = true;
                }
            } else if (this.begin === "left") {
                if (
                    (this.lCount >= this.series_open_need &&
                        this.rCount >= 0 &&
                        this.rCount >= this.condition?.[rowIndex]) ||
                    0
                ) {
                    canOperate = true;
                }
            }

            return canOperate;
        },
        /**
         * 判断right该项父项是否加点
         */
        isRightParentAdd: function (rowIndex, colIndex) {
            if (!this.talentContent.right[rowIndex - 1][colIndex]) {
                return this.isRightParentAdd(rowIndex - 1, colIndex);
            }
            return Number(this.r_data[rowIndex - 1][colIndex]);
        },
        /**
         * talent right 增加层数
         * @param {Object} item talent
         * @param {number} rowIndex 行号
         * @param {number} colIndex 列号
         */
        rightTalentAdd: function (item, rowIndex, colIndex) {
            if (!this.canOperate(rowIndex, "right")) return;
            if (this.isMutex(item, rowIndex, colIndex, "right")) return;

            // 当父项有层数，才可以进行增加层数操作
            if (item?.pretab && !this.isRightParentAdd(rowIndex, colIndex)) {
                this.$message.warning({
                    message: "要激活该天赋需要先激活对应的上层天赋",
                });
                return;
            }

            const { max, parent } = item;

            if (this.begin === "left") {
                if (this.lCount < this.series_open_need) {
                    this.$message.warning({
                        title: "提醒",
                        message: `主天赋需要先激活${this.series_open_need}点，才能激活本区域的天赋`,
                    });
                    return;
                }
            }

            // HACK: 此处的parent是不是只用判断是否有就好
            if (parent?.length) {
                const [p] = parent;
                const pTalent = Number(this.r_data[p.row][p.index]);

                if (!pTalent) {
                    this.$message({
                        type: "warning",
                        message: "该天赋存在前置天赋，需先激活前置天赋",
                    });
                    return;
                }
            }

            // 限定最大加点数
            if (this.totalCount >= this.total) {
                this.$message({
                    type: "warning",
                    message: "最大加点数为" + this.total,
                });
                return;
            }

            let current = Number(this.r_data[rowIndex][colIndex]);

            if (current < max) {
                current++;
                // 替换指定talent的层数
                const row = this.r_data[rowIndex].split("");

                row[colIndex] = String(current);

                item.count = current;

                this.r_data.splice(rowIndex, 1, row.join(""));
            } else {
                this.$message({
                    type: "warning",
                    message: "该天赋已达最高层数",
                });
            }
        },
        /**
         * talent right 减少层数
         * @param {number} rowIndex 行号
         * @param {number} colIndex 列号
         * @param {Array} item 操作对象
         */
        rightTalentDecrease: function (rowIndex, colIndex, item) {
            let current = Number(this.r_data[rowIndex][colIndex]);

            if (current > 0) {
                if (rowIndex < this.r_data.length - 1) {
                    let currentCount = 0;
                    // 当前行之前的行
                    const currentArr = this.r_data.slice(0, rowIndex + 1);
                    // 左边或右边总共的点数
                    const targetCount = this.r_data
                        .map((l) => l.split(""))
                        .flat()
                        .reduce((prev, current) => Number(prev) + Number(current));
                    // 当前行之前的行的点数
                    currentCount = currentArr
                        .map((l) => l.split(""))
                        .flat()
                        .reduce((prev, current) => Number(prev) + Number(current));

                    if (currentCount <= this.condition[this.rightLastIndex] && targetCount > currentCount) {
                        this.$message.warning({
                            title: "提醒",
                            message: "不能再减啦",
                        });
                        return;
                    }
                }
                current--;
                // 替换指定talent的层数
                const row = this.r_data[rowIndex].split("");

                row[colIndex] = String(current);

                item.count = current;

                this.r_data.splice(rowIndex, 1, row.join(""));
            }
        },
        /**
         * 心法背景图片
         * @param {string} pos 位置信息
         * @param {number|string} num 图片编号
         */
        talentBg: function (pos, num) {
            if (!pos) return;
            if (pos === "left") {
                return __imgPath + `image/talent/${this.xfContent[0]}_${num}.png`;
            }
            return __imgPath + `image/talent/${this.xfContent[1]}_${num}.png`;
        },

        //  区域逻辑
        // ----------------

        // 请求逻辑
        // ---------------------
        // 获取版本列表
        getVersions: function () {
            fetch(__node + "talent-origin/list")
                .then((res) => res.json())
                .then((response) => {
                    this.versions = response.data.list.map((item) => {
                        return {
                            version: item.talent_version,
                            name: item.version,
                        };
                    });
                    this.version = this.versions[0]?.version;
                });
        },
        getTanletOriginData: function () {
            // this.talents = { ...defaultXf };
            fetch(__node + "talent-origin/" + this.version)
                .then((res) => res.json())
                .then((response) => {
                    const data = response.data;
                    const mount = response.data.mount.reduce((acc, current) => {
                        if (current.first !== null) {
                            const existing = acc.find((item) => item.first === current.first);
                            if (!existing) {
                                if (
                                    current.talent_tabs &&
                                    current.talent_tabs.length &&
                                    current.talent_tabs[0] === current.talent_tabs[1]
                                ) {
                                    acc.push({
                                        ...current,
                                        mount_name: current.first,
                                        talent_tabs: [current.first],
                                    });
                                } else {
                                    acc.push(current);
                                }
                            }
                        }
                        return acc;
                    }, []);
                    data.mount = mount;
                    this.talentOriginData = data;
                    this.talents = { ...response.data.detail, ...defaultXf };
                    if (this.isInit) {
                        this.xf = "通用";
                        this.isInit = false;
                    }
                    this.total = 66;
                });
        },

        getTalents: function () {
            fetch(__ossRoot + "data/talent2/v20240305.json")
                // fetch(__ossRoot + "data/talent2/v20240305.json")
                .then((res) => res.json())
                .then((response) => {
                    this.talents = { ...response, ...defaultXf };
                    if (this.isInit) {
                        this.xf = "通用";
                        this.isInit = false;
                    }
                    this.total = 66;
                });
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
                            message: "预设方案保存成功",
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
                    this.$message({
                        type: "success",
                        message: "方案保存成功",
                    });
                });
            });
        },
        use: function (item) {
            if (item.version.indexOf("v") >= 0) {
                this.$message({
                    type: "error",
                    message: "您保存的预设当前版本不支持，请删除重新保存预设。",
                });
                return;
            }
            const parseCode = item.code;
            this.currentSchema = item;

            this.version = item.version;

            this.xf = parseCode.xf;
            setTimeout(() => {
                this.code = JSON.stringify(item.code);
                this.pzcode = JSON.stringify(item.pzcode);

                this.parseSchema();
            });
        },
        talentIcon: function (id) {
            if (this.xf == "通用") return iconLink(id);
            return iconLink(id, "origin");
        },
        xficon: function (id) {
            return __imgPath + "image/xf/" + id + ".png";
        },

        // 判断互斥关系
        isMutex(item, rowIndex, colIndex, key) {
            const arr = this.mutexObj[item.id];

            if (!arr) return false;

            const _item = this.talentContent?.[key]?.[rowIndex]?.find((i) => i?.count);

            // _item存在，证明该项已经加点，那么arr中的项就不能加点
            if (_item) {
                return arr.includes(_item.id);
            }

            return false;
        },
    },
    watch: {
        version: function (val) {
            if (val) {
                // this.getTalents();
                this.getTanletOriginData();
            }
        },
        // 选择心法触发这里👇
        xf: {
            immediate: true,
            handler(val) {
                if (val && this.xfConfigs) {
                    const xfConfigs = this.xfConfigs;
                    this.xfContent = xfConfigs[val]?.content;
                    this.begin = xfConfigs[val]?.begin;

                    // 新增pop显示控制
                    this.talentContent.left = this.talents[xfConfigs[val].talent?.[0]]?.map((left) => {
                        const _left = left.map((l) => {
                            if (l) {
                                this.$set(l, "on", false);
                                this.$set(l, "count", 0);
                                this.$set(l, "pretab", this.getPreTab(l.id));
                                this.$set(l, "nAllPoint", this.getnAllPoint(l.id));
                            }
                            return l;
                        });
                        return _left;
                    });
                    this.l_name = xfConfigs[val]?.talent[0];
                    const col_len = Math.max(...this.talentContent.left.map((l) => l.length));
                    const row_len = this.talentContent.left.length;

                    this.l_data = Array(row_len)
                        .fill(0)
                        .map(() => {
                            return Array(col_len).fill(0).join("");
                        });

                    this.talentContent.right = this.talents[xfConfigs[val].talent?.[1]]?.map((right) => {
                        const _right = right.map((r) => {
                            if (r) {
                                this.$set(r, "on", false);
                                this.$set(r, "count", 0);
                                this.$set(r, "pretab", this.getPreTab(r.id));
                                this.$set(r, "nAllPoint", this.getnAllPoint(r.id));
                            }
                            return r;
                        });
                        return _right;
                    });

                    this.r_name = xfConfigs[val]?.talent[1];

                    this.r_data = Array(row_len)
                        .fill(0)
                        .map(() => {
                            return Array(col_len).fill(0).join("");
                        });

                    if (val === "通用") {
                        this.total = 66;
                    } else {
                        this.total = defaultConfigs.total;
                        // this.total = 99;
                    }
                    // 激活条件 拿每行的第一个功法的激活条件 组成 这样的格式 [0, 5, 10, 15, 20, 25]
                    if (xfConfigs[val]?.condition) {
                        this.condition = xfConfigs[val]?.condition;
                    } else {
                        if (this.talentContent[this.begin] && this.talentContent[this.begin].length) {
                            const condition = this.talentContent[this.begin].map((items, index) => {
                                items = items.filter((item) => item !== null);
                                if (items[0]) {
                                    return items[0].nAllPoint;
                                } else {
                                    // 当前行无功法默认 * 5
                                    return index * 5;
                                }
                            });
                            this.condition = condition;
                            console.log(this.condition);
                        } else {
                            this.condition = [0, 5, 10, 15, 20, 25];
                        }
                    }

                    // this.mutex = xfConfigs[val]?.mutex || [];

                    // 初始化code
                    this.renderCode();
                    // console.log(this.talentContent);
                }
            },
        },
        talent2Data: function () {
            this.renderCode();
        },
    },
    mounted: function () {
        this.getVersions();
        this.series_open_need = defaultConfigs.series_open_need;

        this.isAdmin = User.isAdmin();
    },
    components: {
        talentDrawer,
        AppLayout,
    },
};
</script>

<style lang="less">
@import "~@/assets/css/talent.less";
@import "~@/assets/css/talent2.less";
</style>
