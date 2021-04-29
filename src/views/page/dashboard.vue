<template>
    <div class="containerContent">
        <div class="rowContent">
            <el-button type="primary" @click="test">测试接口</el-button>
            <div class="upload">
                <el-upload
                class="upload-demo"
                ref="upload"
                action="http://localhost:8000/api/upload"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                    <div slot="tip" class="el-upload__tip">上传文件，不超过500kb</div>
                </el-upload>
            </div>
            <div class="websocket">
                <el-button type="primary" @click="sendWebsocket">发送websocket</el-button>
            </div>
            

        </div>
        <table-module
            :tableData="tableData"
            :operates="operates"
            :columns="columns"
            :pages="pages"
            @edit="edit"
            @del="del"
        ></table-module>
    </div>
</template>

<script>
    import tableModule from '../../components/common/tableModule'
    import {testApi,getList} from "../../api";
    import websocket from '@/js/websocket'
    export default {
        name: "dashboard",
        components:{
            tableModule
        },
        data(){
            return {
                fileList: [],// [{name: '', url: ''}]
                tableData:[
                    {
                        name:'名称1',
                        age:'年龄1',
                        date:'日期1'
                    },
                    {
                        name:'名称2',
                        age:'年龄2',
                        date:'日期2'
                    },
                    {
                        name:'名称3',
                        age:'年龄3',
                        date:'日期3'
                    },
                ],
                columns: [
                    {
                        label:'名称',
                        prop:'name',
                        align:'center',
                        // width:'150'
                    },
                    {
                        label:'年龄',
                        prop:'age',
                        align:'center',
                        // width:'150'
                    },
                    {
                        label:'日期',
                        prop:'date',
                        align:'center',
                        // width:'150'
                    },
                ],
                operates:[
                    {
                        methods:'edit',
                        name:'编辑',
                        type:'primary'
                    },
                    {
                        methods:'del',
                        name:'删除',
                        type:'danger'
                    }
                ],
                pages:{
                    pageSize:20,
                    currentPage:1,
                    total:200
                }
            }
        },
        methods:{
            //图片上传
            submitUpload() {
                this.$refs.upload.submit();
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            //table的增删改查
            edit(){
                console.log('edit')
            },
            del(){
                console.log('del')
            },
            test(){
                let params={
                    id:'1'
                }
                // testApi(params).then((res)=>{
                //     console.log(res)
                // })
                getList(params).then((res)=>{
                    console.log(res)
                })
            },
            //测试websocket
            sendWebsocket(){
                 let uid='111';
                let content='客户端发送的内容'
                websocket.Send(uid,content)
            }
        }
    }
</script>

<style scoped>
.rowContent{
    width:100%;
    height:40%;
}
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .upload{
      margin-top:20px;
  }
</style>