import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/js/flexible'
import './assets/css/reset.css'
import './assets/css/font.css'
import moment from 'moment'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';



//引入vConsole   安装  npm i vconsole
// import Vconsole from 'vconsole'
// const vConsole = new Vconsole()

//使用Swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
Vue.use(VueAwesomeSwiper, /* { default options with global component } */ )

// 引入elementUI
Vue.use(ElementUI)

Vue.config.productionTip = false

// 引入moment
Vue.prototype.$moment = moment; //赋值使用

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
