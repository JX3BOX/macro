import { $helper } from "@jx3box/jx3box-common/js/https";
import axios from "axios";

function getCollection($collection_id, params = {}) {
    return $helper()({
        method: "GET",
        url: `/api/post/collection/${$collection_id}`,
        params: params,
    });
}

function getLinks() {
    return $helper().get("api/menu_group/macro-links");
}

const dict_url = `https://cdn.jsdelivr.net/gh/JX3BOX/jx3box-dict@master/dict.json?v=${Date.now()}`;
function getNewDict() {
    return axios.get(dict_url);
}

function getMenuGroup(name) {
    return $helper({ mute: true }).get(`/api/menu_group/${name}`, {});
}

function getBread(key) {
    return $helper({ mute: true }).get(`/api/breadcrumb/${key}`);
}

export { getCollection, getLinks, getNewDict, getMenuGroup, getBread };
