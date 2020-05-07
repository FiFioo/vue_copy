<!--
@Author nainsnana
@Begin 2020年4月2日18:30:31
@Update log：编写共用header组件
-->
<template>
  <van-sticky>
    <van-row>
      <van-col span="4" class="icon" @click="show">
        <van-icon name="contact" />
      </van-col>
      <van-col span="16">
        <van-tabs v-model="active">
          <van-tab v-for="item in tabData" :key="item.id" :title="item.title" :to="item.path"></van-tab>
        </van-tabs>
      </van-col>
      <van-col span="4" class="icon" @click="goSearch">
        <van-icon name="search" />
      </van-col>
    </van-row>
    <van-popup v-model="showMe" position="left" :style="{ width: '80%', height: '100%' }">
      <!-- 用户基础信息 -->
      <div class="userInfo" v-show="token">
        <div
          class="info"
          style="background-size: cover;"
          :style="{ background: 'url(' + accountInfo.backgroundUrl +')' }"
        >
          <div class="user_name">
            <van-image width="60px" height="60px" fit="cover" round :src="accountInfo.avatarUrl" />
            <div class="nick">
              <p>{{accountInfo.nickname}}</p>
              <span>Lv.{{userLevel}}</span>
            </div>
          </div>
          <div :class="isPunch" @click="punch">{{punchPonit ? '已签到' : '签到'}}</div>
        </div>
        <van-grid :border="false">
          <van-grid-item>
            <p>动态</p>
            <span>{{accountInfo.eventCount}}</span>
          </van-grid-item>
          <van-grid-item>
            <p>关注</p>
            <span>{{accountInfo.follows}}</span>
          </van-grid-item>
          <van-grid-item>
            <p>粉丝</p>
            <span>{{accountInfo.followeds}}</span>
          </van-grid-item>
          <van-grid-item icon="edit" text="我的资料" />
        </van-grid>
      </div>
      <!-- 未登录显示信息 -->
      <div class="noAccount" v-show="!token">
        <p>登录网易云音乐</p>
        <p>手机电脑多端同步，320k高音质无限下载</p>
        <van-button type="default" @click="login">立即登录</van-button>
      </div>
      <!-- 网易云操作功能 -->
      <div class="features">
        <van-cell
          v-for="(item, index) in featuresData"
          :key="index"
          :style="item.style"
          is-link
          :value="item.value"
        >
          <template #title>
            <i class="iconfont" :class="item.icon"></i>
            {{item.title}}
          </template>
        </van-cell>
      </div>
      <van-button
        type="default"
        block
        style="margin: 10px 0;background: #fff;color: red;"
        @click="logout"
        v-show="token"
      >退出登录</van-button>
    </van-popup>
  </van-sticky>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      active: 1,
      tabData: [
        { id: '0', title: '我的', path: '/home' },
        { id: '1', title: '发现', path: '/find' },
        { id: '2', title: '云村', path: '/friend' },
        { id: '3', title: '视频', path: '/video' }
      ],
      featuresData: [
        { title: '我的消息', icon: 'icon-youjian', style: 'margin: 10px 0;', value: '8' },
        { title: '会员消息', icon: 'icon-huiyuanzhongxin', style: '', value: '' },
        { title: '商城', icon: 'icon-gouwuche', style: '', value: '超强tws降300' },
        { title: '在线听歌免流量', icon: 'icon-sy-zxdc', style: '', value: '' },
        { title: '设置', icon: 'icon-shezhi', style: 'margin-top: 10px;', value: '' },
        { title: '扫一扫', icon: 'icon-saoyisao', style: '', value: '' },
        { title: '个性皮肤', icon: 'icon-pifu', style: '', value: '官方白' },
        { title: '夜间模式', icon: 'icon-yejianmoshi', style: '', value: '' },
        { title: '定时关闭', icon: 'icon-dingshiguanbi', style: '', value: '' },
        { title: '音乐闹钟', icon: 'icon-clock', style: '', value: '' },
        { title: '驾驶模式', icon: 'icon-qiche', style: '', value: '' },
        { title: '亲子频道', icon: 'icon-qinzi', style: '', value: '' },
        { title: '优惠券', icon: 'icon-youhuiquan', style: '', value: '' },
        { title: '分享网易云音乐', icon: 'icon-fenxiang', style: 'margin-top: 10px;', value: '' },
        { title: '关于', icon: 'icon-guanyu', style: '', value: '' }
      ],
      showMe: false,
      userInfo: {},
      punchPonit: false
    }
  },
  created () {
    this.getUserInfo()
  },
  computed: {
    ...mapGetters([
      'token',
      'accountInfo',
      'userLevel'
    ]),
    isPunch () {
      return this.punchPonit ? 'user_punch is_Punch' : 'user_punch'
    }
  },
  methods: {
    ...mapActions([
      'storageAccount'
    ]),
    show () {
      this.showMe = true
    },
    goSearch () {
      this.$router.push({
        path: '/search'
      })
    },
    getUserInfo () {
      // 获取用户信息，主要是获取用户的登记
      this.$api.getUserInfoFn(this.accountInfo.userId).then(res => {
        if (res.status === 200) {
          this.userInfo = res.data
        }
      })
    },
    punch () {
      this.$api.getUserPunchFn(this.accountInfo.userId).then(res => {
        if (res.status === 200) {
          console.log(res)
          this.punchPonit = true
        } else {
          this.$dialog.alert({
            message: '已签到！'
          })
        }
      })
    },
    login () {
      /**
       * 待解决的bug，登录或者退出登录，小窗播放器依旧存在，待解决
       * 尝试过store关闭，未成功，难受
       */
      this.$router.push('login')
    },
    logout () {
      this.$api.getUserLogout()
      window.sessionStorage.clear()
      this.storageAccount({
        token: '',
        data: {}
      })
      this.$router.push('login')
    }
  }
}
</script>
<style lang="stylus" scoped>
.van-row
  background #fff
.icon
  text-align center
  line-height 44px
.van-popup, .info
  display flex
  background-color #fff
.van-popup
  box-sizing border-box
  flex-direction column
  background-color #eff0f2
  .userInfo
    background-color #fff
    .info
      padding 25px 10px 15px 10px
      align-items center
      justify-content space-between
      .user_name
        display flex
        align-items center
        .nick
          display flex
          margin 15px
          flex-direction column
          p
            font-size 20px
            margin 0
          span
            color #a2a2a2
            font-size 13px
            border 1px solid #a2a2a2
            border-radius 20px
            text-align center
            width 80%
            margin-top 5px
      .user_punch
        color #d55347
        border 1px solid #d55347
        border-radius 15px
        text-align center
        box-sizing border-box
        padding 5px 10px
        cursor pointer
        &.is_Punch
          color #999
          border 1px solid #999
          background rgba(255, 255, 255, 0.3)
    .van-grid
      p
        color #a2a2a2
        margin 0
  .noAccount
    background-color #fff
    text-align center
    font-size 14px
    .van-button
      width 80%
      border-radius 20px
      margin-bottom 15px
  .features
    .van-cell
      white-space nowrap
      i
        margin-right 5px
</style>
