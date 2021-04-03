import { $next } from "@jx3box/jx3box-common/js/https.js";
function getRank(kungfuid, limit = 50) {
    return $next({ mute: true })
        .get("/api/macro/tops", {
            params: {
                kungfu: kungfuid,
                size: limit,
                // _no_cache:1,
            },
        })
        .then((res) => {
            return res.data;
        });
}

function getOverview(limit = 50) {
    return $next({ mute: true })
        .get("/api/macro/overview", {
            params: {
                size: limit,
                // _no_cache:1,
            },
        })
        .then((res) => {
            return res.data;
        });
}

export { getRank, getOverview };
