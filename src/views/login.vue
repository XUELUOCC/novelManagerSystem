<template>
    <div class="container">
        <div class="loginContainer">
            <div class="title">
                <p>管理系统登录</p>
            </div>
            <div class="login">
                <el-form :model="userInfo" status-icon :rules="rules" ref="ruleForm" l class="demo-ruleForm loginForm ">
                    <el-form-item  prop="username">
                        <el-input   v-model="userInfo.username"  >
                            <el-button slot="prepend" icon="el-icon-user"></el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item  prop="password">
                        <el-input  type="password" v-model="userInfo.password" >
                            <el-button slot="prepend" icon="el-icon-lock"></el-button>
                        </el-input>
                    </el-form-item>
                </el-form>
                <div class="passSetting">
                    <div>
                        <el-checkbox label="记住密码" name="type"></el-checkbox>
                    </div>
                    <div>
                        <p class="forgetPass">忘记密码</p>
                    </div>
                </div>
                <div class="submitLogin">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {routerApi} from '@/api'
    export default {
        name: "login",
        data(){
            let validatorUsername=(rule,value,callback)=>{
                let reg=/^[a-zA-Z0-9_-]{4,16}$/;
                if(!value){
                    return callback(new Error('用户名不能为空'));
                }
                // else if(reg.test(value)==false){
                //     return callback(new Error('请输入正确的用户名'));
                // }
            };
            let validatorPassword=(rule,value,callback)=>{
                let reg=/^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
                if(!value){
                    return callback(new Error('密码不能为空'));
                }
                // else if(reg.test(value)==false){
                //     return callback(new Error('请输入正确的密码'));
                // }
            }
            return{
                data:'ddddd',
                userInfo:{
                    username:"admin",
                    password:"123456"
                },
                rules:{
                    username:[
                        // {
                        //     validator:validatorUsername,
                        //     trigger:'blur'
                        // },
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password:[
                        // {
                        //     validator:validatorPassword,
                        //     trigger:'blur'
                        // },
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                },
            }
        },
        methods:{
            //登录
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    // console.log('gggggg')
                    if (valid) {
                        this.$message({
                            message: '登录成功',
                            type: 'success'
                        });
                        // console.log('aaaa')
                        let token='tokenhabdsfvkabv'
                        this.$store.commit('setToken',token);
                        this.$router.push({path:'/'})
                    } else {
                        this.$message.error('登录失败');
                        return false;
                    }
                });
            },
        }
    }
</script>

<style lang="scss"  scoped>
    .container{
        width:100%;
        height:100%;
        padding:0;
        margin:0;
        background:url("../assets/login/container2.jpg") center center no-repeat;
        background-size:100% 100%;
        display:flex;
        justify-content: center;
        align-items: center;
        .loginContainer{
            width:250px;
            border-radius:10px;
            padding:20px;
            background-color: rgba(255,255,255,.5);
            .title{
                width:100%;
                height:40px;
                margin-bottom:10px;
                p{
                    width:100%;
                    height:100%;
                    line-height:40px;
                    text-align: center;
                    font-size:20px;
                    font-weight: 600;
                    color:#fff;
                }
            }
            .login{
                .passSetting{
                    width:100%;
                    padding-bottom:10px;
                    display:flex;
                    justify-content: space-between;
                    align-items: center;
                    .forgetPass{
                        font-size:14px;
                        text-decoration:underline;
                        color:#ccc;
                        cursor: pointer;
                    }
                }
                .submitLogin{
                    width:100%;
                    display: flex;
                    justify-content:center;
                    align-items: center;
                    /deep/.el-button{
                        width:100%;
                    }
                }
            }
        }
    }

</style>