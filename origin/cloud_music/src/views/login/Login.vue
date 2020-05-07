<template>
  <div class="main">
    <div class="login">
      <div class="logo">
        <van-image
          width="80px"
          height="80px"
          fit="cover"
          src="http://p4.music.126.net/SOwDq67uF_1iBI9p9T8A0g==/109951164775523255.jpg?param=200y200"
        />
      </div>
      <van-button type="default" block @click="showLogin = true">手机号登录</van-button>
      <van-button type="default" block>注册</van-button>
      <p @click="goIndex">游客试用</p>
    </div>
    <div class="else">
      <van-divider>其他登录方式</van-divider>
    </div>
    <van-popup v-model="showLogin" position="right">
      <van-nav-bar title="手机号登录" left-arrow @click-left="showLogin = false" />
      <!-- form表单 -->
      <van-form @submit="onSubmit">
        <van-field v-model="phone" label="手机号" placeholder="手机号" />
        <van-field v-model="password" type="password" label="密码" placeholder="密码" />
        <div style="margin: 16px;">
          <van-button round block type="danger" native-type="submit">登录</van-button>
        </div>
      </van-form>
    </van-popup>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      showLogin: false,
      phone: '',
      password: ''
    }
  },
  computed: {
    ...mapGetters([
      'token',
      'accountInfo'
    ])
  },
  methods: {
    // ...mapActions([
    //   'storageAccount'
    // ]),
    // ...mapMutations({
    //   setUserInfo: 'SET_USER_INFO'
    // }),
    onSubmit () {
      if (!this.token) {
        this.$api.getUserLogin(this.phone, this.password).then(res => {
          if (res.status === 200) {
            // 验证都正确后，存储 token
            this.$store.commit('SET_TOKEN', res.data.token)
            sessionStorage.setItem('token', res.data.token)
            // 保存登录待使用的用户信息
            this._loginState()
          }
        }).catch(err => {
          if (err) {
            this.$dialog.alert({
              message: '用户名或密码错误'
            })
          }
        })
      }
    },
    _loginState () {
      // 重来，啊，来啊！
      this.$api.getUserLoginStatusFn().then(res => {
        if (res.data.code === 200) {
          // 存储登录账号的基本信息
          const userInfo = res.data.profile
          // 存储用户信息
          sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
          // store 存储uid，方便调用
          this.$store.commit('SET_ACCOUNT_UID', res.data.profile.userId)
          // 通过uid获取具体信息
          const uid = userInfo.userId
          this._getUserDetail(uid)
        }
      })
    },
    _getUserDetail (uid) {
      this.$api.getUserDetail(uid).then(res => {
        if (res.status === 200) {
          // store 存储信息
          this.$store.commit('SET_ACCOUNT_INFO', res.data.profile)
          this.$store.commit('SET_USER_LEVEL', res.data.level)
          // 跳转到发现页面
          this.$router.push({ path: '/find' })
        }
      })
    },
    goIndex () {
      this.$router.push({
        path: '/find'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.main
  width 100%
  height 100vh
  background url('../../../public/login-bg.jpg') no-repeat
  background-size cover
  .login
    width 80%
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -80%)
    .logo
      text-align center
    .van-button
      color #dc011a
      border 1px solid #dc011a
      border-radius 15px
      margin 15px 0
      background rgba(255, 255, 255, 0)
    &.hover
      background-color #dc011a
    p
      text-align center
      width 25%
      margin 0 auto
      font-size 14px
      color #a3a3a3
      border-bottom 1px solid #a3a3a3
  .else
    position fixed
    left 50%
    bottom 2%
    transform translate(-50%, -2%)
    .van-divider
      margin 0 auto
  .van-popup
    width 100%
    height 100%
</style>
