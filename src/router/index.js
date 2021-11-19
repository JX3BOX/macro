import Vue from "vue";
import VueRouter from "vue-router";

const Index = () => import("../views/Index.vue");
const Bucket = () => import("../views/Bucket.vue");
const Fav = () => import("../views/Fav.vue");
const Rank = () => import("../views/Rank.vue");
const Landspace = () => import("../views/Landspace.vue");

Vue.use(VueRouter);

const routes = [
    { name: "index", path: "/", component: Index },
    { name: "bucket", path: "/bucket", component: Bucket },
    { name: "fav", path: "/fav", component: Fav },
    { name: "landspace", path: "/landspace", component: Landspace },
    { name: "rank", path: "/rank", component: Rank },
];

const router = new VueRouter({
    routes,
});

export default router;
