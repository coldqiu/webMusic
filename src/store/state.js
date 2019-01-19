import {playMode} from 'common/js/config'
import {loadStorage} from '../common/js/cache'

const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  disc: {},
  topList: null,
  searchHistory: loadStorage()

}
// 不需要currentSong, playlist+currentIndex=currentSong
// currentSong 放在getters中
export default state
