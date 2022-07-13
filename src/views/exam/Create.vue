<template>
    <div class="page-inner">
        <h1 class="page-title">{{pageTitle}}</h1>
        <el-form label-width="200px" :model="data" :rules="rules" ref="exam">
            <el-form-item prop="title" label="测试名称">
                <el-input v-model="data.title" placeholder="请输入测试名称"></el-input>
            </el-form-item>
            <el-form-item prop="address" label="测试地点">
                <el-input v-model="data.address" placeholder="请输入测试地点"></el-input>
            </el-form-item>
            <el-form-item prop="date" label="测试时间">
                <el-date-picker type="datetime" value-format="timestamp" v-model="data.date" placeholder="请输入测试时间"></el-date-picker>
            </el-form-item>
            <el-form-item prop="conetnt" label="测试要求">
                <quill-editor  v-model="data.content"></quill-editor>
            </el-form-item>
            <el-form-item>
                <button type="success" @click="submitData">提交</button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
// 引入校验文件
import {required} from '../../tools/tools';
// 校验对象
let rules = {};
// 根据校验字段生成
['title', 'address', 'date', 'content'].forEach(item => rules[item] = [{trigger: 'blur', validator: required}]);
export default {
    data() {
        return {
            // 表单数据对象
            data: {},
            // 表单校验规则
            rules,
            // 标题
            pageTitle: '创建测试',
            // 提交地址
            submitUrl: '/data/exam/create',
        }
    },

    // 方法
    methods: {
        // 处理数据
        dealData() {
            // 复制数据
            let copy = Object.assign({}, this.data);
            // 添加部门
            copy.department = this.$store.state.userinfo.department;
            // 返回处理结果
            return copy;
        },
        // 提交
        async submitData() {
            // 校验通过进入列表页
            this.$refs.exam.validate(async valid => {
                if(valid) {
                    let res = await this.$http.post(this.submitUrl, this.dealData());
                    if (res.errno === 0) {
                        // 进入列表页
                        this.$router.push('/exam/list/1')
                    } else {
                        this.$message.error(res.msg)
                    }
                }
            })
        }
    }
}
</script>