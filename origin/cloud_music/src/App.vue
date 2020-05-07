<template>
  <div id="app">
    <router-view />
    <Player />
  </div>
</template>
<script>
import Player from '@/components/Player'
import { mapGetters } from 'vuex'
export default {
  components: { Player },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  created () {
    // 信息存储
    if (sessionStorage.getItem('token')) {
      if (!this.token) {
        this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('token'))))
      }
    }
    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      if (this.token) {
        sessionStorage.setItem('token', JSON.stringify(this.$store.state))
      }
    })
    this.copyRight()
  },
  methods: {
    copyRight () {
      console.log('欢迎使用 cloudMusic!\n当前版本：v1.0\n歌曲来源于网易云\nGithub：https://github.com/niansnana/cloudMusic')
    }
  }
}
</script>
