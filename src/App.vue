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
  }
}
</script>

<style>
html,body{
  min-width: 1280px;
  margin: 0;
  padding: 0;
}
.el-main{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
