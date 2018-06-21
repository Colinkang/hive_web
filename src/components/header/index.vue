<template>
<div class="header">
  <img :src="require('./image/logo-content.png')" class="logo">
  <!-- <div class="login">
    <el-menu  class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="rgb(0,0,0)" text-color="#fff" active-text-color="rgb(0,0,0)" :router= "true">
      <el-submenu index="1">
         <template slot="title" class="admin">
           <i class="iconfont icon-LC_icon_user_line_2"></i>{{account}}
        </template>
          <el-menu-item index="1-1" route="/beekeeper/info"><span slot="title">个人资料</span></el-menu-item>
          <el-menu-item index="1-2" route="/beekeeper/changepwd"><span slot="title">修改密码</span></el-menu-item>
          <el-menu-item index="1-3" @click="logout"><span slot="title">注销</span></el-menu-item>
      </el-submenu>
    </el-menu>

  </div> -->
  <div class="user-control">
    <span>

       <router-link to="/beekeeper/info"><i class="iconfont icon-user"></i>{{account}}</router-link>
    </span>
    <span>
        <router-link to="/beekeeper/changepwd">修改密码</router-link>
    </span>
		<span>
        <router-link to="/beekeeper/feedback">意见反馈</router-link>
    </span>
    <span @click="logout">
      退出
    </span>

  </div>
</div>
</template>
<script>
import { HIVE_API_TOKEN, HIVE_USER_NAME, IS_LOGIN } from '../../common/localStorageKey';
import LocalStore from '../../common/localStore';
import { get, post } from '../../common/post.js';
export default {
	name: '',
	data: () => ({
		collapse: false,
		account: '111',
	}),
	methods: {
		changeCollapse() {
			this.collapse = !this.collapse;
			this.$emit('change-collapse', this.collapse);
		},
		logout() {
      LocalStore.setItem(HIVE_API_TOKEN, '');
		//	LocalStore.setItem(HIVE_USER_NAME, '');
      LocalStore.setItem(IS_LOGIN, '');
			setTimeout(() => {
				this.$emit('logout');
        LocalStore.setItem(HIVE_NAV_INDEX,'0')
			}, 200);
		},
		handleSelect(key, keyPath) {
			console.log(key, keyPath);
		},
	},
	mounted() {
		//do something after mounting vue instance
		let username = LocalStore.getItem(HIVE_USER_NAME);
		this.account = username;
	},
};
</script>
<style  scoped>
.header {
	width: 100%;
	height: 100%;
	background-color: rgb(0, 0, 0);
}
.el-submenu__title,
.is-opened {
	color: white !important;
}

.el-menu-demo {
}

.logo {
	height: 70%;
  top: 15%;
  left: 20px;
	position: relative;
	margin-left: 0;
	float: left;
}

.collapse-btn {
	position: absolute;
	left: 0;
	top: 0;
	width: 60px;
	height: 60px;
	line-height: 60px;
	color: white;
	cursor: pointer;
}

.collapse-btn:hover {
	color: #aaa;
}

.collapse-btn i {
	font-size: 25px;
}
.user-control {
	position: absolute;
	color: white;
	height: 60px;
	line-height: 60px;
	right: 30px;
	font-size: 14px;
}
.user-control span {
	margin-right: 20px;
}
.user-control span a {
	color: white;
	font-size: 14px;
	text-decoration: none;
}
.user-control span a:hover,
.user-control span:hover {
	color: #f8b62c;
	cursor: pointer;
}
</style>
