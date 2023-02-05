import Vue from "vue";
import VueRouter from "vue-router";

const Index = () => import("../views/Index.vue");
const Bucket = () => import("../views/Bucket.vue");
const Fav = () => import("../views/Fav.vue");
const Landspace = () => import("../views/Landspace.vue");
const Rank = () => import("../views/Rank.vue");
const Post = () => import("../views/Post.vue");

Vue.use(VueRouter);

const routes = [
    { name: "index", path: "/", component: Index },
    { name: "post", path: "/:id(\\d+)", component: Post },
    { name: "bucket", path: "/bucket", component: Bucket },
    { name: "fav", path: "/fav", component: Fav },
    { name: "landspace", path: "/landspace", component: Landspace },
    { name: "rank", path: "/rank", component: Rank },
];

const router = new VueRouter({
    routes,
    mode: 'history',
    base: '/macro'
});

export default router;
