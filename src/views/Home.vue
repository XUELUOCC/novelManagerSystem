<template>
  <div class="home">

    <el-container>
      <el-header >
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside class="side">
          <SideBar></SideBar>
        </el-aside>
        <el-main>
          <Tags></Tags>
          <router-view></router-view>
        </el-main>
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
  /deep/.el-header{
    padding:0!important;
    height:80px!important;
  }
  /deep/.el-main{
    padding-top:10px!important;
  }
  .side{
    width:250px!important;
  }
</style>