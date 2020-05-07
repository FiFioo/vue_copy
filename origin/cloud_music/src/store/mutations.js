/**
 * @Author niansnana
 * @Begin 2020年4月10日18:13:02
 * @Info mutations
 * @Tip mutation-types：存在意义是为了Eslint常量检测，判断是否正确
 */
import * as types from './mutation-types'
const mutations = {
  [types.SET_SONG_DATA] (state, data) {
    state.songData = data
  },
  [types.SET_PLAYING_STATE] (state, flag) {
    state.playing = flag
  },
  [types.SET_FULL_SCREEN] (state, flag) {
    state.fullScreen = flag
  },
  [types.SET_PLAYLIST] (state, list) {
    state.playList = list
  },
  [types.SET_CURRENT_INDEX] (state, index) {
    state.currentIndex = index
  },
  [types.SET_SHOW_COMMENT] (state, flag) {
    state.isShowComment = flag
  },
  [types.SET_TOKEN] (state, data) {
    state.token = data
  },
  [types.SET_ACCOUNT_INFO] (state, data) {
    state.accountInfo = data
  },
  [types.SET_USER_LEVEL] (state, num) {
    state.userLevel = num
  },
  [types.SET_ACCOUNT_UID] (state, num) {
    state.accountUid = num
  }
}
export default mutations
