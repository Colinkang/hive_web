<template>
  <div id="app">
    <root></root>
  </div>
</template>

<script>
import Root from './components/root.vue';
export default {
  name: 'app',
  components:{
    Root
  },
  mounted(){
    // this.$router.push({
    //   path:'/hive/map'
    // })
  }
}
</script>

<style>
html,body{
  min-width: 1380px;
  width: 100%;
  margin: 0;
  padding: 0;
  /* height: 100%;
  overflow: hidden; */
}
input{
  padding: 0;
  margin:0;
  color:#ed9e10!important;
}
.el-main{
  margin: 0;
  padding: 0;
  background-color: #3f3b3a
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
}
</style>
