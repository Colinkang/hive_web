<template>
<div>
  <div class="mianbao">
    更改密码
  </div>
  <el-row class="row-box">
    <el-col :span="3">旧登录密码</el-col>
     <el-col :span="20">
      <el-input v-model="old_password"></el-input>
    </el-col>
  </el-row>
   <el-row class="row-box">
    <el-col :span="3">新登录密码</el-col>
     <el-col :span="20">
      <el-input v-model="new_password"></el-input>
    </el-col>
  </el-row>
    <el-row class="row-box">
    <el-col :span="3">重复新登录密码</el-col>
     <el-col :span="20">
      <el-input v-model="confirm_new_password"></el-input>
    </el-col>
  </el-row>
    <el-row class="row-box">
    <el-col :span="3">手机号码</el-col>
     <el-col :span="10">
      <el-input v-model="tel"></el-input>
    </el-col>
    <el-col :span="2">验证码</el-col>
     <el-col :span="6">
      <el-input v-model="verifyCode"></el-input>
    </el-col>
  </el-row>

  <el-row style="margin-top:20px">
    <el-button type="primary" @click="updatepwd()">提交</el-button>
  </el-row>
</div>
</template>
<script>
import { post } from '../../common/post';
export default {
	data() {
		return {
			action: '',
			host: '',
            old_password:'',
            new_password:'',
            confirm_new_password:'',
            tel:'',
            verifyCode:''
		};
	},
	mounted() {
		//do something after mounting vue instance
		// this.host = PORSCHE_HOST;
		// this.action = this.host + '/fileupload';
		// console.log(666, this.action);
	},

	methods: {
		updatepwd() {
			let _this = this;
			let result = post('/updatePassword', {
				password:this.new_password
			});
			result.then(res => {
                console.log(res);
				// if (res.data.code === '1001') {
				// 	console.log(res.data.message);
				// 	_this.$message({
				// 		message: res.data.message,
				// 		type: 'success',
				// 	});
				// 	_this.$router.push('/picture/list');
				// }
			});
		},
	},
};
</script>
<style scoped>
.row-box {
	margin-top: 10px;
}

.select-row {
	width: 100%;
}
</style>
