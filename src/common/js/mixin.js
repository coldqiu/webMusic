import {mapGetters} from 'vuex'

export const playlistMixin = {
  computed: {
    // 拿到 playlist
    ...mapGetters([
        'playlist'
      ]
    )
  },
  // dom ready 触发mounted()
  mounted() {
    this.handlePlaylist(this.playlist)
  },
  // 被 <keep-alive>组件包裹的页面再次显示时，触发 activated()
  activated() {
    this.handlePlaylist(this.playlist)

  },
  watch: {
    // 监听 playlist的变化
    playlist(newVal) {
      this.handlePlaylist(newVal)
    }
  },
  methods: {
    // 上面的所有钩子都会执行这个函数，
    // 但这个函数的具体逻辑有各个调用mixin的组件完成
    // 组件中定义了handlePlaylist函数会覆盖mixin中的，
    // 没定义就报这个错误
    handlePlaylist() {
      throw new Error('component must implement handlePlaylist method')
    }
  }
}
