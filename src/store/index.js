import Vue from 'vue'
import Vuex from 'vuex'
import { Message } from "element-ui";
import { axios } from '../tools/plugin';
import { addRoutes } from '../router';

Vue.use(Vuex)

export default new Vuex.Store({
    // 数据
    state: {
        // 用户信息
        userinfo: {},
        // 部门列表信息
        departments: [],
        // 首页数据
        main: []
    },

    // 同步消息
    mutations: {
        userinfo(state, info) {
            // 存储用户数据
            state.userinfo = info.userinfo;
            // 存储部门信息
            state.departments = info.departments;
            // 存储首页数据
            state.main = info.main;
            // 设置权限路由
            addRoutes(info.userinfo.level);
        }
    },

    // 异步消息
    actions: {
        // 登录页面
        async login(store, res) {
            // console.log(res.username, res.password);
            // 发送请求提交 用户信息
            let data = await axios.post('/data/login', res)

            // 判断响应码是否成功
            if (data.errno === 0) {
                // 成功时
                // 存储token
                sessionStorage.token = data.data.token;

                // 发送同步消息存储数据
                store.commit('userinfo', data.data);
            } else {
                // 失败时
                // 提示错误信息
                Message({
                    type: 'error',
                    // 错误提示
                    message: data.msg
                })
            }
        },

        // 首页
        async userinfo(store) {
            // 请求用户数据
            let data = await axios.get('/data/userinfo');
            // 判断返回状态码
            if (data.errno === 0) {
                // 存储数据
                store.commit('userinfo', data.data);
            }
        }
    }
})
