<template>
  <div class="container">

        <el-row style="font-size:25px;top:70px">意见反馈</el-row>
        <textarea class="text" style="font-size:15px;" v-model="message" placeholder="感谢您提出的宝贵意见，我们收到后会第一时间予以回复并尽快解决问题"></textarea>
          <el-row class="form-row">
                <el-button  type="primary" @click="save">确认修改</el-button>
          </el-row>
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
	justify-content: center;
	align-items: center;
}
.text {
	width: 70%;
	height: 160px;
	margin-top: 160px;
	border: solid 1px #ffa727;
}
</style>
