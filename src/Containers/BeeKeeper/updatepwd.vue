<template>
  <div class="container">
    <div class="detail-box">
      <div class="section-top">
        <!-- <el-row style="font-size:25px;top:70px">修改密码</el-row> -->
        <el-row style="font-size:14px;top:80px;text-align:left;margin-left:40px">蜂农：张三三</el-row>
        <el-row style="font-size:14px;top:90px;text-align:left;margin-left:40px">蜂农ID：001</el-row>
      </div>
      <div class="">
        <el-row style="font-size:35px;">修改密码</el-row>
        <el-row class="form-row" style="margin-top:50px">
          <el-col :span="3">
            旧登录密码
          </el-col>
          <el-col :span="15">
            <el-input size="mini" type="password" v-model.trim="fix.oldPassword"  placeholder=""></el-input>
          </el-col>

        </el-row>
        <el-row class="form-row">
          <el-col :span="3">
            新登录密码
          </el-col>
          <el-col :span="15">
            <el-input size="mini" type="password" v-model.trim="fix.newPassword"  placeholder=""></el-input>
          </el-col>

        </el-row>
        <el-row class="form-row">
          <el-col :span="3">
            确认新密码
          </el-col>
          <el-col :span="15">
            <el-input size="mini" type="password" v-model.trim="fix.newPasswordConfirm"  placeholder=""></el-input>
          </el-col>

        </el-row>
        <el-row class="form-row">
          <el-col :span="3" >
            手机号码
          </el-col>
          <el-col :span="5">
            <el-input size="mini" v-model.trim="fix.mobile"  placeholder=""></el-input>
          </el-col>
          <el-col :span="4">
            <span class="sent-code" @click="sendCode">发送短信验证码</span>
          </el-col>
          <el-col :span="3" >
            验证码
          </el-col>
          <el-col :span="3">
            <el-input size="mini" v-model.trim="fix.code"  placeholder=""></el-input>
          </el-col>

        </el-row>
        <el-row class="form-row">
          <el-col :span="4">
            <el-button type="warning" @click="save">确认修改</el-button>
          </el-col>
          <!-- <el-col :span="4">
            <el-button type="default" @click="cancel">取消</el-button>
          </el-col> -->
        </el-row>
      </div>
    </div>

  </div>
</template>
<script>
import { get, post } from '../../common/post.js';
import { Validate, updatePasswordSchema } from '../../common/schema.js';
import { HIVE_USER_NAME } from '../../common/localStorageKey.js';
import localStore from '../../common/localStore.js';
export default {
	name: '',
	data: () => ({
		fix: {
			userName: '',
			oldPassword: '',
			password: '',
			newPasswordConfirm: '',
			mobile: '',
			code: '',
		},
		status: '',
		text: '',
	}),
	methods: {
		sendCode() {
			if (!this.fix.mobile) {
				this.$message({
					message: '手机号码不能为空',
					type: 'warning',
				});
			}
			let result = post('/SMSService', {
				mobile: this.fix.mobile,
				userName: localStore.getItem(HIVE_USER_NAME),
				messageType: 2298872,
			});
			result.then(res => {
				console.log(1234, res);
				if (res.data.responseCode === '000000') {
					console.log('获取验证码成功');
					this.$message({
						message: '获取验证码成功',
						type: 'success',
					});
				} else if (res.data.responseCode === '000033') {
					// this.$message('');
					this.$message({
						message: '输入的手机号与预留的手机号不一致',
						type: 'warning',
					});
				}
			});
		},
		save() {
			let input = {
				userName: localStore.getItem(HIVE_USER_NAME),
				oldPassword: this.fix.oldPassword,
				password: this.fix.newPassword,
				mobile: this.fix.mobile,
				smsCode: this.fix.code,
			};
			console.log(input, localStore.getItem(HIVE_USER_NAME), Validate(input, updatePasswordSchema));
			if (Validate(input, updatePasswordSchema) !== null) {
				this.status = 'wrong';
				this.text = '输入项都不能为空';
			} else if (this.fix.newPassword !== this.fix.newPasswordConfirm) {
				this.status = 'wrong';
				this.text = '两次密码不一致';
			} else {
				let result = post('/updatePassword', input);
				result.then(res => {
					console.log(123, res);
					if (res.data.responseCode === '000000') {
						this.$message({
							message: '修改密码成功',
							type: 'success',
						});
						this.fix = {
							userName: '',
							newPassword: '',
							newPasswordConfirm: '',
							mobile: '',
							code: '',
						};
						this.$router.back();
					} else if (res.data.responseCode === '000038') {
						this.$message({
							message: '旧登录密码不正确',
							type: 'warning',
						});
					} else if (res.data.responseCode === '000033') {
						this.$message({
							message: '与注册时的手机号不一致',
							type: 'warning',
						});
					} else if (res.data.responseCode === '000034') {
						this.$message.error('验证码错误');
					} else {
						console.log(1111, res);
						this.$message.error('修改密码失败');
					}
				});
			}
		},
	},
};
</script>
<style lang="" scoped>
.container {
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	color: white;
	display: flex;
	justify-content: center;
	align-items: center;
	/* background: #3f3b3a; */
	z-index: 1111;
	margin-top: 100px;
}
.detail-box {
	width: 80%;
	height: 700px;
	border: 2px solid rgb(255, 167, 39);
}
.section-top {
	height: 250px;
	/* background: rgb(255, 167, 39); */
}
.form-row {
	height: 30px;
	line-height: 30px;
	margin-top: 10px;
}
.sent-code {
	font-size: 13px;
	color: #fff;
	padding: 2px 4px;
	margin-left: 10px;
	background-color: #40557b;
	width: 120px;
	display: inline-block;
	text-align: center;
}
.sent-code:hover {
	color: rgb(122, 122, 122);
	cursor: pointer;
}
</style>
