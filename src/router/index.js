import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'postList',
  },
  {
    path: '/postList',
    name: 'PostList',
    meta: {
      title: 'Post List',
      layout: 'blank'
    },
    component: () => import('@/views/posts/PostList.vue'),
  },
  {
    path: '/postList/:id',
    name: 'PostView',
    meta: {
      title: 'Post View',
      layout: 'blank'
    },
    component: () => import('@/views/posts/PostView.vue'),
  },
  {
    path: '/PostCreateOrEdit/:postId?',
    name: 'PostCreateOrEdit',
    meta: {
      title: 'Post Create or Edit',
      layout: 'blank'
    },
    component: () => import('@/views/posts/PostCreateOrEdit.vue'),
  },
  {
    path: '/drone',
    name: 'Drone',
    meta: {
      title: 'Drone Game',
      layout: 'blank'
    },
    component: () => import('@/views/Drone.vue'),
  },

  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/Error.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '*',
    redirect: 'error-404',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
