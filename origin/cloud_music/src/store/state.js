/**
 * @Author niansnana
 * @Begin 2020年4月10日18:13:02
 * @Info state
 */
const state = {
  songData: [], // 歌曲来源
  playing: false, // 歌曲播放状态
  fullScreen: false, // 播放组件是否全屏展示
  playList: [], // 歌曲全部数据
  currentIndex: -1, // 当前播放下标
  isShowComment: false, // 是否显示歌曲品论
  token: '', // token验证
  accountInfo: {}, // 登录账户信息,
  userLevel: 0, // 用户账户等级,
  accountUid: '' // 用户UId
}
export default state
