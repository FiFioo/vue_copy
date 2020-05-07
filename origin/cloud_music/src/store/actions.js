/**
 * @Author niansnana
 * @Begin 2020年4月10日18:13:02
 * @Info actions 异步操作集
 */
import * as types from './mutation-types'

export const selectSong = function ({ commit }, { list, data, index }) {
  commit(types.SET_PLAYLIST, list) // 获取歌单数据
  commit(types.SET_CURRENT_INDEX, index) // 获取当前下标的歌曲数据
  commit(types.SET_FULL_SCREEN, true) // 歌单详情展开
  commit(types.SET_SONG_DATA, data) // 获取当前歌曲的id编号
  commit(types.SET_PLAYING_STATE, true) // 歌曲开始播放
}
export const storageAccount = function ({ commit }, { token, data }) {
  commit(types.SET_TOKEN, token)
  commit(types.SET_ACCOUNT_INFO, data)
}
