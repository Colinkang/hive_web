<template>
<div class="box">
  <div class="section-left">
    <table border="0">
      <tr>
        <th>封箱ID</th>
        <th>温度</th>
        <th>湿度</th>
        <th>重量</th>
        <th>压强</th>
        <th>状态</th>
        <th>电量</th>
      </tr>
      <tr v-for="(item) in hiveList" :key='item.boxId' @click="slectThisRow(item.boxId)">
        <td>{{item.boxId?item.boxId:'-'}}</td>
        <td>{{item.temperature}}</td>
        <td>{{item.humidity}}</td>
        <td>{{item.gravity}}</td>
        <td>{{item.airPressure}}</td>
        <td>{{item.status}}</td>
        <td>{{item.battery}}</td>
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
          <changeble-input :value="boxId" @change='info_search'></changeble-input>
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
        <el-date-picker size='mini' v-model="date" @change="dateChange" value-format="YYYY-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div class="chart-line">
        <fold refs="fold"></fold>
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
                数量：111
              </div>
              <div class="overview-row-right">
                正常
              </div>
            </div>
            <div class="overview-row">
              <div class="overview-row-left">
                正在运行：111
              </div>
              <div class="overview-row-right">
                异常
              </div>
            </div>
            <div class="overview-row">
              <div class="overview-row-left">
                离线
              </div>
              <div class="overview-row-right">
                策略维护
              </div>
            </div>
          </div>
        </div>
        <div class="overview-chart-right">
          <echartspie ref="hive"></echartspie>
        </div>
      </div>
      <div class="id-select">
        <id-select @change="idSelectSearch"></id-select>
      </div>
    </div>
  </div>
  <!-- <div class="hive-left">
    <el-table :data="hiveList" border style="width: 100%" max-height="600px" @current-change="handleCurrentChange">
      <el-table-column prop="boxId" label="蜂箱ID" width="70">
      </el-table-column>
      <el-table-column prop="temperature" label="温度" width="70">
      </el-table-column>
      <el-table-column prop="humidity" label="湿度" width="70">
      </el-table-column>
      <el-table-column prop="gravity" label="重量" width="70">
      </el-table-column>
      <el-table-column prop="airPressure" label="压强" width="70">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="70">
      </el-table-column>
      <el-table-column prop="battery" label="电量" width="70">
      </el-table-column>
    </el-table>
  </div>
  <div class="hive-right">
    <div class="hive-info">
      <el-row>
        蜂箱信息
      </el-row>
      <el-row>
        <el-col :span="6">蜂箱ID</el-col>
        <el-col :span="3">
          <el-input v-model="boxId" @keyup.native.enter="info_search"></el-input>
        </el-col>
        <el-col :span="3">出厂批次</el-col>
        <el-col :span="3">{{batchNo}}</el-col>
        <el-col :span="3">产商</el-col>
        <el-col :span="4">{{manufacturer}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6">蜂箱定位</el-col>
        <el-col :span="6"></el-col>
        <el-col :span="3">生产日期</el-col>
        <el-col :span="5">{{productionDate}}</el-col>
        <el-col :span="3">状态</el-col>
        <el-col :span="3">{{status}}</el-col>
      </el-row>
    </div>
    <div class="block">
      <span class="demonstration">选择时间</span>
      <el-date-picker v-model="date" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
      </el-date-picker>
      <el-button type="primary" icon="el-icon-search" @click="foldsearch">搜索</el-button>
    </div>
    <div class="hive-foldline">

      <fold refs="fold"></fold>
    </div>
    <div class="hive-overview-pie">
      <div class="hive-overview">
        <el-row>
          <el-col :span="8">总览</el-col>
        </el-row>
        <el-row>
          <el-col :span="5">总量</el-col>
          <el-col :span="3">{{totalBeeBoxNum}}</el-col>
          <el-col :span="3">策略保护</el-col>
          <el-col :span="3">{{protectionNum}}</el-col>
          <el-col :span="5">非策略保护</el-col>
          <el-col :span="4">{{noProtectionNum}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="5">正常</el-col>
          <el-col :span="3">{{normalBeeBoxNum}}</el-col>
          <el-col :span="3">异常</el-col>
          <el-col :span="3">{{abnormalBeeBoxNum}}</el-col>
          <el-col :span="5">离线</el-col>
          <el-col :span="4">{{offLineBeeBoxNum}}</el-col>
        </el-row>
      </div>
      <div class="hive-pie">
        <echartspie ref="hive"></echartspie>
      </div>
      <div>
        <el-input placeholder="请输入蜂箱ID" v-model="hive_like_id">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
    </div>
  </div> -->
</div>
</template>

<script>
import { get, post } from '../../common/post.js';
import echartspie from './echarts.vue';
import fold from './fold.vue';
import moment from 'moment';
import ChangebleInput from '../../baseCom/ChangebleInput';
import IdSelect from '../../baseCom/IdSelect';
export default {
	components: {
		echartspie,
		fold,
		ChangebleInput,
		IdSelect,
	},
	data() {
		return {
			hiveList: [],
			hive_like_id: '',
			abnormalBeeBoxNum: '',
			noProtectionNum: '',
			normalBeeBoxNum: '',
			offLineBeeBoxNum: '',
			protectionNum: '',
			// runningBeeBoxNum: stat.runningBeeBoxNum,
			totalBeeBoxNum: '',
			date: '',
			boxId: '',
			lat: '',
			lng: '',
			batchNo: '',
			manufacturer: '',
			productionDate: '',
			status: '',
			id: '',
			date: '',
		};
	},
	created: function() {
		this.getHiveList();
	},

	methods: {
    slectThisRow(id){
    //  this.idChange(id)
    },
		// 返回单个box的信息
		idChange(boxId) {
			// console.log(id)
			let _this = this;
			let result = post('/getBeeBoxSensorDate', { beeBoxId: boxId });
			result.then(res => {
				let data = res.data.data;
				if (res.data.responseCode === '000035') {
				} else if (res.data.responseCode === '000000') {
					_this.batchNo = data.batchNo;
					_this.manufacturer = data.manufacturer;
					_this.productionDate = date.productionDate;
				}
			});
		},

		// 日期搜索时，获取相关数据，关闭定时器，必须先选择table中某一行
		dateChange(date) {
			//时间选择
			console.log(1111, date[0], date[1]);
			let _this = this;
			let beginDate = new Date(date[0]).getTime();
			let endDate = new Date(date[1]).getTime();
			let boxId = _this.boxId;
			console.log(beginDate, endDate, boxId);
			let result = post('/getChartSensorData', {
				beginDate: beginDate,
				endDate: endDate,
				beeBoxId: boxId,
			});
			result.then(function(res) {
				console.log(456, res.data);
			});
		},
		// 输入蜂箱ID，获取蜂箱信息
		info_search(boxId) {
			let _this = this;
			let result = post('/getBeeBox', {
				beeBoxId: boxId,
			});
			result.then(function(res) {
				console.log(123456, res);
				let data = res.data.data;
				console.log(data, 123);
				_this.batchNo = data.batchNo;
				_this.manufacturer = data.manufacturer;
				_this.productionDate = moment(data.productionDate).format('YYYY-MM-DD');
				if (data.status === 0) _this.status = '正在运行';
				else if (data.status === 2) _this.status = '异常';
        else if (data.status === 3) _this.status = '离线';
        _this.lat =data.lat;
        _this.lng = data.lng;
			});
		},
		handleCurrentChange(val) {
      console.log(99999,val);
			// this.currentRow = val;
			this.boxId = val.boxId;
			this.lat = val.lat;
			this.lng = val.lng;
		},
		// 获取初始页面的数据table，以及策略保护和非策略保护数据
		getHiveList() {
			let _this = this;
			let result = get('/getAllBeeBoxSensorData', null);
			result.then(function(res) {
				// console.log(res);
				if (res.data.responseCode) {
					let data = res.data.data.latestSensorData;
					let stat = res.data.data;
					_this.abnormalBeeBoxNum = stat.abnormalBeeBoxNum;
					_this.noProtectionNum = stat.noProtectionNum;
					_this.normalBeeBoxNum = stat.normalBeeBoxNum;
					_this.offLineBeeBoxNum = stat.offLineBeeBoxNum;
					_this.protectionNum = stat.protectionNum;
					// runningBeeBoxNum: stat.runningBeeBoxNum,
					_this.totalBeeBoxNum = stat.totalBeeBoxNum;
					let obj = {
						abnormalBeeBoxNum: stat.abnormalBeeBoxNum,
						noProtectionNum: stat.noProtectionNum,
						normalBeeBoxNum: stat.normalBeeBoxNum,
						offLineBeeBoxNum: stat.offLineBeeBoxNum,
						protectionNum: stat.protectionNum,
						// runningBeeBoxNum: stat.runningBeeBoxNum,
						totalBeeBoxNum: stat.totalBeeBoxNum,
					};
					_this.$refs.hive.drawLine(obj);
					for (let obj of data) {
						console.log(obj);
						if (obj.boxId) {
							obj.temperature = obj.temperature || '-';
							obj.humidity = obj.humidity || '-';
							obj.gravity = obj.gravity || '-';
							obj.airPressure = obj.airPressure || '-';
							if (obj.status === 0) obj.status = '正在运行';
							else if (obj.status === 2) obj.status = '异常';
							else if (obj.status === 3) obj.status = '离线';
							obj.battery = obj.battery || '-';
						}
					}
					_this.hiveList = data;
					if(data.length>0){

          }
				}
			});
		},

		idSelectSearch(id) {
			console.log(11119, id);
			let result = post('/beeBoxSearch', {
				keyword: '1',
			});
			result.then(res => {
				console.log(result);
			});
		},
		// 点击table中的某一行开始轮询获取相关数据，放入折线图中,开始搜索后则关闭该轮询
		clickBoxId() {
			setInterval(function() {
				let result = post('/getBeeBoxSensorDate', {
					beeBoxId: 'boxid',
				});
				result.then(res => {
					console.log(res);
				});
			}, 3 * 3600);
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
	width: 42%;
	height: 100%;
	overflow: scroll;
	padding-bottom: 20px;
	background: white;
}

.section-right {
	width: 55%;
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
