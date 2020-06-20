<template>
    <div>
        <van-tabs swipeable v-model="active_tab_name" @click="get_playlists" type="card">
            <van-tab v-for="(cat, index) in catlist" :key="index" :title="cat.name" :name="cat.name">
            </van-tab>
        </van-tabs>
        <van-grid :border="false" :column-num=3>
            <van-grid-item v-for="(playlist, index) in playlists" :key="index" @click="show_detail(playlist.id)">
                <van-image :src="playlist.coverImgUrl"></van-image>
                <p class="van-multi-ellipsis--l2 description">{{ playlist.description }}</p>
            </van-grid-item>
        </van-grid>
    </div>
</template>

<script>
export default {
    data(){
        return {
            active_tab_name: "全部",
            catlist: [],
            playlists: []
        }
    },
    methods: {
        get_catlist(){
            this.$api.get_playlist_catlist().then(
                res => {
                    this.catlist = res.data.sub;
                    this.get_playlists()
                }
            );
        },
        get_playlists(){
            this.$api.get_playlist(20, this.active_tab_name).then(
                res => {
                    this.playlists = res.data.playlists
                }
            )
        },
        show_detail(id){
            this.$router.push({
                name: "playlist_detail",
                params: {
                    id
                }
            }).catch(err => { console.log(err)})
        }
    },
    created(){
        this.get_catlist();
    },
    // computed: {
    //     active_tab: function(){
    //         this.get_playlists()
    //     }
    // }
}
</script>

<style scoped>
.van-grid-item {
    overflow: hidden;
}

.description {
    font-size: 14px;
    color: gray;
}
</style>