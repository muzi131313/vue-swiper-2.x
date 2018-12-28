/**
 * @file swiper/index.js
 * @desc {{description}}{{swiper出口}}
 * @createTime 2018年12月10日13:09:41
 */
import _Swiper from 'swiper/dist/idangerous.swiper.min.js'
import SlideComponent from './slide.vue'
import SwiperComponent from './swiper.vue'

const Swiper = window.Swiper || _Swiper
const swiper = SwiperComponent
const swiperSlide = SlideComponent
const install = function(Vue, globalOptions) {
  if (globalOptions) {
    SwiperComponent.props.globalOptions.default = () => globalOptions
  }
  Vue.component(SwiperComponent.name, SwiperComponent)
  Vue.component(SlideComponent.name, SlideComponent)
}
const VueAwesomeSwiper = { Swiper, swiper, swiperSlide, install }

export default VueAwesomeSwiper
export { Swiper, swiper, swiperSlide, install }
