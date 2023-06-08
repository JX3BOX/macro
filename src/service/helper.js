import { $helper, $cms } from "@jx3box/jx3box-common/js/https";
import axios from "axios";

// 关联文档
function getCollection($collection_id, params = {}) {
    return $helper()({
        method: "GET",
        url: `/api/post/collection/${$collection_id}`,
        params: params,
    });
}

const dict_url = `https://cdn.jsdelivr.net/gh/JX3BOX/jx3box-dict@master/dict.json?v=${Date.now()}`;
function getNewDict() {
    return axios.get(dict_url);
}


// 公告
function getBread(key) {
    return $cms({ mute: true }).get(`/api/cms/breadcrumb/${key}`);
}


// 边栏文档
function getMenuGroup(name) {
    return $cms({ mute: true }).get(`/api/cms/menu-group/${name}`, {});
}
function getMenuGroups(keys) {
    return $cms({ mute: true }).get(`/api/cms/menu-group`, {
        params: {
            key: keys
        },
    });
}

export { getCollection, getNewDict, getMenuGroup, getBread, getMenuGroups };
