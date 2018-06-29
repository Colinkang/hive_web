<template>
    <div id="myChart" :style="{width: '100%', height: '100%'}"></div>
</template>
<script>
import echarts from 'echarts'
export default {

	name: 'mychart',
	data() {
		return {
			msg: 'Welcome to Your Vue.js App',
		};
	},
	// mounted() {
	// 	this.drawLine();
	// },
	methods: {
		drawLine(obj) {
			// 基于准备好的dom，初始化echarts实例
			let myChart = echarts.init(document.getElementById('myChart'));
			// 绘制图表
			let option = {
				tooltip: {
					trigger: 'item',
					formatter: '',
				},
				series: [
					{
						name: '总量',
						type: 'pie',
						selectedMode: 'single',
						radius: [0, '30%'],
            center: ['50%', '50%'],
						label: {
							normal: {
								position: 'inner',
							},
						},
						labelLine: {
							normal: {
								show: false,
							},
						},
						data: [
							{ value: obj.protectionNum, name: '策略保护', },
							{ value: obj.noProtectionNum, name: '非策略保护' },
						],
					},
					{
						name: '总量',
						type: 'pie',
						radius: ['35%', '50%'],
            center: ['50%', '50%'],
						data: [
							{ value: obj.normalBeeBoxNum, name: '正常' },
							{ value: obj.abnormalBeeBoxNum, name: '异常' },
							{ value: obj.offLineBeeBoxNum, name: '离线' },
						],
					},
				],
        backgroundColor:'#f2f2f2'
			};
			myChart.setOption(option);
		},
	},
};
</script>
