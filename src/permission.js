import router from './router'
import store from './store'

const whiteList = ['/login'] // no redirect whitelist  白名单，不在侧边栏中显示的路由

// window.hasRoutes=false;
router.beforeEach(async(to,from,next)=> {
    console.log('wwwww')
    let token = store.state.token;
    if(token){
        //已登录去首页
        if(to.path=='/login'){
            next({path:'/'})
        }else{   //登录进去后，会进行路由变化，此时从login====>dashboard  ,此处模块调用，生成路由表
            if(store.state.routerList.length===0){   //说明刚开始，路由表还没有生成
                await store.dispatch('getRouter');
                store.dispatch('generationRouter', store.state.routerList).then((res) => {
                    // console.log(store.state.addRouters)
                    // console.log(store.state.routers)
                    router.addRoutes(store.state.addRouters);
                    next({...to, replace: true})
                })
            }else{   //代表已存在权限，路由表已生成
                next();
            }
        }
    }else{
        // if(to.path=='/login'){
        //     //重新触发的时候会进入到这里,因为to.path已经变为/login了，然后直接跳转到登录页
        //     next()
        // }else{
        //     //第一次会走到这个位置，然后重新触发路由钩子函数beforeEach,
        //     //当重新触发钩子函数的时候这时的to.path已经变为/login
        //     next('/login')
        // }
        //白名单判断
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            console.log('sssss')
            next(`/login?redirect=${to.path}`)
        }
    }
    next()//一定要调用next(),否则会造成页面卡死在登录页
})