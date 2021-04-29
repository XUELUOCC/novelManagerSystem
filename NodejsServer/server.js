const koa=require('koa');
const router=require('koa-router')();
const koaBody=require('koa-body')
const fs=require('fs')
const pathlib=require('path')
const cors=require('koa2-cors')
// const websocket=require('ws')
const websocket=require('koa-websocket')

let server=new koa();

//实例化一个ws
const app=websocket(server)

//用来存储建立的链接
let wsObj={}

//使用websocket的路由
let websocketRoute=require('./router/websocket')
router.use('/',websocketRoute.routes())
app.ws.use(router.routes()).use(router.allowedMethods())

//监听websocket的3000端口服务器
app.listen(3000,()=>{
    console.log('服务启动')
});

//上传文件
server.use(koaBody({
    multipart:true,
    formidable:{
        maxFileSize:200*1024*1024
    }
}))
//解决跨域
server.use(cors({
    origin:'*'
}))

//上传文件路由
let upload=require('./router/upload');

router.use('/api',upload.routes())

//启动路由
server.use(router.routes()).use(router.allowedMethods());  //使用其他路由
server.listen(8000) 