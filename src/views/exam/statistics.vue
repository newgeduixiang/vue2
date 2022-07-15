<template>
<div class="page-inner">
    <h1 class="page-title">测试统计</h1>
    <el-descriptions title="基本信息" :column="4">
        <template #extra>
            <el-button type="primary" @click="option.series[0].type = 'line'">折线图</el-button>
            <el-button type="primary" @click="option.series[0].type = 'bar'">柱状图</el-button>
            <el-button type="primary" @click="option.series[0].type = 'scatter'">散点图</el-button>
        </template>
        <el-descriptions-item label="测试名称">{{data.title}}</el-descriptions-item>
        <el-descriptions-item label="测试部门">{{department}}</el-descriptions-item>
        <el-descriptions-item label="测试日期">{{date}}</el-descriptions-item>
        <el-descriptions-item label="测试地点">{{data.address}}</el-descriptions-item>
    </el-descriptions>
    <!-- option 传递数据 -->
    <v-echarts :option="option" styly="height: 600px"></v-echarts>
</div>
</template>
<script>
export default {
    data() {
        return {
            // 描述列表数据
            data: {},

            // 图表数据
            option: {
                // 绘制图表的配置
                tooltip: {
                    show: true,
                    axisPoninter: {
                        type: 'cross'
                    }
                },
                // 横轴
                xAxis: {
                    name: '姓名',
                    // 横轴数据
                    data: []
                },
                // 纵轴
                yAxis: {
                    name: '分数'
                },
                // 纵轴数据
                series: []
            }
        }
    },

    computed: { 
        // 部门
        department() {
            let obj = this.$store.state.departments.find(item => item.key === this.data.department);
            return obj ? obj.title : '';
        },
        
        // 时间
        date() {
            return new Date(this.data.date).toLocaleString()
        }
    },

    async created() {
        let { params }  = this.$route;
        // 获取数据
        let res = await this.$http.get('data/exam/score', {params});
        // 判断状态码
        if(res.errno === 0) {
            // 存储数据
            this.data = res.data;
            // 横轴数据
            this.option.xAxis.data = res.data.list.map(item => item.name);
            // 处理数据
            this.option.series.push({
                // 图表显示类型
                type: 'line',
                // 平滑的曲线
                smooth: true,
                data: res.data.list.map(item => +item.score)
            })
        } else {
            // 出现错误
            this.$message.error('请求失败，即将返回');
            this.$router.back();
        }
    }
}
</script>