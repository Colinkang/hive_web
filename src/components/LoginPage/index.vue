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
             <input placeholder="请输入用户名" v-model="account"/>
				</div>
        <div class="line-height margin-top">
					<i class="iconfont icon-password"></i>
          <input placeholder="请输入密码" type="password" v-model="password"/>
       </div>
		<!-- <div class="remember">
             <el-checkbox v-model="checked"></el-checkbox>记住我
			 <el-button type="text" @click="hiveShow">忘记密码</el-button>
		</div>	  -->
       <div class="line-height margin-top">
          <button type="success" class="btn" @click="checkLoin">登录</button>
      </div>
      <el-row class="line-height margin-top" v-if="showAlert">
        <el-col :span="20" :offset="4">
          <el-alert :title="text" :type="status==='wrong'?'error':'success'">
          </el-alert>
        </el-col>
      </el-row>
		 </div>
    
    </div>

</div>
</template>
<script>
import { postLogin } from '../../common/post';
import { HIVE_API_TOKEN, HIVE_USER_NAME } from '../../common/localStorageKey';
import LocalStore from '../../common/localStore';
import updatepwd from './updatepwd';
export default {
	name: '',
	data: () => ({
		showAlert: false,
		status: 'wrong',
		text: '',
		account: '',
		password: '',
		checked: true
	}),
	components:{
    updatepwd
	},
	methods: {
		checkLoin() {
			// setTimeout(() => {
			// 	this.$emit('login-success');
			// }, 1000);
			if (this.account === '' || this.password === '') {
				this.showAlert = true;
				this.status = 'wrong';
				this.text = '用户名密码不能为空';
				return;
			} else {
				let result = postLogin('/login', {
					userName: this.account,
					password: this.password,
				});
				result.then(res => {
					console.log(111, res);
					this.showAlert = true;
					if (res.data.responseCode === '000000') {
						this.status = 'success';
						this.text = '验证成功，欢迎登陆';
						//保存token到local
						LocalStore.setItem(HIVE_API_TOKEN, res.data.data.authToken);
						LocalStore.setItem(HIVE_USER_NAME, this.account);
						setTimeout(() => {
							this.$emit('login-success');
						}, 1000);
					} else {
						this.status = 'wrong';
						this.text = '用户或者密码错误';
					}
				});
			}
		},
		hiveShow(){
			
		}
	},
};
</script>
<style lang="" scoped>
.login-box {
	position: absolute;
	background-color: rgb(94, 95, 95);
	width: 100%;
	height: 100%;
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
	width: 400px;
	margin: 0 auto;
}

.line-height {
	height: 50px;
	line-height: 40px;
	width:200px;
	color: #ffa727;
	position: relative;
}
.line-height .iconfont {
	width: 50px;
	height: 50px;
	position: absolute;
	top: 6px;
	left: 0;
	color: #ffa727;
	line-height: 40px;
	top:2px;
}
.line-height input {
	width:200px;
	padding-left: 36px;
	height: 25px;
	/* color: #ffa727; */
}
input::-webkit-input-placeholder{
  color:#ffa727;
}

.login-btn {
	text-align: center;
}

.btn {
	width: 236px;
	height: 30px;
}

.margin-top {
	margin-top: 2px;
}
.remember{
	align-content: center;
}

</style>
