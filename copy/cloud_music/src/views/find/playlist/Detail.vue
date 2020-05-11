<template>
    <div>
        <div class="bottom-player" >
            <!-- <img width="100%" height="100%" :src="pic_url" /> -->
            <van-image round width="50px" :src="pic_url" :class="is_rotate"></van-image>
            <div class="song-text">
                <h2 v-html="selected_track.name"></h2>
                <p v-html="selected_track_ar.name"></p>
            </div>
            <div class="control">
                <van-icon :name="is_play" @click.stop="toggle_play"></van-icon>
            </div>
        </div>
        <van-list>
            <van-cell v-for="(track, index) in tracks" :key="index" @click="play_song(track)">
                <span>{{ index+1 }}.</span>
                <span style="padding: 0 10px;">{{ track.name }}</span>
                <van-icon style="float:right;" name="play-circle-o"></van-icon>
            </van-cell>
        </van-list>
        <audio ref="audio" autoplay :src="song_url"/>
    </div>
</template>

<script>
export default {
    data(){
        return {
            id: 0,
            tracks: [],
            song_url: "",
            pic_url: "",
            is_play_song: false,
            selected_track: {},
            selected_track_ar: {}
        }
    },
    methods: {
        get_playlist_detail(){
            this.$api.get_playlist_detail(this.id).then(
                res => {
                    this.tracks = res.data.playlist.tracks;
                }
            )
        },
        get_song(){
            this.$api.get_song()
        },
        play_song(track){
            this.selected_track = track;
            this.selected_track_ar = track.ar[0];
            this.pic_url = track.al.picUrl;
            this.$api.get_song(track.id).then(
                res => {
                    this.song_url = res.data.data[0].url;
                    this.is_play_song = true;
                }
            )
        },
        toggle_play(){
            this.is_play_song = !this.is_play_song;
            let audio = this.$refs.audio;
            this.is_play_song ? audio.play() : audio.pause();
        }
    },
    created(){
        this.id = this.$route.params.id;
        this.get_playlist_detail();
    },
    computed: {
        is_rotate(){
            return this.is_play_song ? "play" : "pause"
        },
        is_play(){
            return this.is_play_song ? 'pause-circle-o' : 'play-circle-o'
        }
    }
}
</script>

<style scoped>
.bottom-player {
    position: fixed;
    bottom: 0;
    z-index: 999;
    text-align: center;
    left: 0;
    right: 0;
    height: 60px;
    width: 100%;
    background-color: gray;
    display: flex;
    align-items: center;
}

.play{
    animation: spin 20s linear infinite;
}

.pause{
    animation-play-state: paused;
}

.control{
    width: 30px;
    font-size: 30px;
}

.song-text {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
}

.song-text>h2 {
    margin: 0;
    line-height: 14px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 14px;
    color: #2e3030;
}

.song-text>p {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 11px;
    color: #2e3030;
}

@keyframes spin {
    0%{ transform : rotate(0deg) }
    100%{ transform : rotate(360deg) }
}
</style>