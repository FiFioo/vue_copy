<!--
 * @Author: niansnana
 * @Begin: 2020年4月5日13:15:22
 * @Update: 2020年4月12日17:23:20
 * @Update log: 重构代码，结合store
 -->
<template>
  <div>
    <!-- 基础信息 -->
    <div class="menu">
      <div class="bg" :style="{ background: 'url(' + listData.coverImgUrl +')' }"></div>
      <van-sticky class="nav">
        <van-row type="flex" justify="space-around" :class="{ 'navActive': scrollFlag }">
          <van-col span="6" @click="returnFind">
            <van-icon name="arrow-left" />
          </van-col>
          <van-col span="6" align="center">歌单</van-col>
          <van-col span="6" align="right">
            <van-icon name="bar-chart-o" size="18" @click="setFullScreen(true)" />
          </van-col>
        </van-row>
      </van-sticky>
      <div class="content">
        <van-row type="flex" justify="space-around">
          <van-col class="bgInfo" span="9">
            <van-image fit="cover" :src="listData.coverImgUrl" height="100%" />
            <span>
              <van-icon name="service-o" />
              {{listData.playCount | priceAbb(listData.playCount)}}
            </span>
            <van-icon
              name="info-o"
              size="20"
              style="position: absolute;right: 0.5em;bottom: 0.5em;"
            />
          </van-col>
          <van-col span="13">
            <h3>{{listData.name}}</h3>
            <p class="author">
              <van-image width="2em" round :src="authorInfo.avatarUrl" />
              <span>
                {{authorInfo.nickname}}
                <van-icon name="arrow" style="vertical-align: middle;" />
              </span>
            </p>
          </van-col>
        </van-row>
        <div class="bottom">
          <van-row type="flex" justify="space-around">
            <van-col span="6">
              <van-icon name="comment-o" />
              <span>{{listData.commentCount == 0 ? '评论' : listData.commentCount}}</span>
            </van-col>
            <van-col span="6">
              <van-icon name="exchange" />
              <span>{{listData.shareCount == 0 ? '转发' : listData.shareCount}}</span>
            </van-col>
            <van-col span="6">
              <van-icon name="down" />
              <span>下载</span>
            </van-col>
            <van-col span="6">
              <van-icon name="share" />
              <span>多选</span>
            </van-col>
          </van-row>
        </div>
      </div>
    </div>
    <!-- 歌曲列表 -->
    <div class="list">
      <van-sticky class="pointSong" :offset-top="45">
        <van-row type="flex" justify="space-between">
          <van-col span="6" class="songLeft">
            <p>
              <van-icon name="play-circle-o" />播放全部
              <span>(共{{this.listData.trackCount}}首)</span>
            </p>
          </van-col>
          <van-col span="8" class="songRight" align="right">
            <p>
              <van-icon name="plus" />
              收藏({{this.listData.subscribedCount}})
            </p>
          </van-col>
        </van-row>
      </van-sticky>
      <van-cell v-for="(item,index) in listInfo" :key="index" :class="getSong">
        <template #title>
          <span>{{index+1}}</span>
          <span
            class="custom-title van-ellipsis"
            style="padding: 0 10px;box-sizing: border-box;"
            @click="selected(index, item.id)"
          >{{item.name}}</span>
        </template>
        <template #right-icon>
          <van-icon name="ellipsis" style="line-height: inherit;" />
        </template>
      </van-cell>
    </div>
    <!-- 加载动画 -->
    <Loading
      v-show="!listData.length && !listInfo.length && !authorInfo.length"
      class="loading-content"
    />
  </div>
</template>

<script>
import Loading from '@/components/Loading'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  components: { Loading },
  data () {
    return {
      detailID: '',
      listData: [], // 所有数据
      listInfo: [], // 歌曲数据
      authorInfo: {}, // 作者信息
      scrollFlag: false,
      songDatas: {}
    }
  },
  computed: {
    ...mapGetters([
      'songData'
    ]),
    getSong () {
      // 不行，过段时间再想想怎么解决吧
      return this.songData.url === '' ? 'disabled' : ''
    }
  },
  created () {
    this.detailID = this.$route.params.id
    this.getDetail()
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    ...mapActions([
      'selectSong'
    ]),
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN'
    }),
    getDetail () {
      this.$api.getPlaylistDetailFn(this.detailID).then(res => {
        if (res.status === 200) {
          this.listData = res.data.playlist
          this.listInfo = res.data.playlist.tracks
          this.authorInfo = res.data.playlist.creator
        }
      })
    },
    selected (index, id) {
      this.$api.getSongUrlFn(id).then(res => {
        if (res.status === 200) {
          for (const song in res.data.data) {
            this.songDatas = res.data.data[song]
          }
          this.selectSong({
            list: this.listInfo,
            data: this.songDatas,
            index: index
          })
        }
      })
    },
    changePlay () {
      console.log('oh,shift hah...')
      // this.$nextTick(() => {
      //   this.$refs.audio.play()
      // })
    },
    handleScroll () {
      const _this = this
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop) {
        _this.scrollFlag = true
      } else {
        _this.scrollFlag = false
      }
    },
    returnFind () {
      this.$router.back(-1)
    }
  }
}
</script>

<style lang="stylus" scoped>
.menu
  position relative
  .bg
    width 100%
    height 100%
    background-size cover
    position absolute
    filter blur(30px)
    z-index -1
  .nav
    height 45px
    line-height 45px
    color #fff
  .navActive
    background rgb(212, 68, 57)
  .content
    color #fff
    padding 15px
    box-sizing border-box
    .bgInfo
      position relative
      span
        position absolute
        font-size 10px
        top 1em
        right 1em
    .author
      span
        font-size 14px
        color rgb(187, 191, 191)
        vertical-align top
        line-height 30px
        margin-left 10px
    .bottom
      margin-top 15px
      .van-row
        .van-col
          text-align center
          i
            font-size 24px
          span
            display block
.list
  .pointSong
    border 1px solid #fff
    box-sizing border-box
    background-color #fff
    color #000
  .van-cell
    &.disabled
      color lightgray
</style>
