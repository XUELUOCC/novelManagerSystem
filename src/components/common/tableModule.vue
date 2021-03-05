<template>
    <div class="tableContainer">
        <!--<div class="tableContent">-->
            <el-table
                    :data="tableData"
                    height="100%"
                    border
                    style="width: 100%">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <template v-for="(item,index) in columns">
                    <el-table-column
                            :prop="item.prop"
                            :key='item.label'
                            :label="item.label"
                            :align="item.align"
                    >
                    </el-table-column>
                </template>
                <el-table-column label="操作">
                    <template slot-scope="scope" >
                        <el-button
                             v-for="(item,index) in operates"
                            :key="item.name"
                            :type="item.type"
                            size="mini"
                            @click="handle(index,scope.row,item.methods)">{{item.name}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pages.currentPage"
                        :page-sizes="paeSizes"
                        :page-size="pages.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="pages.total"><!--        :page-sizes="[10,20,50,100]-->
                </el-pagination>
            </div>
        <!--</div>-->

    </div>
</template>

<script>
    export default {
        name: "tableModule",
        props:{
            tableData:{
                type:Array,
                default:[],
                required: true
            },
            operates:{
                type:Array,
                default: [],
                required: true
            },
            pages:{
                type:Object,
                required:true
            },
            columns:{
                type:Array,
                require:true
            }
        },
        data(){
            return{
                paeSizes:[10,20,50,100],
            }
        },
        mounted(){
            console.log(this.tableData)
            console.log(this.operates)
        },
        methods:{
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            //传递给父组件的数据row,通过$emit传递，父组件中通过@methods="父组件自定义的事件"来获取数据
            handle(index,row,methods){
                console.log(index,row,methods);
                this.$emit(methods,row)
            }
        }
    }
</script>

<style scoped>
    /deep/.el-table thead>tr:first-child th{
        background-color:gray;
        color:#fff;
    }
    .tableContainer{
        width:100%;
        height:75%;
        /*position:relative;*/
    }
    .block{
        /*position: absolute;*/
        /*bottom:0;*/
        margin-top:10px;
        width:100%;
        display: flex;
        justify-content: center;
        align-items: center;
        bottom:20px;
    }
</style>