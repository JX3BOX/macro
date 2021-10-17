<template>
    <div class="m-pz" v-loading="loading">
        <el-tabs v-model="id" type="card">
            <el-tab-pane
                :label="item.name"
                :name="String(item.id)"
                v-for="item in data"
                :key="item.id"
            >
                <a class="u-pz-link" target="_blank" :href="url">
                    <i class="el-icon-link"></i> 点击查看配装详情
                </a>
                <iframe
                    :src="src"
                    scrolling="no"
                    width="1280"
                    height="720"
                    style="border:none;background:none;max-width:100%;overflow:hidden;"
                ></iframe>
            </el-tab-pane>
        </el-tabs>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "Pz",
    props: ["raw"],
    components: {},
    data: function () {
        return {
            id: "",
            loading: false,
            schema: null,
        };
    },
    computed: {
        data: function () {
            return this.raw || [];
        },
        src: function () {
            return `https://www.jx3box.com/pz/iframe.html?id=${this.id}&mode=horizontal`;
        },
        url: function () {
            return `/pz/#/view/${this.id}`;
        },
    },
    methods: {
        receiveMessage: function () {
            const vm = this;
            window.addEventListener(
                "message",
                function (event) {
                    vm.schema = event.data;
                },
                false
            );
        },
    },
    mounted: function () {
        this.id = String(this.raw[0]?.id) || "0";
        this.receiveMessage()
    },
};
</script>

<style scoped lang="less">
.u-pz-link {
    .db;
    .fz(15px);
    .mb(5px);
    &:hover {
        color: @pink;
    }
}
</style>