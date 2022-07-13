import Axios from 'axios';
// 引入ElementUI
import ElementUI from 'element-ui';
// 引入样式
import 'element-ui/lib/theme-chalk/index.css'

// 引入富文本 Quill
import VueQuillEditor from "vue-quill-editor";
// 引入富文本编辑器样式
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';


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
        // 安装富文本
        Vue.use(VueQuillEditor);
    }
}

