//JavaScript 日期处理类库

//1、
//import moment from 'moment'

//2、
import format from 'date-fns/format'

import Vue from 'vue'

//定义一个全局过滤器实现日期格式化

//ES5：有format这个参数，就用这个，没有就是'YYYY-MM-DD HH:mm:ss'
// Vue.filter('dateString', function (value, format) {
//   return moment(value).format(format || 'YYYY-MM-DD HH:mm:ss')
// })

//ES6：形参默认值
Vue.filter('dateString', function (value, format='YYYY-MM-DD HH:mm:ss') {
  //方法1、moment库
  // return moment(value).format(format)

  //方法2、date-fns库
  return format(value, format)
})


