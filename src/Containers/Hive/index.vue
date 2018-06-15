<template>
<div class="box">
  <div class="section-left">
    <table border="0">
      <tr>
        <th>蜂箱ID</th>
        <th>温度</th>
        <th>湿度</th>
        <th>重量</th>
        <th>压强</th>
        <th>状态</th>
        <th>电量</th>
      </tr>
      <tr v-for="(item) in hiveList" :key='item.id' @click="slectThisRow(item.beeBoxNo)">
        <td>{{item.beeBoxNo?item.beeBoxNo:'-'}}</td>
        <td>{{item.temperature?item.temperature:'-'}}</td>
        <td>{{item.humidity?item.humidity:'-'}}</td>
        <td>{{item.gravity?item.gravity:'-'}}</td>
        <td>{{item.airPressure?item.airPressure:'-'}}</td>
        <td>{{item.status?item.status:'-'}}</td>
        <td>{{item.battery?item.battery:'-'}}</td>
      </tr>
    </table>
  </div>
  <div class="section-right">
    <div class="detail-box">
      <div class="section-title">
        蜂箱信息
      </div>
      <div class="dtail-row">
        <div class="detail-col">
          蜂箱ID:
          <changeble-input :value="beeBoxNo" @change='info_search'></changeble-input>
        </div>
        <div class="detail-col">
          出厂批次: {{batchNo}}
        </div>
        <div class="detail-col">
          厂商:{{manufacturer}}
        </div>
      </div>
      <div class="dtail-row">
        <div class="detail-col">
          蜂箱定位:{{lat}},{{lng}}
        </div>
        <div class="detail-col">
          生产日期:{{productionDate}}
        </div>
        <div class="detail-col">
          状态:{{status}}
        </div>
      </div>
    </div>
    <div class="chart-box">
      <div class="section-title">
        历史数据折线图
      </div>
      <div style="text-align:left;padding-left:20px;margin-top:10px;">
        <el-date-picker size='mini' v-model="date" @change="dateChange" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div class="chart-line">
        <fold ref="fool"></fold>
      </div>

    </div>
    <div class="overview">
      <div class="overview-chart">
        <div class="overview-chart-left">
          <div class="overview-chart-left-row">
            <div class="section-title">
              总览
            </div>
            <div class="overview-row">
              <div class="overview-row-left">
                数量: {{totalBeeBoxNum}}
              </div>
              <div class="overview-row-right">
                正常:{{normalBeeBoxNum}}
              </div>
            </div>
            <div class="overview-row">
              <div class="overview-row-left">
               策略保护:{{protectionNum}}
              </div>
              <div class="overview-row-right">
                异常:{{abnormalBeeBoxNum}}
              </div>
            </div>
            <div class="overview-row">
              <div class="overview-row-left">
                非策略保护:{{noProtectionNum}}
              </div>
              <div class="overview-row-right">
                离线:{{offLineBeeBoxNum}}
              </div>
            </div>
          </div>
        </div>
        <div class="overview-chart-right">
          <echartspie ref="hive"></echartspie>
        </div>
      </div>
      <div class="id-select">
        <id-select @idSelectSearch="idSelectSearch"></id-select>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { get, post } from '../../common/post.js';
