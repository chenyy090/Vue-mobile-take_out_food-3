//能发送异步ajax请求的函数模块
//封装axios库 + promise
//函数的返回值是promise对象

//axios本来返回response

/*
1. 优化1: 统一处理请求异常?
     在外层包一个自己创建的promise对象
     在请求出错时, 不reject(error), 而是显示错误提示
2. 优化2: 异步得到不是response, 而是response.data
     在请求成功resolve时: resolve(response.data)
*/
import axios from 'axios'

//在接口请求函数中直接调用此方法
export default function ajax(url,data={},method='GET') {
  return new Promise((resolve,reject) => {
    let promise
    if(method === 'GET') {
      promise = axios.get(url,{
        params: data
      })
    }else {
      promise = axios.post(url,data)
    }
    promise.then(response => {
      resolve(response.data)
    }).catch(error => {
      alert('请求出错' + error.message)
    })
  })
}
