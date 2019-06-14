import {RECEIVE_USER, RESET_USER} from "../mutation-types";
import {reqLogout} from "../../api";

const state = {
  user: {}, //当前登录用户
}
const mutations = {

  [RECEIVE_USER](state, user) {
    state.user = user
  },

  [RESET_USER](state) {
    state.user = {}
  },
}
const actions = {
  async logout({commit}) {
    const result = await reqLogout()
    if(result.code === 0) {
      commit(RESET_USER)
    }
  }
}
const getters = {

}


export default {
  state,
  mutations,
  actions,
  getters
}