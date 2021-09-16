<template>
    <div class="u-feed">
        <Mark
            :label="author"
            :value="name"
            BGL="#24292e"
            :BGR="color"
            v-clipboard:copy="author + '#' + name"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
        />
    </div>
</template>

<script>
import { colors_by_mount_name } from "@jx3box/jx3box-data/data/xf/colors.json";
export default {
    name: "feed",
    props: ["author", "name", "subtype"],
    data: function () {
        return {};
    },
    computed: {
        color: function () {
            return colors_by_mount_name[this.subtype];
        },
    },
    methods: {
        onCopy: function (val) {
            this.$notify({
                title: "云端宏复制成功",
                message: "复制内容 : " + val.text,
                type: "success",
            });
        },
        onError: function () {
            this.$notify.error({
                title: "复制失败",
                message: "请手动复制",
            });
        },
    },
    mounted: function () {},
    components: {},
};
</script>

