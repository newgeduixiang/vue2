// 引入 axios
import Axios from 'axios';

// 创建新的 Axios
export let axios = Axios.create();

// 全局响应拦截
axios.interceptors.request.use(config => {
    // 登录时不携带token
    if (config.url === "/data/login") {
        return config;
    }

    // 其他请求在请求头内添加token
    config.headers.token = sessionStorage.token;
    return config;
})

// 全局请求拦截
axios.interceptors.response.use(config => {
    return config.data
})

export default { axios }