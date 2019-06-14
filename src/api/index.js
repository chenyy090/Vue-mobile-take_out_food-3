//包含n个接口请求函数的模块
//函数的返回值是promise对象

import ajax from './ajax'

const BASE = '/api'

//1、根据经纬度获取位置详情
//http://localhost:5000/position/40.10038,116.36867
export const reqAddress = (longitude,latitude) => ajax(BASE + `/position/${latitude},${longitude}`)

//2、获取食品分类列表
export const reqCategorys = () => ajax(BASE + '/index_category')

//3、根据经纬度获取商铺列表
//http://localhost:5000/shops?latitude=40.10038&longitude=116.36867
export const reqShops = (longitude,latitude) => ajax(BASE + '/shops', {latitude,longitude})


//请求百度的某个接口：xxx
// export const reqBaiduxxx = () => ajax('/baidu/xxx')


//3.5发送一次性图形验证码
export const reqCaptcha = () => ajax(BASE + '/captcha')


//4、发送短信验证码
export const reqSendCode = (phone) => ajax(BASE + '/sendcode', {phone})


//5、短信登录
export const reqSmsLogin = (phone, code) => ajax(BASE + '/login_sms', {phone, code}, 'POST')


//6、密码登录
export const reqPwdLogin = ({name, pwd, captcha}) => ajax(BASE + '/login_pwd', {name, pwd, captcha}, 'POST')


//7、获取登录用户的信息
export const reqUser = () => ajax(BASE + '/userinfo')


//8、退出登录
export const reqLogout = () => ajax(BASE + '/logout')


//9、10、11 mock数据
export const reqGoods = () => ajax('/goods')  //是mock的路径
export const reqRatings = () => ajax('/ratings')
export const reqInfo = () => ajax('/info')