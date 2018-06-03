<template>
  <div class="box">
   <el-row>
      <el-col :span="12"><div >姓名</div></el-col>
    <el-col :span="12"><div >{{user.name}}</div></el-col>
   </el-row>
    <el-row>
      <el-col :span="12"><div >电话</div></el-col>
      <el-col :span="12"><div >{{user.tel}}</div></el-col>
   </el-row>
    <el-row>
      <el-col :span="12"><div >地址</div></el-col>
      <el-col :span="12"><div >{{user.address}}</div></el-col>
   </el-row>
    <el-row>
      <el-col :span="12"><div >邮箱</div></el-col>
      <el-col :span="12"><div >{{user.email}}</div></el-col>
   </el-row>
    <el-row>
      <el-col :span="12"><div >手机号码</div></el-col>
      <el-col :span="12"><div >{{user.tel}}</div></el-col>
   </el-row>
    <el-row>
      <el-col :span="12"><div >合作社</div></el-col>
      <el-col :span="12"><div >{{user.organizationName}}</div></el-col>
   </el-row>
  </div>
</template>
<style>
.box {
  border: 1px solid #ccc;
}
.box .el-row {
  border-bottom: 1px solid #ccc;
  text-align: left;
  font-size: 15px;
  height: 50px;
  line-height: 50px;
}
.box .el-col {
  text-indent: 20px;
}
</style>
  <script>
import { post } from "../../common/post";
export default {
  data() {
    return {
      host: "",
      user:{
          name:'',
          mobile:'',
          email:'',
          address:'',
          username:'',
          tel:'',
          organizationName:''  
      },
    };
  },
  mounted() {
    //do something after mounting vue instance
    // this.host = PORSCHE_HOST;
  },
  methods: {
   
  },

  created: function() {
    // let _this = this;
    // let id = _this.$route.query.id;
    // console.log(111, id);
    // let result = post("/manager/user/update/detail", {
    //   id: id
    // });
    // result.then(res => {
    //   console.log(res.data);
    //   let origin_data = JSON.parse(res.data.data.origin_data);
    //   let updated_data = JSON.parse(res.data.data.updated_data);
    //   console.log(origin_data);
    //   _this.origin = origin_data;
    //   console.log(4444, _this.origin)
    //   _this.updated = updated_data;
    // });
  }
};
</script>
<style scoped>
.avatar {
  width: 100%;
  height: 220px;
  padding: 10px;
}
.avatar img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
