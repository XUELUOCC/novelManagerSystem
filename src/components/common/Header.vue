<template>
    <div>
        <div class="header">
            <div class="headerLeft">
                <span v-if="flag" @click="unfold"><i class="el-icon-s-fold"></i></span>
                <span v-else @click="fold"><i class="el-icon-s-unfold"></i></span>
                <p>后台管理系统</p>
            </div>
            <div class="headerRight">
                <div class="setting">
                    <div class="settingIcon">
                        <span><i class="el-icon-rank"></i></span>
                        <span><i class="el-icon-bell"></i></span>
                    </div>
                    <div class="userInfo">
                        <div class="avatar">
                            <el-avatar icon="el-icon-user-solid"></el-avatar>
                        </div>
                        <div>
                            <el-dropdown>
                              <span class="el-dropdown-link">
                                admin
                                <i class="el-icon-arrow-down el-icon--right"></i>
                              </span>
                              <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>注销</el-dropdown-item>
                                <el-dropdown-item>个人信息</el-dropdown-item>
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
    export default {
        name: "Header",
        data(){
            return{
                flag:true,
            }
        },
        methods:{
            //不折叠
            unfold(){

            },
            //折叠
            fold(){

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