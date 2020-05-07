<!--
 * @Author: niansnana
 * @Begin: 2020年4月4日14:39:50
 * @Update log: 编写新歌新碟
 -->
 <template>
  <div>
    <van-row type="flex" justify="space-between" align="center">
      <van-col class="recommend" span="10">
        <van-button plain :class="{active:cur==0}" @click="cur=0">新歌</van-button>|
        <van-button plain :class="{active:cur==1}" @click="cur=1">新碟</van-button>
      </van-col>
      <van-col class="square" span="6">更多新碟</van-col>
    </van-row>
    <div class="content" v-show="cur==0">
      <!-- <van-grid :border="false" column-num="3">
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
      </van-grid> -->
      <p>这是新歌部分</p>
    </div>
    <div class="content" v-show="cur==1">
      <p>这是新碟部分</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cur: 0
    }
  },
  created () {
    // this.getNewSong()
  },
  methods: {
    getNewSong () {
      this.$api.getNewSongFn().then(res => {
        // console.log(res)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.van-button
  border none
  font-size 14px
  color #999
  &.active
    font-size 20px
    color #07c160
.square
  width 10vh
  font-size 0.3rem
  border 1px solid #999
  border-radius 30px
  text-align center
  line-height 20px
</style>
