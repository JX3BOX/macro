<template>
    <div class="u-feed">
        <Mark
            :label="author"
            :value="name"
            BGL="#24292e"
            :BGR="color"
            @click.native="copy(author + '#' + name)"
        />
    </div>
</template>

<script>
import { colors_by_mount_name } from "@jx3box/jx3box-data/data/xf/colors.json";
import { copy } from "@/utils/clipboard";
import { postStat } from "@jx3box/jx3box-common/js/stat";
export default {
    name: "feed",
    props: ["author", "name", "subtype"],
    data: function () {
        return {};
    },
    computed: {
        id: function () {
            return this.$route.params.id;
        },
        color: function () {
            return colors_by_mount_name?.[this.subtype] === '#FFFFFF' ? '#24292e' : colors_by_mount_name?.[this.subtype];
        },
    },
    methods: {
        copy: function (val) {
            copy(val, { success_title: "云端宏复制成功" });
            this.autoLike();
        },
        autoLike: function () {
            postStat("macro", this.id, "likes");
        },
    },
    mounted: function () {},
    components: {},
};
</script>

