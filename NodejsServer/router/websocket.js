const koa=require('koa');
const router=require('koa-router')();
const koaBody=require('koa-body')
const fs=require('fs')
const pathlib=require('path')
const cors=require('koa2-cors')
// const websocket=require('ws')
const websocket=require('koa-websocket')

//监听 /websocket的路由，是否有链websocket连接
router.all('/websocket',async(ctx,next)=>{
    const {id}=ctx.query;  //客户端传过来的身份标识
    wsObj.id=id;  //保存身份标识
    // console.log(wsObj.id)
    ctx.websocket.send('连接成功'); //给客户端发送成功信息

    //监听客户端传过来的信息
    ctx.websocket.on('message',(message)=>{  
        console.log(message)
        //uid是接收方，将接收到的信息发送到接收方;同时也是客户端传过来的uId
        const uid=JSON.parse(message).uid;
        wsObj.uid=uid
        console.log(wsObj.uid)
        if(wsObj.id!=wsObj.uid){   //意味着该身份未连接到websocket
            ctx.websocket.send(`${uid}还未上线`)
        }else{
            ctx.websocket.send(`uid:${uid},content:服务端的身份${wsObj.uid}发送的信息`)    //将该身份的信息保存起来
        }
        // console.log(wsObj[uid])
    })
})

module.exports=router