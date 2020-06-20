<template>
    <div>
        <p style="background-color: lightblue;">新歌:</p>
        <van-list>
            <van-cell v-for="(song, index) in new_songs" :key="index">
                <span >{{ song.name }}</span>
            </van-cell>
        </van-list>
    </div>
</template>

<script>
export default {
    data(){
        return {
            new_songs: []
        }
    },
    methods: {
        get_new_song(){
            this.$api.get_new_song().then(
                res => {
                    this.new_songs = res.data.data;
                }
            )
        }
    },
    created(){
        this.get_new_song()
    }
}
</script>