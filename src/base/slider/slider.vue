<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>

      </slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item, index) in dots" :class="{active: currentPageIndex === index}"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import {addClass} from 'common/js/dom'

  export default {
    data() {
      return {
        dots: [],
        currentPageIndex: 0
      }
    },
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 4000
      },
      autoPlay: {
        type: Boolean,
        default: true
      }
    },
    mounted() {
      // 在mounted()中初始化组件，初始化函数写在methods中， mounted仅调用，使得代码结构合理
      // 延时20ms初始化slider,不是为了能那到数据后渲染slider组件， 获取数据是异步的！！
      // 为了确保 slider组件成功加载， 即<slot>中有数据， 所以在slider组件的外层，判断 recmmends.length

      setTimeout(() => {
        this._setSliderWidth()
        this._initDots()
        this._initSlider()

        if (this.autoPlay) {
          this._play()
        }
      }, 20)

      window.addEventListener('resize', () => {
        if (!this.slider) {
          // slider 没初始化
          return
        }
        this._setSliderWidth(true)
        this.slider.refresh()
//        clearTimeout(this.resizeTimer)
//        this.resizeTimer = setTimeout(() => {
//          if (this.slide.isInTransition) {
//            this._onScrollEnd()
//          } else {
//            if (this.autoPlay) {
//              this._play()
//            }
//          }
//          this.refresh()
//        }, 60)
      })
    },
    methods: {
      _setSliderWidth(isResize) {

        let sliderWidth = this.$refs.slider.clientWidth
        let width = 0
        this.children = this.$refs.sliderGroup.children
        console.log("this,", this.children.length)
        for (let i = 0; i < this.children.length; i++) {
          // 给每个 item 设置width, 计算全部的item宽度之和
          let child = this.children[i]
          addClass(child, 'slider-item')
          child.style.width = sliderWidth + 'px'
          width += sliderWidth
        }
        // 当设置为循环播放时，会新增2个滚动节点，sliderGroup的宽度需要增加
        if (this.loop && !isResize) {
          width += 2 * sliderWidth
        }
        this.$refs.sliderGroup.style.width = width + 'px'

      },
      _initDots() {
        this.dots = new Array(this.children.length)
      },
      _initSlider() {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: {
            loop: this.loop,
            threshold: 0.3,
            speed: 400,
          },
          click: true
        })
        this.slider.on('scrollEnd', () => {
          let pageIndex = this.slider.getCurrentPage().pageX
//          当前版本的better-scroll 不用判断循环
//          if (this.loop) {
//            pageIndex -= 1
//          }
          this.currentPageIndex = pageIndex
          if (this.autoPlay) {
            // 拖动 清除计时器
            clearTimeout(this.timer)
            this._play()
          }
        })
      },
      _play() {
        let pageIndex = this.currentPageIndex +1
        this.timer = setTimeout(() => {
//          this.slider.goToPage(pageIndex, 0, 400)
          this.slider.next()
        }, this.interval)
      }
    },
    activated() {
      if (this.autoPlay) {
        this._play()
      }
    },
    deactivated() {
      // activated & deactivated
      // activated 和 deactivated 钩子函数是专门为 keep-alive 组件定制的钩子
      console.log("asdsssf")
      clearTimeout(this.timer)
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>
