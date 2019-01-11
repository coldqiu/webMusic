<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs">
      <span>xxxxxxxxxxxxxxxx</span>
    </music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list'
  import {mapGetters} from 'vuex'
  import {getSongList} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'

  export default {
    data() {
      return {
        songs: []
      }
    },
    computed: {
      ...mapGetters([
          'disc'
        ]),
      title() {
        console.log("this.disc", this.disc)
        return this.disc.dissname

      },
      bgImage () {
        return this.disc.imgurl
      }
    },
    created() {
      this._getSongList()
    },
    methods: {
      _getSongList() {
        if (!this.disc.dissid) {
          this.$router.push('/recommend')
          return
        }
        getSongList(this.disc.dissid).then((res) => {
          if (res.code === ERR_OK) {
            console.log("ok")
            console.log("res,,,,",res)
            this.songs = this._normalizeSongs(res.cdlist[0].songlist)
            console.log("this.songs:", this.songs)
          }
        })
      },
      _normalizeSongs(list) {
        // 传入的是songlist 数组， 将每一个元素都变成song类
        let ret = []
        console.log("list", list)
        list.forEach((musicData) => {
          if (musicData.songid && musicData.albumid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
    },
    components: {
      MusicList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slider-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    tranform: translate3d(100%, 0, 0)
  /**/
</style>
