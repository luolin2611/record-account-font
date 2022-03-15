import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home/Home.vue'
import ShowRecentThreeBill from '../views/home/component/ShowRecentThreeBill.vue'
import Budget from '../views/home/budget/Budget.vue'

import Bill from '../views/bill/Bill.vue'

import Report from '../views/report/Report.vue'
import ReportItemDetails from '../views/report/component/ReportItemDetails.vue'

import My from '../views/my/My.vue'
import Login from '../views/my/login/Login.vue'
import Register from '../views/my/register/Register.vue'
import BillExport from '../views/my/billexport/BillExport.vue'
Vue.use(Router)
const routes = [
  // 首页路由配置
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/home/show-recent',
    name: 'show-recent',
    component: ShowRecentThreeBill
  },
  {
    path: '/home/budget',
    name: 'budget',
    component: Budget
  },


  {
    path: '/bill',
    name: 'bill',
    component: Bill
  },


  // 报表路由配置
  {
    path: '/report',
    name: 'report',
    component: Report
  },
  {
    path: '/reportItemDetails',
    name: 'reportItemDetails',
    component: ReportItemDetails
  },



  {
    path: '/my',
    name: 'my',
    component: My
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
    path: '/billexport',
    name: 'billexport',
    component: BillExport
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
