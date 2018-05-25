import Vue from 'vue'
import App from './App.vue'
import router from './router'
import http from './http'
import store from './vuex'
// import PullRefreshs from './components/PullRefreshs'
// import InfiniteLoading from 'vue-infinite-loading';
import PullTo from 'vue-pull-to'

// Vue.component('scroll-load', InfiniteLoading)
// Vue.component('scroll-load', PullRefreshs)
Vue.component('scroll-load', PullTo)

Vue.config.productionTip = false


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

const scale = 1 / devicePixelRatio

document.querySelector('meta[name="viewport"]').setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no')
document.documentElement.style.fontSize = document.documentElement.clientWidth / 10 + 'px'

window.addEventListener('orientationchange', function () {
  setTimeout(() => {
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 10 + 'px'
  }, 100)
}, false)