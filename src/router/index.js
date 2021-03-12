import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store'

Vue.use(VueRouter)

//公共路由菜单
export const routes = [
   {
    path:'/login',
    name:'登录',
    component:() => import(/* webpackChunkName: "login" */ '@/views/login.vue')
   },
  {
    path: '/',
    name: '首页',
    redirect: '/dashboard',
    component: Home,
    meta:{title:'首页', icon:'el-icon-s-home',flag:'1'},
    children:[
        {
          path:'/dashboard',
          name:'首页',
          component:()=>import(/* webpackChunkName: "about" */ '@/views/page/dashboard.vue'),
          meta:{title:'首页', icon:''}
        },
    ]
  },
    {
        path:'/user',
        name:'用户信息',
        component:Home,
        meta:{title:'用户信息',icon:'el-icon-user',flag:'2'},
        children:[
            {
                path:'/userInfo',
                name:'用户信息管理',
                component:()=>import(/* webpackChunkName: "about" */ '@/views/page/userInfo.vue'),
                meta:{title:'用户信息管理',icon:''}
            },
        ]
    },
]

//需要权限设置的路由
 export  const asyncRouter=[
     {
         path:'/novel',
         name:'小说信息',
         meta:{title:'小说信息',icon:'el-icon-eleme',role:['admin','user'],flag:'2'},
         component: Home,
         children:[
             {
                 path:'/novelInfo',
                 name:'小说信息管理',
                 component:()=>import(/* webpackChunkName: "about" */ '@/views/page/novelInfo.vue'),
                 meta:{title:'小说信息管理',role:['admin','user']}
             },
             {
                 path:'/novelType',
                 name:'小说类型管理',
                 component:()=>import(/* webpackChunkName: "about" */ '@/views/page/novelType.vue'),
                 meta:{title:'小说类型管理',role:['admin','user']}
             },
         ]
     },
     {
         path:'/per',
         name:'权限页面管理1',
         component:Home,
         meta:{title:'权限页面管理',icon:'el-icon-s-tools',role:['admin','user'],flag:'1'},
         children:[
             {
                 path:'/permission',
                 name:'权限页面1',
                 component:()=>import(/* webpackChunkName: "permission" */ '@/views/permission.vue'),
                 meta:{title:'权限页面1',icon:'', role:['admin','user']}
             }
         ]
     },
     {
         path: '/per1',
         name: '权限页面管理2',
         component: Home,
         meta: {title: '权限页面管理', icon: 'el-icon-phone-outline', role: [ 'admin','user1'],flag:'1'},
         children:[
             {
                 path:'/permission1',
                 name:'权限页面2',
                 component:()=>import(/* webpackChunkName: "permission1" */ '@/views/permission1.vue'),
                 meta:{title:'权限页面2',icon:'', role:['admin','user1']}
             },
         ]
     }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//设置网页标题
router.beforeEach((from,to,next)=>{
    if(to.meta.name){
        document.title=to.meta.name;
    }else{
        document.title='默认'
    }
    next();
})

//解决频繁点击路由会报错的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default router
