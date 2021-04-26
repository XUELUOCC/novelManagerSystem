<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import websocket from '@/js/websocket'
export default {
    data(){
        return{

        }
    },
    created(){
            // localStorage.setItem("clientId","user-1")
	        // websocket.Init("111")  //启动websocket的心跳和传递信息
    },
    methods:{

    }
}
</script>
<style lang="scss">


</style>
