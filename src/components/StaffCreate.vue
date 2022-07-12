<template>
    <!-- 内容：1.tabel-width    2.tabel    3.placeholder  -->
    <!-- 校验：1. v-model       2.:model   3.prop      4. rules-->
    <!-- 提交：1.事件绑定       2. ref     3.validte -->
    <div class="staff-create">
        <el-form label-width="200px" :model="data" :rules="rules" ref="staff">
        <el-form-item label="账号昵称" prop="username" :error="usernameError">
            <el-input placeholder="请输入员工账号昵称" v-model="data.username" @blur="checkUsername"></el-input>
        </el-form-item>
        <el-form-item label="账号密码" prop="password">
            <el-input placeholder="请输入员工账号密码" type="password" v-model="data.password"></el-input>
        </el-form-item>
        <el-form-item label="重复密码" prop="repeat">
            <el-input placeholder="请重复输入员工账号密码" type="password" v-model="data.repeat"></el-input>
        </el-form-item>
        <el-form-item label="员工姓名" prop="name">
            <el-input placeholder="请输入员工姓名" v-model="data.name"></el-input>
        </el-form-item>
        <el-form-item label="员工电话" prop="tel">
            <el-input placeholder="请输入员工电话" v-model="data.tel"></el-input>
        </el-form-item>
        <el-form-item label="所属部门" prop="department">
            <el-select v-model="data.department">
                <el-option v-for="item in $store.state.departments" :key="item._id" :label="item.title" :value="item.key"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="入职时间" prop="joinTime">
            <el-date-picker placeholder="请选择员工入职时间" v-model="data.joinTime" type="date" format="yyyy 年 MM 月 dd 日"></el-date-picker>
        </el-form-item>
        <el-form-item label="员工生日" prop="birthday">
            <el-date-picker placeholder="请选择员工生日" v-model="data.birthday"></el-date-picker>
        </el-form-item>
        <el-form-item label="上传头像" prop="avatar">
            <el-upload 
                action="/data/staff/upload"
                :show-file-list="false"
                :on-success="uploadSuccess"
                :on-error="uploadFail"
            >
                <el-button type="primary">上传</el-button>
                <span class="upload-tip" slot="tip">请选择头像图片</span>
            </el-upload>
            <img :src="data.avatar" v-if="data.avatar" class="upload-avatar">
        </el-form-item>
        <el-form-item label="员工性别" prop="sex">
            <el-radio v-model="data.sex" label="man">男</el-radio>
            <el-radio v-model="data.sex" label="woman">女</el-radio>
        </el-form-item>
        <!-- 根据权限显示 -->
        <el-form-item label="员工职位" prop="level" v-if="level === 1">
            <el-radio v-model="data.level" :label="1">总经理</el-radio>
            <el-radio v-model="data.level" :label="2">部门经理</el-radio>
            <el-radio v-model="data.level" :label="3">员工</el-radio>
        </el-form-item>
        <el-form-item>
            <el-button type="success" @click="submitData">提交</el-button>
        </el-form-item>
    </el-form>
    </div>
</template>

<script>
import { password, username, required, repeat, telephone } from '../tools/tools';

// 校验字段生成校验规则
let keys = ["name", "department", "joinTime", "birthday", "avatar", "sex", "level", "password", "username", "tel"];

// 校验规则
let rules = {};
// 遍历创建
keys.forEach(key => {
    // 默认必填
    let validator;
    // 特殊校验
    switch(key) {
        case 'username':
            validator = username;
            break;
        case 'password':
            validator = password;
            break;
        case 'tel':
            validator = telephone;
            break;
        default:
            validator = required;
    }
    // 校验
    rules[key] = [{ validator, trigger: 'blur' }]
});

export default {
    // 接收属性
    props: {
        // 
        data: {
            default() {
                return {}
            }
        },

        // 提交成功时的操作
        submitCallback: {
            default() {
                return () => {}
            }
        },

        // 提交地址
        submitUrl: {
            // 类型
            type: String,
            default: 'data/staff/create'
        }
    },

    // 静态数据
    data() {
        // 适配重复密码校验
        rules.repeat = [{
            trigger: 'blur',
            validator: (...args) => {
                repeat(this.data.password, '密码', ...args);
            }
        }]
        return {
            rules,
            usernameError: ''
        }
    },

    // 计算属性数据
    computed: {
        // 权限类型
        level() {
            return this.$store.state.userinfo.level;
        }
    },

    // 方法
    methods: {
        // 提交表单
        submitData() {
            // 提交校验
            this.$refs.staff.validate(async valid => {
                // 表单 && 用户未被注册时，提交权限数据
                if(valid && !this.usernameError) {
                    // console.log(this.data);
                    let res = await this.$http.post(this.submitUrl, this.dealData());
                    // 判断返回状态码是否创建成功
                    if(res.errno === 0) {
                        this.$message.success('添加成功');
                        // 执行成功的回调，跳转到列表页
                        this.submitCallback();
                    } else {
                        // 提示错误
                        this.$message.error(res.msg);
                    }
                }
            })
        },

        // 根据权限处理提交数据
        dealData() {
            // 复制数据，直接修改数据影响视图渲染
            let copy = Object.assign({}, this.data);
            // 删除重复密码
            delete copy.repeat;
            // 处理日期, 将日期转换为字符串返回后端处理，后端无法处理字符串日期
            // 生日
            copy.birthday = +new Date(copy.birthday);
            // 入职时间
            copy.joinTime = +new Date(copy.joinTime)
            // 筛选权限数据
            if(copy.level === 1) {
                // 总经理
                copy.departement = 'all';
            } else if(copy.level === 2) {
                // 部门经理
                copy.departement = this.$store.userinfo.departement;
                // 添加的员工职位为3 
                copy.level = 3;
            }
            return copy;
        },

        // 图片上传成功
        uploadSuccess(res) {
            this.$set(this.data, 'avatar', res.data)
        },
        // 图片上传失败
        uploadFail() {
            this.$message.error('上传失败')
        },
        // 校验用户名是否唯一
        async checkUsername() {
            let res = await this.$http.post('/data/staff/check/username', {username: this.data.username});
            if(res.errno !== 0) {
                this.usernameError = res.msg;
            }
        }   
    }
}
</script>