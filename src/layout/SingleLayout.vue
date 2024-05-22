<template>
    <div>
        <Header></Header>
        <Breadcrumb name="云端宏" slug="macro" root="/macro" :publishEnable="true" :adminEnable="true" :feedbackEnable="true" :crumbEnable="true">
            <template #op-prepend>
                <!-- <AdminDirectMessage v-if="post && post.ID" :user-id="user_id" :sourceId="String(post.ID)" :sourceType="post.post_type"></AdminDirectMessage> -->
                <AdminDrop v-if="isTeammate" :post="post" :user-id="user_id" :showMove="true"/>
            </template>
            <template #title>
                <span>{{ title }}</span>
            </template>
        </Breadcrumb>
        <LeftSidebar :uid="user_id">
            <Nav :id="id" class="m-nav" />
        </LeftSidebar>
        <Main :withoutRight="false" >
            <router-view />
            <RightSidebar :showToggle="true">
                <Side :id="id" class="m-extend" />
            </RightSidebar>
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import Nav from "@/components/single/single_nav.vue";
import Side from "@/components/single/single_side.vue";
import { getAppIcon, getAppID } from "@jx3box/jx3box-common/js/utils";
import AdminDrop from "@jx3box/jx3box-common-ui/src/bread/AdminDrop.vue";
import User from "@jx3box/jx3box-common/js/user";
export default {
    name: "SingleLayout",
    props: [],
    data: function () {
        return {
            id: getAppID(),
        };
    },
    computed: {
        user_id: function () {
            return this.$store.state.user_id;
        },
        post() {
            return this.$store.state.post;
        },
        title() {
            return this.post.post_title || document.title;
        },
        isTeammate() {
            return User.isTeammate();
        },
    },
    components: {
        Nav,
        Side,
        // AdminDirectMessage,
        AdminDrop,
    },
};
</script>

<style lang="less">
@import "~@/assets/css/list.less";
</style>
