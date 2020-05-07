<!--
 * @Author: niansnana
 * @Begin: 2020年4月18日15:20:14
 * @Update log: 编写搜索功能
-->
<template>
  <div>
    <SearchBar :keywords="keywords" @keywords="getKeywords" />
    <SearchHot v-show="!keywords" />
  </div>
</template>

<script>
import SearchBar from './components/SearchBar'
import SearchHot from './components/SearchHot'
export default {
  components: {
    SearchBar,
    SearchHot
  },
  data () {
    return {
      keywords: ''
    }
  },
  methods: {
    getKeywords (val) {
      this.keywords = val
    }
  }
}
</script>
