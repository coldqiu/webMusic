<template>
    <transition name="slider">
        <music-list :songs="songs" :title="title" :bgImage="bgImage"></music-list>
    </transition>
</template>

<script type="text/ecmascript-6">
  // 获取 singer.vue 存的singer数据并展示在component
  import {mapGetters} from 'vuex'
  import {getSingerDetail} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'
  import MusicList from 'components/music-list/music-list'

  export default {
    data() {
      return {
        songs: []
      }
    },
    computed: {
      title() {
        return this.singer.name
      },
      ...mapGetters([
        'singer'
      ]),
      bgImage() {
        return this.singer.avatar
      }
    },
    created() {
      console.log("this.singer-singer-detail:", this.singer)
      this._getDetail()
    },
    methods: {
      _getDetail() {
        if (!this.singer.id) {
          this.$router.push('/singer')
          return
        }
        getSingerDetail(this.singer.id).then((res) => {
          if (res.code === ERR_OK) {
            console.log("res-getSingerDetail:", res.data.list)
            this.songs = this._normalizeSongs(res.data.list)
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
          let {musicData} = item
          // 判断 createSong 的参数必须有
          if (musicData.songid && musicData.albumid) {
            ret.push(createSong(musicData))
          }
        })
        console.log("ret:", ret)
        return ret
      }
    },
    components: {
      MusicList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"

    .slider-enter-active, .slider-leave-active
        transition: all 0.3s

    .slider-enter, .slider-leave-to {
        transform: translate3d(100%, 0, 0)
    }

    /**/
</style>
