<template>
<div class="map-box">
  <div class="map">
    <baidu-map style="width:100%;height:100%" :center="{lng, lat}" :zoom="zoom" @ready="getPoints">
      <!-- <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list> -->
      <bm-point-collection :points="points" shape="BMAP_POINT_SHAPE_CIRCLE" color="red" size="BMAP_POINT_SIZE_NORMAL" @click="clickHandler"></bm-point-collection>
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT" ></bm-scale>
      <bm-marker :position="{lng, lat}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE" v-if="ok">
        <!-- <bm-label content="当前蜂箱" :labelStyle="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}" /> -->
      </bm-marker>
    </baidu-map>
  </div>
  <div class="detail">
    <div class="data-detail">
      <div class="data-detail-row">
        蜂箱ID:
        <changeble-input :value="beeBoxNo" @change='idSelectSearch'></changeble-input>
      </div>
      <div class="data-detail-row">
        蜂箱定位:{{centerlng}},{{centerlat}}
      </div>
    </div>

    <div class="data-update-data">
      <div class="data-update-title">
        实时数据
      </div>
      <div class="data-update-row">
        <div class="icon-box">
          <i class="iconfont icon-wendu"></i>
        </div>
        <div class="data-update-row-text">
          <div class="data-update-row-name">
            温度
          </div>
          <div class="data-update-row-value">
            {{real.temperature||'-'}}
          </div>
        </div>
      </div>
      <div class="data-update-row">
        <div class="icon-box">
          <i class="iconfont icon-shidu"></i>
        </div>
        <div class="data-update-row-text">
          <div class="data-update-row-name">
            湿度
          </div>
          <div class="data-update-row-value">
            {{real.humidity||'-'}}
          </div>
        </div>
      </div>
      <div class="data-update-row">
        <div class="icon-box">
          <i class="iconfont icon-daqiyali"></i>
        </div>
        <div class="data-update-row-text">
          <div class="data-update-row-name">
            压强
          </div>
          <div class="data-update-row-value">
            {{real.airPressure||'-'}}
          </div>
        </div>
      </div>
      <div class="data-update-row">
        <div class="icon-box">
          <i class="iconfont icon-zhongliangweight9"></i>
        </div>
        <div class="data-update-row-text">
          <div class="data-update-row-name">
            重量
          </div>
          <div class="data-update-row-value">
            {{real.gravity||'-'}}
          </div>
        </div>
      </div>
      <div class="data-update-row">
        <div class="icon-box">
          <i class="iconfont icon-80dianliang"></i>
        </div>
        <div class="data-update-row-text">
          <div class="data-update-row-name">
            电量
          </div>
          <div class="data-update-row-value" v-if="!real.battery=== null">
            {{real.battery}}%
          </div>
          <div class="data-update-row-value" v-else>
            -
          </div>
        </div>
      </div>
			<div class="data-update-row">
        <div class="icon-box" v-if="status===0||status===1">
          <i class="iconfont icon-smile"></i>
        </div>
				<div class="icon-box" v-if="status===2||status===3">
          <i class="iconfont icon-cry"></i>
        </div>
        <div class="data-update-row-text">
          <div class="data-update-row-name">
            状态
          </div>
          <div class="data-update-row-value" v-if="status===2">
            异常
          </div>
					 <div class="data-update-row-value" v-if="status===0">
            正在运行
          </div>
					 <div class="data-update-row-value" v-if="status===1">
            正在运行
          </div>
					 <div class="data-update-row-value" v-if="status===3">
            离线
          </div>
          <div class="data-update-row-value" v-else>
            -
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="status-box">
      <div class="data-update-title">
        实时数据
      </div>
      <div class="face" v-if="status===2">
        <i class="iconfont icon-cry" style="font-size:20px;"></i>异常
      </div>
      <div class="face" v-else-if="status===0">
        <i class="iconfont icon-smile" style="font-size:20px;"></i>正在运行
      </div>
      <div class="face" v-else-if="status===1">
        <i class="iconfont icon-smile" style="font-size:20px;"></i>正在运行
      </div>
      <div class="face" v-else-if="status===3">
        <i class="iconfont icon-cry" style="font-size:20px;"></i>离线
      </div>
      <div class="face" v-else>
        <i class="iconfont icon-cry" style="font-size:20px;"></i>暂无数据
      </div>
    </div> -->
    <div class="data-id-select-box">
      <id-select @idSelectSearch="idSelectSearch"></id-select>
    </div>
  </div>
