<template>
    <div>
        <Banner />
        <Nav />
        <Playlist />
        <NewSong />
    </div>
</template>

<script>
import Banner from "@/components/Find/Banner";
import Nav from "@/components/Find/Nav";
import Playlist from "@/components/Find/Playlist";
import NewSong from "@/components/Find/NewSong";
export default {
    components: {
        Banner,
        Nav,
        Playlist,
        NewSong
    }
}
</script>
