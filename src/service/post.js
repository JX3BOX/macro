import { $cms } from "@jx3box/jx3box-common/js/https";
import axios from "axios";
const gs_url = "https://gs.jx3box.com";

// 公共
function getPosts(params) {
    let query = {
        type: "macro",
    };
    if (params) {
        query = Object.assign(query, params);
    }
    return $cms().get("/api/cms/posts", {
        params: query,
    });
}

// global search
function globalSearch(params) {
    return axios.get(`${gs_url}/api/search`, {
        params: params,
    });
}

// 我的
function getMyPost(params) {
    let query = {
        type: "macro",
    };
    if (params) {
        query = Object.assign(query, params);
    }
    return $cms().get("/api/cms/posts/my", {
        params: query,
    });
}

// 收藏
function getFavPosts(params) {
    let query = {
        type: "macro",
    };
    if (params) {
        query = Object.assign(query, params);
    }
    return $cms().get(`/api/cms/posts/user/my/fav`, {
        params: query,
    });
}

function getPost(id) {
    return $cms().get(`/api/cms/post/${id}`);
}

function getMyPostCount() {
    return $cms().get("/api/cms/posts/user/my/count");
}

function getCustomPosts(ids) {
    return $cms().get(`/api/cms/posts`, {
        params: {
            type: "macro",
            list: ids.join(","),
        },
    });
}

function getPzList(params) {
    return $cms().get(`/api/cms/app/pz`, {
        params: params,
    });
}

function getFriendsPosts(params) {
    return $cms().get(`/api/cms/posts/user/my/friends/macro`, {
        params,
    });
}

export {
    getPosts,
    getPost,
    getMyPostCount,
    getMyPost,
    getCustomPosts,
    getPzList,
    getFriendsPosts,
    getFavPosts,
    globalSearch,
};
