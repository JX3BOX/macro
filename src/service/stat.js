import { $next } from "@jx3box/jx3box-common/js/axios";
const stat = "api/post/";

function getStat(id) {
    return $next
        .get(stat + id + "/stat")
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        });
}

function postStat(id) {
    let type = location.pathname.split("/")[1];
    return $next.get(stat + id + "/summary", {
        params: {
            type: type,
            actions: "views",
        },
    });
}

export { getStat, postStat };
