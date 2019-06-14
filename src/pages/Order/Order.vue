<template>
  <div>
    <Header title="订单列表"/>
    <section class="order">
      <header class="header">
        <a class="header_title">
          <span class="header_title_text">订单列表</span>
        </a>
      </header>
      <section class="order_no_login" v-if="user._id">
        <img src="./images/order/person.png">
        <h3>近三个月无外卖订单记录</h3>
        <button>查看更早订单</button>
      </section>
      <section class="order_no_login" v-else>
        <img src="./images/order/person.png">
        <h3>登录后查看外卖订单</h3>
        <button @click="$router.push('/login')">立即登陆</button>
      </section>
    </section>
  </div>
</template>


<script>
  import {mapState} from 'vuex'

  export default {
    name: "Oder",
    data() {
      return {
        msg: ''
      }
    },
    methods: {},
    computed: {
      ...mapState({
        user: state => state.user.user
      })
    },
    watch: {},
  }
</script>


<style lang="stylus" rel="stylesheet/stylus" scoped>
  .order  //订单
    width 100%
    .order_no_login
      padding-top 140px
      width 60%
      margin 0 auto
      text-align center
      >img
        display block
        width 100%
        height 30%
      >h3
        padding 10px 0
        font-size 17px
        color #6a6a6a
      >button
        display inline-block
        background #02a774
        font-size 14px
        color #fff
        border 0
        outline none
        border-radius 5px
        padding 10px 20px
</style>
