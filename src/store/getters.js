// 通常从getters中取数据映射到component

export const singer = state => state.singer

export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playlist = state => state.playlist

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

// getters 充当计算属性
export const currentSong = state => {
  return state.playlist[state.currentIndex] || {}
}
