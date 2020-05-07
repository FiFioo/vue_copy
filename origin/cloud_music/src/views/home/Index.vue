<template>
  <div class="home-main">
    <van-cell v-for="(item, index) in featuresData" :key="index" is-link :value="item.value">
      <template #title>
        <i class="iconfont" :class="item.icon"></i>
        {{item.title}}
      </template>
    </van-cell>
    <van-collapse v-show="this.token" v-model="activeShow">
      <van-collapse-item title="我创建的歌单(1)" name="1">
        <div class="content" v-for="(item, index) in userPlayListData" :key="index">
          <van-image width="80" fit="cover" :src="item.coverImgUrl" />
          <div class="info">
            <h3>{{item.name}}</h3>
            <span>{{item.trackCount}}首</span>
          </div>
        </div>
      </van-collapse-item>
    </van-collapse>
    <van-collapse v-show="!this.token" v-model="activeShow">
      <van-collapse-item title="我创建的歌单(1)" name="1">
        <div class="content">
          <van-image width="80" fit="cover" src="https://p2.music.126.net/EWC8bPR8WW9KvhaftdmsXQ==/3397490930543093.jpg?param=140y140" />
          <div class="info">
            <h3>我喜欢的音乐</h3>
            <span>0 首</span>
          </div>
        </div>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      featuresData: [
        { title: '本地音乐', icon: 'icon-yinyuered', value: '0' },
        { title: '最近播放', icon: 'icon-zuijinbofang', value: '0' },
        { title: '我的电台', icon: 'icon-wodediantai', value: '0' },
        { title: '我的收藏', icon: 'icon-wodeshoucang', value: '0' }
      ],
      activeShow: ['1'],
      userPlayListData: []
    }
  },
  created () {
    this.getUserInfo()
  },
  computed: {
    ...mapGetters([
      'accountInfo',
      'token'
    ])
  },
  methods: {
    getUserInfo () {
      // 获取用户歌单情况
      this.$api.getuserPlaylistFn(this.accountInfo.userId).then(res => {
        if (res.status === 200) {
          this.userPlayListData = res.data.playlist
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.home-main
  padding 0
  margin 0
  .van-cell
    font-size 20px
    .iconfont
      margin-right 5px
      color #e1505a
      font-size 20px
    .van-cell__value
      font-size 14px
  .van-collapse
    .content
      display flex
      .info
        display flex
        flex-direction column
        flex 1
        margin-left 15px
        h3
          color #494949
          margin-bottom 5px
</style>
