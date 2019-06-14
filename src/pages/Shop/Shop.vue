<template>
  <div>
    <ShopHeader/>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/shop/goods" replace>点餐</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/ratings" replace>评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/info" replace>商家信息</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>


<script>
  import ShopHeader from '../../components/ShopHeader/ShopHeader'
  import {reqGoods, reqRatings, reqInfo} from '../../api'

  export default {
    name: "shop",
    components: {
      ShopHeader
    },
    data() {
      return {
        msg: ''
      }
    },
    methods: {},
    computed: {},
    watch: {},
    mounted() {
    // async mounted() {
      //方法一：触发action,发送请求
      this.$store.dispatch('getGoods')
      this.$store.dispatch('getRatings')
      this.$store.dispatch('getInfo')

      //方法二：
      // const results = await
      //   Promise.all([reqGoods(), reqRatings(), reqInfo()])
      // const goods = results[0].data
      // const ratings = results[1].data
      // const info = results[2].data
    }
  }
</script>


<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/minxins.styl"
  .tab
    height 40px
    line-height 40px
    background #fff
    bottom-border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      float left
      width: 33.33333%
      text-align center
      font-size 14px
      color rgb(77, 85, 93)
      a
        display block
        position relative
        &.router-link-active
          color #02a774
          &::after
            content ''
            position absolute
            left 50%
            bottom 1px
            width 35px
            height 2px
            transform translateX(-50%)
            background #02a774
</style>