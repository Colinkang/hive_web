<template>
<div class="hello">
  <div class="hello" v-if="isLogin">
    <el-container>
      <el-header>
        <h-header @logout="logout"></h-header>
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
let timer;
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
  get
} from '../common/post';
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
      isLogin: false
    }
  },
  methods: {
    loginSuccess() {
      this.isLogin = true;
    },
    logout() {
      this.isLogin = false;
    },
    checkedLoginStill(){
      let result = get('/checkTokenExpiration', {})
      result.then((res) => {
        if (res.data.responseCode==='000000') {
          console.log(res.data.responseCode)
          this.isLogin = true;
          timer =setTimeout(()=>{
            this.checkedLoginStill()
          },5000)
        } else {
          this.isLogin = false
          LocalStore.setItem(IS_LOGIN,false)
          LocalStore.setItem(HIVE_API_TOKEN,'')
          this.$router.push({
            path: '/'
          })
        }
      })
    }
  },
  mounted() {
    this.checkedLoginStill()
  },
  beforeDestroy() {
    //do something before destroying vue instance
    clearInterval(timer)
  }
}
</script>
<style >
.hello {
  width: 100%;
  height: 100%;
}

.el-header {
  padding: 0 !important;
  background: rgb(55, 55, 55)
}

.el-aside {
  width: auto !important;

}

.el-aside {
  overflow: hidden!important;
  min-height: 900px;
  background-color: #3f3b3a;
}

.el-menu {
  border: none !important;
  background: #3f3b3a !important
}

.login-page {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  background: white;
  color: black;
}

.img-upload-row .el-upload__input {
  opacity: 0 !important;
  position: absolute;
}

.mianbao {
  position: relative;
  text-align: left;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid #eee;
  text-indent: 10px;
  margin-bottom: 10px;
  padding-bottom: 5px;
}

.el-main {
  width: 100%;
  min-height: 920px;
  overflow: hidden !important;
  border: 5px solid rgb(255, 167, 39)
}

.el-container {
  height: 100%;
}

.el-menu-item {
  background: #3f3b3a !important
}
</style>
