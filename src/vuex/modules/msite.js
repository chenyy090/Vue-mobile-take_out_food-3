import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
} from '../mutation-types'
import {reqAddress, reqCategorys, reqShops} from "../../api";


const state = {
  latitude: 40.10038, // 纬度
  longitude: 116.36867, // 经度
  address: {}, // 地址信息对象
  categorys: [], // 分类数组
  shops: [], //商家数组
}
const mutations = {
  [RECEIVE_ADDRESS](state, address) {
    state.address = address
  },

  [RECEIVE_CATEGORYS](state, categorys) {
    state.categorys = categorys
  },

  [RECEIVE_SHOPS](state,shops) {
    state.shops = shops
  },
}
const actions = {
  async getAddress({commit, state}){
    const {longitude, latitude} = state
    const result = await reqAddress(longitude, latitude)
    if(result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, address)
    }
  },

  async getCategorys({commit}, cb) {
    const result = await reqCategorys()
    if(result.code === 0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, categorys)
      //更新状态后执行，相当于watch
      typeof cb === 'function' && cb()
    }
  },

  async getShops({commit, state}) {
    const {longitude, latitude} = state
    const result = await reqShops(longitude, latitude)
    if(result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, shops)
    }
  },

}
const getters = {

}


export default {
    state,
    mutations,
    actions,
    getters
}