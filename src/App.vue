<template>
    <div id="app">
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
            <Nav class="m-nav"/>
        </LeftSidebar>
        <Main :withoutRight="false">
            <div class="m-main">
                <tabs />
                <router-view />
            </div>
            <RightSidebar>
                <Side class="m-extend"/>
            </RightSidebar>
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import Info from "@/components/Info.vue";
import Nav from "@/components/list_nav.vue";
import Side from "@/components/list_side.vue";
import tabs from "@/components/tabs";

export default {
    name: "App",
    props: [],
    data: function () {
        return {};
    },
    methods: {},
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
