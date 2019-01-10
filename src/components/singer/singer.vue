<template>
    <div class="singer" ref="singer">
        <list-view @select="selectSinger" :data="singers" ref="list"></list-view>
        <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
  import {getSingerList} from 'api/singer'
  import Singer from 'common/js/singer'
  import ListView from 'base/listview/listview'
  import {mapMutations} from 'vuex'
  import {playlistMixin} from 'common/js/mixin'

  const HOT_NAME = "热门"
  const HOT_SINGER_LENGTH = 10
  export default {
    mixins: [playlistMixin],
    data: function () {
      return {
        singers: []
      }
    },
    created() {
      this._getSingerList()
    },

    methods: {
      handlePlaylist(playlist) {
//    error    console.log("this.$refs.singer.$el", this.$refs.singer.$el)
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.singer.style.bottom = bottom
        this.$refs.list.refresh()
      },
      _getSingerList() {
        getSingerList().then((res) => {
          if (res.code === 0) {
            this.singers = this._normalizeSinger(res.data.list)
          }
        })
      },
      _normalizeSinger(list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        list.forEach((item, index) => {
          if (index < HOT_SINGER_LENGTH) {
            map.hot.items.push(new Singer({
                id: item.Fsinger_mid,
                name: item.Fsinger_name
              })
            )
          }
          const key = item.Findex
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        })
        // 将 map 转化成有序列表
        let hot = []
        let ret = []
        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z)]/)) {
            ret.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }
        }
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        console.log("map2", hot.concat(ret))
        return hot.concat(ret)

      },
      // 监听到listView的事件，并获得参数,具体歌手
      selectSinger(singer) {
        console.log("this.$router", this.$router)
        this.$router.push({
          path: `/singer/${singer.id}`
        })
        // 提交 mutations 实际是执行了mutations.js 中的[types.SET_SINGER]函数
        this.setSinger(singer)
      },
      ...mapMutations({setSinger: 'SET_SINGER'})
    },
    components: {
      ListView
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .singer
        position: fixed
        top: 88px
        bottom: 0
        width: 100%
</style>
