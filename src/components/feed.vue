<template>
    <div class="u-feed">
        <Mark
            :label="author"
            :value="name"
            BGL="#24292e"
            :BGR="color"
            @click="copy(author + '#' + name)"
        />
    </div>
</template>

<script>
import { colors_by_mount_name } from "@jx3box/jx3box-data/data/xf/colors.json";
import { copy } from "@/utils/clipboard";
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
        copy: function (val) {
            copy(val, "云端宏复制成功");
        },
    },
    mounted: function () {},
    components: {},
};
</script>

