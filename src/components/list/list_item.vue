<template>
	<li class="u-item">
		<!-- 标题 -->
		<h2 class="u-post" :class="{ isSticky: isPublic && item.sticky }">
			<img class="u-icon" :src="xficon(item.post_subtype)" :alt="item.post_subtype" :title="item.post_subtype" />

			<!-- <Mark class="u-feed" :label="item.author"/> -->
			<template v-if="isMine">
				<span class="u-private" v-if="~~item.visible">
					<i class="el-icon-lock"></i>
					{{ visibleTxt(item.visible) }}
				</span>
				<span class="u-draft" v-if="item.post_status == 'draft'"> <i class="el-icon-edit-outline"></i> 草稿 </span>
			</template>
			<!-- 繁体标识 -->
			<span class="u-label" v-if="item.lang == 'tr'">繁體</span>
			<!-- 标题文字 -->
			<a class="u-title" :style="showHighlight(item.color)" :href="postLink(item.ID)" :target="target">{{ item.post_title || "无标题" }}</a>

			<!-- 角标 -->
			<span class="u-marks" v-if="item.mark && item.mark.length">
				<i v-for="mark in item.mark" class="u-mark" :key="mark">{{ showMark(mark) }}</i>
			</span>
		</h2>

		<!-- 字段 -->
		<div class="u-content">
			<ul class="m-macro-list-item-meta" v-if="item.post_meta && item.post_meta.data && item.post_meta.data.length">
				<li class="u-macro" v-for="(m, i) in item.post_meta.data" :key="i">
					<img class="u-macro-icon" :src="iconLink(m.icon)" />
					<el-tooltip effect="dark" :content="'点击快捷查看 · ' + m.name" placement="top-start">
						<span class="u-macro-name" @click="loadMacro(item.author, m, item.ID)">{{ m.name || "未命名" }}</span>
					</el-tooltip>
				</li>
			</ul>
		</div>

		<!-- 时间 -->
		<div class="u-misc">
			<!-- 作者 -->
			<div class="u-author">
				<a class="u-author-name" :href="authorLink(item.post_author)" target="_blank">{{ item.author }}</a>
			</div>
			<span class="u-date">
				<i class="el-icon-date"></i>
				<time v-if="order == 'update'">{{ dateFormat(item.post_modified) }}</time>
				<time v-else>{{ dateFormat(item.post_date) }}</time>
			</span>
		</div>
	</li>
</template>

<script>
import { appKey } from "@/../setting.json";
import { showAvatar, authorLink, buildTarget, iconLink } from "@jx3box/jx3box-common/js/utils";
import { __ossMirror, __imgPath, __visibleMap } from "@jx3box/jx3box-common/data/jx3box";
import { cms as mark_map } from "@jx3box/jx3box-common/data/mark.json";
import { showDate } from "@jx3box/jx3box-common/js/moment.js";
import xfmap from "@jx3box/jx3box-data/data/xf/xf.json";
export default {
	name: "ListItem",
	props: ["item", "order"],
	components: {},
	data: function () {
		return {
			target: buildTarget(),
		};
	},
	computed: {
		isPublic: function () {
			return this.$route.name == "index";
		},
		isMine: function () {
			return this.$route.name == "bucket";
		},
	},
	watch: {},
	methods: {
		loadMacro: function (a, b, c) {
			this.$emit("loadMacro", [a, b, c]);
		},
		authorLink,
		iconLink,
		postLink: function (val) {
			return location.origin + `/${appKey}/` + val;
		},
		showHighlight: function (val) {
			return val ? `color:${val};font-weight:600;` : "";
		},
		showMark: function (val) {
			return mark_map[val] || val;
		},
		showAvatar: function (userinfo) {
			return showAvatar(userinfo?.user_avatar);
		},
		showNickname: function (userinfo) {
			return userinfo?.display_name || "匿名";
		},
		dateFormat: function (gmt) {
			return showDate(new Date(gmt));
		},
		xficon: function (val) {
			if (!val || val == "其它") val = "通用";
			let xf_id = xfmap[val]["id"];
			return __imgPath + "image/xf/" + xf_id + ".png";
		},
		visibleTxt: function (val) {
			return __visibleMap[val];
		},
	},
	created: function () {
		console.log(this.item, this.order, "???");
	},
	mounted: function () {},
};
</script>
