<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb name="云端宏" slug="macro" root="/macro" :publishEnable="true" :adminEnable="false" :feedbackEnable="true" :crumbEnable="true">
            <img slot="logo" svg-inline :src="getAppIcon('macro')" />
            <Info />
        </Breadcrumb>
        <LeftSidebar>
            <Nav class="m-nav" />
        </LeftSidebar>
        <Main :withoutRight="false">
            <div class="m-main">
                <tabs />
                <router-view />
            </div>
            <RightSidebar>
                <Side class="m-extend" />
            </RightSidebar>
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import Info from "@/components/list/Info.vue";
import Nav from "@/components/list/list_nav.vue";
import Side from "@/components/list/list_side.vue";
import tabs from "@/components/tabs.vue";
import { getAppIcon } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "App",
    props: [],
    data: function() {
        return {};
    },
    methods: {
        getAppIcon,
    },
    components: {
        Info,
        Nav,
        Side,
        tabs,
    },
};
</script>

<style lang="less">
@import "./assets/css/app.less";
</style>