import echartspie from './echarts.vue';
import fold from './fold.vue';
import moment from 'moment';
import ChangebleInput from '../../baseCom/ChangebleInput';
import IdSelect from '../../baseCom/IdSelect';
let timer;
let hiveTimer;
let sensorDataId;
let temperature = [];
let humidity = [];
let gravity = [];
let airPressure = [];
let battery = [];
let date = [];
export default {
	components: {
		echartspie,
		fold,
		ChangebleInput,
		IdSelect,
	},
	data() {
		return {
			beeBoxShowAlert: '',
			hiveList: [],
			abnormalBeeBoxNum: '',
			noProtectionNum: '',
			normalBeeBoxNum: '',
			offLineBeeBoxNum: '',
			protectionNum: '',
			totalBeeBoxNum: '',
			date: '',
			beeBoxNo: '',
			lat: '',
			lng: '',
			batchNo: '',
			manufacturer: '',
			productionDate: '',
			status: '',
			id: '',
		};
	},
	created: function() {
		this.getHiveList();
		hiveTimer = setInterval(this.getHiveList, 5000);
		// clearInterval(timer)
	},
	destroyed(){
		console.log(1129192)
		clearInterval(hiveTimer);
		clearInterval(timer);
	},

	methods: {
		// 点击table中的行
		slectThisRow(beeBoxNo) {
			console.log(12222, beeBoxNo);
			this.beeBoxNo = beeBoxNo;
			this.info_search(beeBoxNo);
			this.clickBoxId(beeBoxNo);
		},

		// 日期搜索时，获取相关数据，关闭定时器，必须先选择table中某一行
		dateChange(date) {
			//时间选择
			console.log(1112, timer);
			clearInterval(timer);
			console.log(11123, timer);
			let _this = this;
			let beginDate = new Date(date[0]).getTime();
			let endDate = new Date(date[1]).getTime();
			let beeBoxNo = _this.beeBoxNo;
			console.log(beginDate, endDate, beeBoxNo);
			let options = {
				beginDate: beginDate,
				endDate: endDate,
				beeBoxNo: beeBoxNo,
			};
			console.log(1212, options);
			temperature = [];
			humidity = [];
			gravity = [];
			airPressure = [];
			battery = [];
			date = [];
			let result = post('/getChartSensorData', options);
			result.then(function(res) {
				if (res.data.responseCode === '000000') {
					let data = res.data.data;
					for (let d of data) {
						temperature.push(d.temperature);
						humidity.push(d.humidity);
						gravity.push(d.gravity);
						airPressure.push(d.airPressure);
						battery.push(d.battery);
						date.push(moment(d.createDate).format('YYYY-MM-DD hh:mm'));
					}
					let obj = {
						temperature,
						humidity,
						gravity,
						airPressure,
						battery,
						date,
					};
					console.log(1111111, obj);
					_this.$refs.fool.drawFoldLine(obj);
				}
			});
		},

		// 输入蜂箱ID，获取蜂箱信息
		info_search(beeBoxNo) {
			console.log(11111234, beeBoxNo);
			let _this = this;
			_this.lat = '';
			_this.lng = '';
			_this.batchNo = '';
			_this.manufacturer = '';
			_this.productionDate = '';
			_this.status = '';
			let result = post('/getBeeBox', {
				beeBoxNo: beeBoxNo,
			});
			result.then(function(res) {
				console.log(123456, res);
				if (res.data.responseCode === '000000') {
					let data = res.data.data;
					if (data) {
						_this.beeBoxNo = data.beeBoxNo ? data.beeBoxNo : '';
						_this.batchNo = data.batchNo ? data.batchNo : '';
						_this.manufacturer = data.manufacturer ? data.manufacturer : '';
						_this.productionDate = data.productionDate
							? moment(data.productionDate).format('YYYY-MM-DD')
							: '';
						if (data.status === 0) _this.status = '正在运行';
						else if (data.status === 2) _this.status = '异常';
						else if (data.status === 3) _this.status = '离线';
						else _this.status = '';
						_this.lat = data.lat;
						_this.lng = data.lng;
					} else {
						_this.$message({
							message: '该蜂箱不存在',
							type: 'warning',
						});
					}
				}
			});
		},
		// 获取初始页面的数据table，以及策略保护和非策略保护数据
		getHiveList() {
			let _this = this;

			let result = get('/getAllBeeBoxSensorData', null);
			result.then(res => {
				if (res.data.responseCode === '000000') {
					let data = res.data.data.latestSensorData;
					let stat = res.data.data;
					// 总览 饼图
					//有时候数据为空值，需要改变东西
					if (stat) {
						_this.abnormalBeeBoxNum = stat.abnormalBeeBoxNum;
						_this.noProtectionNum = stat.noProtectionNum;
						_this.normalBeeBoxNum = stat.normalBeeBoxNum;
						_this.offLineBeeBoxNum = stat.offLineBeeBoxNum;
						_this.protectionNum = stat.protectionNum;
						_this.totalBeeBoxNum = stat.totalBeeBoxNum;
						let obj = {
							abnormalBeeBoxNum: stat.abnormalBeeBoxNum,
							noProtectionNum: stat.noProtectionNum,
							normalBeeBoxNum: stat.normalBeeBoxNum,
							offLineBeeBoxNum: stat.offLineBeeBoxNum,
							protectionNum: stat.protectionNum,
							totalBeeBoxNum: stat.totalBeeBoxNum,
						};
						console.log(111111, obj);
						// 画扇形图
						_this.$refs.hive.drawLine(obj);

						// 将值赋值给列表
						for (let obj of data) {
							if (obj.status === 0) obj.status = '正在运行';
							else if (obj.status === 2) obj.status = '异常';
							else if (obj.status === 3) obj.status = '离线';
						}
						console.log(1222222, data);
						_this.hiveList = [];
						_this.hiveList = _this.hiveList.concat(data);
					}

					//因为蜂箱数据时动态显示的，如果给定默认值，会一直刷新到第一条数据
					// if (data.length > 0) {
					// 	_this.beeBoxNo = data[0].beeBoxNo;
					// 	// 默认第一条蜂箱信息
					// 	_this.info_search(_this.beeBoxNo);
					// }
				}
			});
		},

		idSelectSearch(id) {
			console.log(11119, id);
			this.info_search(id);
			this.clickBoxId(id);
		},
		// 点击table中的某一行开始轮询获取相关数据，放入折线图中,开始搜索后则关闭该轮询
		clickBoxId() {
			let _this = this;
			console.log(123, _this.beeBoxNo);
			sensorDataId = '';
			temperature = [];
			humidity = [];
			gravity = [];
			airPressure = [];
			battery = [];
			date = [];
			let obj = {
				temperature,
				humidity,
				gravity,
				airPressure,
				battery,
				date,
			};
			_this.$refs.fool.drawFoldLine(obj);
			timer = setInterval(() => {
				let result;
				if (!sensorDataId) {
					result = post('/getBeeBoxSensorData', {
						beeBoxNo: _this.beeBoxNo,
					});
				} else {
					result = post('/getBeeBoxSensorData', {
						beeBoxNo: _this.beeBoxNo,
						sensorDataId: sensorDataId,
					});
				}
				result.then(res => {
					if (res.data.responseCode === '000000') {
						console.log(99999, res.data);
						let d = res.data.data;
						if (d) {
							sensorDataId = d.id;
							temperature.push(d.temperature);
							humidity.push(d.humidity);
							gravity.push(d.gravity);
							airPressure.push(d.airPressure);
							battery.push(d.battery);
							date.push(moment(d.createDate).format('YYYY-MM-DD hh:mm'));
							let obj = {
								temperature,
								humidity,
								gravity,
								airPressure,
								battery,
								date,
							};
							console.log(1111111, obj);
							_this.$refs.fool.drawFoldLine(obj);
						}
					}
				});
			}, 1000);
		},
	},
};
</script>

