<template>
<div class="page-inner">
    <h1 class="page-title">测试列表</h1>
    <el-table border steipe :data="list">
        <el-table-column label="序号" width="200" type="index" align="center"></el-table-column>
        <el-table-column label="测试名称" prop="title"></el-table-column>
        <el-table-column label="测试部门" prop="department" :formatter="dealDepartment"></el-table-column>
        <el-table-column label="测试地点" prop="address"></el-table-column>
        <el-table-column label="发布日期" prop="date" :formatter="dealDate"></el-table-column>
        <el-table-column label="操作" width="300" align="center">
            <!-- 权限处理 -->
            <template #default="item">
                <template v-if="level === 1">
                    <el-button size="mini" type="primary" @click="$router.push('/exam/statistics/' + item.row._id)">统计</el-button>
                </template>
                <template v-else-if="level === 2">
                    <el-button size="mini" type="success" @click="$router.push('/exam/score/' + item.row._id)">上分</el-button>
                    <el-button size="mini" type="primary" @click="$router.push('/exam/statistics/' + item.row._id)">统计</el-button>
                    <el-button size="mini" type="primary" @click="$router.push('/exam/edit/' + item.row._id)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="deleteItem(item.row)">删除</el-button>
                </template>
                <template v-else-if="level === 3">
                    <el-button size="mini" type="success" @click="$router.push('/exam/item/detail/:id' + item.row._id)">分数详情</el-button>
                </template>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination 
        background
        layout="prev, pager, next, sizes"
        :current-page="+$route.params.page"
        :page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="total"
        @size-change="sizeChange"
        @current-change="pageChange"
    ></el-pagination>
</div>
</template>
<script>
export default {
    data() {
        return {
            // 每页显示条数
            pageSize: 10,
            // 总数
            total: 0,
            // 表格数据
            list: []
        }
    },
    
    // 计算属性数据
    computed: {
        // 权限参数
        level() {
            return this.$store.state.userinfo.level;
        }
    },

    // 方法
    methods: {

        // 获取数据的方法
        async getData() {
            // 传递页码，每页显示数量，部门
            let { params } = this.$route;
            // 每页显示数量
            params.pageSize = this.pageSize;
            // 部门
            params.department = this.$store.state.userinfo.department;
            // 请求数据
            let res = await this.$http.get('/data/exam/list', { params });
            // 判断请求码
            if(res.errno === 0) {
                // 存储数据
                this.list = res.data;
                // 存储员工信息总数
                this.total = res.total;
            } else {
                this.$message.error(res.msg);
            }
        },

        /****页面显示数据处理****/
        // 部门
        dealDepartment(row, col, value) {
            let obj = this.$store.state.departments.find(item => item.key === value);
            return obj ? obj.title : '未知';
        },
        // 日期
        dealDate(row, col, value) {
            return new Date(value).toLocaleString();
        },

        /****分页器方法****/
        // 点击切换路由
        pageChange(e) {
            this.$router.push('/exam/list/' + e);
        },
        // 修改页面显示的条数
        sizeChange(e) {
            this.pageSize = e;
        },

        // 删除测试
        async deleteItem(row) {
            // 打开确认框
            // await 只能接收成功promise, catch方法捕获失败
            let result = await this.$confirm(
                `您确认删除“${row.title}”测试么`,
                '温馨提示'
            ).catch(() => this.$message.danger('取消成功！'));
            // 判断结果
            if(result === 'confirm') {
                // 点击确定时发送请求
                let res = await this.$http.post('/data/exam/delete/', {id: row._id});
                // 判断状态码
                if (res.errno === 0) {
                    this.$message.success('操作成功,即将刷新页面')
                    setTimeout(() => {
                        this.$router.go(0)
                    }, 800)
                } else {
                    this.$message.error(res.msg);
                }
            }
        }
    },

    // 监听器
    watch: {
        $route() {
            // 路由改变，请求数据
            this.getData();
        }
    },

    // 创建完毕获取数据
    created() {
        this.getData();
    }
}
</script>