<template>
    <van-row>
        <van-col span="4">
            <van-icon name="contact" />
        </van-col>
        <van-col span="16">
            <van-tabs>
                <van-tab v-for="tab in tab_data" :key="tab.id" :title="tab.title" :to="tab.path"></van-tab>
            </van-tabs>
        </van-col>
    </van-row>
</template>

<script>
export default {
    data(){
        return {
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