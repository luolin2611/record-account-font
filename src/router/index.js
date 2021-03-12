import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home/Home.vue'
import ShowRecentThreeBill from '../views/home/component/ShowRecentThreeBill.vue'

import Bill from '../views/bill/Bill.vue'

import Report from '../views/report/Report.vue'

import My from '../views/my/My.vue'
import Login from '../views/my/login/Login.vue'
import Register from '../views/my/register/Register.vue'
Vue.use(Router)
const routes = [
  //底部tabbar
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/bill',
    name: 'bill',
    component: Bill
  },
  {
    path: '/report',
    name: 'report',
    component: Report
  },
  {
    path: '/my',
    name: 'my',
    component: My
  },
  //首页路由配置
  {
    path: '/home/show-recent',
    name: 'show-recent',
    component: ShowRecentThreeBill
  },



  // 我的界面路由配置
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },





  {
    path: '/',
    redirect: '/home'
  }
]

const router = new Router({
  routes
})

export default router
