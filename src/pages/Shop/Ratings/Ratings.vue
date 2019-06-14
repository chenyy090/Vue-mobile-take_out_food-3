<template>
  <div class="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{info.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{info.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <Star :score="info.serviceScore" :size="36"/>
            <span class="score">{{info.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <Star :score="info.foodScore" :size="36"/>
            <span class="score">{{info.foodScore}}</span></div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{info.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>

      <Split/>
      <!--方法一：props-->
      <!--3、传递给子组件-->
      <!--<RatingsFilter-->
        <!--:ratings="ratings"-->
        <!--:selectType="selectType"-->
        <!--:onlyContent="onlyContent"-->
        <!--:setSelectType="setSelectType"-->
        <!--:toggleOnlyContent="toggleOnlyContent"-->
      <!--/>-->

      <!--方法二：vue自定义事件  在父组件给子组件标签绑定事件监听-->
      <!--<RatingsFilter-->
        <!--:ratings="ratings"-->
        <!--:selectType="selectType"-->
        <!--:onlyContent="onlyContent"-->
        <!--@setSelectType="setSelectType"-->
        <!--@toggleOnlyContent="toggleOnlyContent"-->
      <!--/>-->

      <!--方法三：事件总线-->
      <RatingsFilter
        :ratings="ratings"
        :selectType="selectType"
        :onlyContent="onlyContent"
      />

      <div class="rating-wrapper">
        <ul>
          <li class="rating-item" v-for="(rating, index) in filterRatings" :key="index">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <Star :score="rating.score" :size="24"/>
                <span class="delivery">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend">
                <!--rateType===0是推荐-->
                <span class="iconfont" :class="rating.rateType===0?'icon-thumb_up':'icon-thumb_down'"></span>
                <span class="item" v-for="item in rating.recommend">{{item}}</span>
              </div>
              <div class="time">{{rating.rateTime}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script>
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'
  import RatingsFilter from '../../../filters/RatingsFilter'

  export default {
    name: "Ratings",
    components: {
      RatingsFilter
    },
    data() {
      return {
        selectType: 0,        //评价类型：0推荐     1吐槽     2全部
        onlyContent: false    //只看有内容的评价
      }
    },
    methods: {
      //步骤：
      //2 父组件定义方法
      //2 传给子组件
      setSelectType (type) {
        this.selectType = type
        // this.$nextTick(() => {
        //   this.scroll.refresh()
        // })
      },

      toggleOnlyContent () {
        this.onlyContent = !this.onlyContent
        // this.$nextTick(() => {
        //   this.scroll.refresh()
        // })
      }
    },
    computed: {
      //2、映射状态
      ...mapState({
        ratings: state => state.shop.ratings,
        //商家信息
        info: state => state.shop.info
      }),


      //过滤一个种类（推荐/吐槽/全部）
      filterRatings() {
        const {ratings, selectType, onlyContent} = this
        if(!ratings) {
          return []
        }
        //filter不会改变原数组，返回值是布尔值
        return ratings.filter(rating => {
          const {rateType, text} = rating

          //一、确定某一个评价要不要显示，显示要满足两个条件
          //1、条件1、selectType   rateType
          //selectType: 0/1/2         0推荐  1吐槽  2全部
            //若是0/1,要判断是否与rateType相等;若是2，就不需要
            //rating.rateType: 0/1      0推荐  1吐槽

          // selectType===2 || selectType === rateType


          //2、条件2、onlyContent: true/false
          //onlyContent: true/false
             //如果为true需要判断rating.text必须有值;如果是false就不需要

          // !onlyContent || text.length > 0)

          //方法一：
          // if(selectType === 2) {
          //   return !onlyContent || text.length > 0
          // }else {
          //   return selectType === rateType && (!onlyContent || text.length > 0)
          // }

          //方法二：
         return (selectType===2 || selectType === rateType) && (!onlyContent || text.length > 0)
        })
      }
    },
    watch: {
      ratings() {
        this.$nextTick(() => {
          //在列表显示之后创建对象（更新显示）
          //bug:在点餐页面刷新页面，再去评价页面，评价页面不能滚动了
          //原因：在刷新点餐页面的时候，评论页面的滚动对象就创建了
          this.scroll = new BScroll('.ratings', {
            click: true
          })
        })
      }
    },

    //第一次显示之后立即执行
    mounted() {
      //1、分发action
      // this.$store.dispatch('getRatings', () => {
        // this.$nextTick(() => {
        //   this.scroll = new BScroll(this.$refs.ratings, {
        //     click: true
        //   })
        // })
      // })

      //解决bug:如果当前有ratings数据，直接创建scroll对象
      if(this.ratings.length > 0) {
        new BScroll('.ratings', {
          click: true
        })
      }

      //通过事件总线绑定监听
      this.$bus.$on('setSelectType', (type) => {
        this.setSelectType(type)
      })

      this.$bus.$on('toggleOnlyContent', () => {
        this.toggleOnlyContent()
      })
    }
  }
</script>


<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/minxins.styl"

  .ratings
    position: absolute
    top: 225px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    background: #fff
    .overview
      display: flex
      padding: 18px 0
      .overview-left
        flex: 0 0 137px
        padding: 6px 0
        width: 137px
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        text-align: center
        @media only screen and (max-width: 320px)
          flex: 0 0 120px
          width: 120px
        .score
          margin-bottom: 6px
          line-height: 28px
          font-size: 24px
          color: rgb(255, 153, 0)
        .title
          margin-bottom: 8px
          line-height: 12px
          font-size: 12px
          color: rgb(7, 17, 27)
        .rank
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)
      .overview-right
        flex: 1
        padding: 6px 0 6px 24px
        @media only screen and (max-width: 320px)
          padding-left: 6px
        .score-wrapper
          margin-bottom: 8px
          font-size: 0
          .title
            display: inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(7, 17, 27)
          .star
            display: inline-block
            margin: 0 12px
            vertical-align: top
          .score
            display: inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(255, 153, 0)
        .delivery-wrapper
          font-size: 0
          .title
            line-height: 18px
            font-size: 12px
            color: rgb(7, 17, 27)
          .delivery
            margin-left: 12px
            font-size: 12px
            color: rgb(147, 153, 159)
    .rating-wrapper
      padding: 0 18px
      .rating-item
        display: flex
        padding: 18px 0
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        .avatar
          flex: 0 0 28px
          width: 28px
          margin-right: 12px
          img
            border-radius: 50%
        .content
          position: relative
          flex: 1
          .name
            margin-bottom: 4px
            line-height: 12px
            font-size: 10px
            color: rgb(7, 17, 27)
          .star-wrapper
            margin-bottom: 6px
            font-size: 0
            .star
              display: inline-block
              margin-right: 6px
              vertical-align: top
            .delivery
              display: inline-block
              vertical-align: top
              line-height: 12px
              font-size: 10px
              color: rgb(147, 153, 159)
          .text
            margin-bottom: 8px
            line-height: 18px
            color: rgb(7, 17, 27)
            font-size: 12px
          .recommend
            line-height: 16px
            font-size: 0
            .icon-thumb_up, .icon-thumb_down, .item
              display: inline-block
              margin: 0 8px 4px 0
              font-size: 9px
            .icon-thumb_up
              color: $yellow
            .icon-thumb_down
              color: rgb(147, 153, 159)

            .item
              padding: 0 6px
              border: 1px solid rgba(7, 17, 27, 0.1)
              border-radius: 1px
              color: rgb(147, 153, 159)
              background: #fff
          .time
            position: absolute
            top: 0
            right: 0
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
</style>
