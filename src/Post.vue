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
            <img slot="logo" svg-inline :src="getAppIcon('macro')" />
        </Breadcrumb>
        <LeftSidebar>
            <Nav class="m-nav" />
        </LeftSidebar>
        <Main :withoutRight="false">
            <single />
            <RightSidebar>
                <Side class="m-extend" />
            </RightSidebar>
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import Nav from "@/components/single_nav.vue";
import Side from "@/components/single_side.vue";
import single from "@/components/single.vue";
import {getAppIcon} from '@jx3box/jx3box-common/js/utils'
export default {
    name: "App",
    props: [],
    data: function () {
        return {};
    },
    methods: {
        getAppIcon
    },
    components: {
        Nav,
        Side,
        single,
    },
    beforeCreate : function (){
        
    }
};
</script>

<style lang="less">
@import "./assets/css/app.less";
.c-crumb{
    .none;
}
</style>
