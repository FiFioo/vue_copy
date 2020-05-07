/**
 * @Author niansnana
 * @Begin 2020年4月2日17:52:13
 * @Update log: 编写请求接口地址
 */
// const api = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:3000/' : 'http://47.102.197.151:3000/'
const api = process.env.NODE_ENV === 'development' ? 'http://47.102.197.151:3000/' : 'http://47.102.197.151:3000/'
/**
 * Tip
 * 解释下上面注释的原因：因为懒，接口我直接放到服务器上，统一一个地址，故本地并没有开启，因而注释。
 * 好了，继续写bug了。
 */

// 发现页
export const bannerCarousel = api + 'banner?type=1' // 轮播图
export const playList = api + 'top/playlist' // 歌单广场
export const newSong = api + 'top/song' // 最新歌曲，type=0，代表分类全部
export const newAlbum = api + 'top/album' // 最新碟片
export const playCatList = api + 'top/playlist' // 获取歌单分类
export const playhigHqualityList = api + 'top/playlist/highquality' // 获取精品歌单
export const playlistDetail = api + 'playlist/detail' // 跳转歌单详情页
export const songUrl = api + 'song/url' // 获取音乐url
export const songComment = api + 'comment/music' // 获取对应的歌曲评论
// 我的页面，登录页面
export const userDetail = api + 'user/detail' // 获取用户信息
export const userLogin = api + 'login/cellphone' // 用户手机号登录
export const userLoginStatus = api + 'login/status' // 用户登录状态，保佑啊
export const userLogout = api + 'logout' // 用户退出登录
export const userPunch = api + 'daily_signin' // 用户签到
export const userInfo = api + 'user/detail' // 获取用户详细信息
export const userSubcount = api + 'user/subcount' // 获取用户信息，歌单，收藏，mv，dj数量
export const userPlaylist = api + 'user/playlist' // 获取用户歌单
// 云村页面
export const musicEvent = api + 'event' // 获取动态消息
// 搜索页面
export const search = api + 'search' // 搜索
export const searchSuggest = api + 'search/suggest' // 搜索
export const searchHot = api + 'search/hot' // 热搜列表(简略)
export const searchHotDetail = api + 'search/hot/detail' // 热搜列表(详细)
