<template>
  <div :class="slideClass">
    <slot></slot>
  </div>
</template>
<script>
/**
 * @file slide.vue
 * @description 轮播单个组件
 * @createTime 2018年12月10日11:52:58
 */
export default {
  name: 'Slide',
  data() {
    return {
      slideClass: 'swiper-slide'
    }
  },
  ready() {
    this.update()
  },
  mounted() {
    this.update()
    if (this.$parent && this.$parent.options && this.$parent.options.slideClass) {
      this.slideClass = this.$parent.options.slideClass
    }
  },
  updated() {
    this.update()
  },
  attached() {
    this.update()
  },
  methods: {
    update() {
      if (this.$parent && this.$parent.swiper) {
        this.$parent.update()
      }
    }
  }
}
</script>
