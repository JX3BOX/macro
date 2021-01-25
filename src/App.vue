<template>
    <div id="app" :class="{ 'p-list': mode == 'list', 'p-single': mode == 'single' }">
        <Header></Header>
        <Breadcrumb
            name="云端宏"
            slug="macro"
            root="/macro"
            :publishEnable="true"
            :adminEnable="true"
            :feedbackEnable="true"
            :crumbEnable="true"
        >
            <img slot="logo" svg-inline src="./assets/img/macro.svg" />
            <Info />
        </Breadcrumb>
        <LeftSidebar>
            <Nav />
        </LeftSidebar>
        <Main :withoutRight="false">
            <single v-if="mode == 'single'" />
            <div class="m-main" v-else>
                <tabs />
                <router-view />
            </div>
            <RightSidebar>
                <Extend />
            </RightSidebar>
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import Info from "@/components/Info.vue";
import Nav from "@/components/Nav.vue";
import Extend from "@/components/Extend.vue";
import tabs from "@/components/tabs";
import single from "@/components/single.vue";
import {getPID,getAppID,getQuery,getAppType} from '@jx3box/jx3box-common/js/utils'
import {__Root} from '@jx3box/jx3box-common/js/jx3box.json'

export default {
    name: "App",
    props: [],
    data: function() {
        return {};
    },
    computed: {
        mode: function() {
            return this.$store.state.mode;
        },
    },
    methods: {},
    beforeCreate: function() {
        let id = getAppID()
        let pid = getPID()

        // 旧单页链接跳转
        if(!id && pid){
            let type = getAppType()
            let test = __Root + type + '/' + pid
            location.href = __Root + type + '/' + pid
        }

        // 处理模式 & 文章ID
        this.$store.state.mode = id ? 'single' : 'list'
        this.$store.state.pid = id

        // 捕获subtype
        if(this.$store.state.mode == 'list'){
            this.$store.state.subtype = getQuery("subtype");
        }
    },
    components: {
        Info,
        Nav,
        Extend,
        tabs,
        single
    },
};
</script>

<style lang="less">
@import "./assets/css/app.less";
</style>
