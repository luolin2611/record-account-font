import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/js/flexible'
import './assets/css/reset.css'
import './assets/css/font.css'

//引入vConsole   安装  npm i vconsole
import Vconsole from 'vconsole'
// const vConsole = new Vconsole()

//使用Swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
