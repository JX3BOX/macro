import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let store = {
    state: {
        // 模式
        mode : '',

        // 列表
        subtype : '',

        // 单页
        pid : 0,
        post : {},
        meta : {},
        stat : {},
        author : {},
        status : false,

        my_macro_count : 0
    },
    mutations: {
    },
    getters: {
    },
    actions: {},
    modules: {}
};

export default new Vuex.Store(store);
