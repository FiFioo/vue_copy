<template>
    <van-list>
        <van-cell v-for="track in tracks" :key="track.index">
            <span>{{ track.name }}</span>
        </van-cell>
    </van-list>
</template>

<script>
export default {
    data(){
        return {
            id: 0,
            tracks: []
        }
    },
    methods: {
        get_playlist_detail(){
            this.$api.get_playlist_detail(this.id).then(
                res => {
                    this.tracks = res.data.playlist.tracks
                }
            )
        }
    },
    created(){
        this.id = this.$route.params.id;
        this.get_playlist_detail();
    }
}
</script>