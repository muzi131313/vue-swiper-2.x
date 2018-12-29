import _Swiper from 'swiper/dist/idangerous.swiper.min.js'
import objectAssign from 'object-assign'

const Swiper = window.Swiper || _Swiper

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

// swiperDirective
const swiperDirective = globalOptions => {
  // Get swiper instace name in directive
  const getInstanceName = (el, binding, vnode) => {
    let instanceName = null
    if (binding.arg) {
      instanceName = binding.arg
    }
    else if (vnode.data.attrs && (vnode.data.attrs.instanceName || vnode.data.attrs['instance-name'])) {
      instanceName = (vnode.data.attrs.instanceName || vnode.data.attrs['instance-name'])
    }
    else if (el.id) {
      instanceName = el.id
    }
    return instanceName || 'swiper'
  }

  return {

    // Init
    bind(el, binding, vnode) {
      // const self = vnode.context
      if (el.className.indexOf('swiper-container') === -1) {
        el.className += ((el.className ? ' ' : '') + 'swiper-container')
      }
    },

    // DOM inserted
    inserted(el, binding, vnode) {
      const self = vnode.context
      const options = binding.value
      const instanceName = getInstanceName(el, binding, vnode)
      let swiper = self[instanceName]

      // Emit event in Vue directive
      const eventEmit = (vnode, name, data) => {
        const handlers = (vnode.data && vnode.data.on)
          || (vnode.componentOptions && vnode.componentOptions.listeners)
        if (handlers && handlers[name]) handlers[name].fns(data)
      }

      if (!swiper) {
        const swiperOptions = objectAssign({}, globalOptions, options)
        swiper = self[instanceName] = new Swiper(el, swiperOptions)
        DEFAULT_EVENTS.forEach(eventName => {
          swiper.addCallback(eventName, function() {
            eventEmit(vnode, eventName, ...arguments)
            eventEmit(vnode, eventName.replace(/([A-Z])/g, '-$1'), ...arguments)
          })
        })
      }

      eventEmit(vnode, 'ready', swiper)
    },

    // Parse options change
    componentUpdated(el, binding, vnode) {
      const instanceName = getInstanceName(el, binding, vnode)
      const swiper = vnode.context[instanceName]
      if (swiper) {
        // swiper.update && swiper.update()
        // swiper.navigation && swiper.navigation.update()
        // swiper.pagination && swiper.pagination.render()
        // swiper.pagination && swiper.pagination.update()
      }
    },

    // Destroy this directive
    unbind(el, binding, vnode) {
      const instanceName = getInstanceName(el, binding, vnode)
      const swiper = vnode.context[instanceName]
      if (swiper) {
        swiper.destroy && swiper.destroy()
        delete vnode.context[instanceName]
      }
    }
  }
}

// swiperDirective
const swiper = swiperDirective({})

// Global swiper default options
const install = function(Vue, globalOptions = {}) {
  // Mount swiper directive for Vue global
  Vue.directive('swiper', swiperDirective(globalOptions))
}

const VueSwiper = { Swiper, swiper, install }

export { Swiper, swiper, install }
export default VueSwiper
