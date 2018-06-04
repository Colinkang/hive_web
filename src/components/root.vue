<template>
<div class="hello">
  <div class="hello" v-if="isLogin">
    <el-container>
      <el-header>
        <h-header  @logout="logout"></h-header>
      </el-header>
      <el-container>
        <el-aside>
          <n-nav></n-nav>
        </el-aside>
        <el-main>
          <c-content>

          </c-content>
        </el-main>
      </el-container>
    </el-container>
  </div>
  <div class="login-page" v-else>
    <login-page @login-success="loginSuccess"></login-page>
  </div>
</div>
</template>
<script>
import HHeader from '../components/header/index.vue';
import CContent from '../components/content/index';
import NNav from '../components/nav/index';
import FFooter from '../components/footer/index';
import LoginPage from './LoginPage/index.vue';
import {
  IS_LOGIN
} from '../common/localStorageKey';
import LocalStore from '../common/localStore';
import {
  post
} from '../common/post';
export default {
  name: 'HelloWorld',
  components: {
    HHeader,
    NNav,
    CContent,
    FFooter,
    LoginPage
  },
  data() {
    return {
      collapse: false,
      isLogin:false
    }
  },
  methods: {
    loginSuccess(){
      this.isLogin=true;
    },
    logout(){
      this.isLogin=false;
    }
  },
  mounted() {
    console.log(444)
    //检查登录状态
    // let result = post('/manager/token');
    // result.then((res) => {
    //   if (res.data.code === '1004') {
    //     this.isLogin = false
    //   } else {
    //     this.isLogin=true
    //   }
    // })
    let isLogin = LocalStore.getItem(IS_LOGIN)
    this.isLogin=isLogin
  }
}
</script>
<style >
.hello {
  width: 100%;
  height: 100%;
}

.el-header {
  padding: 0;
  background: rgb(55, 55, 55)
}

.el-aside {
  width: auto !important;
}

.el-aside {
  overflow: visible;
  min-height: 900px;
  background-color: #404040;
}

.el-menu {
  border: 1px solid #404040;
  background: #3f3b3a !important
}
.login-page{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  background: white;
  color: black;
}
.img-upload-row .el-upload__input{
  opacity: 0 !important;
  position: absolute;
}

.mianbao{
  position: relative;
  text-align: left;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid #eee;
  text-indent: 10px;
  margin-bottom: 10px;
  padding-bottom: 5px;
}
.el-main{
  width: 100%;
  height: 100%;
  overflow: hidden;
  border:5px solid rgb(255, 167, 39)
}
.el-container{
  height: 100%;
}
.el-menu-item{
  background: #3f3b3a !important
}
</style>
