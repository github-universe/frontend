import Vue from 'vue'
import App from './App.vue'
import Toastr from 'vue-toastr'
import 'vue-toastr/src/vue-toastr.scss'

Vue.config.productionTip = false

Vue.use(Toastr)

new Vue({
  render: h => h(App)
}).$mount('#app')
