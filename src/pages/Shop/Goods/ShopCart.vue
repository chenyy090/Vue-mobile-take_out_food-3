<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <!--点击左侧（除右侧结算）切换-->
        <div class="content-left" @click="toggle">
          <div class="logo-wrapper">
            <div class="logo" :class="{highlight: totalCount}">
              <i class="iconfont icon-shopping_cart" :class="{highlight: totalCount}"></i>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{highlight: totalCount}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{info.deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payClass">
            {{payText}}
          </div>
        </div>
      </div>
      <transition name="fade">
        <!--<div class="shopcart-list" v-show="listShow" ref="list">-->
        <!--bug7:不能用v-if-->
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <!--<button class="empty" @click="empty">清空</button>-->
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content">
            <ul>
              <li class="food" v-for="food in cartFoods" :key="food.name">
                <span class="name">{{food.name}}</span>
                <div class="price"><span>￥{{food.price}}</span></div>
                <div class="cartcontrol-wrapper">
                  <CartControl :food="food"/>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <!--点击遮罩层切换-->
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="toggle"></div>
    </transition>
  </div>
</template>


<script>
  import Bscroll from 'better-scroll'
  import {mapState, mapGetters} from 'vuex'

  export default {
    name: "ShopCart",
    props: {
      food: Object
    },
    data() {
      return {
        isShow: false
      }
    },
    methods: {
      toggle() {
        //bug3:
        if(this.totalCount>0) {
          this.isShow = !this.isShow
        }

      },

      empty() {
        // this.$refs.list.display = 'none'
        // this.totalCount = 0
      }
    },
    computed: {
      ...mapState({
        cartFoods: state => state.shop.cartFoods,
        info: state => state.shop.info
      }),
      ...mapGetters(['totalCount', 'totalPrice']),


      payClass () {
        const {totalPrice} = this
        const {minPrice} = this.info

        //使初始显示时，不出现绿色
        if(!minPrice) {
          return ''
        }

        return totalPrice < minPrice ? 'not-enough' : 'enough'
      },

      payText () {
        const {totalPrice} = this
        const {minPrice} = this.info

        //Bug:初始显示时，绿色undefined闪了一下
        //因minPrice没有值
        if(!minPrice) {
          return ''
        }

        if(totalPrice === 0) {
          return `￥${minPrice}元起送`
        }else if(totalPrice <　minPrice) {
          return `还差￥${minPrice - totalPrice}元起送`
        }else {
          return '去结算'
        }
      },

      //bug1:
      //判断购物车列变是否显示的计算属性
      listShow() {
        //购物车中总数量为0，直接不显示
        if(this.totalCount === 0) {
          //bug2:
          //否则再选食物会自动打开
          this.isShow = false
          return false
        }

        //bug4:列表中食物多了，只能部分显示，不能滑动
        if(this.isShow) {
          this.$nextTick(() => {

          //bug5:点击+号，创建多个scroll对象
           if(!this.scroll) {
             this.scroll = new Bscroll('.list-content', {
               click: true
             })
           }else {
             //bug6:通知scroll刷新
             this.scroll.refresh()
           }

          })
        }

        return this.isShow
      }
    },
    watch: {}
  }
</script>


<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/stylus/minxins.styl"
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
    .content
      display: flex
      background: #141d27
      font-size: 0
      color: rgba(255, 255, 255, 0.4)
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          vertical-align: top
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #2b343c
            &.highlight
              background: $green
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: #80858a
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: #ffffff
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px
          font-weight: 700
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: 10px
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
    .shopcart-list
      position: absolute
      left: 0
      top: 0
      z-index: -1
      width: 100%
      transform translateY(-100%)
      &.fade-enter-active, &.fade-leave-active
        transition all .5s
      &.fade-enter, &.fade-leave-to
        opacity 0
        transform translateY(0)
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)

      .list-content
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        background: #fff
        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 6px

  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    backdrop-filter: blur(10px)
    opacity: 1
    background: rgba(7, 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.5s
    &.fade-enter, &.fade-leave-to
      opacity: 0
</style>