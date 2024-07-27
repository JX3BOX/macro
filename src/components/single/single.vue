<template>
	<div>
		<singlebox :post="post" :stat="stat" v-loading="loading" @extendUpdate="updateExtend">
			<template slot="single-header">
				<div class="u-meta u-sub-block">
					<em class="u-label">心法</em>
					<span class="u-value">
						<img class="u-icon-xf" :src="xficon(xficon_id)" :alt="xf" />
						{{ xf }}
					</span>
				</div>
				<div class="u-meta u-sub-block">
					<em class="u-label">资料片</em>
					<span class="u-value">{{ zlp }}</span>
				</div>
			</template>

			<!-- 宏内容 -->
			<div class="m-single-macro" v-if="visible">
				<el-tabs v-model="active" type="card">
					<el-tab-pane v-for="(item, i) in data" :key="i" :name="i + ''">
						<!-- tab -->
						<span class="u-label" slot="label">
							<img class="u-icon" :src="iconURL(item.icon)" />
							<b>{{ item.name }}</b>
						</span>
						<!-- 宏 -->
						<el-divider content-position="left" v-if="item.macro">宏</el-divider>
						<div class="u-usage" v-if="item.desc">{{ item.desc }}</div>
						<div class="u-macro macro-box" :class="{ withUsage: item.desc }" v-if="item.macro">
							<macro :ctx="item.macro" :lang="lang" :name="post.author + '#' + item.name" :id="id" />
						</div>
						<!-- 奇穴 镇派 -->
						<template v-if="item.talent">
							<el-divider content-position="left">{{ client === "origin" ? "镇派" : "奇穴" }}</el-divider>
							<div class="m-single-talent-container">
								<template v-if="client === 'origin'">
									<render-talent :talent-code="item.talent"></render-talent>
								</template>
								<div v-else class="u-talent talent-box" :id="`talent-box-${i}`"></div>
							</div>
							<div class="u-panel u-talent-panel" v-if="item.talent">
								<el-button class="u-talent-panel-copycode" icon="el-icon-s-tools" plain size="mini" @click="copy(item.talent)">复制{{ client === "origin" ? "镇派" : "奇穴" }}编码</el-button>
								<el-button v-if="client !== 'origin'" class="u-talent-panel-copytxt" icon="el-icon-document-copy" plain size="mini" @click="copy(getTalentTXT(i))">复制奇穴文字</el-button>
								<el-button v-if="client !== 'origin'" class="u-talent-panel-copysq" icon="el-icon-scissors" plain size="mini" @click="copy(getTalentSQ(item.talent))">复制奇穴序列</el-button>
							</div>
						</template>
						<!-- 急速 -->
						<el-divider content-position="left" v-if="item.speed">急速</el-divider>
						<div class="u-speed" v-if="item.speed">{{ item.speed }}</div>
					</el-tab-pane>
				</el-tabs>
				<!-- 配装 -->
				<template v-if="hasPz">
					<el-divider content-position="left">配装</el-divider>
					<div class="u-equipbox">
						<!-- <Equip :id="item.equip" v-if="item.equip_type == 'jx3box'" /> -->
						<pz class="m-macro-pz" :raw="pz"></pz>
					</div>
				</template>
			</div>
		</singlebox>
	</div>
</template>

<script>
// 依赖模块
import singlebox from "@/components/cms-single";
import RenderTalent from "@jx3box/jx3box-talent2/src/RenderTalent2.vue";
import pz from "./pz.vue";
import macro from "@/components/macro.vue";
import talent from "@jx3box/jx3box-talent";
import { copy } from "@/utils/clipboard";

// 本地数据
import { getPost } from "../../service/post.js";
import { getStat, postStat } from "@jx3box/jx3box-common/js/stat";
import xfmap from "@jx3box/jx3box-data/data/xf/xf.json";
import { appKey } from "../../../setting.json";
import { __iconPath, __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";

export default {
	name: "single",
	props: ["id"],
	data: function () {
		return {
			loading: false,
			post: {},
			stat: {},
			data: [],
			active: "0",
			talents: [],
		};
	},
	computed: {
		lang: function () {
			return this.post?.lang || "cn";
		},
		author_id: function () {
			return this.post?.post_author || 0;
		},
		xf: function () {
			return this.post?.post_subtype;
		},
		xficon_id: function () {
			return this.xf && xfmap[this.xf]?.id;
		},
		zlp: function () {
			return this.post?.zlp || "未知";
		},
		visible: function () {
			return this.post?._check;
		},
		client: function () {
			return this.$store.state.client;
		},
		pz: function () {
			return this.post?.pz;
		},
		hasPz: function () {
			return this.post?.pz?.some((item) => {
				return !!item.id;
			});
		},
	},
	methods: {
		copy,
		getTalentSQ: function (talent) {
			if (talent) {
				try {
					let _parsed = JSON.parse(talent);
					return _parsed.sq;
				} catch (e) {
					console.log(e);
				}
			} else {
				return "";
			}
		},
		getTalentTXT: function (i) {
			return this.talents[i];
		},
		updateExtend: function (val) {
			this.$store.state.extend = val;
		},
		xficon: function (val) {
			return __imgPath + "image/xf/" + val + ".png";
		},
		iconURL: function (val) {
			return __iconPath + "icon/" + val + ".png";
		},
	},
	mounted: function () {
		if (this.id) {
			this.loading = true;
			getPost(this.id)
				.then((res) => {
					this.post = this.$store.state.post = res.data.data;
					this.data = this.post?.post_meta?.data;
					this.$store.state.client = this.post?.client;
					this.$store.state.user_id = this.post?.post_author;
					document.title = this.post?.post_title;
				})
				.then(() => {
					if (this.data && this.data.length) {
						let activeTabName = new URLSearchParams(window.location.search).get("tab");
						if (activeTabName) {
							this.data.forEach((item, i) => {
								if (item.name === activeTabName) this.active = i.toString();
							});
						}

						if (this.client !== "origin") {
							// 正式服
							this.data.forEach((item, i) => {
								let container = `#talent-box-${i}`;
								let schema = item.talent;
								if (schema) {
									try {
										schema = JSON.parse(schema);
										schema.container = container;
                                        schema.client = schema.client || 'std';

										let ins = new talent(schema);
										ins.then((t) => {
											this.talents.push(t.txt.toString());
										});
									} catch (e) {
										this.$notify.error({
											title: "错误",
											message: "奇穴编码解析失败",
											position: "bottom-right",
										});
									}
								}
							});
						}
					}
				})
				.finally(() => {
					this.loading = false;
				});

			getStat(appKey, this.id).then((res) => {
				this.stat = this.$store.state.stat = res.data;
			});
			postStat(appKey, this.id);
		}
	},
	components: {
		singlebox,
		macro,
		RenderTalent,
		pz,
	},
};
</script>

<style lang="less">
@import "../../assets/css/single.less";
@import "../../assets/css/macro.less";
</style>
