<template>
  <div class="ratings-filter">
    <div class="rating-type border-1px">
      <span class="block" :class="{active: selectType===2}"
            @click="setSelectType(2)">
        全部<span class="count">{{ratingsTotalCount}}</span>
      </span>
      <span class="block" :class="{active: selectType===0}"
            @click="setSelectType(0)">
        推荐<span class="count">{{positiveRatingsCount}}</span>
      </span>
      <span class="block" :class="{active: selectType===1}"
            @click="setSelectType(1)">
        吐槽<span class="count">{{ratingsTotalCount - positiveRatingsCount}}</span>
      </span>
    </div>
    <!--<div class="switch" :class="{on: onlyContent}" @click="toggleOnlyContent">-->
    <!--<div class="switch" :class="{on: onlyContent}" @click="$emit('toggleOnlyContent')">-->
    <div class="switch" :class="{on: onlyContent}" @click="toggleOnlyContent">
      <span class="iconfont icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>


<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "RatingsFilter",
    props: {
      ratings: Array,
      selectType: Number,
      onlyContent: Boolean,
      //方法二：vue自定义事件（不用声明下面两个）
      // setSelectType:Function,
      // toggleOnlyContent: Function
    },
    data() {
      return {
        msg: ''
      }
    },
    methods: {
      // toggleOnlyContent() {
        //按钮在子组件中
        //错误写法：不能直接修改父组件的状态
        //this.onlyContent = !this.onlyContent

        //正确写法：
      //   this.$emit('toggleOnlyContent')
      // },

      setSelectType(type) {
        //错误写法：不能直接修改父组件的状态
        // this.selectType = type

        //正确写法一：用vue自定义事件（只用于子组件向父组件发送消息、数据）
        // this.$emit('setSelectType', type)

        //正确写法二：事件总线  子组件触发事件
        this.$bus.$emit('setSelectType', type)
      },

      toggleOnlyContent() {
        this.$bus.$emit('toggleOnlyContent')
      }

    },
    computed: {
      // positiveLength() {
      //   return this.ratings.reduce((pre, rating) => {
      //     //从状态中看rateType  =0是推荐的
      //     return pre + (rating.rateType === 0 ? 1 : 0)
      //   },0)
      // },

      ...mapGetters(['ratingsTotalCount', 'positiveRatingsCount'])
    },
    watch: {}
  }
</script>


<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../common/stylus/minxins.styl"

  .ratings-filter
    .rating-type
      top-border-1px(rgba(7, 17, 27, 0.1))
      padding: 18px 0
      margin: 0 18px
      font-size: 0
      .block
        display: inline-block
        padding: 8px 12px
        margin-right: 8px
        line-height: 16px
        border-radius: 1px
        font-size: 12px
        color: rgb(77, 85, 93)
        background: rgba(77, 85, 93, 0.2)
        &.active
          background: $green
          color: #fff
        .count
          margin-left: 2px
          font-size: 8px
    .switch
      padding: 12px 18px
      line-height: 24px
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      color: rgb(147, 153, 159)
      font-size: 0
      &.on
        .icon-check_circle
          color: $green
      .icon-check_circle
        display: inline-block
        vertical-align: top
        margin-right: 4px
        font-size: 24px
      .text
        display: inline-block
        vertical-align: top
        font-size: 12px
</style>
