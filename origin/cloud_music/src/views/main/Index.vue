<template>
  <div>
    <Header />
    <router-view class="main" />
  </div>
</template>

<script>
import Header from '@/components/Header'
export default {
  components: { Header }
}
</script>

<style lang="stylus" scoped>
.main
  margin-top 15px
  padding 0 15px
</style>
