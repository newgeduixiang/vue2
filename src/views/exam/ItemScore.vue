<template>
    <div class="page-inner">
        <h1 class="page-title">“{{$store.state.userinfo.name}}”测试分数统计结果</h1>
        <el-button type="primary" size="small" @click="option.series[0].type = 'line'">折线图</el-button>
        <el-button type="primary" size="small" @click="option.series[0].type = 'bar'">柱状图</el-button>
        <el-button type="primary" size="small" @click="option.series[0].type = 'scatter'">散点图</el-button>
        <v-echarts :option="option" style="height: 600px"></v-echarts>
    </div>
</template>
<script>
export default {
    data() {
        return {
            // 描述数据
            data: {},
            
            // 图表数据
            option: {
                // 图例
                tooltip: {
                    show: true,
                    axisPointer: {
                        type: 'cross'
                    },
                    formatter({ data }) {
                        return `
                            <span style="color: ${data.score < 60 ? '#F56C6C' : '#67C23A'}; font-size: 30px;">${data.score}分</span><br />
                            <span>${data.title}</span><br />
                            <span>${new Date(data.date).toLocaleString()}</span><br />
                            <span>${data.address}</span>
                        `
                    }
                },
                // 横坐标
                xAxis: {
                    name: '测试',
                    data: []
                },
                // 纵坐标
                yAxis: {
                    name: '分数'
                },
                // 数据列
                series: []
            }
        }
    },

    // 创建文完毕请求数据
    async created() {
        // 请求传递部门信息、姓名
        let res = await this.$http.get('/data/exam/item/score', {params: {
            username: this.$store.state.userinfo.username,
            department: this.$store.state.userinfo.department
        }});
        // 判断响应状态码
        if(res.errno === 0) {
            // 存储数据
            this.data = res.data;
            // 横数据
            this.option.xAxis.data = res.data.map(item => item.title);
            // 数据量
            this.option.series.push({
                type: 'line',
                smooth: true,
                data: res.data.map(item => {
                    item.value = +item.score;
                    return item;
                })
            })
        }
    }
}
</script>