<!--
 * @Author: niansnana
 * @Begin: 2020年4月4日11:03:54
 * @Update log: 编写功能菜单导航
 -->
<template>
  <van-grid :border="false" :column-num="5">
    <van-grid-item
      v-for="(item, index) in navData"
      :key="index"
      :icon="item.icon"
      :text="item.title"
      :to="item.path"
    />
  </van-grid>
</template>

<script>
export default {
  data () {
    return {
      navData: [
        { icon: 'clock-o', title: '每日推荐', path: '#' },
        { icon: 'music-o', title: '歌单', path: '/songSquare/recommend' },
        { icon: 'diamond-o', title: '排行榜', path: '/leaderboard' },
        { icon: 'service-o', title: '电台', path: '#' },
        { icon: 'smile-o', title: '私人FM', path: '#' }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.van-grid
  height 10%
  padding 0.4rem 0
</style>
