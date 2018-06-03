// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  /* Visit http://lbsyun.baidu.com/apiconsole/key for details about app key. */
  ak: 'r1wcfWyESMqqR4O2xIiR6jeK5i8HNisc'
});

// import VueSocketio from 'vue-socket.io-extended';
// import io from 'socket.io-client';

// Vue.use(VueSocketio, io('ws://47.100.201.36:8080'));

// import VueNativeSock from 'vue-native-websocket';
// Vue.use(VueNativeSock, 'ws://47.100.201.36:8080/sensorDataWebsocket/Chris755/1');

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  sockets: {
    connect() {
      console.log('socket connected')
    },
    customEmit(val) {
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    }
  },
  methods: {
    clickButton(val) {
      // this.$socket is `socket.io-client` instance
      this.$socket.emit('emit_method', val);
    }
  }
})
