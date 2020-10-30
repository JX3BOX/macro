import { $next } from "@jx3box/jx3box-common/js/axios";

function getRank(kungfuid, limit = 50) {
    return $next
        .get("api/macro/tops", {
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
    return $next
        .get("api/macro/overview", {
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
