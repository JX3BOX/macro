import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let store = {
    state: {
        client: location.href.includes("origin") ? "origin" : "std",
        subtype: "",
        // post
        id: 0,
        user_id: 0,
        post: "",
        extend : {
            collection_data : '',
            directory : false,
        },

        // 通你妹
        selectMeridians: [],
        defineMeridians: [],
    },
    mutations: {
        switchClient: function(state, val) {
            state.client = val || "std";
        },
        setSelect(state, select){
            state.selectMeridians = select
        },
        setDefine(state, define){
            state.defineMeridians = define
        }
    },
    getters: {},
    actions: {},
    modules: {},
};

export default new Vuex.Store(store);
