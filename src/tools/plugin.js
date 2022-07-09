// 引入 ElemenUI 库
import ElementUI from 'element-ui';
// 引入样式
import 'element-ui/lib/theme-chalk/index.css';
// 引入 封装的 axiox
import request from './request';


// 暴漏数据
export default {
    // 插件为包含 install 方法的对象或函数；参数是vue 实例对象
    install(Vue) {
        // 安装 Element
        Vue.use(ElementUI);
        // 安装拦截器
        Vue.prototype.$http = request;
    }
}
