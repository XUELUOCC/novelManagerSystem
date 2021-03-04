<template>
    <div >
        <div class="tagContainer" v-if="dynamicTags.length!=0">
            <ul>
                <li class="tags-li" :key="tag.path" v-for="(tag,index) in dynamicTags"  :class="{'active':isActive(tag.path)}">
                    <router-link :to="tag.path" class="tags-li-title" :class="{'routerActive':isActive(tag.path)}">
                        {{tag.name}}
                    </router-link>
                    <span class="tags-li-icon" @click="handleClose(index)"><i class="el-icon-close"></i></span>
                </li>
            </ul>
            <div class="tagsRight">
                <el-dropdown @command="handleTags">
                    <el-button type="primary"  size="mini">
                        标签选项<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu>
                        <el-dropdown-item command="all">关闭所有</el-dropdown-item>
                        <el-dropdown-item command="other">关闭其他</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "Tags",
        data(){
            return{
                dynamicTags: [],
                flag:false,//class动态控制
                options:[

                ]
            }
        },
        //路由变化时获取创建tags
        watch:{
            $route(newValue,oldValue){
                // console.log(newValue)
                this.setTags(newValue)
            }
        },
        //刷新和刚进页面时创建tags
        created(){
            // console.log(this.$route.path)
            this.setTags(this.$route)
        },
        mounted(){},
        methods:{
            handleClose(index) {
                if(this.dynamicTags.length>1){
                    const delItem= this.dynamicTags.splice(index, 1)[0]; //获取点击删除时的tags
                    //点击删除后，需要展现的标签
                    // 1.点击最后一个，展现的是原先的上一个index-1
                    // 2.点击中间的，需要展现的是原先的上一个，其索引在删除后和之前的索引相同
                    const item=this.dynamicTags[index] ? this.dynamicTags[index] : this.dynamicTags[index-1]
                    //判断是否是点击正在显示的页面tags,如果是则进行跳转，否则不跳转
                    if(delItem.path==this.$route.fullPath){
                        this.$router.push(item.path)
                    }
                }else{

                }

            },
            //动态设置class
            isActive(path){
                // console.log(path,this.$route.fullPath)
                return path===this.$route.fullPath
            },
            //设置tags
            setTags(route){
                // console.log(this.dynamicTags)
                //判断元素在数组中是否存在
                const isExsit=this.dynamicTags.some(item=>{
                    return item.path==route.fullPath
                })
                if(!isExsit){
                    //当标签到达6个得时候，删除数组的首部元素，
                    if(this.dynamicTags.length>=6){
                        this.dynamicTags.shift();
                    }
                    this.dynamicTags.push({
                        name:route.meta.title,
                        path:route.fullPath
                    })
                }
            },
            //下拉标签操作（其他，全部）
            handleTags(command){
                return command==='other' ? this.closeOther() : this.closeAll()
            },
            //关闭其他标签
            closeOther(){
                //filter---创建符合条件的新数组
                const itemArr=this.dynamicTags.filter((item,index)=>{
                    return item.path===this.$route.fullPath;
                })
                this.dynamicTags=itemArr;
            },
            closeAll(){
                this.dynamicTags=[];
                this.$router.push('/')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .el-tag + .el-tag {
        margin-left: 10px;
    }
    /deep/.el-tag .el-tag__close{
        color:#fff;
    }
    .tagContainer{
        width:100%;
        height:40px;
        margin-bottom:10px;
        border-bottom:1px solid #ddd;
        box-shadow: 0 5px 10px #ddd;
        display:flex;
        justify-content: space-between;
        align-items: center;
        ul{
            width:100%;
            height:100%;
            padding:0;
            margin:0;
            display:flex;
            justify-content: flex-start;
            align-items: center;
            list-style: none;
            .tags-li{
                height:100%;
                margin: 3px 5px 2px 3px;
                border-radius: 5px;
                font-size: 12px;
                overflow: hidden;
                cursor: pointer;
                height: 23px;
                line-height: 23px;
                border: 1px solid #ddd;
                background: #fff;
                padding: 5px 5px 5px 12px;
                vertical-align: middle;
                color: #666;
                -webkit-transition: all .3s ease-in;
                -moz-transition: all .3s ease-in;
                transition: all .3s ease-in;
                .tags-li-title {
                    float: left;
                    max-width: 80px;
                    text-decoration: none;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    margin-right: 5px;
                    color: #666;
                }
                .routerActive{
                    color:#fff;
                }
            }
            .active{
                color:#fff;
                background-color:#409eff;
            }
            &:not(.active) span:hover {
                /*background: #f8f8f8;*/
            }
        }
        .tagsRight{
            width:100px;
            height:100%;
            margin-right:30px;
            display: flex;
            align-items: center;
        }
    }

</style>