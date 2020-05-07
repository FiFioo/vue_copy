<!--
 * @Author: niansnana
 * @Begin: 2020年4月11日15:43:05
 * @Update log: 编写共用播放组件
-->
<template>
  <div class="player" v-show="playList.length > 0">
    <div class="normal-player" v-show="fullScreen">
      <div class="background">
        <div class="filter"></div>
        <img width="100%" height="100%" :src="getPicUrl" />
      </div>
      <div class="header">
        <div class="back" @click="shrink">
          <van-icon name="arrow-down" />
        </div>
        <h1 class="title van-ellipsis" v-html="currentSong.name"></h1>
        <h2
          class="subtitle van-ellipsis"
          v-for="(item, index) in currentSong.ar"
          :key="index"
          v-html="item.name"
        ></h2>
      </div>
      <!-- 居中光盘区域 -->
      <div class="disc">
        <div class="disk">
          <div class="cd-wrapper">
            <div class="cd" :class="isRotate">
              <van-image width="100%" height="100%" round :src="currentSong.al.picUrl" />
            </div>
          </div>
        </div>
        <div class="lyric"></div>
      </div>
      <div class="control">
        <!-- 小功能 -->
        <div class="features">
          <van-icon name="like-o" />
          <van-icon name="down" />
          <van-icon name="comment-o" badge="1w+" @click="showComment" />
          <van-icon name="more-o" />
        </div>
        <!-- 进度条 -->
        <van-row type="flex" justify="space-around" align="center">
          <van-col span="2" align="right">
            <span style="color: #f1f1f1;font-size: 10px;">{{format(progressValue)}}</span>
          </van-col>
          <van-col span="15">
            <van-slider
              v-model="progressValue"
              active-color="#ee0a24"
              inactive-color="##949291"
              bar-height="2px"
              :max="duration"
              @change="getNewProgress"
            >
              <template #button>
                <div class="custom-button"></div>
              </template>
            </van-slider>
          </van-col>
          <van-col span="2" align="left">
            <span style="color: #f1f1f1;font-size: 10px;">{{format(duration)}}</span>
          </van-col>
        </van-row>
        <!-- 音乐操作 -->
        <div class="operators">
          <div class="icon left change">
            <van-icon name="exchange" />
          </div>
          <div class="icon left switch">
            <van-icon name="arrow-left" @click="prev" />
          </div>
          <div class="icon center">
            <van-icon :name="this.playing ? 'pause-circle-o' : 'play-circle-o'" @click="toggle" />
          </div>
          <div class="icon right switch">
            <van-icon name="arrow" @click="next" />
          </div>
          <div class="icon right">
            <van-icon name="ellipsis" />
          </div>
        </div>
      </div>
    </div>
    <div class="mini-player" v-show="!fullScreen">
      <div class="icon" @click="expand">
        <van-image
          width="40"
          :class="isRotate"
          :src="this.currentSong ? this.currentSong.al.picUrl : ''"
          round
        />
      </div>
      <div class="text" @click="expand">
        <h2 class="name" v-html="currentSong.name"></h2>
        <div class="desc" v-for="(item, index) in currentSong.ar" :key="index" v-html="item.name"></div>
      </div>
      <div class="control">
        <van-icon :name="isPlaying" @click.stop="toggle" />
      </div>
      <div class="control" @click="actionSheet = true">
        <van-icon name="bars" />
      </div>
      <!-- actionSheet -->
      <van-action-sheet v-model="actionSheet" title="播放" style="height: 40vh;">
        <div class="content">内容</div>
      </van-action-sheet>
    </div>
    <audio :src="songData.url" ref="audio" autoplay @timeupdate="updateTime"></audio>
    <!-- 评论展示 -->
    <van-popup v-model="isShowComment" position="bottom" :style="{ height: '100%' }">
      <Comment v-bind:commentData="this.currentSong" v-bind:comments="this.allCommentData" />
    </van-popup>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Comment from '@/components/Comment'
