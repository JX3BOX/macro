import axios from "axios";
import { __server } from "@jx3box/jx3box-common/data/jx3box.json";
const $ = axios.create({
    baseURL: process.env.NODE_ENV === "production" ? __server : "/" ,
    withCredentials: true,
});

export { $, axios };
