<!--
 * @Author: niansnana
 * @Begin: 2020年4月4日11:12:49
 * @Update log: 编写推荐歌单模块
 * @Bug 图片不是圆角，待解决！(已解决0405)
 -->
<template>
  <div class="vanImageToRadius">
    <van-row type="flex" justify="space-between" align="center">
      <van-col class="recommend" span="6">推荐歌单</van-col>
      <van-col class="square" span="6">
        <router-link to="/songSquare">歌单广场</router-link>
      </van-col>
    </van-row>
    <van-grid :border="false" :column-num="3">
      <van-grid-item v-for="(item, index) in playListData" :key="index" @click="goDetailFn(item)">
        <van-image :src="item.coverImgUrl" lazy-load value-class="coverImgUrl" />
        <p class="description">{{ item.description }}</p>
        <span class="playCount">
          <van-icon name="play-circle-o" />
          {{ item.playCount | priceAbb(item.playCount) }}
        </span>
      </van-grid-item>
      <!-- <van-grid-item>查看更多>></van-grid-item> -->
    </van-grid>
  </div>
</template>

<script>
export default {
  data () {
    return {
      playListData: []
    }
  },
  created () {
    this.getPlatList()
  },
  methods: {
    getPlatList () {
      this.$api.playListFn().then(res => {
        if (res.status === 200) {
          this.playListData = res.data.playlists
        }
      })
    },
    goDetailFn (item) {
      // 跳转歌单详情页
      this.$router.push({
        name: 'songSquareDetail',
        params: {
          id: item.id
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.recommend
  font-weight 700
  color rgb(51, 51, 51)
.square
  width 10vh
  font-size 0.3rem
  border 1px solid #999
  border-radius 30px
  text-align center
  line-height 20px
.van-grid-item
  height 100%
  font-size 14px
  color #999
  position relative
  overflow hidden
  .coverImgUrl
    border-radius 15px
  .description
    overflow hidden
    text-overflow ellipsis
    display -webkit-box
    -webkit-box-orient vertical
    -webkit-line-clamp 2
  .playCount
    position absolute
    top 2vh
    right 2vh
    z-index 1
    font-size .9rem
    color #fff
</style>
