/**
 * @Author niansnana
 * @Begin 2020年4月10日18:13:02
 * @Info getters
 */
export const songData = state => state.songData
export const playing = state => state.playing
export const fullScreen = state => state.fullScreen
export const playList = state => state.playList
export const currentIndex = state => state.currentIndex
export const currentSong = (state) => {
  return state.playList[state.currentIndex] || {}
}
export const isShowComment = state => state.isShowComment
export const token = state => state.token
export const accountInfo = state => state.accountInfo
export const userLevel = state => state.userLevel
export const accountUid = state => state.accountUid
