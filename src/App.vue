<template>
  <div id="app">
    <!--路由组件显示区域-->
    <router-view/>
    <!--底部-->
    <FooterGuide v-show="$route.meta.isShowFooter"/>
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide'

import {reqUser} from './api'

import {RECEIVE_USER} from './vuex/mutation-types'

export default {
  name: 'App',
  //先引入，再局部注册组件
  async mounted () {
    this.$store.dispatch('getAddress')

    const result = await reqUser()
    if(result.code === 0) {
      const user = result.data
      //直接更新
      this.$store.commit(RECEIVE_USER, user)
    }
  },

  components: {
    FooterGuide
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  #app
    width 100%
    height 100%
</style>
