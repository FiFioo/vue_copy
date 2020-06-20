import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/find"
  },
  {
    path: "/index",
    component: () => import("@/views/main"),
    children: [
      {
        path: "/find",
        component: () => import("@/views/find"),
        children: [
          {
            path: "/",
            component: () => import("@/views/find/main")
          },
          {
            path: "playlist",
            component: () => import("@/views/find/playlist"),
            // mark: 会导致NavigationDuplicated,后面有时间看看
            // children: [
            //   {
            //     path: "detail",
            //     name: "playlist_detail",
            //     component: () => import("@/views/find/playlist/Detail")
            //   }
            // ]
          }
        ]
      },
      {
        path: "/home",
        component: () => import("@/views/home")
      },
      {
        path: "/friend",
        component: () => import("@/views/friend")
      },
      {
        path: "/video",
        component: () => import("@/views/video")
      }
    ]
  },
  {
    path: "detail",
    name: "playlist_detail",
    //component: () => import("@/views/find/playlist/Detail")
    component: () => import("@/views/find/Detail")
  }
];

const router = new VueRouter({
  routes
});

export default router;
