<template>
  <div class="container">
    <div class="detail-box">
      <div class="section-top">
        <el-row style="font-size:25px;top:70px">蜂农信息</el-row>
        <el-row style="font-size:14px;top:80px">{{beekeeper.username}}</el-row>
      </div>
      <div class="">
        <el-row class="form-row">
          <el-col :span="3">
            蜂农ID
          </el-col>
          <el-col :span="5">
            {{beekeeper.farmerId}}
          </el-col>

        </el-row>
        <el-row class="form-row">
          <el-col :span="3">
            地址
          </el-col>
          <el-col :span="5">
            {{beekeeper.address}}
          </el-col>

        </el-row>
      
        <el-row class="form-row">
          <el-col :span="3" >
            邮箱
          </el-col>
          <el-col :span="5">
            <!-- <el-input size="mini"  placeholder="请输入内容"></el-input> -->
            {{beekeeper.email}}
          </el-col>
          <!-- <el-col :span="4">
            <span class="sent-code">发送邮件验证码</span>
          </el-col>
          <el-col :span="3" >
            验证码
          </el-col> -->
          <!-- <el-col :span="3">
            <el-input size="mini"  placeholder="请输入内容"></el-input>
          </el-col> -->

        </el-row>
        <el-row class="form-row">
          <el-col :span="3" >
            联系电话
          </el-col>
          <el-col :span="5">
             {{beekeeper.mobile}}
          </el-col>
          <!-- <el-col :span="4">
            <span class="sent-code">修改</span>
          </el-col> -->
        </el-row>
        <el-row class="form-row">
          <el-col :span="3">
            组织
          </el-col>
          <el-col :span="5">
            {{beekeeper.orginization}}
          </el-col>

        </el-row>
        <!-- <el-row class="form-row">
          <el-col :span="4">
            <el-button type="primary" @click="save">保存</el-button>
          </el-col>
        </el-row> -->
      </div>
    </div>

  </div>
</template>
<script>
import { HIVE_USER_NAME } from '../../common/localStorageKey.js';
import localStore from '../../common/localStore.js';
import { get, post } from '../../common/post.js';
export default {
	name: '',
	data: () => ({
		beekeeper: {
      username:'',
			farmerId: '',
			address: '',
			email: '',
			mobile: '',
			orginization: '',
		},
	}),
	methods: {
		save() {
			this.$router.back();
		},
		getBeekerInfo() {
			let result = get('/getUserDisplayInfo');
			result.then(res => {
				console.log(123, res);
				if (res.data.responseCode === '000000') {
          let data = res.data.data;
          this.beekeeper.username = data.username;
					this.beekeeper.farmerId = data.id;
					this.beekeeper.address = data.address;
					this.beekeeper.email = data.email;
					this.beekeeper.mobile = data.mobile;
					this.beekeeper.orginization = data.organizationName;
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
}
.detail-box {
	width: 80%;
	height: 700px;
	border: 1px solid #036eb8;
}
.section-top {
	height: 250px;
	background: #646260;
}
.form-row {
	height: 30px;
	line-height: 30px;
	margin-top: 10px;
}
.sent-code {
	color: rgb(50, 66, 222);
}
.sent-code:hover {
	color: rgb(122, 122, 122);
	cursor: pointer;
}
</style>
