<template>
    <div class="page-inner">
        <h1 class="page-title">员工列表</h1>
        <!-- 表格列表 -->
        <el-table :data="data" border stripe size="mini">
            <el-table-column label="序号" type="index" width="100" align="center"></el-table-column>
            <el-table-column label="姓名" prop="name"></el-table-column>
            <el-table-column label="所属部门" prop="department" :formatter="dealDepartment"></el-table-column>
            <el-table-column label="昵称" prop="username"></el-table-column>
            <el-table-column label="电话" prop="tel"></el-table-column>
            <el-table-column label="入职日期" prop="joinTime" :formatter="dealDate"></el-table-column>
            <el-table-column label="工龄" prop="joinTime" :formatter="dealWork"></el-table-column>
            <el-table-column label="生日" prop="birthday" :formatter="dealDate"></el-table-column>
            <el-table-column label="年龄" prop="birthday" :formatter="dealAge"></el-table-column>
            <el-table-column label="性别" prop="sex" :formatter="dealSex"></el-table-column>
            <el-table-column label="职位" prop="level" :formatter="dealLevel"></el-table-column>
            <el-table-column label="操作" width="200" align="center" v-if="$store.state.userinfo.level !== 3">
                <template slot-scope="item">
                    <!-- 操作按钮 -->
                    <el-button size="mini" type="primary" @click="editItem(item.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="deleteItem(item.row._id, item.row.name)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
            back-ground
            layout="prev, pager, next, sizes"
            :total="total"
            :current-page="+$route.params.page"
            :page-size="pageSize"
            :page-sizes="[10, 20, 50, 100]"
            @size-change="sizeChange"
            @current-change="pageChange"
        ></el-pagination>
        <!-- 模态框(!! 布尔值语法糖) -->
        <el-dialog :visible="!!staffData._id" title="编辑员工信息" @close="closeDialog"> 
            <staff-create
                :data="staffData"
                submitUrl="/data/staff/update"
                :submitCallback="closeDialog"
            ></staff-create>
        </el-dialog>
    </div>
</template>

<script>
// 引入组件
import StaffCreate from '../../components/StaffCreate.vue';
export default {
    name: 'staffList',
    components: { StaffCreate },
    data() {
        return {
            // 每页显示员工条数
            pageSize: 10,
            // 列表数据
            data: [],
            // 列表数据数量
            total: 0,
            // 员工信息
            staffData: {}

        };
    },

    mounted() {
        
    },

    watch: {
        // 路由改获取数据
        $route() {
            this.getData();
        }
    },

    created() {
        // 创建完毕获取数据
        this.getData();
    },

    methods: {
        /***********获取数据的方法*************/ 
        async getData() {
            // 解构动态路由参数
            let { params } = this.$route;
            // 发送请求，传递页码，每页显示个数，部门信息
            // 添加部门信息
            params.department = this.$store.state.userinfo.department;
            // 添加每页显示个数
            params.pageSize = this.pageSize;
            // 发送获取数据
            let res = await this.$http.get('/data/staff/list', {params});
            // 判断响应码
            if(res.errno === 0) {
                // 存储数据
                this.data = res.data;
                // 存储总数
                this.total = res.total;
            } else {
                // 提示错误
                this.$message.error(res.msg);
            }
        },

        /***********处理显示数据*************/
        // 部门
        dealDepartment(row, col, value) {
            // console.log(arguments); // [row， col, value]
            let obj = this.$store.state.departments.find(item => item.key === value);
            return obj ? obj.title : '未知';
        },
        // 日期
        dealDate(row, col, value) {
            return new Date(value).toLocaleDateString();
        },
        // 工龄
        dealWork(row, col, value) {
            return new Date().getFullYear() - new Date(value).getFullYear() + 1;
        },
        // 年龄
        dealAge(row, col, value) {
            return new Date().getFullYear() - new Date(value).getFullYear();
        },
        // 性别
        dealSex(row, col, value) {
            return value === 'man' ? '男' : '女';
        },
        // // 职位
        dealLevel(row, col, value) {
            switch(value) {
                case 1:
                    return '总经理';
                case 2:
                    return '部门经理';
                default:
                    return '普通员工';
            }
        },

        /***********操作员工列表*************/
        // 关闭模态框
        closeDialog() {
            // 清空数据
            this.staffData = {};
        },

        // 编辑员工信息
        editItem(data) {
            // console.log(data);
            this.staffData = data;
        },

        // 删除员工信息
        async deleteItem(id, name) {
            // await 只能接收成功的promise
            let result = await this.$confirm(
                `您确定删除“${name}”的信息么？`,
                '温馨提示'
            ).catch(() => this.$message.warning('取消成功'))
            
            // 判断时确定还是取消
            if(result === 'confirm') {
                // 删除信息
                let res = await this.$http.post('/data/staff/delete', {id});

                // 判断状态码
                if(res.errno === 0) {
                    this.$message.success('操作成功，3秒之后刷新页面');
                    // 定时3000 刷新
                    setTimeout(() => {
                        // 刷新页面
                        this.$router.go(0);
                    }, 3000)
                }
            }
        },

        /***********分页器*************/
        // 页面显示的个数
        sizeChange(e) {
            // console.log(e);
            this.pageSize = e;
        },
        // 页面切换（当前|| 上一页 || 下一页）
        pageChange(e) {
            // console.log(e);
            if(e === this.$route.params.page) {
                return 
            }
            this.$router.push('/staff/list/' + e)
        }
    },
};
</script>

<style lang="scss">

</style>