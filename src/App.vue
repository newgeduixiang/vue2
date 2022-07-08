<template>
<!-- 该根源会替换页面容器，要让其于容器元素保持一致 -->
    <div id="app">
        <!-- 根据soter 数据判断首页还是登录页面 -->
        <!-- 登录页面 -->
        <login></login>
    </div>
</template>

<script>
// 引入组件
import Login from './views/Login.vue';

export default {
    // 注册组件
    components: { Login },

    // 
}

</script>

<style>

</style>


