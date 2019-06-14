<template>
  <div class="star" :class="`star-${size}`">
    <span class="star-item" v-for="(starClass, index) in starClasses" :key="index"
    :class="starClass"></span>
  </div>
</template>


<script>
  export default {
    name: "Star",
    props: {
      score: Number,
      size: Number
    },
    data() {
      return {
        msg: ''
      }
    },
    methods: {},
    computed: {
      //根据父组件传过来的属性，来计算星星该怎么显示
      starClasses () {
        //定义个数组，包含三个类
        const classes = []
        const score = this.score
        //3.5  3-on 1-half 1-off
        const rounding = Math.floor(score)
        //1、向数组添加n个on
        for(let i =0; i<rounding; i++) {
          classes.push('on')
        }
        //2、向数组添加0/1个half
        if(score*10 - rounding*10 >= 5) {
          classes.push('half')
        }
        //3、向数组添加n个off
        while(classes.length < 5) {
          classes.push('off')
        }

        return classes
      }
    },
    watch: {}
  }
</script>


<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../common/stylus/minxins.styl'

  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/stars/star48_on')
        &.half
          bg-image('./images/stars/star48_half')
        &.off
          bg-image('./images/stars/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/stars/star36_on')
        &.half
          bg-image('./images/stars/star36_half')
        &.off
          bg-image('./images/stars/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/stars/star24_on')
        &.half
          bg-image('./images/stars/star24_half')
        &.off
          bg-image('./images/stars/star24_off')

</style>