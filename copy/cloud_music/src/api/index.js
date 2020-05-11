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
const banner_url = api_url + "banner?type=1";
const playlist_url = api_url + "top/playlist";
const playlist_catlist_url = api_url + "playlist/catlist";
const playlist_detail_url = api_url + "playlist/detail";
// type: 地区类型 id,对应以下:
    // 全部:0
    // 华语:7
    // 欧美:96
    // 日本:8
    // 韩国:16
const new_song_url = api_url + "top/song?type=8";
const song_url = api_url + "song/url"
export default {
    get_banner(){
        return axios.get(banner_url);
    },
    get_playlist(limit=5, cat="全部"){
        return axios.get(playlist_url, {
            params: {
                limit,
                cat
            }
        });
    },
    get_new_song(){
        return axios.get(new_song_url);
    },
    get_playlist_catlist(){
        return axios.get(playlist_catlist_url);
    },
    get_playlist_detail(id){
        return axios.get(playlist_detail_url, {
            params: {
                id
            }
        })
    },
    get_song(id){
        return axios.get(song_url, {
            params: {
                id
            }
        })
    }
};