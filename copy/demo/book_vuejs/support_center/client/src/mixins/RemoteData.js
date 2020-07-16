export default function (resources) {
    return {
        data() {
            let initData = {
                remoteDataLoading: 0,
                remoteErrors: {}
            };

            for (const key in resources) {
                initData[key] = null;
                initData.remoteErrors[key] = null;
            }

            return initData;
        },

        methods: {
            async fetchRemoteData(key, url) {
                this.remoteDataLoading++;
                this.remoteErrors[key] = null;

                try {
                    this[key] = await this.$fetch(url);
                } catch(e) {
                    console.error(e);
                    this.remoteErrors[key] = e;
                }

                this.remoteDataLoading--;
            }
        },

        computed: {
            remoteDataBusy() {
                return this.remoteDataLoading != 0;
            },
            hasRemoteErrors(){
                return Object.keys(this.remoteErrors).some(
                    (key) => {
                        return this.remoteErrors[key];
                    }
                )
            }
        },

        created(){
            for (const key in resources) {
                let url = resources[key];
                this.fetchRemoteData(key, url);
            }
        }
    }
}