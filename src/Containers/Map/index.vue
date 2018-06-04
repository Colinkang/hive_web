<template>
    <div class="global">
        <div class="global-map">
          <baidu-map class="map" center="北京">
             <bm-marker :position="{lng: 116.404, lat: 39.915}" :dragging="true">
               <!-- <bm-label content="我爱北京天安门" :labelStyle="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}"/> -->
             </bm-marker>
          </baidu-map>
        </div>
        <div class="global-content">
           <div class ="map-hive">
                 <el-row>
                   <el-col :span="12">蜂箱ID</el-col>
                   <el-col :span="12">
                       <el-input v-model="boxId"></el-input>
                   </el-col>
                 </el-row>
                  <el-row>
                   <el-col :span="12">蜂箱定位</el-col>
                   <el-col :span="12">
                      <el-input v-model="boxPosition"></el-input>
                   </el-col>
                 </el-row>

           </div>
           <div class ="map-hive-real" >
               <el-row>
                  实时数据
              </el-row>
              <el-row>
                   <el-col :span="12"><div ></div></el-col>
                   <el-col :span="12"><div >{{1234}}</div></el-col>
              </el-row>
              <el-row>
                   <el-col :span="12"><div ></div></el-col>
                   <el-col :span="12"><div >{{1234}}</div></el-col>
              </el-row>
              <el-row>
                   <el-col :span="12"><div ></div></el-col>
                   <el-col :span="12"><div >{{1234}}</div></el-col>
              </el-row>
              <el-row>
                   <el-col :span="12"><div ></div></el-col>
                   <el-col :span="12"><div >{{1234}}</div></el-col>
              </el-row>
              <el-row>
                   <el-col :span="12"><div ></div></el-col>
                   <el-col :span="12"><div >{{1234}}</div></el-col>
              </el-row>
              <el-row>
                   <el-col :span="12"><div ></div></el-col>
                   <el-col :span="12"><div >{{1234}}</div></el-col>
              </el-row>
           </div>
           <div class ="map-hive-search">
             <el-row>
                   <el-col :span="12"><div >姓名</div></el-col>
                   <el-col :span="12"><div >{{1234}}</div></el-col>
              </el-row>
           </div>
        </div>
    </div>
</template>
<script>
import { get, post } from '../../common/post.js';
export default {
	data() {
		return {
			boxId: '',
			boxPosition: '',
		};
	},
	created: function() {
		let _this = this;
		let result = get('/getAllBeeBoxSensorData', null);
		result.then(function(res) {
			if (res.data.responseCode) {

			}
		});
	},
	// mounted: function() {},
	methods: {
		getRealData() {
			let _this = this;
			setInterval(function() {
				let result = post('/getBeeBoxSensorDate', { beeBoxId: _this.boxId });
				result.then(function(res) {});
			}, 1000);
		},
	},
};
</script>
<style>
/* The container of BaiduMap must be set width & height. */
.map {
	width: 60%;
	height: 500px;
}
.global {
	background-color: rgb(26, 26, 26);
	width: 100%;
	height: 900px;
	display: flex;
}
.global-map {
	margin-left: 10px;
	margin-top: 30px;
	width: 100%;
	height: 00px;
}
.map-hive {
	width: 200px;
	height: 200px;
}
.map-hive-real {
	width: 200px;
	height: 200px;
}
.map-hive-search {
	width: 200px;
	height: 200px;
}
</style>
