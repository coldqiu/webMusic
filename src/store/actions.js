// 对mutation封装操作，异步修改数据；
// 当一个操作要触发多个mutation时,可以将这多个mutation封装到一个 action,
// 需要异步操作时需要 action

import * as types from './mutation-types'

export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}
