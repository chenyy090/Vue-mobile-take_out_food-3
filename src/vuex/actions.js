//包含n个间接更新状态数据的方法对象

//有异步action，此文件中定义方法 和 （发送请求）

//引入接口请求函数
import {
  reqAddress,
  reqCategorys,
  reqShops,
  reqLogout,
  reqGoods,
  reqRatings,
  reqInfo
} from '../api'

import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RESET_USER,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  RECEIVE_GOODS
} from './mutation-types'

/*两步：
1、发请求
2、成功后，提交mutation更新状态数据
*/
export default {

}

