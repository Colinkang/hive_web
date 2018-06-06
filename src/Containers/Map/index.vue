<template>
<div class="map-box">
  <div class="map">
    <baidu-map style="width:100%;height:100%" center="北京">
      <bm-marker :position="{lng: 116.404, lat: 39.915}" :dragging="true">

      </bm-marker>
    </baidu-map>
  </div>
  <div class="detail">
    <div class="data-detail">
      <div class="data-detail-row">
        蜂箱ID:
        <changeble-input :value="boxId" @change='info_search'></changeble-input>
      </div>
      <div class="data-detail-row">
        蜂箱定位:
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
            1314
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
            1314
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
            1314
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
            1314
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
          <div class="data-update-row-value">
            1314
          </div>
        </div>
      </div>
    </div>
    <div class="status-box">
      <div class="data-update-title">
        实时数据
      </div>
      <div class="face">
        <i class="iconfont icon-smile" style="font-size:20px;"></i>正常
      </div>
    </div>
    <div class="data-id-select-box">
      <id-select @change="idSelectSearch"></id-select>
    </div>
  </div>
</div>
<!-- <div class="global">
        <div class="global-map">

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
    </div> -->
</template>
<script>
import {
  get,
  post
} from '../../common/post.js';
import IdSelect from '../../baseCom/IdSelect';
import ChangebleInput from '../../baseCom/ChangebleInput';
export default {
  components: {
    IdSelect,
    ChangebleInput
  },
  data() {
    return {
      boxId: '111',
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
        let result = post('/getBeeBoxSensorDate', {
          beeBoxId: _this.boxId
        });
        result.then(function(res) {});
      }, 1000);
    },
    idSelectSearch(id) {
      console.log(id)
    },
    info_search(id) {

    }
  },
};
</script>
<style>
/* The container of BaiduMap must be set width & height. */

/* .map {
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
} */

/* 我的样式 */

.map-box {
  position: relative;
  width: calc(100% - 10px);
  height: calc(100% - 10px);
  display: flex;
  justify-content: space-between;

}

.map {
  position: relative;
  width: calc( 100% - 300px);
  height: 100%;
}

.detail {
  width: 250px;
  height: 100%;
  margin-right: 20px;

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
  height: 300px;
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
.face{
  margin-top: 20px;
  font-size: 20px;
}
.data-id-select-box{
  margin-top: 20px;
}
.demo{
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
