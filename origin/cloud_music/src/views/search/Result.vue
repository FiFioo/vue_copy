<!--
 * @Author: niansnana
 * @Begin: 2020年4月19日15:06:38
 * @Update log: 返回最终搜索结果
-->
<template>
  <div>
    <SearchBar :keywords="keywords" @keywords="getKeywords" />
    <div class="result" v-show="!keywords">
      <h3>单曲</h3>
      <ul>
        <li v-for="(item, index) in songsData" :key="index">
          <div class="info">
            <p @click="selected(index, item.id)">{{item.name}}</p>
            <div class="author">
              <!-- <span>{{item.album.status === 0 ? '独家' : ''}}</span> -->
              <span v-for="(sub, i) in item.artists" :key="i">{{sub.name}}</span>
              <span>- {{item.album.name}}</span>
            </div>
          </div>
          <div class="control">
            <van-icon name="tv-o" />
            <van-icon name="ellipsis" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import SearchBar from './components/SearchBar'
import { mapActions } from 'vuex'
export default {
  components: {
    SearchBar
  },
  data () {
    return {
      id: '',
      keywords: '',
      songsData: [],
      listData: []
    }
  },
  created () {
    this.id = this.$route.params.id
    this.getSearchResult()
  },
  methods: {
    ...mapActions([
      'selectSong'
    ]),
    getSearchResult () {
      this.$api.getSearchFn(this.id).then(res => {
        if (res.status === 200) {
          this.songsData = res.data.result.songs
        }
      })
    },
    getKeywords (val) {
      this.keywords = val
    },
    selected (index, id) {
      this.$api.getSongUrlFn(id).then(res => {
        if (res.status === 200) {
          for (const song in res.data.data) {
            this.songDatas = res.data.data[song]
          }
          this.selectSong({
            data: this.songDatas, // 当前歌曲
            list: this.listData, // 获取播放列表
            index: index // 当前播放下标
          })
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.result
  padding 0 10px
  margin-top -10px
  h3
    margin 0
    border-bottom 1px solid #f4f4f4
    padding 0px 2px 10px 2px
    box-sizing border-box
  ul
    li
      display flex
      justify-content space-between
      border-bottom 1px solid #f4f4f4
      padding 5px 2px
      box-sizing border-box
      .info
        display flex
        flex-direction column
        p
          margin 0
          color #708eaf
          cursor pointer
        .author
          display flex
          span
            font-size 10px
            color #9e9d9d
            margin-right 5px
            // &:nth-child(1)
            // color red
      .control
        .van-icon
          margin 0 4px
</style>
