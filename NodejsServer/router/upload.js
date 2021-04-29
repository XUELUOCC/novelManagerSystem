const router=require('koa-router')();
const fs=require('fs')
const pathlib=require('path')

router.post('/upload',async(ctx,next)=>{
    //上传单个文件
    const file=ctx.request.files.file;
    console.log(file)
    //创建读取流
    const reader=fs.createReadStream(file.path)
    let filePath = pathlib.join(__dirname, '../upload') + `/${file.name}`;
    //创建写入流
    const writer=fs.createWriteStream(filePath)
    //管道流向
    reader.pipe(writer)
    return ctx.response.body='上传成功'
})

module.exports=router