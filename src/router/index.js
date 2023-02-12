import Vue from "vue";
import VueRouter from "vue-router";

import AppLayout from "@/layout/AppLayout.vue";
const Index = () => import("@/views/Index.vue");
const Bucket = () => import("@/views/Bucket.vue");
const Fav = () => import("@/views/Fav.vue");
const Landspace = () => import("@/views/Landspace.vue");
const Rank = () => import("@/views/Rank.vue");
const Post = () => import("@/views/Post.vue");

Vue.use(VueRouter);

const routes = [{
    name: "home",
    path: "/",
    component: AppLayout,
    redirect: {
        name: 'index'
    },
    children: [{
        name: "index",
        path: "",
        component: Index
    }, {
        name: "post",
        path: "/:id(\\d+)",
        component: Post
    },
    {
        name: "bucket",
        path: "/bucket",
        component: Bucket
    },
    {
        name: "fav",
        path: "/fav",
        component: Fav
    },
    {
        name: "landspace",
        path: "/landspace",
        component: Landspace
    },
    {
        name: "rank",
        path: "/rank",
        component: Rank
    },
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
