<template>
<div class="login-box">
  <div class="login-logo">
    <img :src="require('./img/logo.png')" alt="">
  </div>
  <div class="login-title">
    <img :src="require('./img/title.png')" alt="">
  </div>
  <div class="login-container">
    <div class="login-input-box">
      <div class="line-height">
        <i class="iconfont icon-user"></i>
        <input placeholder="请输入用户名" v-model="account" />
      </div>
      <div class="line-height margin-top">
        <i class="iconfont icon-password"></i>
        <input placeholder="请输入密码" type="password" v-model="password" />
      </div>
      <div class="line-height margin-top">
        <el-checkbox v-model="checked" class="remenber-login">记住密码</el-checkbox>
				<span class="sent-code" style="margin-left:20px;" @click="showChangeCode=true">忘记密码</span>
      </div>
      <div class="line-height margin-top">
        <button type="success" class="btn" @click="checkLoin">登录</button>
      </div>
    </div>

  </div>
	  <change-code v-if="showChangeCode" @hide="showChangeCode=false"></change-code>
</div>
</template>
<script>
import { Validate, loginSchema } from '../../common/schema.js';
import { postLogin } from '../../common/post';
import ChangeCode from './ChangeCode.vue';
import {
	HIVE_API_TOKEN,
	HIVE_USER_NAME,
	IS_LOGIN,
	HIVE_USER_PASSWORD,
	HIVE_REMENBER_USERNAME,
	HIVE_NAV_INDEX,
} from '../../common/localStorageKey';
import LocalStore from '../../common/localStore';
export default {
	name: '',
	data: () => ({
		account: '',
		password: '',
		checked: false,
		showChangeCode: false,
	}),
	components: {
		ChangeCode,
	},
	methods: {
		checkLoin() {
			if (Validate({ account: this.account, password: this.password }, loginSchema) !== null) {
				this.$message({
					message: '用户名密码不能为空',
					type: 'warning',
				});

				return;
			} else {
				let result = postLogin('/login', {
					userName: this.account,
					password: this.password,
				});
				result.then(res => {
					//console.log(123456, res.data);
					if (res.data.responseCode === '000000') {
						this.$message({
							message: '验证成功，欢迎登陆',
							type: 'success',
						});

						//保存token到local
						LocalStore.setItem(HIVE_API_TOKEN, res.data.data.authToken);
						LocalStore.setItem(HIVE_USER_NAME, this.account);
						LocalStore.setItem(HIVE_REMENBER_USERNAME, this.checked);
						LocalStore.setItem(HIVE_NAV_INDEX, '0');
						if (this.checked) {
							LocalStore.setItem(HIVE_USER_PASSWORD, this.password);
						}
						LocalStore.setItem(IS_LOGIN, true);
						if (res.data.data.firstTimeLogin === true) {
							this.$message({
								message: '第一次登陆，请先修改密码',
								type: 'success',
							});
							this.$router.push({
								path: '/beekeeper/changepwd',
							});
						}
						this.$router.push({
							path: '/hive/map',
						});
						setTimeout(() => {
							this.$emit('login-success');
						}, 1000);
					} else {
						this.$message.error('用户或者密码错误');
					}
				});
			}
		},
	},
	mounted() {
		//do something after mounting vue instance
		this.account = LocalStore.getItem(HIVE_USER_NAME);
		this.password = LocalStore.getItem(HIVE_USER_PASSWORD);
		this.checked = JSON.parse(LocalStore.getItem(HIVE_REMENBER_USERNAME));
	},
};
</script>
<style lang="" scoped>
.login-box {
	position: absolute;
	background-color: rgb(94, 95, 95);
	width: 100%;
	height: 100%;
	overflow: scroll;
	top: 0;
}

.login-logo {
	position: relative;
	width: 100%;
	margin-top: 100px;
}

.login-logo img {
	position: relative;
	width: 200px;
	margin: 0 auto;
}

.login-title {
	width: 100%;
	margin-top: 100px;
}

.login-title img {
	width: 400px;
}

.login-container {
	margin-top: 40px;
	position: relative;
	width: 100%;
}

.login-input-box {
	width: 250px;
	margin: 0 auto;
}

.line-height {
	height: 50px;
	line-height: 40px;
	width: 100%;
	color: #ffa727;
	position: relative;
}

.line-height .iconfont {
	width: 40px;
	height: 40px;
	position: absolute;
	top: 0px;
	left: 0;
	color: #ffa727;
	line-height: 40px;
	z-index: 111;
}

.line-height input {
	position: relative;
	border: none;
	width: 100%;
	height: 30px;
	line-height: 40px;
	text-indent: 35px;
}

input::-webkit-input-placeholder {
	color: #ffa727;
}

.login-btn {
	text-align: center;
}

.btn {
	width: 100%;
	height: 30px;
	line-height: 30px;
}

.margin-top {
	margin-top: 2px;
}

.remenber-login {
	color: white;
}
.sent-code {
	color: white;
}
.sent-code:hover {
	color: rgb(122, 122, 122);
	cursor: pointer;
}
</style>
