import axios from "axios";

axios.defaults.timeout = 30000;
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";

//const api_url = process.env.NODE_ENV === "development"  ? "http://47.102.197.151:3000/" : "";
const api_url = "http://47.102.197.151:3000/";
// type:资源类型,对应以下类型,默认为 0 即PC
//     0: pc
//     1: android
//     2: iphone
//     3: ipad
const banner_url = api_url + "banner?type=1?limit=5";
const playlist_url = api_url + "top/playlist?limit=6";
// type: 地区类型 id,对应以下:
    // 全部:0
    // 华语:7
    // 欧美:96
    // 日本:8
    // 韩国:16
const new_song_url = api_url + "top/song?type=8";
export default {
    get_banner(){
        return axios.get(banner_url);
    },
    get_playlist(){
        return axios.get(playlist_url);
    },
    get_new_song(){
        return axios.get(new_song_url);
    }
};