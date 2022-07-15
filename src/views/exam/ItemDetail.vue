<template>
    <div class="page-inner page-exam-item-detail">
        <h1 class="page-title">“{{data.title}}”分数详情</h1>
        <el-descriptions border :column="2">
            <template #title="">
                <el-button size="small" @click="$router.push('/exam/item/score')" type="success">测试统计</el-button>
            </template> 
            <template #extra>
                <el-progress :percentage="+info.score || 0" :color="info.score < 60 ? '#F56C6C' : '#67C23A'" :format="dealScore"></el-progress>
            </template>
            <el-descriptions-item label="测试名称">{{data.title}}</el-descriptions-item>
            <el-descriptions-item label="测试部门">{{department}}</el-descriptions-item>
            <el-descriptions-item label="测试日期">{{date}}</el-descriptions-item>
            <el-descriptions-item label="测试地点">{{data.address}}</el-descriptions-item>
            <el-descriptions-item label="学生姓名">{{info.name}}</el-descriptions-item>
        </el-descriptions>
    </div>
</template>
<script>
export default {
    data() {
        return {
            // 描述列表数据
            data: {}
        }
    },

    computed: {
        // 分数
        info() {
            return this.data.score || {};
        },

        // 部门
        department() {
            let obj = this.$store.state.departments.find(item => item.key === this.data.department);
            return obj ? obj.title : '未知';
        },

        // 时间
        date() {
            return new Date(this.data.date).toLocaleString();
        }
    },

    methods: {
        // 分数处理
        dealScore(e) {
            if(e === 100) {
                return "满分"
            }
            return e + '分';
        }
    },

    // 创建完毕获取数控
    async created() {
        let { params } = this.$route;
        // 添加用户名
        params.username = this.$store.state.userinfo.username;
        // 发送请求
        let res = await this.$http.get('/data/exam/item/detail', {params});
        // 判断请求码
        if(res.errno === 0) {
            // 存储数据
            this.data = res.data;
        } else {
            // 提示错误
            this.$message.error('请求失败，即将返回');
            setTimeout(() => {
                this.$router.back();
            }, 800);
        }
    }
}
</script>

<style lang="scss">
.page-exam-item-detail {
    .el-descriptions__extra {
        width: 50%;
    }
}
</style>