<style scoped>
.box {
	position: relative;
	width: 100%;
	height: 100%;
	overflow: scroll;
	display: flex;
}

.section-left {
	position: relative;
	width: 35%;
	height: 100%;
	overflow: scroll;
	padding-bottom: 20px;
	background: white;
}

.section-right {
	width: 64%;
	height: 100%;
	padding-left: 10px;
	padding-right: 10px;
}

table {
	border-collapse: collapse;
	width: 100%;
}

table tr:hover {
	cursor: pointer;
	background: #eee;
}

table,
th,
td {
	border: 1px solid #f9bb3c;
	font-size: 14px;
	height: 25px;
	line-height: 25px;
}

table tr th {
	width: 14.28%;
}

.detail-box {
	position: relative;
	height: auto;
	width: 100%;
	color: #daac52;
	border: 1px solid #746c5e;
}

.section-title {
	width: 100%;
	text-align: left;
	text-indent: 20px;
	margin-top: 10px;
}

.dtail-row {
	width: 90%;
	margin-left: 20px;
	margin-top: 10px;
	display: flex;
	align-items: center;
	font-size: 12px;
	margin-bottom: 10px;
}

.detail-col {
	width: 33%;
	text-align: left;
}

.chart-box {
	position: relative;
	color: #daac52;
	height: 450px;
	border: 1px solid #746c5e;
	width: 100%;
	margin-top: 20px;
}

.overview {
	position: relative;
	width: 100%;
	color: #daac52;
	height: 270px;
	border: 1px solid #746c5e;
	margin-top: 20px;
	display: flex;
}

.chart-line {
	width: 100%;
	margin-top: 30px;
	height: 330px;
}

.overview-chart {
	width: 65%;
	height: 100%;
	display: flex;
}

.id-select {
	width: 34%;
	height: 100%;
}

.overview-chart-left {
	width: 45%;
	height: 100%;
	font-size: 14px;
}

.overview-chart-right {
	width: 55%;
	height: 100%;
}

.overview-row {
	width: 100%;
	display: flex;
	margin-top: 30px;
}

.overview-row-left {
	width: 65%;
	text-align: left;
	text-indent: 20px;
}

.overview-row-right {
	text-align: left;
	text-indent: 20px;
	width: 35%;
}
</style>
