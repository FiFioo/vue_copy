<!--
 * @Author: niansnana
 * @Begin: 2020年4月5日12:58:15
 * @Update log: 编写歌单广场-民谣歌单
 -->
<template>
  <div class="vanImageToRadius">
    <van-grid :border="false" :column-num="3">
      <van-grid-item v-for="(item, index) in listData" :key="index" @click="goDetailFn(item)">
        <van-image :src="item.coverImgUrl" lazy-load value-class="coverImgUrl" />
        <p class="van-multi-ellipsis--l2">{{ item.description }}</p>
        <span class="playCount">
          <van-icon name="play-circle-o" />
          {{ item.playCount | priceAbb(item.playCount) }}
        </span>
      </van-grid-item>
    </van-grid>
    <Loading v-show="!listData.length" class="loading-content" />
  </div>
</template>

<script>
import Loading from '@/components/Loading'
export default {
  components: { Loading },
  data () {
    return {
      listData: []
    }
  },
  created () {
    this.getBalladList()
  },
  methods: {
    getBalladList () {
      this.$api.getPlayCatListFn(30, 'hot', '民谣').then(res => {
        if (res.status === 200) {
          this.listData = res.data.playlists
        }
      })
    },
    goDetailFn (item) {
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