</div>
</template>
<script>
import { get, post } from '../../common/post.js';
import IdSelect from '../../baseCom/IdSelect';
import ChangebleInput from '../../baseCom/ChangebleInput';
let timer;
let sensorDataId;
export default {
	components: {
		IdSelect,
		ChangebleInput,
	},
	data() {
		return {
			points: [],
			beeBoxNo: '',
			zoom: 11,
			lat: '',
			lng: '',
			real: {},
			status: 3,
			ok: true,
			centerlat: '',
			centerlng: '',
		};
	},
	mounted() {
		// this.firstGetData();
		this.getRealData();
		console.log(12390, this.centerlng, this.centerlat, this.lng, this.lat);
	},
	destroyed() {
		console.log(888888);
		// clearInterval(hiveTimer);
		clearInterval(timer);
	},
	methods: {
		// 获取数据显示在地图上经纬度
		getPoints() {
			let _this = this;
			let points = [];
			let result = get('/getAllBeeBoxSensorData', null);
			result.then(res => {
				if (res.data.responseCode === '000000') {
					console.log(res.data.data);
					let latestSensorData = res.data.data.latestSensorData;

					for (let d of latestSensorData) {
						console.log(d);
						const position = {
							lng: d.lng,
							lat: d.lat,
						};
						points.push(position);
					}
					_this.points = points;
					if (latestSensorData.length > 0) {
						_this.beeBoxNo = latestSensorData[0].beeBoxNo;
						_this.lat = latestSensorData[0].lat;
						_this.lng = latestSensorData[0].lng;
						_this.centerlat = latestSensorData[0].lat;
						_this.centerlng = latestSensorData[0].lng;
						console.log(12345, _this.centerlng, _this.centerlat);
					}
				}
			});
		},
		//点击图上的某个点
		clickHandler(e) {
			this.lng = e.point.lng;
			this.lat = e.point.lat;
			// alert(`单击点的坐标为：${e.point.lng}, ${e.point.lat}`);
			let result = post('/getBeeBoxByPosition', {
				lng: this.lng,
				lat: this.lat,
			});
			result.then(res => {
				console.log(11234, res.data);
				if (res.data.responseCode === '000000') {
					this.idSelectSearch(res.data.data.beeBoxNo);
				}
			});
		},
		//第一次获得蜂箱数据
		firstGetData() {
			// console.log(222);
			let _this = this;
			// if (!_this.beeBoxNo) {
			// 	console.log(1111);
			// 	return;
			// }
			let result;
			console.log(1, sensorDataId, _this.beeBoxNo);
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
			console.log(345, sensorDataId);
			result.then(function(res) {
				let data = res.data.data;
				console.log(1234, res.data, data);
				if (res.data.responseCode === '000000' && data) {
					_this.ok = true;
					_this.$set(_this.real, 'temperature', data.temperature);
					_this.$set(_this.real, 'humidity', data.humidity);
					_this.$set(_this.real, 'gravity', data.gravity);
					_this.$set(_this.real, 'airPressure', data.airPressure);
					_this.$set(_this.real, 'battery', data.battery);
					_this.status = data.status;
					sensorDataId = data.id;
				}
				console.log(99999, _this.real);
			});
		},
		//获取蜂箱的实时数据
		getRealData() {
			let _this = this;
			sensorDataId = '';
			// _this.ok = false;
			// _this.lng = 121.48;
			// _this.lat = 31.22;
			console.log(33333, sensorDataId, _this.beeBoxNo);
			clearInterval(timer);
			_this.firstGetData();
			timer = setInterval(() => {
				_this.firstGetData();
			}, 5000);
		},
		// 通过蜂箱ID搜索数据  先把原有数据清空
		info_search(beeBoxNo) {
			let _this = this;
			// _this.lat = '';
			// _this.lng = '';
			_this.status = '';
			_this.real = {};
			let result = post('/getBeeBox', {
				beeBoxNo: beeBoxNo,
			});
			result.then(function(res) {
				console.log(123456, res);
				if (res.data.responseCode === '000000') {
					let data = res.data.data;
					if (data) {
						_this.ok = true;
						_this.beeBoxNo = data.beeBoxNo ? data.beeBoxNo : '';
						_this.lat = data.lat;
						_this.lng = data.lng;
						_this.centerlat = data.lat;
						_this.centerlng = data.lng;
						_this.getRealData();
					} else {
						console.log(12345, _this.lat, _this.lng);
						_this.ok = false;
						_this.centerlat = '';
						_this.centerlng = '';
						clearInterval(timer);
						_this.$message({
							message: '该蜂箱不存在',
							type: 'warning',
						});
					}
				}
			});
		},
		//查询
		idSelectSearch(beeBoxNo) {
			this.info_search(beeBoxNo);
			// this.firstGetData();
			this.getRealData();
		},
	},
};
</script>
<style>
.map-box {
	position: relative;
	width: calc(100% - 10px);
	height: calc(100% - 10px);
	display: flex;
	/* justify-content: space-between; */
}

.map {
	position: relative;
	width: calc(100% - 300px);
	height: 920px;
}

.detail {
	width: 250px;
	height: 100%;
	margin-left: 20px;
}

.data-detail {
	position: relative;
	width: 100%;
	height: 100px;
	border: 1px solid #362f2e;
	background: #362f2e;
	margin-top: 20px;
}

.data-detail-row {
	margin-top: 20px;
	width: 100%;
	text-align: left;
	text-indent: 30px;
	color: #ed9e10;
	font-size: 14px;
}

.data-update-data {
	width: 100%;
	height: 350px;
	background: #dddddc;
	margin-top: 20px;
}

.data-update-title {
	width: 100%;
	text-align: left;
	height: 40px;
	line-height: 40px;
	text-indent: 20px;
	font-size: 12px;
}

.data-update-row {
	position: relative;
	width: 100%;
	height: 50px;
	border-top: 1px solid #bbb9b8;
	text-align: left;
}

.icon-box {
	width: 30px;
	height: 30px;
	color: white;
	background: #5c5651;
	border-radius: 50%;
	text-align: center;
	line-height: 30px;
	margin-top: 10px;
	position: absolute;
	left: 20px;
}

.data-update-row-text {
	position: absolute;
	left: 55px;
	height: 40px;
	font-size: 10px;
	width: 100px;
	text-align: left;
}

.data-update-row-name {
	margin-top: 8px;
	line-height: 13px;
	font-size: 9px;
	transform: scale(0.7);
	transform-origin: 0 50%;
}

.data-update-row-value {
	line-height: 25px;
	font-size: 12px;
}

.status-box {
	width: 100%;
	height: 150px;
	background: #dddddc;
	margin-top: 20px;
}

.face {
	margin-top: 20px;
	font-size: 20px;
}

.data-id-select-box {
	margin-top: 20px;
}

.demo {
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
