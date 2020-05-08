import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/find"
  },
  {
    path: "/find",
    component: () => import("@/views/home/Find")
  },
  {
    path: "/home",
    component: () => import("@/views/home/Home")
  },
  {
    path: "/friend",
    component: () => import("@/views/home/Friend")
  },
  {
    path: "/video",
    component: () => import("@/views/home/Video")
  }
];

const router = new VueRouter({
  routes
});

export default router;
