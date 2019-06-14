//路由器对象模块
import Vue from 'vue'
//方法三:
// import Vue from 'vue/dist/vue.esm.js'

import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',   //不带#
  routes
})
