import Vue from "vue";
import VueRouter from "vue-router";
import DefaultLayout from "@/layout/ListLayout.vue";
import SingleLayout from "@/layout/SingleLayout.vue";

Vue.use(VueRouter);

const routes = [

    // 列表
    {
        name: "list",
        path: "/",
        component: DefaultLayout,
        redirect: {
            name: 'index'
        },
        children: [
            {
                name: "index",
                path: "",
                component: () => import("@/views/Index.vue"),
            },
            {
                name: "bucket",
                path: "/bucket",
                component: () => import("@/views/Bucket.vue"),
            },
            {
                name: "fav",
                path: "/fav",
                component: () => import("@/views/Fav.vue"),
            },
            {
                name: "landspace",
                path: "/landspace",
                component: () => import("@/views/Landspace.vue"),
            },
            {
                name: "rank",
                path: "/rank",
                component: () => import("@/views/Rank.vue"),
            },
        ]
    },

    // 详情
    {
        name: "post",
        path: "/:id(\\d+)",
        component: SingleLayout,
        redirect: {
            name: 'detail'
        },
        children: [
            {
                name: "detail",
                path: "",
                component: () => import("@/views/Single.vue"),
            }
        ]
    },

    // 应用
    {
        name: "macroeditor",
        path: "/macroeditor",
        component: () => import("@/views/MacroEditor.vue")
    },
    {
        name: "talent",
        path: "/talent",
        component: () => import("@/views/Talent.vue")
    },
    {
        name: "talent2",
        path: "/talent2",
        component: () => import("@/views/Talent2.vue")
    },
    {
        name: "meridians",
        path: "/meridians",
        component: () => import("@/views/Meridians.vue")
    },
];

const router = new VueRouter({
    routes,
    mode: 'history',
    base: '/macro'
});

export default router;
