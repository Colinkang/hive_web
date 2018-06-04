<template>
<div class="nav">
  <el-menu default-active="0" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#404040" text-color="rgba(105, 105, 106)" a ctive-text-color="rgb(105, 105, 106)" :collapse="collapse" :router="true">
    <el-menu-item index="0" route="/hive/map">
      <span class="nav-text">
        <i class="iconfont icon-map"></i>
        <span slot="title">地图</span>
      </span>
    </el-menu-item>
    <el-menu-item index="2" route="/hive/list">
      <span class="nav-text">
        <i class="iconfont icon-list"></i>
        <span slot="title">列表</span>
      </span>

    </el-menu-item>
    <el-menu-item index="3" route="">
      <span class="nav-text">
        <i class="iconfont icon-iconsheji-"></i>
        <span slot="title">AI</span>
      </span>

    </el-menu-item>
    <el-menu-item index="4" route="">
      <span class="nav-text">
        <i class="iconfont icon-UAV"></i>
        <span slot="title">无人机</span>
      </span>

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
  background-color: #3f3b3a;
  z-index: 1111;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 900px;
  color: white;
}

.el-submenu {
  text-align: left;
}

.el-menu-item {
  text-align: left;
}

.iconfont {
  font-size: 14px;
}

.el-menu-item {
  height: 40px;
  line-height: 40px;
}

.is-active::before {
  content: "";
  width: 180px;
  height: 40px;
  background: rgb(255, 167, 39);
  position: absolute;
  z-index: 111;
  left: 0;
  top: 0;
}

.is-active::after {

  content: "";
  position: absolute;
  right: -20px;
  top: 0px;
  width: 0;
  height: 0;
  border-left: 20px solid rgb(255, 167, 39);
  border-right: 20px solid transparent;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
}

.is-active .nav-text {
  position: absolute;
  z-index: 111;
  color: white;
}

.nav-text {
  color: white;
}
</style>
