import { __helperUrl } from "@jx3box/jx3box-common/js/jx3box.json";
import axios from "axios";

function getLinks() {
    return axios.get(__helperUrl + "api/menu_group/macro-links");
}

export { getLinks };