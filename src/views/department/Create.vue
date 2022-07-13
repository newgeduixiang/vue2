<template>
<div class="page-inner">
    <h1 class="page-title">创建测试</h1>
    <!-- 提示       1.label     2.label-width   3.placeholder -->
    <!-- 输入内容   1. v-model  2.model     3.prop  4.rules -->
    <!-- 校验       1. 事件绑定 2.ref       2.validate -->
    <el-form label-width="200px" :model="data" :rules="rules" ref="department">
        <el-form-item label="部门标题" prop="title">
            <el-input placeholder="请输入部门标题" v-model="data.title"></el-input>
        </el-form-item>
        <el-form-item label="部门ID" prop="key">
            <el-input placeholder="请输入部门ID，存储后无法改变" v-model="data.key"></el-input>
        </el-form-item>
        <el-form-item label="部门介绍" prop="intro">
            <el-input placeholder="请输入部门介绍" type="textarea" v-model="data.intro"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="success" @click="submitData">提交</el-button>
            <el-button type="danger" @click="resetData">重置</el-button>
        </el-form-item>
    </el-form>
</div>
</template>
<script>
// 引入校验文件
import {required} from '../../tools/tools';
// 校验对象
let rules = {};
// 定义校验规则: 必填失去焦点校验。
['key', 'title', 'intro'].forEach(item => rules[item] = [{trigger: 'blur', validator: required}]);
export default {
    // 静态属性数据
    data() {
        return {
            // 表单数据对象
            data: {},
            // 表单校验规则
            rules,
        }
    },

    // 方法
    methods: {
        // 提交数据
        submitData() {
            this.$refs.department.validate(async valid => {
                // 表单合法时，发送请求提交数据
                if(valid) {
                    // 发送请求提交数据
                    let res = await this.$http.post('/data/department/create', this.data);
                    // 判断是否请求成功
                    if(res.errno === 0) {
                        // 成功提示并进入列表
                        this.$message.success('操作成功！');
                        this.$router.push('/department/list');
                    } else {
                        // 提示错误
                        this.$message.error(res.msg);
                    }
                }
            })
        },

        // 重置数据
        resetData() {
            // console.log(this.$refs.department);
            // 重置内容的方法
            this.$refs.department.resetFields();
        }
    }
}
</script>