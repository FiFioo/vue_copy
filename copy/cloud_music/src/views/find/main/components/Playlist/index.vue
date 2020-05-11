<template>
    <div>
        <van-row type="flex" justify="space-between" align="center">
            <van-col class="recommend" spand="6">推荐歌单</van-col>
            <van-col class="list-square" spand="6">歌单广场</van-col>
        </van-row>
        <van-grid :border="false" :column-num="3">
            <van-grid-item 
            v-for="(playlist, index) in playlists" 
            :key="index"
            class="vam-grid-item"
            >
                <van-image :src="playlist.coverImgUrl" lazy-load />
                <p class="description">{{ playlist.description }}</p>
            </van-grid-item>
        </van-grid>
    </div>
</template>

<script>
export default {
    data(){
        return {
            playlists: []
        }
    },
    methods: {
        get_playlist(){
            this.$api.get_playlist().then(
                res => {
                    this.playlists = res.data.playlists;
                }
            )
        }
    },
    created(){
        this.get_playlist()
    }
}
</script>

<style scoped>
.recommend {
    font-weight: 700;
    /* color: black; */
}

.list-square {
    border: 1px solid black;
    border-radius: 1em;
    font-size: 0.5em;
    text-align: center;
    line-height: 2em;
    width: 50px;
}

.van-grid-item {
    position: relative;
    font-size: 14px;
    color: #999;
}

.description {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
</style>