<template>
  <div class="swiper-container">
    <div :class="classes.wrapperClass">
      <slot></slot>
    </div>
  </div>
</template>
<script>
/**
 * @file swiper/index.vue
 * @description 轮播容器组件
 * @doc https://2.swiper.com.cn/usage/index.html
 * @support ie9+
 * @dependency swiper: 2.7.6
 * @createTime 2018年12月04日17:59:49
 */
// require sources
import _Swiper from 'swiper/dist/idangerous.swiper.min.js'
const Swiper = window.Swiper || _Swiper

// pollfill
if (typeof Object.assign !== 'function') {
  Object.defineProperty(Object, 'assign', {
    value(target, varArgs) {
      if (target === null) {
        throw new TypeError('Cannot convert undefined or null to object')
      }
      const to = Object(target)
      for (let index = 1; index < arguments.length; index++) {
        const nextSource = arguments[index]
        if (nextSource !== null) {
          for (const nextKey in nextSource) {
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey]
            }
          }
        }
      }
      return to
    },
    writable: true,
    configurable: true
  })
}

// as of swiper 2.7.6
// https://2.swiper.com.cn/api/callbacks/2014/1218/137.html
const DEFAULT_EVENTS = [
  'FirstInit',
  'Init',
  'SwiperCreated',
  'TouchStart',
  'TouchMove',
  'TouchEnd',
  'SlideReset',
  'SlideChangeStart',
  'SlideChangeEnd',
  'SlideNext',
  'SlidePrev',
  'SlideClick',
  'SlideTouch',
  'ImagesReady',
  'MomentumBounce',
  'AutoplayStop',
  'AutoplayStart',
  'ResistanceBefore',
  'ResistanceAfter',
  'SetWrapperTransition',
  'SetWrapperTransform'
]

export default {
  name: 'Swiper',
  props: {
    // swiper选项
    options: {
      type: Object,
      default: () => ({})
    },
    // 全局选项
    globalOptions: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  data() {
    return {
      swiper: null,
      classes: {
        wrapperClass: 'swiper-wrapper'
      }
    }
  },
  mounted() {
    if (!this.swiper) {
      let setClassName = false
      for (const className in this.classes) {
        if (this.classes.hasOwnProperty(className)) {
          if (this.options[className]) {
            setClassName = true
            this.classes[className] = this.options[className]
          }
        }
      }
      setClassName ? this.$nextTick(this.mountInstance) : this.mountInstance()
    }
  },
  activated() {
    this.update()
  },
  updated() {
    this.update()
  },
  beforeDestroy() {
    this.$nextTick(function() {
      if (this.swiper) {
        this.swiper.destroy && this.swiper.destroy()
        delete this.swiper
      }
    })
  },
  methods: {
    update() {
      if (this.swiper) {
        // ?
        this.swiper.reInit()
      }
    },
    mountInstance() {
      console.log('this.$el: ', this.$el)
      const swiperOptions = Object.assign({}, this.globalOptions, this.options)
      this.swiper = new Swiper(this.$el, swiperOptions)
      this.bindEvents()
      this.$emit('ready', this.swiper)
    },
    bindEvents() {
      const vm = this
      DEFAULT_EVENTS.forEach(eventName => {
        this.swiper.addCallback(eventName, function() {
          vm.$emit(eventName, ...arguments)
          vm.$emit(eventName.replace(/([A-Z])/g, '-$1').toLowerCase(), ...arguments)
        })
      })
    }
  }
}
</script>
