import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/find'
  },
  {
    path: '/index',
    component: () => import('@/views/main/Index'),
    children: [
      {
        path: '/home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/home/Index')
      },
      {
        path: '/find',
        component: () => import('@/views/find/Index')
      },
      {
        path: '/friend',
        component: () => import('@/views/friend/Index')
      },
      {
        path: '/video', component: () => import('@/views/video/Index')
      }
    ]
  },
  {
    path: '/songSquare',
    redirect: '/songSquare/recommend',
    component: () => import(/* webpackChunkName: "songSquare" */ '@/views/songSquare/Index'),
    children: [
      {
        path: '/songSquare/recommend',
        component: () => import(/* webpackChunkName: "songSquare" */ '@/views/songSquare/components/Recommend')
      },
      {
        path: '/songSquare/boutique',
        component: () => import(/* webpackChunkName: "songSquare" */ '@/views/songSquare/components/Boutique')
      },
      {
        path: '/songSquare/chinese',
        component: () => import(/* webpackChunkName: "songSquare" */ '@/views/songSquare/components/Chinese')
      },
      {
        path: '/songSquare/popular',
        component: () => import(/* webpackChunkName: "songSquare" */ '@/views/songSquare/components/Popular')
      },
      {
        path: '/songSquare/nostalgia',
        component: () => import(/* webpackChunkName: "songSquare" */ '@/views/songSquare/components/Nostalgia')
      },
      {
        path: '/songSquare/ballad',
        component: () => import(/* webpackChunkName: "songSquare" */ '@/views/songSquare/components/Ballad')
      },
      {
        path: '/songSquare/occident',
        component: () => import(/* webpackChunkName: "songSquare" */ '@/views/songSquare/components/Occident')
      },
      {
        path: '/songSquare/japanese',
        component: () => import(/* webpackChunkName: "songSquare" */ '@/views/songSquare/components/Japanese')
      }
    ]
  },
  {
    // 歌单详情
    path: '/songSquare/detail',
    name: 'songSquareDetail',
    component: () => import('@/views/songSquare/Detail')
  },
  {
    // 这里查看并设计样式
    path: '/leaderboard',
    component: () => import('@/components/Player')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login')
  },
  {
    path: '/search',
    component: () => import('@/views/search/Index')
  },
  {
    path: '/search/:id',
    component: () => import('@/views/search/Result')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
