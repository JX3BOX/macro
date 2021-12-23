<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb name="云端宏" slug="macro" root="/macro" :publishEnable="true" :adminEnable="true" :feedbackEnable="true" :crumbEnable="true">
            <img slot="logo" svg-inline :src="getAppIcon('macro')" />
        </Breadcrumb>
        <LeftSidebar>
            <Nav :id="id" class="m-nav" />
        </LeftSidebar>
        <Main :withoutRight="false">
            <single :id="id" />
            <RightSidebar>
                <Side :id="id" class="m-extend" />
            </RightSidebar>
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import Nav from "@/components/single/single_nav.vue";
import Side from "@/components/single/single_side.vue";
import single from "@/components/single/single.vue";
import { getAppIcon, getAppID } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "App",
    props: [],
    data: function() {
        return {
            id: getAppID(),
        };
    },
    methods: { getAppIcon },
    components: {
        Nav,
        Side,
        single,
    },
};
</script>

<style lang="less">
@import "./assets/css/app.less";
</style>