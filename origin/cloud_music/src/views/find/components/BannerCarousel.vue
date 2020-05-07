<!--
 * @Author: niansnana
 * @Begin: 2020年4月3日16:22:14
 * @Update log: 编写轮播图
 -->
<template>
  <div class="banner-main">
    <van-swipe :autoplay="3000" indicator-color="red">
      <van-swipe-item v-for="(item, index) in bannerData" :key="index">
        <img v-lazy="item.pic" class="banner-img" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  data () {
    return {
      bannerData: []
    }
  },
  created () {
    this.getBanner()
  },
  methods: {
    getBanner () {
      this.$api.bannerCarouselFn().then(res => {
        if (res.status === 200) {
          this.bannerData = res.data.banners
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.banner-main
  box-sizing border-box
  overflow hidden
  width 100%
  height 0
  padding-bottom 40%
  .banner-img
    width 100%
    height 100%
    border-radius 1em
</style>
