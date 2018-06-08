<template>
    <div id="foldChart" :style="{width: '100%', height: '100%'}"></div>
</template>
<script>
import echarts from 'echarts';
export default {

	name: 'fold',
	data() {
		return {
			msg: 'Welcome to Your Vue.js App',
		};
	},
	// mounted() {
	// 	this.drawFoldLine();
	// },
	methods: {
		drawFoldLine(obj) {
			// 基于准备好的dom，初始化echarts实例
			let foldChart = echarts.init(document.getElementById('foldChart'));

			let colors = ['#5793f3', '#d14a61', '#675bba'];

			let option = {
				color: colors,

				tooltip: {
					trigger: 'none',
					axisPointer: {
						type: 'cross',
					},
				},
				legend: {
					data: ['温度', '湿度','重量','压强','电量'],
				},
				grid: {
					top: 70,
					bottom: 50,
				},
				xAxis: [
					{
						type: 'category',
						axisTick: {
							alignWithLabel: true,
						},
						axisLine: {
							onZero: false,
							lineStyle: {
								color: colors[1],
							},
						},
						axisPointer: {
							label: {
								formatter: function(params) {
									return (
										' ' +
										params.value +
										(params.seriesData.length ? '：' + params.seriesData[0].data : '')
									);
								},
							},
						},
						data: obj.date,
					},
					{
						type: 'category',
						axisTick: {
							alignWithLabel: true,
						},
						axisLine: {
							onZero: false,
							lineStyle: {
								color: colors[0],
							},
						},
						axisPointer: {
							label: {
								formatter: function(params) {
									return (
										'  ' +
										params.value +
										(params.seriesData.length ? '：' + params.seriesData[0].data : '')
									);
								},
							},
						},
						data: obj.date,
					},
				],
				yAxis: [
					{
						type: 'value',
					},
				],
				series: [
					{
						name: '温度',
						type: 'line',
						xAxisIndex: 1,
						smooth: true,
						data: obj.temperature,
					},
					{
						name: '湿度',
						type: 'line',
						smooth: true,
						data: obj.humidity,
					},
					{
						name: '重量',
						type: 'line',
						smooth: true,
						data: obj.gravity,
					},
					{
						name: '压强',
						type: 'line',
						smooth: true,
						data: obj.airPressure,
					},
					{
						name: '电量',
						type: 'line',
						smooth: true,
						data: obj.battery,
					},

				],
			};

			foldChart.setOption(option);
		},
	},
};
</script>
