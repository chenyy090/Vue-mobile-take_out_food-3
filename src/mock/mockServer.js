//方法一：使用node.js + express    （数据固定）
  /*
  mock数据地址：
  C:\Users\Administrator\WebstormProjects\mock_server
  */


//方法二：使用mock.js模拟数据接口   （数据动态）

import Mock from 'mockjs'

//引入我们定义好的json文件
import data from './data.json'
//webpack内置的json.loader 已经把json文件自动解析（js对象字符串 ---> js对象）
//data是js对象

console.log('mockServer')
// 指定监听的url和对应的json数据模板
//请求url这个地址，mock会拦截，返回生成的随机json数据
Mock.mock('/goods', {
  code: 0,
  data: data.goods
})
Mock.mock('/ratings', {
  code: 0,
  data: data.ratings
})
Mock.mock('/info', {
  code: 0,
  data: data.info
})

//export default xxx   不需要暴露

//只需执行一次此文件，以后都可以访问这些接口