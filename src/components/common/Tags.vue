<template>
    <div>
        <div>
            <el-tag
                    :key="tag.path"
                    v-for="tag in dynamicTags"
                    closable
                    :disable-transitions="false"
                    :class="{'active':isActive(tag.path)}"
                    @close="handleClose(tag)">
                {{tag.name}}
            </el-tag>
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
        methods:{
            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            },
            //动态设置class
            isActive(path){
                return path=this.$route.fullPath
            },
            setTags(route){
                // console.log(this.dynamicTags)
                // console.log(route.meta.title)
                console.log(this.dynamicTags.indexOf(route.meta.title))
                if(this.dynamicTags.indexOf(route.meta.title)==-1){
                    this.dynamicTags.push({
                        name:route.meta.title,
                        path:route.fullPath
                    })
                }

            }
        }
    }
</script>

<style lang="scss" scoped>
    .el-tag + .el-tag {
        margin-left: 10px;
    }
    .active{
        color:#fff;
        background-color:#409eff;
    }
</style>