<template>
    <div class="containerContent">
        <div class="rowContent">
            <el-button type="primary" @click="test">测试接口</el-button>
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
    import {testApi} from "../../api";

    export default {
        name: "dashboard",
        components:{
            tableModule
        },
        data(){
            return {
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
                testApi(params).then((res)=>{
                    console.log(res)
                })
            }
        }
    }
</script>

<style scoped>
.rowContent{
    width:100%;
    height:25%;
}
</style>