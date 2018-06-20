<template>
<div class="select-box">
  <div class="input-box">
    <span>搜索</span>
    <div class="input-outer-box">
      <input type="text" name="" value="" @input="getList">
    </div>

  </div>
  <div class="list-box">
    <ul>
      <li v-for="(item,index) in list" :key="index" :class="selectId ===item?'slected':''" @click="selectThis(item)">
        {{item}}
      </li>

    </ul>
  </div>
</div>
</template>
<script>
import { post } from '../../common/post.js';
export default {
	name: '',
	data: () => ({
		list: [],
		selectId: '',
	}),
	methods: {
		selectThis(id) {
			if (this.selectId !== id) {
				this.selectId = id;
				this.$emit('idSelectSearch', id);
			}
		},
		getList(e) {
			console.log(e.target.value);
			//这里调用一个接口，模糊查询id列表，返回值付给list
			console.log(1111981212121212);
			let result = post('/beeBoxSearch', {
				keyword: e.target.value,
			});
			result.then(res => {
				console.log(34, res);
				if (res.data.responseCode === '000000') {
					let data = res.data.data;
					this.list = [];
					for (let d of data) {
						this.list.push(d.beeBoxNo);
					}
				}
			});
		},
	},
};
</script>
<style lang="" scoped>
.select-box {
	position: relative;
	width: 100%;
	height: 100%;
}

.input-outer-box {
	padding-left: 2px;
	padding-right: 2px;
	background: linear-gradient(top, #2d2a26, #3e3836);
	border-radius: 15px;
	height: 34px;
	display: inline-block;
	margin-left: 10px;
	/* 标准的语法 */
}

.input-box {
	position: relative;
	margin-top: 10px;
	text-align: center;
	height: 30px;
	width: 100%;
	color: #ed9e10;
}

.input-box input {
	position: relative;
	border-radius: 13px;
	width: 150px;
	margin-left: 2px;
	margin-right: 2px;
	height: 26px;
	margin-top: 4px;
	background: linear-gradient(top, #3c3834, #504947);
	/* 标准的语法 */
	border: none;
	text-align: center;
	color: #ed9e10!important;
}

.list-box {
	position: relative;
	width: 100%;
	height: 200px;
	margin-top: 10px;
	/* overflow: scroll; */
}

.list-box ul {
	width: 100%;
	position: relative;
	left: 0;
	top: 0;
	margin: 0;
	padding: 0;
}

.list-box ul li {
	width: 100%;
	height: 30px;
	line-height: 30px;
	list-style: none;
	text-indent: 20px;
	text-align: left;
	background: linear-gradient(top, #524b49, #3d3a36);
	border-top: 2px solid #2d2a26;
	left: 0;
	color: #f5f2ee;
}
.list-box ul li:hover {
	background: linear-gradient(top, #ed9e10, #f7bf14);
	color: black;
	cursor: pointer;
}
.slected {
	background: linear-gradient(top, #ed9e10, #f7bf14) !important;
	color: black;
}
</style>
