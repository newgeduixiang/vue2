<template>
    <div class="page-login" :style="{ backgroundImage: 'url(/static/img/bg/' + num + '.jpg)' }">
        <div class="inner">
            <h2>登录员工管理系统</h2>
                <!-- 一、设置样式： 1. 提示文案 placeholder  2. label 标签文本() 3. label-width 表单域标签的的宽度（标签左侧留白宽度） -->
                <!-- 二、输入校验： 1. 数据双向绑定 2. model 表单数据对象  3. prop -->
                <!-- 三、提交校验   1. 绑定提交事件 2. 设置ref 获取表单域数据 3. validate校验  -->
            <el-form label-position="left" :model="data" :rules="rules" ref="login">
                <el-form-item  prop="username">
                        <el-input 
                        prefix-icon="el-icon-user"
                        placeholder="请输入用户名"
                        v-model="data.username"
                        ></el-input>
                    </el-form-item>
                    <el-form-item  prop="password">
                        <el-input
                        show-password
                        prefix-icon="el-icon-lock"
                        type="password"
                        placeholder="请输入密码"
                        v-model="data.password"
                        ></el-input>
                    </el-form-item>
                    <el-button type="success" @click="submitData">登录</el-button>    
            </el-form>
        </div>
    </div>
</template>

<script>
// 引入校验验规则工具
import {username, password} from '../tools/tools';

export default {
    data() {
        return {
            num: parseInt(Math.random() * 3 + 1),
            // 表单数据对象
            data: {
                username: '',
                password: ''
            },
            // 校验规制
            // 必填， 失去焦点校验， 校验函数
            rules: {
                username: [{ required: true, tirgger: 'blur', validator: username }],
                password: [{ required: true, trigger: 'blur', validator: password }]
            },
        }
    },

     // 方法
    methods: {
        // 提交的方法
        submitData() {
            // console.log(this.$refs.login);
            // 提交校验
            // 该方法校验返回布尔值，如校验规则全部通过则返回true，反则有一项不通过位false
            this.$refs.login.validate(valid => {
                if(valid) {
                    // 发送异步消息
                    this.$store.dispatch('login', this.data);
                }
            })
        }
    }   
}
</script>

<style lang="scss">
.page-login {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .inner {
        width: 300px;
        padding: 20px;
        border-radius: 10px;
        background: rgba(30, 30, 30, 0.6);
        h2 {
            font-weight: normal;
            text-align: center;
            color: #fff;
        }
        .el-button {
            display: block;
            width: 100%;
        }
    }
}
</style>