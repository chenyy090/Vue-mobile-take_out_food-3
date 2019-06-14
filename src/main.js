import Vue from 'vue'

//mint-ui依赖这个库
import VueLazyload from 'vue-lazyload'
//方法三：
// import Vue from 'vue/dist/vue.esm.js'

import {Button} from 'mint-ui'

import App from './App'

import router from './router'

import Header from './components/Header/Header'

import store from './vuex/store'

import Star from './components/star/star'

import CartControl from './components/CartControl/CartControl'


import Split from './components/Split/Split'

import loading from './common/images/loading.gif'


//引入mockjs,保证执行一次此文件
import './mock/mockServer'

import './validate'

//加载自定义过滤器
import './filters/moment'



//控制台的生产提示
Vue.config.productionTip = false

//内部定义了一个全局指令：v-lazy
Vue.use(VueLazyload, {
  //loading: 'dist/loading.gif'
  loading
})

Vue.component('Header', Header)

Vue.component('Star', Star)

Vue.component(Button.name, Button)   //mt-button

Vue.component('CartControl', CartControl)

Vue.component('Split',Split)

//给Vue原型对象添加一个vm的bus属性
Vue.prototype.$bus = new Vue()


//方法一：解决vue-cli2版本升级到3版本的问题（不对）
/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   components: { App },
//   template: '<App/>',
//   router,
//   store
// }).$mount("#app")


//方法二：
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store
})