<template>
    <div>
        <Banner />
        <Nav />
        <Playlist />
        <NewSong />
    </div>
</template>

<script>
import Banner from "./components/Banner";
import Nav from "./components/Nav";
import Playlist from "./components/Playlist";
import NewSong from "./components/NewSong";
export default {
    components: {
        Banner,
        Nav,
        Playlist,
        NewSong
    }
}
</script>
