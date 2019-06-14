<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul ref="leftUl">
          <li class="menu-item" v-for="(good, index) in goods" :key="index"
              @click="clickLeft(index)" :class="{current: index === currentIndex}">
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="rightUl">
          <li class="food-list-hook" v-for="good in goods" :key="good.name">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px"
              v-for="food in good.foods" :key="food.name"
                  @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57"
                       :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <!--传的是一个(地址值)引用-->
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart/>
    </div>
    <!--把food对象传给子组件Food-->
    <Food :food="food" ref="food"/>
  </div>
</template>


<script>
  import {mapState} from 'vuex'

  import BScroll from 'better-scroll'

  import Food from './Food'
  import ShopCart from './ShopCart'

  export default {
    name: "Goods",
    components: {
      Food,
      ShopCart
    },
    data() {
      return {
        scrollY: 0,
        tops: [],
        food: {},      //需要显示的食物

      }
    },
    methods: {

      //一、初始化滚动
      _initScroll() {

        //1、左边菜单滚动
        this.leftScroll = new BScroll('.menu-wrapper', {
          click: true
        })

        //2、右边食物滚动
        this.rightScroll = new BScroll('.foods-wrapper', {
          click: true,
          probeType: 1
        })

        //2.1 右边食物滚动的事件监听
              //事件监听回调函数有一个参数event
        this.rightScroll.on('scroll', ({x, y}) => {
          this.scrollY = Math.abs(y)
          // console.log(y)
        })

        //2.2 右边食物滚动结束的事件监听
        this.rightScroll.on('scrollEnd', ({x, y}) => {
          this.scrollY = Math.abs(y)
        })
      },

      //二、初始化统计tops
      _initTops() {
        const tops = []
        let top = 0
        tops.push(top)
        //得到所有右侧分类li(伪数组)
        const lis = this.$refs.rightUl.children

        //方法1 (ES6)
        Array.from(lis).forEach(li => {
        //方法2 (ES5)
        //Array.prototype.slice.call(lis).forEach(li => {
          top += li.clientHeight
          tops.push(top)
        })
        this.tops = tops
        //console.log(tops)
      },


      //222点击左侧分类项的回调函数
      clickLeft(index) {

        //222.1得到对应的top
        const top = this.tops[index]

        //222.2立即更新scrollY为目标位置的值
          //点击左边的分类立即有背景颜色（scrollEnd影响的）
         //让右侧立即到scrollY的位置
        this.scrollY = top

        //222.3让右侧滚动到对应位置
        this.rightScroll.scrollTo(0, -top, 300)
      },


      //显示Food组件页面
      showFood(food) {
        //更新food数据
        this.food = food
        //显示Food组件页面(调用子组件的方法)
        this.$refs.food.toggle()
      }
    },
    computed: {
      ...mapState({
        goods: state => state.shop.goods
      }),

      currentIndex() {
        const {scrollY, tops} = this
        const index =  tops.findIndex((top, index) => scrollY >= top && scrollY < tops[index + 1])

        //如果前后index不同
        //保存之前比较
          // 之前的        现在的
        if(this.index !== index && this.leftScroll) {
          //保存index
          // eslint-disable-next-line
          this.index = index

          //得到左侧对应li
          const li = this.$refs.leftUl.children[index]

          //当当前分类下标改变时，让左侧列表 滚动到 当前分类位置
          this.leftScroll.scrollToElement(li, 300)
        }

        return index
      }
    },

    //方法一：dispatch返回的是一个promise对象
    // async mounted() {
    //
    //   await this.$store.dispatch('getGoods')
    //
    //   //一、初始化滚动   （ _代表是自己调用的回调函数）
    //   this._initScroll()
    //   //二、初始化统计tops
    //   this._initTops()
    // },

    //方法二：callback（dispatch的第二参数） + $nextTick()
    // mounted() {
    //    this.$store.dispatch('getGoods', () => {
    //      this.$nextTick(() => {
    //        //一、初始化滚动   （ _代表是自己调用的回调函数）
    //        this._initScroll()
    //        //二、初始化统计tops
    //        this._initTops()
    //      })
    //    })
    // },

    //方法三：watch监视 + $nextTick()
    watch: {
      //监视谁写谁() {}
      //goods状态数据发生了改变(有数据了)
      goods () {
         this.$nextTick(() => {
           //一、初始化滚动   （ _代表是自己调用的回调函数）
           this._initScroll()
           //二、初始化统计tops
           this._initTops()
       })
      }
    }
  }
</script>


<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/minxins.styl"

  .goods
    display: flex
    position: absolute
    top: 225px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
