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
                    <template v-if="item.children">
                        <el-submenu :index="item.path" >
                            <template slot="title">
                                <i :class="item.icon"></i>
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
                    <template v-else>
                        <el-menu-item :index="item.path">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.name }}</span>
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
                        path:'dashboard',
                        icon:'el-icon-s-home'
                    },
                    {
                        name:'小说信息',
                        path:'novle',
                        icon:'el-icon-pie-chart',
                        children:[
                            {
                                name:'小说信息',
                                path:'novelInfo',
                                // children:[
                                //     {
                                //         name:'选项2-1',
                                //         path:'2-11'
                                //     }
                                // ]
                            },
                            {
                                name:'小说类型',
                                path:'novelType'
                            }
                        ]
                    },
                    {
                        name:'用户信息',
                        path:'user',
                        icon:'el-icon-user',
                        children:[
                            {
                                name:'用户信息',
                                path:'userInfo',
                                // children:[
                                //     {
                                //         name:'选项3-1',
                                //         path:'3-11'
                                //     }
                                // ]
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
            if(this.collapse==false){

            }
        },
        methods:{
            handleOpen(key, keyPath) {
                // console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                // console.log(key, keyPath);
            },
            //选中菜单
            // selectMenu(index,indexPath){
            //     // console.log(index,indexPath)
            //     this.navList.forEach((item)=>{
            //         if(item.path==index){
            //             this.routeName=item.name;
            //         }else if(item.children){
            //             this.setName(item.children,index)
            //         }
            //     })
            //     console.log(this.routeName)
            //     localStorage.setItem('routeName',this.routeName);
            // },
            // //递归查找路由名称
            // setName(arr,route){
            //     arr.forEach((tip)=>{
            //         if(tip.path==route){
            //             // this.routeList.push(tip.name)
            //             this.routeName=tip.name;
            //         }
            //     })
            // }
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