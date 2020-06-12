import Vue from "vue";
import VueRouter from "vue-router";

const Index = () => import("../views/Index.vue");
const Bucket = () => import("../views/Bucket.vue");
const Rank = () => import("../views/Rank.vue");

Vue.use(VueRouter);

const routes = [
    { name: "index", path: "/", component: Index },
    { name: "bucket", path: "/bucket", component: Bucket },
    { name: "rank", path: "/rank", component: Rank },
    // { name: "single", path: "/view/:id", component: Single },
];

const router = new VueRouter({
    routes,
});

export default router;
