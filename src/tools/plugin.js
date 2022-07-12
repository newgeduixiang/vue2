import Axios from 'axios';

import ElementUI from 'element-ui';
// 引入样式
import 'element-ui/lib/theme-chalk/index.css'


// 创建新的axios
export let axios = Axios.create();
// 请求拦截器
axios.interceptors.request.use(config => {
    // 登录请求不需要携带token
    if (config.url === '/data/login') {
        return config;
    }
    // token可以添加到query上，也可以添加到headers上
    config.headers.token = sessionStorage.token
    return config;
})
// 响应拦截器
axios.interceptors.response.use(config => {
    return config.data;
})

export default {
    install(Vue) {
        // 安装
        Vue.use(ElementUI)
        // 安装axios
        Vue.prototype.$http = axios;
    }
}

