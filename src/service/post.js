import { $ } from "./axios";
import { __server } from "@jx3box/jx3box-common/data/jx3box.json";
import failCallback from "../utils/fail";

function getMyPostCount() {
    return $.get("/cms/my/post/count", {
        params: {
            type : 'macro'
        },
    });
}

function getMyPost(params) {
    return $.get("/cms/my/post", {
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

    return $.get(__server + "post/list", {
        params: query,
    }).catch((err) => {
        failCallback(err, vm);
    });
}
function getPost(pid, vm) {
    return $.get(__server + "post/find", {
        params: {
            id: pid,
        },
    }).catch((err) => {
        failCallback(err, vm);
    });
}

export { getPosts, getPost, getMyPostCount, getMyPost };
