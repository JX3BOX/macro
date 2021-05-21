import { $cms } from "@jx3box/jx3box-common/js/https";

function getMyPost(params) {
    return $cms().get("/api/cms/posts/my", {
        params: params,
    });
}

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
function getPost(id) {
    return $cms().get(`/api/cms/post/${id}`);
}

function getMyPostCount() {
    return $cms().get("/api/cms/posts/user/my/count");
}

function getCustomPosts(ids){
    return $cms().get(`/api/cms/posts`,{
        params : {
            type : 'macro',
            list : ids.join(',')
        }
    })
}

export { getPosts, getPost, getMyPostCount, getMyPost ,getCustomPosts};
