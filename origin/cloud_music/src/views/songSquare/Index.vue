<!--
 * @Author: niansnana
 * @Begin: 2020年4月5日12:01:06
 * @Update log: 编写歌单广场-导航
 -->
 <template>
  <div class="tabContent">
    <van-sticky>
      <van-nav-bar title="歌单" left-arrow @click-left="returnFind">
        <template #right>
          <van-icon name="bar-chart-o" size="18" @click="setFullScreen(true)" />
        </template>
      </van-nav-bar>
    </van-sticky>
    <van-tabs swipeable sticky>
      <van-tab v-for="item in tabData" :key="item.id" :title="item.title" :to="item.path">
        <router-view />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      tabData: [
        { id: '0', title: '推荐', path: '/songSquare/recommend' },
        { id: '1', title: '精品', path: '/songSquare/boutique' },
        { id: '2', title: '华语', path: '/songSquare/chinese' },
        { id: '3', title: '流行', path: '/songSquare/popular' },
        { id: '4', title: '怀旧', path: '/songSquare/nostalgia' },
        { id: '5', title: '民谣', path: '/songSquare/ballad' },
        { id: '6', title: '欧美', path: '/songSquare/occident' },
        { id: '7', title: '日语', path: '/songSquare/japanese' }
      ]
    }
  },
  methods: {
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN'
    }),
    returnFind () {
      this.$router.push('/find')
    }
  }
}
</script>

<style lang="stylus">
.van-grid-item
  height 100%
  font-size 14px
  color #999
  position relative
  overflow hidden
  .coverImgUrl
    border-radius 15px
  .playCount
    position absolute
    top 2.5vh
    right 2.5vh
    font-size 0.9rem
    color #ffffff
</style>
