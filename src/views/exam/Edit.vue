<script>
// 引入创建页面
import Create from './Create.vue';
export default {
    // 页面类似使用混合技术
    mixins: [Create, {
        // 重写数据
        data() {
            return {
                // 标题
                pageTitle: '编辑测试',
                // 重写也提交地址
                submitUrl: '/data/exam/update'
            }
        }
    }],

    // 页面创建完毕请求数据
    async created() {
        // 传递测试ID
        let { params } = this.$route;
        // 请求数据
        let res = await this.$http.get('/data/exam/detail', { params })
        // 请求成功存储数据
        if(res.errno === 0) {
            this.data = res.data;
        } else {
            // 失败时，提示错误信息并返回上一个页面
            this.$message.error(res.msg);
            // 返回上一个页面
            setTimeout(() => {
                this.$router.back();
            }, 800);
        }
    }   
}
</script>