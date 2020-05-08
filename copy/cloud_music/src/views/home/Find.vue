<template>
    <div>
        <p>发现</p>
    </div>
</template>

<script>
export default {
    methods: {
        get_banner() {
            this.$api.get_banner().then(
                res => {
                    console.log(res);
                }
            )
        }
    }
}
</script>