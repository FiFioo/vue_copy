<template>
    <div>
        <!-- 头部背景 -->
        <div class="menu">
            <div class="bg" :style="{background: 'url(' + bg_img_url + ')' }">
            </div>
            <van-sticky class="nav">
                <van-row type="flex" justify="space-around" align="center">
                    <van-col span="6">
                        <van-icon name="arrow-left" @click="back" />
                    </van-col>
                    <van-col span="6" align="center">歌单</van-col>
                    <van-col span="6" align="right"></van-col>
                </van-row>
            </van-sticky>
            <div class="content">
                <van-row type="flex" justify="space-around">
                    <van-col span="9">
                        <van-image :src="bg_img_url" />
                    </van-col>
                    <van-col span="13">
                        <h3 style="color: #FFFBF0;">{{ playlist_name }}</h3>
                        <p class="creator">
                            <van-image width="2em" round :src="creator.avatarUrl" />
                            <span>{{ creator.nickname }}</span>
                        </p>
                    </van-col>
                </van-row>
            </div>
        </div>
        <!-- 底部播放条 -->
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
        <!-- 播放列表 -->
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
            bg_img_url : "",
            tracks: [],
            creator: {},
            song_url: "",
            pic_url: "",
            is_play_song: false,
            selected_track: {},
            selected_track_ar: {},
            playlist_name: ""
        }
    },
    methods: {
        get_playlist_detail(){
            this.$api.get_playlist_detail(this.id).then(
                res => {
                    let playlist = res.data.playlist;
                    this.bg_img_url = playlist.coverImgUrl;
                    this.tracks = playlist.tracks;
                    this.creator = playlist.creator;
                    this.playlist_name = playlist.name;
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
        },
        back() {
            this.$router.back();
        }
    },
    created(){
        this.id = this.$route.params.id;
        this.get_playlist_detail();
    },
    computed: {
        is_rotate(){
            return this.is_play_song ? "play" : "play pause"
        },
        is_play(){
            return this.is_play_song ? 'pause-circle-o' : 'play-circle-o'
        }
    }
}
</script>

<style scoped>
.menu {
    position: relative;
}
.menu>.bg {
    width: 100%;
    height: 100%;
    background-size: cover;
    position: absolute;
    filter: blur(30px);
    z-index: -1;
}

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

.bottom-player>.van-image{
    padding: 15px;
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
    padding: 15px;
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

.sticky-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.creator>span {
    font-size: 14px;
    vertical-align: top;
    line-height: 30px;
    margin-left: 10px;
    color: grey;
}

.nav {
    height: 40px;
    line-height: 40px;
    color: #fff;
}

@keyframes spin {
    0%{ transform : rotate(0deg) }
    100%{ transform : rotate(360deg) }
}
</style>