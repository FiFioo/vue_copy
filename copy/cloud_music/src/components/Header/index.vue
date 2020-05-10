<template>
    <van-row>
        <van-col span="4">
            <van-icon name="contact" class="icon"/>
        </van-col>
        <van-col span="16">
            <van-tabs v-model="is_active">
                <van-tab v-for="tab in tab_data" :key="tab.id" :title="tab.title" :to="tab.path"></van-tab>
            </van-tabs>
        </van-col>
        <van-col span="4">
            <van-icon name="search" class="icon"/>
        </van-col>
    </van-row>
</template>

<script>
export default {
    data(){
        return {
            is_active: 1,
            tab_data:[
                { id: '0', title: '我的', path: '/home' },
                { id: '1', title: '发现', path: '/find' },
                { id: '2', title: '朋友', path: '/friend' },
                { id: '3', title: '视频', path: '/video' }
            ]
        }
    }
}
</script>

<style scoped>
.icon {
    text-align: center;
    line-height: 44px;
}
</style>