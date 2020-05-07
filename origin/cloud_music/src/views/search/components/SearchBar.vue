<!--
 * @Author: niansnana
 * @Begin: 2020年4月18日15:20:14
 * @Update log: 编写搜索框组件
-->
<template>
  <div class="searchBar">
    <form action="/">
      <van-search
        v-model="keywords"
        show-action
        clearable
        placeholder="搜索歌曲、歌手"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <ul v-show="suggestData">
      <li v-show="keywords" class="tag">搜索“{{keywords}}”</li>
      <li v-for="(song, index) in suggestData" :key="index" @click="onNewSearch(song.keyword)">
        <van-icon name="search" />
        <span>{{song.keyword}}</span>
      </li>
    </ul>
    <p v-show="!suggestData && keywords">暂无歌曲</p>
  </div>
</template>

<script>
export default {
  // props: {
  //   keywords: {
  //     type: String,
  //     default: ''
  //   }
  // },
  data () {
    return {
      keywords: '',
      suggestData: []
    }
  },
  watch: {
    keywords () {
      if (this.keywords !== '') {
        this.onSuggest()
      } else {
        this.suggestData = []
      }
    }
  },
  created () {
    this.$watch('keywords', (val) => {
      this.$emit('keywords', (val))
    })
  },
  methods: {
    onSuggest () {
      this.$api.getSearchSuggestFn(this.keywords).then(res => {
        if (res.status === 200) {
          this.suggestData = res.data.result.allMatch
        }
      })
    },
    onSearch () {
      this.$router.push({
        path: `/search/${this.keywords}`
      })
    },
    onNewSearch (val) {
      this.$router.push({
        path: `/search/${val}`
      })
    },
    onCancel () {
      this.$router.push({
        path: '/find'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.searchBar
  ul
    padding 0px 10px 10px 10px
    box-sizing border-box
    li.tag
      color #6480a7
      letter-spacing 1px
      font-size 15px
    li
      height 40px
      line-height 40px
      border-bottom 1px solid #f2f2f2
      .van-icon
        vertical-align middle
        margin-right 5px
  p
    margin 0
    color #2e3030
    font-size 13px
    text-align center
    padding 5px 0
</style>
