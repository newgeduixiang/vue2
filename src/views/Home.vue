<template>
    <!-- menu 模块 -->
    <el-container class="page-home">
        <el-aside width="200px">
            <el-menu background-color="#545c64" text-color="#fff" :router="true">
                <router-link tag="h2" to="/">员工管理培训系统</router-link>
                <el-submenu v-for="item in menu" :key="item.link" :index="item.link">
                    <template #title>
                        <i :class="'el-icon-s-' + item.icon"></i>
                        <span>{{item.title}}</span>
                        </template>
                    <el-menu-item min-width="0" v-for="childItem in item.children" :key="childItem.link" :index="item.link + '/' + childItem.link">{{childItem.title}}</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-container>

            <!-- 头部 -->
            <el-header>
                <!-- 左侧-面包屑 -->
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item v-for="(item, index) in list" :key="index">{{item}}</el-breadcrumb-item>
                </el-breadcrumb>
                <!-- 右侧 -->
                <!-- 彩色文字 -->
                <router-link class="header-link color-blue" to="/">我的首页</router-link>
                <router-link class="header-link" to="/staff/list/1">我的同事</router-link>
                <router-link class="header-link color-red" to="/exam/list/1">测试列表</router-link>
                <router-link class="header-link color-blue" to="/user/info">个人中心</router-link>
                <el-dropdown @command="commandChangePage">
                    <!-- 头像 -->
                    <el-avatar :src="userinfo.avatar" shape="square"></el-avatar>
                    <span class="el-dropdown-link">
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>{{userinfo.name}}</el-dropdown-item>
                        <el-dropdown-item command="/user/avatar">修改头像</el-dropdown-item>
                        <el-dropdown-item command="/user/info">个人中心</el-dropdown-item>
                        <el-dropdown-item command="/user/password">账号设置</el-dropdown-item>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-main>
                <!-- 页面显示区域 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
export default {
    // 静态数据
    deta() {
        return {
            menu: []
        }
    },

    // 计算属性数据
    computed: {
        // 用户数据信息
        userinfo() {
            return this.$store.state.userinfo
        },
        // // 面包屑层级数据切割
        list() {
            return this.$route.name.split(',')
        },
    },

    methods: {
        // 头像弹层跳转
        commandChangePage(e) {
            // 判断给是否是退出路由地址
            if(e) {
                // 退出时
                if(e === 'loghout') {
                    location.href = '/admin/logout'
                } else {
                    // 切换路由
                    this.$router.push(e);
                }
            }
    }
    },

    // 页面创建根据权限返回数据
    created() {
        switch(this.userinfo.level) {
            // 超级管理员
            case 1:
                this.menu = [
                    {
                        title: "员工管理",
                        link: '/staff',
                        icon: 'custom',
                        children: [
                            {title: '添加员工', link: 'create'},
                            {title: '员工列表', link: 'list/1'},
                        ]
                    },
                    {
                        title: '部门管理',
                        link: '/department',
                        icon: 'cooperation',
                        children: [
                            {title: '添加部门', link: 'create'},
                            {title: '部门列表', link: 'list'},
                        ]
                    },
                    { 
                        title: '测试管理', 
                        link: '/exam',
                        icon: 'order',
                        children: [
                            { title: '测试列表', link: 'list/1' },
                        ] 
                    }
                ]
                break;
            // 部门经理
            case 2:
                this.menu = [
                    { 
                        title: '员工管理', 
                        link: '/staff',
                        icon: 'custom',
                        children: [
                            { title: '添加员工', link: 'create' },
                            { title: '员工列表', link: 'list/1' },
                        ] 
                    },
                    { 
                        title: '测试管理', 
                        link: '/exam',
                        icon: 'order',
                        children: [
                            { title: '添加测试', link: 'create' },
                            { title: '测试列表', link: 'list/1' },
                        ] 
                    }
                ]
                break;
            // 员工
            case 3:
                this.menu = [
                    { 
                        title: '我的管理', 
                        link: '',
                        children: [
                            { title: '员工列表', link: 'staff/list/1' },
                            { title: '测试列表', link: 'exam/list/1' },
                        ] 
                    }
                ]
                break;
        }
    }
}
</script>
<style lang="scss">
.page-home {
    height: 100%;
    .el-aside {
        background-color: #545c64;
        color: #fff;
        h2 {
            font-weight: normal;    
            text-align: center;
            font-size: 20px;
        }
    }
    .el-header {
        background-color: #fff;
        display: flex;
        align-items: center;
        .el-breadcrumb {
            flex: 1;
        }
        .header-link {
            margin-right: 20px;
            font-size: 14px;
            color: #333;
            text-decoration: none;
            &.color-red {
                color: #F56C6C;
            }
            &.color-blue {
                color: #409EFF;
            }
        }
        .el-dropdown {
            margin-left: 50px;
            margin-right: 20px;
        }
    }
    .el-main {
        margin-top: 15px;
        margin-left: 15px;
        padding: 0;
    }
    .page-inner {
        background-color: #fff;
        padding: 20px;
    }

    // 所有页面title
    .page-title {
        margin: 0 10px 30px;
        border-bottom: 1px solid #ccc;
        font-size: 24px;
        padding: 10px;
        font-weight: normal;
    }

    // input 
    .el-input{
        width: 40%;
    }

    // 下拉框
    .el-select {
        width: 40%;
        .el-input {
            width: 100%;
        }
    }
    .el-date-editor {
        width: 40%!important;
    }
    .upload-tip {
        margin-left: 10px;
        color: #666;
    }
    // 头像
    .upload-avatar {
        margin-top: 10px;
        max-height: 100px;
    }
    .el-pagination {
        margin-top: 30px;
    }
    // 文本域
    .el-textarea {
        width: 40%;
    }
}
</style>