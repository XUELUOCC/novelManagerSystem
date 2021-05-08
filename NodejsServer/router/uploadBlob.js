const pathlib=require('path')
const router = require('./websocket')
const fs=require('fs')
const xlsx=require('node-xlsx')
const iconv=require('iconv-lite')


let data=fs.readFileSync('files/test.xls')
router.get('/uploadBlob/:name',async(ctx,next)=>{
    console.log('发送文件，准备创建二进制流')
    let tableData=xlsx.parse('files/test.xls')
    // for (let i in tableData){
    //     console.log(tableData[i])
    // }
    const name=ctx.params.name
    //或者是表单提交from
    // const data = ctx.requst.body
     //koa自带的下载
    ctx.set('Content-Type', 'application/vnd.ms-excel;charset=utf-8');
    ctx.set("Content-Disposition", "attachment; filename=" + "test.xls"); //这里是告诉浏览器下载一个附件，名字叫什么 自己动态定义
    ctx.body=data
})

router.get('/test',async(ctx,next)=>{
    let data=fs.readFileSync('files/test.xls')
    console.log(data)
    return ctx.response.body='aaaa'
})

module.exports=router