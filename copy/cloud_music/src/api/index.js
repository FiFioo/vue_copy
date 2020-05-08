import axios from "axios";

axios.defaults.timeout = 30000;
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";

const api_url = process.env.NODE_ENV === "development"  ? "http://47.102.197.151:3000/" : "";
// type:资源类型,对应以下类型,默认为 0 即PC
//     0: pc
//     1: android
//     2: iphone
//     3: ipad
const banner_url = api_url + "banner?type=1";
export default {
    get_banner(){
        return axios.get(banner_url);
    }
};