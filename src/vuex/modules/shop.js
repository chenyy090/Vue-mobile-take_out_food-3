import Vue from "vue"

import {RECEIVE_GOODS, RECEIVE_INFO, RECEIVE_RATINGS, ADD_COUNT, REDUCE_COUNT} from "../mutation-types";
import {reqGoods, reqInfo, reqRatings} from "../../api";

const state = {
  goods: [],
  ratings: [],
  info: {},
  cartFoods: []  //第一次点 +号，往里添加
}
const mutations = {
  [RECEIVE_INFO ](state, {info}) {
    state.info = info
  },

  [RECEIVE_RATINGS](state, {ratings}) {
    state.ratings = ratings
  },

  [RECEIVE_GOODS](state, {goods}) {
    state.goods = goods
  },

  //给一个响应式对象添加一个新的属性，这个属性不是响应式（没有数据绑定）
  [ADD_COUNT](state, {food}) {
    if(!food.count) {
      // food.count = 1   //第一次，添加一个新的count属性
      //用set添加属性可以实现响应式属性
      Vue.set(food, 'count', 1)
      state.cartFoods.push(food)
    }else {
      food.count++
    }
  },
  [REDUCE_COUNT](state, {food}) {
    if(food.count > 0) {
      food.count--
      if(food.count === 0) {
        state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
      }
    }
  },

}
const actions = {
  //mock数据

  //1、异步获取商家信息
  async getInfo({commit}, cb) {
    const result = await reqInfo()
    if(result.code===0) {
      const info = result.data
      info.score = 3.5
      //{info}是包含info 的对象
      commit(RECEIVE_INFO, {info})

      cb && cb()
    }
  },

  /*{commit} 相当于
  getInfo(context) {
      context.commit
  }*/


//2、异步获取商家评价列表
  async getRatings({commit}, cb) {
    const result = await reqRatings()
    if(result.code===0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})

      cb && cb()
    }
  },

//3、异步获取商家商品列表
   async getGoods({commit}, cb) {
    const result = await reqGoods()
    if(result.code===0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {goods})
      // 如果组件中传递了接收消息的回调函数, 数据更新后, 调用回调通知调用的组件
      cb && cb()
    }
  },


//4、更新food数量
  //data里有两个属性：isAdd;food
  updateCount ({commit}, {isAdd, food}) {
    if(isAdd) {
      commit(ADD_COUNT, {food})
    }else {
      commit(REDUCE_COUNT, {food})
    }
  }
}


//计算属性什么时候调用
//1、初始化第一次调用
//2、依赖数据发生改变都会调用（在此处效率太低）
const getters = {
//ShopCart组件中：
//遍历goods得到good,再遍历good.foods
//目的：得到一个含count属性的food的数组
//   cartFoods(state) {
//     const arr = []
//     state.goods.forEach(good => {
//       good.foods.forEach(food => {
//         if(food.count > 0) {
//           arr.push(food)
//         }
//       })
//     })
//     return arr
//   }


  //总数量
  totalCount (state) {
    return state.cartFoods.reduce((pre, food) => pre + food.count, 0)
  },

  //总价格
  totalPrice (state) {
    return state.cartFoods.reduce((pre, food) => pre + food.count * food.price, 0)
  },


//评价的总数量
  ratingsTotalCount (state) {
    return state.ratings.length
  },
//推荐评价的总数量
  positiveRatingsCount () {
    return state.ratings.reduce((pre, rating) => {
      return pre + (rating.rateType === 0 ? 1 : 0)
    }, 0)
  }


}


export default {
  state,
  mutations,
  actions,
  getters
}