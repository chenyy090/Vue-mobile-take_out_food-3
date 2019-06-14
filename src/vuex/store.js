import Vue from 'vue'
import Vuex from 'vuex'

//引入四个对象
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

//引入三个模块
import msite from './modules/msite'
import shop from './modules/shop'
import user from './modules/user'


Vue.use(Vuex)

export default new Vuex.Store({
  mutations,
  actions,
  getters,
  modules: {
    msite,
    shop,
    user
  }
})

/*
vuex管理的状态数据：
{
  msite:{},
  shop:{},
  user:{}
}*/

// 得到user:state.user.user
//              模块名.状态