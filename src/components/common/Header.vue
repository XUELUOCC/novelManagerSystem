<template>
    <div>
        <div class="header">
            <div class="headerLeft" @click="collapseChange">
                <span v-if="!collapse"><i class="el-icon-s-fold"></i></span>
                <span v-else><i class="el-icon-s-unfold"></i></span>
                <p>后台管理系统</p>
            </div>
            <div class="headerRight">
                <div class="setting">
                    <div class="settingIcon">
                        <span class="screen" @click="screen"><i class="el-icon-rank"></i></span>
                        <span><i class="el-icon-bell"></i></span>
                    </div>
                    <div class="userInfo">
                        <div class="avatar">
                            <el-avatar icon="el-icon-user-solid"></el-avatar>
                        </div>
                        <div>
                            <el-dropdown @command="handleLogin">
                              <span class="el-dropdown-link">
                                admin
                                <i class="el-icon-arrow-down el-icon--right"></i>
                              </span>
                              <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="loginout">注销</el-dropdown-item>
                                <el-dropdown-item command="userInfo">个人信息</el-dropdown-item>
                              </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import bus from '../common/bus'
    import screenfull from 'screenfull'
    export default {
        name: "Header",
        data(){
            return{
                collapse:false, //折叠侧边栏的变量
                //默认不全屏
                fullscreen: false
            }
        },
        mounted(){
            if (document.body.clientWidth < 1500) {
                this.collapseChange();//进来后，默认折叠，传递collapse==true;
            }
        },
        methods:{
            //侧边栏折叠
            collapseChange(){
                this.collapse=!this.collapse;
                bus.$emit('collapse',this.collapse)
            },
            //登出注销
            Loginout(){
                this.$router.push('/login');
                this.$store.commit('delToken');
                this.$store.commit('delRouter');
            },
            //个人信息
            userInfo(){

            },
            handleLogin(command){
                return command==='loginout'? this.Loginout():this.userInfo()
            },
            //全屏
            screen(){
                let element = document.documentElement;
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .header{
        width:100%;
        height:80px;
        background-color:#242f42;
        display:flex;
        justify-content:space-between ;
        align-items: center;
        .headerLeft{
            display:flex;
            justify-content:flex-start;
            align-items: center;
            width:250px;
            margin-left:20px;
            height:100%;
            span{
                color:#fff;
                margin-right:10px;
                font-size:24px;
                cursor: pointer;
            }
            p{
                color:#fff;
                font-size:24px;
            }
        }
        .headerRight{
            width:250px;
            .setting{
                display:flex;
                justify-content:flex-start;
                align-items: center;
                .settingIcon{
                    color:#fff;
                    font-size:22px;
                    margin-right:15px;
                    span{
                        margin-left:10px;
                        &:hover{
                            cursor:pointer;
                        }
                    }
                    .screen{
                        i{
                            transform:rotate(45deg);
                        }
                    }
                }
                .userInfo{
                    display:flex;
                    justify-content: space-between;
                    align-items: center;
                    .avatar{
                        width:50px;
                        height:50px;
                        margin-right:10px;
                        span{
                            display:block;
                            width:100%;
                            height:100%;
                        }
                    }
                }
            }
        }
    }

    /*setting--userInfo*/
    .el-dropdown-link {
        cursor: pointer;
        color: #fff;
        font-size:20px;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }

</style>