export default {
  components: { Comment },
  data () {
    return {
      progressValue: 0,
      duration: 0,
      actionSheet: false,
      allCommentData: {}
    }
  },
  computed: {
    ...mapGetters([
      'fullScreen',
      'playList',
      'currentSong',
      'songData',
      'playing',
      'currentIndex',
      'isShowComment'
    ]),
    isRotate () {
      return this.playing ? 'play' : 'play pause'
    },
    isPlaying () {
      return this.playing ? 'pause-circle-o' : 'play-circle-o'
    },
    getPicUrl () {
      return this.currentSong.al.picUrl ? this.currentSong.al.picUrl : ''
    }
  },
  watch: {
    songData () {
      this.$nextTick(() => {
        this.$refs.audio.play()
      })
      if (this.songData.url === null) {
        this.setPlayState(false)
        this.$dialog.alert({
          message: '暂无版权'
        }).then(() => {
          this.setPlayState(true)
          this.next()
        })
      }
    },
    playing (newPlaying) {
      const audio = this.$refs.audio
      this.$nextTick(() => {
        newPlaying ? audio.play() : audio.pause()
      })
    }
  },
  methods: {
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      setPlayState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setSongData: 'SET_SONG_DATA',
      setCommentShow: 'SET_SHOW_COMMENT'
    }),
    shrink () {
      this.setFullScreen(false)
    },
    expand () {
      this.setFullScreen(true)
    },
    toggle () {
      this.setPlayState(!this.playing)
    },
    updateTime (e) {
      this.progressValue = e.target.currentTime
      this.duration = this.$refs.audio.duration
      if (this.progressValue >= this.duration) {
        this.next()
      }
    },
    prev () {
      let index = this.currentIndex - 1
      if (index === -1) {
        index = this.playList.length - 1
      }
      this.setCurrentIndex(index)
      this.$api.getSongUrlFn(this.currentSong.id).then(res => {
        if (res.status === 200) {
          for (const item in res.data.data) {
            this.setSongData(res.data.data[item])
          }
        }
      })
      if (!this.playing) {
        this.toggle()
      }
    },
    next () {
      let index = this.currentIndex + 1
      if (index === this.playList.length) {
        index = 0
      }
      this.setCurrentIndex(index)
      this.$api.getSongUrlFn(this.currentSong.id).then(res => {
        if (res.status === 200) {
          for (const item in res.data.data) {
            this.setSongData(res.data.data[item])
          }
        }
      })
      if (!this.playing) {
        this.toggle()
      }
    },
    format (interval) {
      interval = interval | 0
      const minute = interval / 60 | 0
      let second = interval % 60
      if (second < 10) {
        second = '0' + second
      }
      return minute + ':' + second
    },
    getNewProgress () {
      this.$refs.audio.currentTime = this.progressValue
    },
    showComment () {
      this.setCommentShow(true)
      this.$api.getSongComment(this.currentSong.id).then(res => {
        if (res.code === 200) {
          this.allCommentData = res
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.normal-player
  position fixed
  left 0
  right 0
  top 0
  bottom 0
  z-index 150
  background #fff
  .background
    position absolute
    left -50%
    top -50%
    width 300%
    height 300%
    z-index -1
    opacity 0.6
    filter blur(30px)
    .filter
      position absolute
      width 100%
      height 100%
      background black
      opacity 0.6
  .header
    position relative
    margin-bottom 25px
    .back
      position absolute
      top 0
      left 6px
      z-index 50
      .van-icon
        display block
        padding 15px 9px
        font-size 25px
        color #f1f1f1
    .title
      width 70%
      margin 0 auto
      padding-top 10px
      line-height 20px
      text-align center
      font-size 18px
      font-weight bold
      color #f1f1f1
    .subtitle
      width 70%
      margin 0 auto
      line-height 20px
      text-align center
      font-size 12px
      color #f1f1f1
  .disc
    display flex
    align-items center
    position fixed
    width 100%
    top 80px
    bottom 170px
    white-space nowrap
    font-size 0
    .disk
      display inline-block
      position relative
      width 100%
      height 0
      padding-top 80%
      .cd-wrapper
        position absolute
        left 10%
        top 0
        width 80%
        height 100%
        .cd
          width 100%
          height 100%
          box-sizing border-box
          border 15px solid rgba(255, 255, 255, 0.1)
          border-radius 50%
          &.play
            animation spin 20s linear infinite
          &.pause
            animation-play-state paused
  .control
    position absolute
    width 100%
    bottom 50px
    .features
      color #f1f1f1
      display flex
      justify-content space-around
      font-size 30px
      margin-bottom 20px
    .custom-button
      font-size 10px
      padding 2px
      box-sizing border-box
      border 5px solid #fff
      text-align center
      background-color #ee0a24
      border-radius 50%
    .operators
      display flex
      align-items center
      font-weight 400
      .icon
        flex 1
        color #f1f1f1
        font-size 40px
        &.disabled
          color red
        &.left
          text-align right
        &.right
          text-align left
        &.center
          padding 0 20px
          font-size 50px
          text-align center
        &.left.change
          font-size 25px
.mini-player
  width 100%
  height 60px
  display flex
  align-items center
  position fixed
  left 0
  bottom 0
  z-index 180
  background-color rgba(255, 255, 255, 1)
  .icon
    flex 0 0 40px
    width 40px
    padding 0 10px 0 20px
    .van-image
      &.play
        animation spin 20s linear infinite
      &.pause
        animation-play-state paused
  .text
    display flex
    flex-direction column
    justify-content center
    flex 1
    overflow hidden
    h2
      margin 0
      line-height 14px
      text-overflow ellipsis
      overflow hidden
      white-space nowrap
      font-size 14px
      color #2e3030
    .desc
      text-overflow ellipsis
      overflow hidden
      white-space nowrap
      font-size 11px
      color #2e3030
  .control
    flex 0 0 30px
    width 30px
    padding 0 10px
    font-size 30px
@keyframes spin
  0%
    transform rotate(0deg)
  100%
    transform rotate(360deg)
</style>
