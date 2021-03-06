import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/commonSass/common.css'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import 'lib-flexible/flexible.js'
Vue.config.productionTip = false

import '@/permission'

import JsEncrypt from 'jsencrypt'
Vue.prototype.$jsEncrypt = JsEncrypt

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
