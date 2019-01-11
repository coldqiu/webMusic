import {playMode} from 'common/js/config'

const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  disc: {}
}
// 不需要currentSong, playlist+currentIndex=currentSong
// currentSong 放在getters中
export default state
