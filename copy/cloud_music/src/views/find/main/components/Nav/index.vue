<template>
    <van-grid :border="false" :column-num=5>
        <van-grid-item v-for="(nav, index) in nav_data" 
        :key="index" 
        :icon="nav.icon" 
        :text="nav.text" 
        :to="nav.path"
        />
    </van-grid>
</template>

<script>
export default {
    data(){
        return {
            nav_data: [
                { icon: "clock-o", text: "每日推荐", path: "#" },
                { icon: "music-o", text: "歌单", path: "/find/playlist" },
                { icon: "diamond-o", text: "排行榜", path: "#" },
                { icon: "service-o", text: "电台", path: "#" },
                { icon: "smile-o", text: "私人FM", path: "#" }
            ]
        }
    }
}
</script>

<style scoped>

</style>