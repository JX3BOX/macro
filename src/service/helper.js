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
    return $helper({ mute: true }).get(`/api/breadcrumb/${key}`);
}


// 边栏文档
function getMenuGroup(name) {
    return $helper({ mute: true }).get(`/api/menu_group/${name}`, {});
}
function getMenuGroups(keys) {
    return $helper({ mute: true }).get(`/api/menu_groups`, {
        params: {
            names:keys
        },
    });
}

export { getCollection, getNewDict, getMenuGroup, getBread, getMenuGroups };
