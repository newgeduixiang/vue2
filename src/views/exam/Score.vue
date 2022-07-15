<template>
<div class="page-inner page-exam-score">
    <h1 class="page-title">填写{{data.title}}测试结果</h1>
    <el-descriptions :column="4" title="基本信息">
        <el-descriptions-item label="测试名称">{{data.title}}</el-descriptions-item>
        <el-descriptions-item label="测试部门">{{department}}</el-descriptions-item>
        <el-descriptions-item label="测试日期">{{department}}</el-descriptions-item>
        <el-descriptions-item label="测试地点">{{data.address}}</el-descriptions-item>
    </el-descriptions>
    <!-- 分数详情 -->
    <el-descriptions :column="5" title="分数详情" border>
        <template #extra>
            <el-button size="small" type="success" @click="submitData">提交</el-button>
        </template>
        <el-descriptions-item v-for="item in data.list" :key="item._id" :label="item.name">
            <el-input placeholder="请输入员工测试分数" v-model="item.score"></el-input>
        </el-descriptions-item>
    </el-descriptions>
</div>
</template>

<script>
export default {
    data() {
        return {
            // 表格数据
            data: {}
        }
    },

    computed: {
        // 部门
        department() {
            let obj = this.$store.state.departments.find(item => item.key === this.data.department);
            return obj ? obj.title : '未知';
        },

        // 日期
        date() {
            return new Date(this.data.date).toLocaleString();
        }
    },

    // 页面创建完毕获取数据
    async created() {
        let { params } = this.$route;
        // 获取数据
        let res = await this.$http.get('/data/exam/score', {params});
        // 判断状态码
        if(res.errno === 0) {
            // 存储数据
            this.data =res.data;
        } else {
            // 错误时
            this.$message.error('找不到页面了，即将返回列表页')
            setTimeout(() => {
                this.$router.back();
            }, 800);
        }
    },

    // 提交
    methods: {
        async submitData() {
            let res = await this.$http.post('/data/exam/score/update', this.data);
            if(res.errno === 0) {
                this.$message.success('操作成功，即将跳转');
                setTimeout(() => {
                    this.$router.back();
                }, 800);
            } else {
                this.$message.error(res.msg);
            }
        }
    }
}
</script>

<style lang="scss">
.page-exam.score {
    .el-input {
        width: auto;
    }
    .el-descriptons {
        margin-bottom: 30px;
    }
}
</style>