<template>
    <main class="faq">
        <h1>Frequently Asked Questions</h1>

        <div class="error" v-if="hasRemoteErrors">
            Load questions occur error
        </div>

        <section class="list">
            <article v-for="(question, index) of questionList" :key="index">
                <h2 v-html="question.title"></h2>
                <p v-html="question.content"></p>
            </article>
        </section>

        <Loading v-if="remoteDataBusy" />
    </main>
</template>

<script>
import RemoteData from "../mixins/RemoteData"

export default {
    // data() {
    //     return {
    //         questions: [],
    //         error: null,
    //     }
    // },
    
    mixins: [
        RemoteData({
            questionList: "questions",
        })
    ],
    // created() {
    //     fetch("http://localhost:3000/questions").then(
    //         (response) => {
    //             if (response.ok) {
    //                 return response.json();
    //             } else {
    //                 return Promise.reject("error");
    //             }
    //         }
    //     ).then(
    //         (questions) => {
    //             this.questions = questions;
    //         }
    //     ).catch(
    //         (e) => {
    //             this.error = e;
    //         }
    //     );
    // }

    // async created(){
    //     this.loading = true;

    //     try {
    //         this.questions = await this.$fetch("questions");
    //     } catch(e) {
    //         this.error = e;
    //     }

    //     this.loading = false;
    // }
}
</script>