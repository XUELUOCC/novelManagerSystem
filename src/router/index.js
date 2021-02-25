import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
      path: '/',
      redirect: '/dashboard'
  },
  {
    path:'/login',
    name:'Login',
    component:() => import(/* webpackChunkName: "about" */ '../views/login.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
        {
          path:'/dashboard',
          component:()=>import(/* webpackChunkName: "about" */ '../views/page/dashboard.vue'),
          meta:{title:'首页'}
        },
        {
            path:'/novelInfo',
            component:()=>import(/* webpackChunkName: "about" */ '../views/page/novelInfo.vue'),
            meta:{title:'小说信息'}
        },
        {
            path:'/novelType',
            component:()=>import(/* webpackChunkName: "about" */ '../views/page/novelType.vue'),
            meta:{title:'小说类型'}
        },
        {
            path:'/userInfo',
            component:()=>import(/* webpackChunkName: "about" */ '../views/page/userInfo.vue'),
            meta:{title:'用户信息'}
        },
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
