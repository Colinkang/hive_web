<template>
<div class="nav">
  <el-menu default-active="0" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#404040" text-color="rgba(105, 105, 106)" active-text-color="rgb(105, 105, 106)" :collapse="collapse" :router="true">
    <el-menu-item index="0" route="/hive/map">
      <i class="iconfont icon-map"></i>
      <span slot="title">地图</span>
    </el-menu-item>
     <el-menu-item index="0" route="/hive/list">
      <i class="iconfont icon-list"></i>
      <span slot="title">列表</span>
    </el-menu-item>
    <el-menu-item index="0" route="">
      <i class="iconfont icon-iconsheji-"></i>
      <span slot="title">AI</span>
    </el-menu-item>
    <el-menu-item index="0" route="">
      <i class="iconfont icon-UAV"></i>
      <span slot="title">无人机</span>
    </el-menu-item>
  </el-menu>
</div>
</template>
<script>
export default {
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({}),
  methods: {
    toRoutePage(route) {
      this.$router.push({
        path: route
      });
    },
    handleOpen(key, keyPath) {
      //console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      //console.log(key, keyPath);
    }
  }
};
</script>
<style lang="" scoped>
.nav {
  background-color:rgb(26,26,26);
  z-index: 1111;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 160px;
  min-height: 900px;
}

.el-submenu {
  text-align: left;
}

.el-menu-item {
  text-align: left;
}

.iconfont {
  font-size: 14px;
  color: rgb(105,105,106);
}
</style>
