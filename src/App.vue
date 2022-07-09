<template>
<!-- 该根源会替换页面容器，要让其于容器元素保持一致 -->
    <div id="app">
        <!-- 根据soter 数据判断首页还是登录页面 -->
        <!-- 首页 -->
        <router-view v-if="$store.state.userinfo.username"></router-view>
        <!-- 登录页面 -->
        <login v-else></login>
    </div>
</template>

<script>
// 引入组件
import Login from './views/Login.vue';

export default {
    // 注册组件
    components: { Login },

    // 页面创建完毕
    created() {
        // 获取用户信息
        // this.$store.dispatch('userinfo');
    }
}

</script>

<style>

</style>


