<template>
  <div class="cartcontrol">
    <!--减号-->
    <transition name="move">
      <div class="iconfont icon-remove_circle_outline" v-show="food.count>0"
           @click.stop="updateCount(false)"></div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <!--加号-->
    <div class="iconfont icon-add_circle"
         @click.stop="updateCount(true)"></div>
  </div>
</template>


<script>
  export default {
    name: "CartControl",
    props: {
      food: Object
    },
    data() {
      return {
        msg: ''
      }
    },
    methods: {
      updateCount (isAdd) {
        const food  = this.food
        //只能有两个参数
        this.$store.dispatch('updateCount', {isAdd, food})
      }
    },
    computed: {},
    watch: {}
  }
</script>


<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/minxins.styl"
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)

    .icon-remove_circle_outline
      display: inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color $green
      &.move-enter-active, &.move-leave-active
        transition all .5s
      &.move-enter, &.move-leave-to
        opacity 0
        transform translateX(15px) rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .icon-add_circle
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color $green
</style>
