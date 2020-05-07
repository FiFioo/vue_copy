<!--
 * @Author: niansnana
 * @Begin: 2020年4月15日09:36:28
 * @Update log: 编写共用歌曲评论组件
-->
<template>
  <div>
    <van-sticky>
      <van-nav-bar title="评论(1849)" left-arrow @click-left="backNow">
        <template #right>
          <van-icon name="bar-chart-o" />
        </template>
      </van-nav-bar>
    </van-sticky>
    <div class="banner">
      <div class="bannerImg">
        <van-image fit="cover" :src="commentData.al.picUrl" />
      </div>
      <div class="info">
        <h4 v-html="commentData.name"></h4>
        <p v-for="(item, index) in commentData.ar" :key="index" v-html="item.name"></p>
      </div>
    </div>
    <div class="comments">
      <p class="title">精彩评论</p>
      <div class="detail" v-for="(item, index) in comments.hotComments" :key="index">
        <van-image width="30px" height="30px" round :src="item.user.avatarUrl" />
        <div class="more">
          <div class="persion-info">
            <div class="nickname">
              <p class="name" v-html="item.user.nickname"></p>
              <div class="desc">{{item.time | dateFilter(item.time)}}</div>
            </div>
            <small>
              {{item.likedCount}}
              <van-icon name="good-job-o" />
            </small>
          </div>
          <div class="word">{{item.content}}</div>
        </div>
      </div>
    </div>
    <div class="comments">
      <p class="title">最新评论</p>
      <div class="detail" v-for="(item, index) in comments.comments" :key="index">
        <van-image width="30px" height="30px" round :src="item.user.avatarUrl" />
        <div class="more">
          <div class="persion-info">
            <div class="nickname">
              <p class="name" v-html="item.user.nickname"></p>
              <div class="desc">{{item.time | dateFilter(item.time)}}</div>
            </div>
            <small>
              {{item.likedCount}}
              <van-icon name="good-job-o" />
            </small>
          </div>
          <div class="word">{{item.content}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: ['commentData', 'comments'], // commentData：基本信息，comments：所有的评论
  methods: {
    ...mapMutations({
      setCommentShow: 'SET_SHOW_COMMENT'
    }),
    backNow () {
      this.setCommentShow(false)
    }
  }
}
</script>

<style lang="stylus" scoped>
.van-nav-bar
  background-color #d83e34
  color #ffffff
.banner
  display flex
  width 100%
  height 100%
  padding 10px
  box-sizing border-box
  .bannerImg
    width 30%
  .info
    display flex
    flex-direction column
    flex 1
    margin-left 15px
    p
      margin 0
      font-size 14px
      color #7fa0c8
.comments
  margin-top -20px
  .title
    background #eff0f2
    padding 5px 10px
    box-sizing border-box
  .detail
    width 100%
    display flex
    justify-content center
    padding 5px
    box-sizing border-box
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
          color #a2a2a2
        .desc
          text-overflow ellipsis
          overflow hidden
          white-space nowrap
          font-size 11px
          color #b7b7b7
      small
        color #a2a2a2
    .word
      margin 10px 0
      line-height 25px
      font-size 14px
</style>
