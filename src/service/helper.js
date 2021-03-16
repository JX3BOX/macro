import axios from "axios";
import { __helperUrl } from "@jx3box/jx3box-common/js/jx3box.json";
import {
    installInterceptors,
    installNextInterceptors,
} from "@jx3box/jx3box-common/js/axios";

const $http = axios.create({
    withCredentials: true,
    // baseURL: process.env.NODE_ENV === "production" ? __helperUrl : "/",
    baseURL: __helperUrl,
});
installInterceptors($http);

function getCollection($collection_id, params = {}) {
    return $http({
        method: "GET",
        url: `/api/post/collection/${$collection_id}`,
        headers: { Accept: "application/prs.helper.v2+json" },
        params: params,
    });
}

function getLinks() {
    return axios.get(__helperUrl + "api/menu_group/macro-links");
}

const dict_url = `https://cdn.jsdelivr.net/gh/JX3BOX/jx3box-dict@master/dict.json?v=${Date.now()}`;
function getNewDict() {
    return axios.get(dict_url);
}

export { $http, getCollection, getLinks, getNewDict };
