<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <!--isPwdLogin = true 是短信登录页面-->
          <a href="javascript:;" :class="{on: isCodeLogin}" @click="isCodeLogin = true">短信登录</a>
          <a href="javascript:;" :class="{on: !isCodeLogin}" @click="isCodeLogin = false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on:isCodeLogin}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号"
                     v-model="phone" name="phone"
                     v-validate="'required|mobile'">
              <!--v-validate="{required: true,regex: /^1\d{10}$/}">-->
              <span style="color: red;" v-show="errors.has('phone')">
                {{ errors.first('phone') }}
              </span>
              <button :disabled="!isRightPhone || computeTime > 0" class="get_verification"
                      :class="{right_phone_number: isRightPhone}"
                      @click="sendCode">{{computeTime > 0 ? `验证码已发送(${computeTime}s)` : '获取验证码'}}</button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码"
                     v-model="code" name="code" v-validate="'required'">
              <span style="color: red;" v-show="errors.has('code')">
                {{ errors.first('code') }}
              </span>
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!isCodeLogin}">
            <section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="用户名" v-model="name" name="name"
                v-validate="'required'"/>
                <span style="color: red;" v-show="errors.has('name')">
                  {{ errors.first('name') }}
                </span>
              </section>
              <section class="login_verification">
                <input :type="isShowPwd ? 'text': 'password'" maxlength="8" placeholder="密码"
                       v-model="pwd" name="pwd" v-validate="'required'"/>
                <span style="color: red;" v-show="errors.has('pwd')">
                  {{ errors.first('pwd') }}
                </span>
                <div class="switch_button" :class="isShowPwd ? 'on' : 'off'" @click="isShowPwd = !isShowPwd">
                  <div class="switch_circle" :class="{right: isShowPwd}"></div>
                  <span class="switch_text">{{isShowPwd ? 'abc' : ''}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码"
                       v-model="captcha" name="captcha"
                       v-validate="'required'">
                <span style="color: red;" v-show="errors.has('captcha')">
                  {{ errors.first('captcha') }}
                </span>
                <img ref="captcha" class="get_verification"
                     src="http://localhost:5000/captcha" alt="captcha"
                     @click="updateCaptcha">

                <!--<div class="get_verification"-->
                     <!--@click="updateCaptcha">-->
                  <!--<div>{{captcha}}</div>-->
                <!--</div>-->
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
  </section>
</template>


<script>
  import {Toast, MessageBox} from 'mint-ui'

  // import {reqCaptcha} from '../../api'
  import {reqSendCode, reqSmsLogin, reqPwdLogin} from '../../api'

  import {RECEIVE_USER} from '../../vuex/mutation-types'

  export default {
    name: "Login",
    data() {
      return {
        isCodeLogin:true,   //初始状态true，是验证码登录
        phone: '',
        code: '',
        name: '',
        pwd: '',
        captcha: '',
        computeTime: 0,
        isShowPwd: false,
        //captcha: ''
      }
    },
    methods: {
      async sendCode () {
        this.computeTime = 10
        const timer = window.setInterval(() => {
          this.computeTime--
          if(this.computeTime <= 0) {
            window.clearInterval(timer)
          }
        },1000)
        //请求发送验证码
        const result = await reqSendCode(this.phone)
        if(result.code === 0) {
          // alert('发送短信成功')
          Toast('发送短信成功')
        }else {
          //停止倒计时
          this.computeTime = 0
          // alert(result.msg)
          MessageBox.alert(result.msg)
        }
      },

      async login () {
        const {isCodeLogin, phone, code, name, pwd, captcha} = this
        let names
        if(isCodeLogin) {
           names = ['phone']       //直接收集模板中的name字符串
          //names = [this.phone]    而不是从状态中收集
        }else {
           names = ['name']
        }
       //1、先验证
        const success = await this.$validator.validateAll(names) // 对指定的所有表单项进行验证

        // 2、再发送请求
        if(success) {
          let result
          //alert('111')
          if(isCodeLogin) {
            result = await reqSmsLogin(phone, code)
          }else {
            result = await reqPwdLogin(name, pwd, captcha)
          }
         //3、根据结果处理
          if(result.code === 0) {
            //3.1返回一个user对象
           const user = result.data
            //3.2保存user
            //触发 --> 改变状态
           this.$store.commit(RECEIVE_USER, user)
            //3.3跳转到个人中心
            this.$router.replace('/profile')
          }else {
            alert(result.msg)
          }
        }
      },

      //async updateCaptcha () {
        updateCaptcha () {
        //方法一：
        //携带一个时间戳，指定唯一路径值
        //一次性图形验证码：不用发送ajax请求，直接在此用动态地址
        this.$refs.captcha.src = 'http://localhost:5000/captcha?time=' + Date.now()

        //方法二：（发送请求，不行）
        // const result = await reqCaptcha()
        // if(result.code === 0) {
        //   this.captcha = result
        //   console.log(this.captcha);
        // }

      }
    },
    computed: {
      isRightPhone () {
        return /^1\d{10}$/.test(this.phone)
      }
    },
    // async mounted () {
    //   const result = await reqCaptcha()
    //   if(result.code === 0) {
    //     this.captcha = result
    //     console.log(this.captcha);
    //   }
    // }
  }
</script>


<style lang="stylus" rel="stylesheet/stylus" scoped>
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone_number
                  color #000
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(27px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
