import axios from "axios";
import { __next } from "@jx3box/jx3box-common/js/jx3box.json";

const rank = __next + 'api/macro/tops' //TODO:
// const rank = "/api/macro/tops";

const overview =  __next + 'api/macro/overview'  //TODO:
// const overview = "/api/macro/overview";

function getRank(kungfuid, limit = 50) {
    return axios
        .get(rank, {
            params: {
                kungfu: kungfuid,
                size: limit,
                // _no_cache:1,
            },
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        });
}

function getOverview(limit = 50) {
    return axios
        .get(overview, {
            params: {
                size: limit,
                // _no_cache:1,
            },
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        });
}

export { getRank, getOverview };
