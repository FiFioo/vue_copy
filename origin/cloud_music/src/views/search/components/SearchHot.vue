<!--
 * @Author: niansnana
 * @Begin: 2020年4月18日15:20:14
 * @Update log: 编写热门搜索
-->
<template>
  <div class="hot-main">
    <div class="hot">
      <p>热门搜索</p>
      <div class="hot-tag">
        <span v-for="(hot, index) in searchHot" :key="index" @click="onSearch(hot.first)">
          {{hot.first}}
          <small v-show="hot.iconType === 1">热</small>
        </span>
      </div>
    </div>
    <div class="hot">
      <p>热搜榜</p>
      <ul class="hot-list">
        <li v-for="(hotDetail, index) in searchHotDetail" :key="index">
          <span>{{ index+1 }}</span>
          <div class="info">
            <div class="title">
              <p>{{hotDetail.searchWord}}</p>
              <span>{{hotDetail.score}}</span>
              <!-- <small>
                {{hotDetail.iconType === 1 ? 'HOT' : ''}}
              </small>-->
              <img :src="hotDetail.iconUrl" alt />
            </div>
            <div class="description">{{hotDetail.content}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchHot: [],
      searchHotDetail: []
    }
  },
  created () {
    this.getSearchHot()
    this.getSearchHotDetail()
  },
  methods: {
    getSearchHot () {
      this.$api.getSearchHotFn().then(res => {
        if (res.status === 200) {
          this.searchHot = res.data.result.hots
        }
      })
    },
    getSearchHotDetail () {
      this.$api.getSearchHotDetailFn().then(res => {
        if (res.status === 200) {
          this.searchHotDetail = res.data.data
        }
      })
    },
    onSearch (val) {
      this.$router.push({
        path: `/search/${val}`
      })
      this.$api.getSearchFn(val).then(res => {
        if (res.status === 200) {
          this.songsData = res.data.result.songs
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.hot-main
  margin-top -10px
  .hot
    p
      margin 0
      padding 0 5px
      height 30px
      line-height 30px
      font-size 12px
      color #757575
    .hot-tag
      margin 0 10px
      span
        display inline-block
        padding 5px 10px
        margin 4px
        border 0.8px solid #c7c7c7
        border-radius 5px
        line-height 20px
        color #2e3030
        font-size 14px
        border-radius 15px
        cursor pointer
        small
          color #fff
          background #dc332c
          padding 0 3px
          box-sizing border-box
          font-size 10px
    .hot-list
      margin 0 10px
      li
        display flex
        align-items center
        margin 10px 0px
        span
          font-size 12px
        &:nth-child(1)
          color red
        &:nth-child(2)
          color red
        &:nth-child(3)
          color red
        .info
          display flex
          flex-direction column
          margin-left 20px
          height 100%
          .title
            display flex
            align-items center
            line-height 0.6rem
            p
              white-space nowrap
              color #333333
              padding 0
              font-size 15px
              margin-right 5px
              cursor pointer
            span
              font-size 10px
              color #999
            img
              margin-left 10px
              height 10px
          .description
            font-size 0.23rem
            color #aaa
</style>
