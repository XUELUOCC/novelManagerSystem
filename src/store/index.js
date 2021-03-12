import Vue from 'vue'
import Vuex from 'vuex'
import {routes,asyncRouter} from '@/router'
import {routerApi} from '@/api'

Vue.use(Vuex)

//判断router中是否存在接口返回的permission字段,判断一级二级路由
function hasPermission(roles, route) {
    if (route.meta && route.meta.role) {
        return roles.some(role => route.meta.role.indexOf(role) >= 0)
    } else {
        return true
    }
}

export default new Vuex.Store({
  state: {
    token:'',
    routerList:[],
    routers: routes,
    addRouters: [],
    userInfo:{
      username:'',
      password:''
    }
  },
    //只能同步操作
  mutations: {
      setToken(state, token) {
          state.token = token;
          localStorage.setItem('token', token)
      },
      delToken(state) {
          state.token = '';
          localStorage.removeItem('token');
      },
      //获取后台的权限路由
      setRouter(state, val) {
          state.routerList = val;
      },
      //注销时设置权限路由初始值
      delRouter(state) {
          state.routerList = []
      },
      SET_ROUTERS: (state, routers) => {
          state.addRouters = routers;
          state.routers = routes.concat(routers);
      },
  },
    //可进行异步操作//提交的是mutations
  actions: {
      //获取权限路由
      getRouter({commit}){
          return new  Promise((resolve,reject)=>{
              routerApi().then((res)=>{
                  console.log(res.data.roles);
                  commit('setRouter',res.data.roles);
                  resolve(res.data.roles);
              }).catch(err=>{
                  reject(err)
              })
          })
      },
      //获取路由表
      generationRouter({commit},data){
        return new Promise((resolve)=>{
            const roles=data;
            console.log(data)
            const accessedRouters=asyncRouter.filter((item)=>{
                // if(roles.some(tip=>tip.indexOf('admin')>=0)) return true;
                // if(hasPermission(roles,item)){ //判断一级路由的roles
                //     if(item.children && item.children.length>0){
                //         item.children=item,children.filter((child)=>{
                //             if(hasPermission(roles,child)){   //判断二级路由的roles
                //                 return child
                //             }
                //             return false;
                //         });
                //         return item;
                //     }else{
                //         return item;
                //     }
                // }
                // return false;
                if(item.meta.role.indexOf(roles[0])>=0){
                    return item
                }
            })
            commit('SET_ROUTERS', accessedRouters);
            resolve();
        })
      },
  },
  modules: {
      // permission,
  }
})
