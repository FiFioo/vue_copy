import Home from "./components/Home.vue"
import FAQ from "./components/FAQ.vue"
import VueRouter from "vue-router";

const routes = [
    { path: "/", name: "home", component: Home},
    { path: "/faq", name: "faq", component: FAQ},
];

const router = new VueRouter({
    routes
});

export default router;