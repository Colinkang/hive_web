<template>

  <div class="container">
    <div class="detail-box">
      <div class="section-top">
        <el-row style="font-size:25px;top:70px">意见反馈</el-row>
        <!-- <el-row style="font-size:14px;top:80px"></el-row>
        <el-row style="font-size:14px;top:90px"></el-row> -->
      </div>
      <div class="">
        <div class="form-row">
          <!-- <el-row style="font-size:25px;top:70px">意见反馈</el-row> -->
          <textarea class="text" style="font-size:15px;" v-model="message" placeholder="感谢您提出的宝贵意见，我们收到后会第一时间予以回复并尽快解决问题"></textarea>
          <el-row class="form-row">
                <el-button  type="warning" @click="save">确认提交</el-button>
          </el-row>
        </div>
      </div>

    </div>


  </div>
</template>
<script>
// import { HIVE_USER_NAME } from '../../common/localStorageKey.js';
// import localStore from '../../common/localStore.js';
import { get, post } from '../../common/post.js';
export default {
	name: '',
	data: () => ({
		message: '',
	}),
	methods: {
		save() {
			if (!this.message) {
				this.$message({
					message: '消息不能为空',
					type: 'warning',
				});
				return;
			}
			let result = post('/sendMail', {
				title: '意见反馈',
				content: this.message,
			});
			result.then(res => {
				if (res.data.responseCode === '000000') {
					this.$message({
						message: '你的意见反馈已经发送成功',
						type: 'success',
					});
				}
			});
			// this.$router.back();
		},
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
  margin-top: 100px;
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
.text{
  margin-top: 50px;
  width: 90%;
  padding: 20px;
  height: 150px;
  border-radius: 10px;
}
</style>
