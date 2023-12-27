<template>
    <div>
        <Header></Header>
        <Breadcrumb
            name="云端宏"
            slug="macro"
            root="/macro"
            :publishEnable="true"
            :adminEnable="false"
            :feedbackEnable="true"
            :crumbEnable="true"
        >
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
            <RightSidebar class="m-macro-right-side" :showToggle="true">
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
.m-macro-right-side {
    //&.c-sidebar-right.is-close {
        //transform: translateX(0) !important;
    //}
    .c-sidebar-right-inner {
        background: #fff;
    }
}
@import "~@/assets/css/list.less";
</style>
