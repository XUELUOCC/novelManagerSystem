<template>
  <div class="home">

    <el-container class="content1">
      <el-header >
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside class="side">
          <SideBar style="height:100%;"></SideBar>
        </el-aside>
        <el-container>
          <el-main>
            <div class="tags">
              <Tags></Tags>
            </div>
            <router-view></router-view>
          </el-main>
        </el-container>

      </el-container>
    </el-container>

  </div>
</template>

<script>
// @ is an alias to /src
import SideBar from '@/components/common/SideBar.vue'
import Header from '@/components/common/Header.vue'
import Tags from '@/components/common/Tags.vue'

export default {
  name: 'Home',
  components: {
      SideBar,
      Header,
      Tags
  },
  data(){
    return{

    }
  },
  methods:{

  }

}
</script>
<style lang="scss" scoped>
  .homeContainer{

  }
  .home{
    width:100%;
    height:100%;
  }
  .content1{
    width:100%;
    height:100%;
  }
  /deep/.el-header{
    padding:0!important;
    height:80px!important;
  }
  /deep/.el-main{
    padding:0px 0px !important;
    background-color:#f0f0f0;
    height:100%;
    width:100%;
  }
  .side{
    width:auto!important;
  }
</style>