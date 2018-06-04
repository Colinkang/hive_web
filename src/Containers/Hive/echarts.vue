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
							{ value: obj.protectionNum, name: '策略保护', selected: true },
							{ value: obj.noProtectionNum, name: '非策略保护' },
						],
					},
					{
						name: '总量',
						type: 'pie',
						radius: ['40%', '55%'],
						label: {
							normal: {
								// shadowBlur:3,
								// shadowOffsetX: 2,
								// shadowOffsetY: 2,
								// shadowColor: '#999',
								// padding: [0, 7],
								rich: {
									a: {
										color: '#999',
										lineHeight: 22,
										align: 'center',
									},
									// abg: {
									//     backgroundColor: '#333',
									//     width: '100%',
									//     align: 'right',
									//     height: 22,
									//     borderRadius: [4, 4, 0, 0]
									// },
									hr: {
										borderColor: '#aaa',
										width: '100%',
										borderWidth: 0.5,
										height: 0,
									},
									b: {
										fontSize: 16,
										lineHeight: 33,
									},
									per: {
										color: '#eee',
										backgroundColor: '#334455',
										padding: [2, 4],
										borderRadius: 2,
									},
								},
							},
						},
						data: [
							{ value: obj.normalBeeBoxNum, name: '正常' },
							{ value: obj.abnormalBeeBoxNum, name: '异常' },
							{ value: obj.offLineBeeBoxNum, name: '离线' },
						],
					},
				],
			};
			myChart.setOption(option);
		},
	},
};
</script>
