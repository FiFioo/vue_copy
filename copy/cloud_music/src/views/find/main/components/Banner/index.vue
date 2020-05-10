<template>
    <div>
        <van-swipe :autoplay="3000">
            <van-swipe-item v-for="banner in banners" :key="banner.index">
                <img :src="banner.pic" class="banner-img"/>
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
export default {
    data(){
        return {
            banners: []
        }
    },
    created(){
       this.get_banner();
    },
    methods: {
        get_banner(){
            this.$api.get_banner().then(
                res => {
                    this.banners = res.data.banners;
                }
            );
        }
    }
}
</script>

<style scoped>
.banner-main {
  box-sizing: border-box;
  overflow: hidden;
  width: 100%;
  height: 0;
  padding-bottom: 40%;
}

.banner-img {
    width: 100%;
    height: 100%;
    border-radius: 1em;
}
</style>