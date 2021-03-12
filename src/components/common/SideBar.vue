<template>
    <div>
        <div class="sidebar">
            <el-menu
                    :default-active="onRoutes"
                    class="sidebar-el-menu"
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#324157"
                    text-color="#fff"
                    :collapse="isCollapse"
                    unique-opened
                    router
                    active-text-color="#409eff">    <!--@select="selectMenu"-->
                <template v-for="item in navList">
                    <template v-if="item.children && item.meta.flag=='2'">
                        <el-submenu :index="item.path" >
                            <template slot="title">
                                <i :class="item.meta.icon"></i>
                                <span>{{item.name}}</span>
                            </template>
                            <template v-for="tip in item.children">
                                <el-submenu v-if="tip.children" :index="tip.path">
                                    <template slot="title" >{{tip.name}}</template>
                                    <el-menu-item v-for="option in tip.children" :index="option.path">{{option.name}}</el-menu-item>
                                </el-submenu>
                                <el-menu-item v-else :index="tip.path">{{tip.name}}</el-menu-item>
                            </template>
                        </el-submenu>
                    </template>
                    <template v-if="item.children && item.meta.flag=='1'">
                        <el-menu-item :index="item.children[0].path">
                            <i :class="item.meta.icon"></i>
                            <span slot="title">{{ item.children[0].name }}</span>
                        </el-menu-item>
                    </template>
                </template>


            </el-menu>
        </div>
    </div>
</template>

<script>
    import bus from '../common/bus'
    export default {
        name: "SideBar",
        data(){
            return{
                routeList:[],
                routeName:"",
                isCollapse:false,
                navList:[
                    {
                        name:'首页',
                        path:'/',
                        meta:{title:'首页',icon:'el-icon-home',flag:'1'},
                        children:[
                            {
                                name:'首页',
                                path:'dashboard',
                                meta:{title:'首页', icon:''}
                            }
                        ]
                    },
                    {
                        name:'用户信息',
                        path:'user',
                        meta:{title:'用户信息',icon:'el-icon-user',flag:'2'},
                        children:[
                            {
                                name:'用户信息',
                                path:'userInfo',
                            }
                        ]
                    },
                ]
            }
        },
        watch:{
            $route(to,form){
                // console.log(to.path)
                // this.routeName=to.path;
            }
        },
        created(){
            //接收header传过来的是否折叠侧边栏
            bus.$on('collapse',msg=>{
                console.log('jjjj'+msg)
                this.isCollapse=msg;
            })
        },
        computed: {
            onRoutes:function(){
                console.log(this.$route.path.replace('/', ''))
                return this.$route.path.replace('/', '');
            }
        },
        mounted(){
            this.$store.state.routers.splice(0,1);
            console.log(this.$store.state.routers);
            this.navList=this.$store.state.routers
        },
        methods:{
            handleOpen(key, keyPath) {
                // console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                // console.log(key, keyPath);
            },
        }
    }
</script>

<style lang="scss" scoped>
    .sidebar {
        display: block;
        /*width:250px;*/
        height:100%;
        /*position: absolute;*/
        /*left: 0;*/
        /*top: 80px;*/
        /*bottom: 0;*/
        /*overflow-y: scroll;*/
    }
    .sidebar::-webkit-scrollbar {
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse) {
        width: 250px;
    }
    .sidebar > ul {
        height: 100%;
    }
</style>