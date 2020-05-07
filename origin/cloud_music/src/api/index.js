/**
 * @Author niansnana
 * @Begin 2020年4月2日17:52:13
 * @Update log: 编写接口回调
 */
import axios from 'axios'
import {
  bannerCarousel,
  playList,
  newSong,
  newAlbum,
  playCatList,
  playhigHqualityList,
  playlistDetail,
  songUrl,
  songComment,
  userDetail,
  userLogin,
  userLoginStatus,
  userPunch,
  userInfo,
  userSubcount,
  userPlaylist,
  musicEvent,
  userLogout,
  search,
  searchSuggest,
  searchHot,
  searchHotDetail
} from './config'
// 请求超时时间
axios.defaults.timeout = 30000
axios.defaults.withCredentials = true
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

export default {
  /**
   * 发现页面轮播图
   */
  bannerCarouselFn () {
    return axios.get(bannerCarousel)
  },
  /**
   * 发现页推荐歌单
   * @param {number} limit 限制展示个数:)默认为6个
   */
  playListFn (limit = 6) {
    return axios.get(playList, {
      params: {
        limit
      }
    })
  },
  /**
   * 发现页获取最新歌曲
   * @param {string} type 歌曲类型
   * @param {number} limit 限制数量
   */
  getNewSongFn (type, limit) {
    return axios.get(newSong, {
      params: {
        type,
        limit
      }
    })
  },
  /**
   * 发现页最新碟片
   * @param {number} limit 限制数量
   */
  getNewAlbumFn (limit) {
    return axios.get(newAlbum, {
      params: {
        limit
      }
    })
  },
  /**
   * 歌单广场
   * @param {number} limit
   * @param {string} order 分类两种 new || hot
   * @param {*} cat 标签类型
   */
  getPlayCatListFn (limit = 30, order = 'hot', cat) {
    return axios.get(playCatList, {
      params: {
        limit,
        order,
        cat
      }
    })
  },
  getPlayhigHqualityListFn (limit = 30) {
    return axios.get(playhigHqualityList, {
      params: {
        limit
      }
    })
  },
  getPlaylistDetailFn (id) {
    return axios.get(playlistDetail, {
      params: {
        id
      }
    })
  },
  /**
   * 获取歌曲链接
   * @param {*} id 歌曲ID
   * @param {*} br 歌曲质量
   */
  getSongUrlFn (id, br) {
    return axios.get(songUrl, {
      params: {
        id,
        br
      }
    })
  },
  /**
   * 获取歌曲评论
   * @param {*} id 歌曲id
   * @param {*} num 获取评论数
   */
  getSongComment (id, num) {
    return new Promise((resolve, reject) => {
      axios.get(songComment, {
        params: {
          id,
          num
        }
      }).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },
  /**
   * 获取用户详情
   * @param {*} uid
   */
  getUserDetail (uid) {
    return axios.get(userDetail, {
      params: {
        uid
      }
    })
  },
  /**
   * 用户手机号登录
   * @param {*} phone 手机号
   * @param {*} password 密码
   */
  getUserLogin (phone, password) {
    return axios.get(userLogin, {
      params: {
        phone,
        password
      }
    })
  },
  getUserLoginStatusFn () {
    return axios.get(userLoginStatus)
  },
  getUserLogout () {
    return axios.get(userLogout)
  },
  /**
   * 用户打卡签到
   * @param {*} type 签到类型 , 默认 0, 其中 0 为安卓端签到 ,1 为 web/PC 签到
   */
  getUserPunchFn (type) {
    return axios.get(userPunch, {
      params: type
    })
  },
  /**
   * 用户信息
   * @param {*} uid 识别id
   */
  getUserInfoFn (uid) {
    return axios.get(userInfo, {
      params: {
        uid
      }
    })
  },
  /**
   * 获取用户信息 , 歌单，收藏，mv, dj 数量
   */
  getUserSubcountFn () {
    return axios.get(userSubcount)
  },
  /**
   * 获取用户歌单
   * @param {*} uid 用户识别 uid
   */
  getuserPlaylistFn (uid) {
    return axios.get(userPlaylist, {
      params: {
        uid
      }
    })
  },
  /**
   * 获取动态消息
   * @param {*} pagesize 每页数据,默认20
   * @param {*} lasttime 返回数据的 lasttime ,默认-1,传入上一次返回结果的 lasttime,将会返回下一页的数据
   */
  getMusicEventFn (pagesize, lasttime) {
    return axios.get(musicEvent, {
      params: {
        pagesize,
        lasttime
      }
    })
  },
  /**
   * 搜索音乐
   * @param {*} keywords 关键词
   * @param {*} limit 返回搜索数量
   * @param {*} type 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
   */
  getSearchFn (keywords, limit, type) {
    return axios.get(search, {
      params: {
        keywords,
        limit,
        type
      }
    })
  },
  /**
   * 搜索建议
   * @param {*} keywords 关键词
   * @param {*} type 可选参数，如果传 'mobile' 则返回移动端数据
   */
  getSearchSuggestFn (keywords, type = 'mobile') {
    return axios.get(searchSuggest, {
      params: {
        keywords,
        type
      }
    })
  },
  /**
   * 热搜列表（简略）
   */
  getSearchHotFn () {
    return axios.get(searchHot)
  },
  /**
   * 热搜列表（详细）
   */
  getSearchHotDetailFn () {
    return axios.get(searchHotDetail)
  }
}
