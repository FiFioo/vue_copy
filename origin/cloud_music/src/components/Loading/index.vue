<!--
 * @Author: niansnana
 * @Begin: 2020年4月11日19:02:27
 * @Update log: 动画加载
 -->
<template>
  <div class="loading">
    <van-loading type="spinner" color="#d44439" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      listData: []
    }
  }
}
</script>

<style lang="stylus" scoped>
.loading
  text-align center
</style>
