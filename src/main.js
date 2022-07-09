import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import pligin from './tools/plugin';


Vue.config.productionTip = false

// 安装自定义插件
Vue.use(pligin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
