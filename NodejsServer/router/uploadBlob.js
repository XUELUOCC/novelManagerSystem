const pathlib=require('path')
const router = require('./websocket')
const fs=require('fs')

let data=fs.readFile('files/test.xls','utf-8',(err,data)=>{
    if(err){
        console.log('读取出错')
        console.log(err)
    }else{
        return data
    }
})
router.get('/uploadBlob/:name',async(ctx,next)=>{
    console.log('发送文件，准备创建二进制流')
    const name=ctx.params.name
     //koa自带的下载
    ctx.set('Content-Type', 'application/vnd.openxmlformats');
    ctx.set("Content-Disposition", "attachment; filename=" + "test.xls"); //这里是告诉浏览器下载一个附件，名字叫什么 自己动态定义
   
    ctx.body=data
})

module.exports=router