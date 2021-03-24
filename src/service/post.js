import { $ } from "./axios";
import { __server } from "@jx3box/jx3box-common/data/jx3box.json";
const API_LIST = "post/list";
const API_SINGLE = "post/find";
import failCallback from "../utils/fail";

function getMyPostCount(params) {
    return $.get(__server + "cms/my/post/count", {
        params: params,
    });
}

function getMyPost(params) {
    return $.get(__server + "cms/my/post", {
        params: params,
    });
}

function getPosts(params, vm) {
    let query = {
        type: "macro",
    };
    if (params) {
        query = Object.assign(query, params);
    }

    return $.get(API_LIST, {
        params: query,
    }).catch((err) => {
        failCallback(err, vm);
    });
}
function getPost(pid, vm) {
    return $.get(API_SINGLE, {
        params: {
            id: pid,
        },
    }).catch((err) => {
        failCallback(err, vm);
    });
}

export { getPosts, getPost, getMyPostCount, getMyPost };
