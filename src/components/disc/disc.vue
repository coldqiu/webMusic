<template>
  <transition name="slide">
    <music-list></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list'

  export default {
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
