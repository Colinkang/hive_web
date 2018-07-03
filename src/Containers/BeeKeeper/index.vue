<template>
  <div class="container">
    <div class="detail-box">
      <div class="section-top">
        <el-row style="font-size:25px;top:70px">蜂农信息</el-row>
        <el-row style="font-size:14px;top:80px">{{beekeeper.name}}</el-row>
      </div>
      <div class="">
        <el-row class="form-row">
          <el-col :span="3">
            蜂农ID
          </el-col>
          <el-col :span="5">
            {{beekeeper.id}}
          </el-col>

        </el-row>
        <el-row class="form-row">
          <el-col :span="3">
            地址
          </el-col>
          <el-col :span="5">
            <el-input size="mini"  v-model="beekeeper.address"  placeholder="请输入内容"></el-input>
          </el-col>
        </el-row>

        <el-row class="form-row">
          <el-col :span="3" >
            邮箱
          </el-col>
          <el-col :span="5">
              <el-input size="mini"  v-model="beekeeper.email"  placeholder="请输入内容"></el-input>
          </el-col>
        </el-row>
        <el-row class="form-row">
          <el-col :span="3" >
            联系电话
          </el-col>
          <el-col :span="5">
            <el-input size="mini"  v-model="beekeeper.mobile"  placeholder="请输入内容"></el-input>
          </el-col>
					 <el-col :span="4">
            <span class="sent-code" @click="sendCode">发送验证码</span>
          </el-col>
						<el-col :span="3" >
							验证码
						</el-col>
          <el-col :span="3">
            <el-input size="mini" v-model="beekeeper.code"  placeholder="请输入内容"></el-input>
          </el-col>
        </el-row>
        <el-row class="form-row">
          <el-col :span="3">
            组织
          </el-col>
          <el-col :span="5">
              {{beekeeper.organizationName}}
          </el-col>
        </el-row>
        <el-row class="form-row">
          <el-col :span="4">
            <el-button type="warning" @click="save">保存</el-button>
          </el-col>
        </el-row>
      </div>
    </div>

  </div>
</template>
<script>
import { HIVE_USER_NAME } from '../../common/localStorageKey.js';
import localStore from '../../common/localStore.js';
import { get, post } from '../../common/post.js';
import { Validate, basicInfoSchema } from '../../common/schema.js';
export default {
	name: '',
	data: () => ({
		beekeeper: {
			id: '',
			name: '',
			farmerId: '',
			address: '',
			email: '',
			mobile: '',
			organizationName: '',
			organizationId: '',
			username: '',
			status: '',
			firstTimeLogin: '',
			code: '',
		},
	}),
	methods: {
		sendCode() {
			if (!this.beekeeper.mobile) {
				this.$message({
					message: '手机号码不能为空',
					type: 'warning',
				});
			}
			let result = post('/SMSService', {
				mobile: this.beekeeper.mobile,
				userName: localStore.getItem(HIVE_USER_NAME),
				messageType: 2298872,
			});
			result.then(res => {
				console.log(1234, res);
				if (res.data.responseCode === '000000') {
					this.$message({
						message: '获取手机验证码成功',
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
			let options = {
				id: this.beekeeper.id,
				name: this.beekeeper.name,
				mobile: this.beekeeper.mobile,
				email: this.beekeeper.email,
				address: this.beekeeper.address,
				username: this.beekeeper.username,
				organizationId: this.beekeeper.organizationId,
				status: this.beekeeper.status,
				firstTimeLogin: this.beekeeper.firstTimeLogin,
				code: this.beekeeper.code,
			};
			console.log(options);
			if (Validate(options, basicInfoSchema) !== null) {
				this.$message({
					message: '字段都不能为空',
					type: 'warning',
				});
				return;
			}
			let result = post('/updateUserInfo', options);
			result.then(res => {
				console.log(1123, res.data);
				if (res.data.responseCode === '000000') {
					this.$message({
						message: '修改用户信息成功',
						type: 'success',
					});
				} else if (res.data.responseCode === '000034') {
					this.$message.error('验证码错误');

				} else {
					this.$message.error('修改用户失败');
				}
			});
		},
		getBeekerInfo() {
			let result = get('/getUserDisplayInfo');
			result.then(res => {
				console.log(123, res);
				if (res.data.responseCode === '000000') {
					let data = res.data.data;
					this.beekeeper.id = data.id;
					this.beekeeper.name = data.name;
					this.beekeeper.mobile = data.mobile;
					this.beekeeper.email = data.email;
					this.beekeeper.address = data.address;
					this.beekeeper.username = data.username;
					this.beekeeper.organizationId = data.organizationId;
					this.beekeeper.organizationName = data.organizationName;
					this.beekeeper.status = data.status;
					this.beekeeper.firstTimeLogin = data.firstTimeLogin;
				}
			});
		},
	},
	mounted() {
		// this.username = localStore.getItem(HIVE_USER_NAME);
		// console.log(this.username);
		this.getBeekerInfo();
	},
};
</script>
<style lang="" scoped>
.container {
	width: 100%;
	height: 100%;
	color: white;
	display: flex;
	justify-content: center;
	align-items: center;
  margin-top: 100px
}
.detail-box {
	width: 80%;
	height: 700px;
	border: 1px solid rgb(255, 167, 39);
}
.section-top {
	height: 250px;
	background: rgb(255, 167, 39);
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
