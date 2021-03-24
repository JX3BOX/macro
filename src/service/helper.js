import { $helper } from "@jx3box/jx3box-common/js/https";
import axios from 'axios'

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

export { getCollection, getLinks, getNewDict };
