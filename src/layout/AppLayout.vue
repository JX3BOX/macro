<template>
    <div>
        <Header></Header>
        <router-view />
    </div>
</template>

<script>
export default {
    name: "AppLayout",
};
</script>

<style lang="less">
@import "~@/assets/css/list.less";
</style>
