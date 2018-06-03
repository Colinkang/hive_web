<template>
    <div class="hive-total">
          <div class="hive-left">   
                  <el-table :data="hiveList" border style="width: 100%" max-height="600px" @current-change="handleCurrentChange">
                        <el-table-column 
                            prop="boxId" 
                            label="蜂箱ID" 
                            width="70">
                        </el-table-column>
                        <el-table-column
                            prop="temperature"
                            label="温度"
                            width="70">
                        </el-table-column>
                        <el-table-column
                            prop="humidity"
                            label="湿度"
                             width="70">
                        </el-table-column>
                        <el-table-column
                            prop="gravity"
                            label="重量"
                            width="70">
                        </el-table-column>
                        <el-table-column
                            prop="airPressure"
                            label="压强"
                            width="70">
                        </el-table-column>
                        <el-table-column
                            prop="status"
                            label="状态"
                            width="70">
                        </el-table-column>
                        <el-table-column
                            prop="battery"
                            label="电量"
                            width="70">
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
                    <el-date-picker
                    v-model="date"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker>
                    <el-button type="primary" icon="el-icon-search" @click="foldsearch">搜索</el-button>
                </div>
            <div class="hive-foldline">
               
                <fold refs="fold"></fold>
            </div>
            <div class="hive-overview-pie">
                <div class="hive-overview">
                    <el-row>
                        <el-col :span ="8">总览</el-col>
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
          </div>
    </div>
</template>

<script>
import { get, post } from '../../common/post.js';
import echartspie from './echarts.vue';
import fold from './fold.vue';
import moment from 'moment';
export default {
	components: {
		echartspie,
		fold,
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
		};
	},
	created: function() {
		// for(let i = 0;i++;i<100){
		//   hiveList.push({});
		// }
		this.getHiveList();
	},

	methods: {
		info_search() {
			let _this = this;
			let result = post('/getBeeBox', { beeBoxId: this.boxId });
			result.then(function(res) {
                let data = res.data.data;
                console.log(data,123);
				_this.batchNo = data.batchNo;
				_this.manufacturer = data.manufacturer;
				_this.productionDate = moment(data.productionDate).format('YYYY-MM-DD');
				if (data.status === 0) _this.status = '正在运行';
				else if (data.status === 2) _this.status = '异常';
				else if (data.status === 3) _this.status = '离线';
			});
		},
		handleCurrentChange(val) {
			// this.currentRow = val;
			this.boxId = val.boxId;
			this.lat = val.lat;
			this.lng = val.lng;
		},
		getHiveList() {
			let _this = this;
			let result = get('/getAllBeeBoxSensorData', null);
			result.then(function(res) {
				// console.log(res);
				if (res.data.responseCode) {
					let data = res.data.data.latestSensorData;
					let stat = res.data.data;
					console.log(11111, res.data.data);
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
					let data_length = data.length;
					if (data_length < 100) {
						for (let i = data_length; i < 100; i++) {
							data.push({
								boxId: null,
								temperature: null,
								humidity: null,
								gravity: null,
								airPressure: null,
								status: null,
								battery: null,
							});
						}
					}
					//  console.log(data);
					_this.hiveList = data;
					// console.log(_this.hiveList);
				}
			});
		},
		foldsearch() {
			let _this = this;
			let date = _this.date;
			if (date.length > 0) {
				let beginDate = _this.date[0].getTime();
				let endDate = _this.date[1].getTime();
				let boxId = _this.boxId;
				console.log(beginDate, endDate, boxId);
				let result = post('/getChartSensorData', {
					beginDate: beginDate,
					endDate: endDate,
					boxId: boxId,
				});
				result.then(function(res) {
					console.log(456, res.data);
				});
			}
		},
	},
};
</script>

<style scoped>
.hive-total {
	background-color: rgb(26, 26, 26);
	border: 5px solid rgb(255, 167, 39);
	min-height: 900px;
	display: flex;
}
.hive-left {
	width: 44%;
	height: 800px;
}
.el-table {
	height: 800px;
}
.hive-right {
	width: 56%;
	height: 800px;
}

.hive-info {
	width: auto;
	height: 100px;
	border: 1px solid rgb(118, 102, 78);
}
.hive-foldline {
	height: 400px;
}
.hive-overview-pie {
	height: 400px;
	border: 1px solid rebeccapurple;
}
.hive-overview {
	height: 100px;
	border: 1px solid rgb(118, 102, 78);
}
</style>
