<!--
 * @Author: niansnana
 * @Begin: 2020年4月16日12:19:11
 * @Update log: 云村
-->
<template>
  <div class="friend-main">
    <div class="submit" v-show="token">
      <span>
        <van-icon name="plus" />发动态
      </span>
      <span>
        <van-icon name="smile-o" />发布视频
      </span>
    </div>
    <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
      <div v-show="token" class="item" v-for="(item, index) in eventData" :key="index">
        <!-- 左侧头像 -->
        <van-image width="50px" height="50px" round :src="item.user.avatarUrl" />
        <!-- 右侧信息 -->
        <div class="more">
          <div class="persion-info">
            <div class="nickname">
              <p class="name">{{item.user.nickname}}</p>
              <div class="desc">{{item.showTime | dateFilter(item.showTime)}}</div>
            </div>
            <button>+关注</button>
          </div>
          <div class="word">
            <div class="content">
              <p>内容</p>
            </div>
            <div class="control">
              <span>
                <van-icon name="good-job-o" />
                {{item.info.likedCount}}
              </span>
              <span>
                <van-icon name="chat-o" />
                {{item.info.commentCount}}
              </span>
              <span>
                <van-icon name="exchange" />
                {{item.info.shareCount}}
              </span>
              <span>
                <van-icon name="weapp-nav" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </van-pull-refresh>
    <div v-show="!token" style="padding: 0 10px;">
      <p>云村欢迎你！该页面需要你的登录</p>
      <router-link to="/login">立即登录</router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      isLoading: false,
      eventData: []
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  created () {
    this.getEventListData()
  },
  methods: {
    onRefresh () {
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
    },
    getEventListData () {
      this.$api.getMusicEventFn(30).then(res => {
        if (res.status === 200) {
          this.eventData = res.data.event
        }
        // console.log(res.data.event)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.friend-main
  margin 0
  // padding 10px 0px
  padding 0
  box-sizing border-box
  .submit
    width 100%
    background-color #ef493c
    display flex
    justify-content space-around
    height 5vh
    line-height 5vh
    color #fff
    margin-bottom 5px
    span
      display flex
      align-items center
      .van-icon
        margin-right 5px
  .item
    width 100%
    display flex
    justify-content center
    padding 5px 10px
    box-sizing border-box
    border-bottom 1px solid #f8f9fa
    .van-image
      width 10%
    .more
      width 90%
      display flex
      flex-direction column
      margin-left 15px
    .persion-info
      width 100%
      display flex
      justify-content space-between
      align-items center
      .nickname
        display flex
        flex-direction column
        justify-content center
        flex 1
        overflow hidden
        p
          margin 0
          line-height 14px
          text-overflow ellipsis
          overflow hidden
          white-space nowrap
          font-size 14px
          color #5b83ab
        .desc
          text-overflow ellipsis
          overflow hidden
          white-space nowrap
          font-size 11px
          color #b7b7b7
      button
        border-radius 20px
        background-color #e94639
        color #fff
        font-size 15px
        letter-spacing 4px
        outline none
        border none
        padding 5px 10px
        box-sizing border-box
    .word
      margin 10px 0
      line-height 25px
      font-size 14px
      display flex
      flex-direction column
      .control
        width 100%
        display flex
        justify-content space-between
        padding-right 10px
        box-sizing border-box
        span
          display flex
          align-items center
          color #9b9b9b
          .van-icon
            font-size 20px
            margin-right 5px
</style>
