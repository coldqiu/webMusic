<template>
  <transition name="slide">
    <music-list :rank="rank" :songs="songs" :title="topInfo.ListName" :bg-image="topInfo.pic_album"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list'
  import {mapGetters} from 'vuex'
  import {getMusicList} from 'api/rank'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'
  export default {
    data() {
      return {
        musicList: {},
        songs: [],
        rank: true,
        topInfo: {}
      }
    },
    created() {
      this._getMusicList()
    },
    computed: {
      ...mapGetters([
        'topList'
      ]),
//      title() {
//        return this.topList.topTitle
//      },
//      bgImage() {
//        return this.topList.picUrl
//      }
    },
    methods: {
      _getMusicList() {
//        console.log("this.topList", this.topList)
        if (!this.topList) {
          this.$router.push('/rank')
        } else {
          getMusicList(this.topList.id).then((res) => {
            if (res.code === ERR_OK) {
              this.musicList = res
              this.topInfo = res.topinfo
              this.songs = this._normalizeSongs(res.songlist)
            }
          })
        }
      },
      // 把获取到的数据转变格式，
      _normalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
          const musicData = item.data
          if (musicData.songid && musicData.albumid) {
            ret.push(createSong(musicData))
          }
        })
//        console.log("res-ret:", ret)
        return ret
      }
    },
    components: {
      MusicList
    }

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s ease

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
  /**/
</style>
