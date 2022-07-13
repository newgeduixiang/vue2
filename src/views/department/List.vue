<template>
<div class="page-inner page-department-list">
    <h1 class="page-title">部门列表</h1>
    <el-table :data="list" border="" stripe="">
        <el-table-column label="序号" type="index" width="100" align="center"></el-table-column>
        <el-table-column label="部门名称" width="200">
            <!-- 编辑部门名称 -->
            <template #default="item">
                <el-input v-if="item.row.edit" v-model="item.row.title"></el-input>
                <span v-else>{{item.row.title}}</span>
            </template>
        </el-table-column>
        <el-table-column label="部门ID" width="200" prop="key" align="center"></el-table-column>
        <el-table-column label="部门介绍">
            <template #default="item">
                <el-input v-if="item.row.edit" v-model="item.row.intro"></el-input>
                <span v-else>{{item.row.intro}}</span>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="300" align="center">
            <template #default="item">
                <el-button type="success" size="mini" v-if="item.row.edit" @click="updateItem(item.row)">提交</el-button>
                <el-button type="primary" size="mini" v-else @click="editItem(item.row)">编辑</el-button>
                <el-button type="danger" size="mini" @click="deleteItem(item.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</div>
</template>
<script>
export default {
    data() {
        return {
            // 表格数据对象
            list: [],
        }
    },
    
    // 方法
    methods: {
        // 提交
        async updateItem(row) {
            // console.log(row);
            // 删除不必要的提交数据
            delete row.edit;
            // 提交数据
            let res = await this.$http.post('/data/department/update', row);
            // 判断请求状态
            if(res.errno === 0) {
                this.$message.success('操作成功');
                // 关闭编辑
                this.$set(row, 'edit', false);
            } else {
                this.$message.error(res.msg);
            }
        },

        // 编辑
        editItem(row) {
            this.$set(row, 'edit', true);
        },
        // 删除
        async deleteItem(row) {
            let result = await this.$confirm(
                `您确定删除“${row.title}”部门信息么？`,
                '温馨小提示'
            ).catch(() => this.$message.danger('取消成功'));
            // 判断是否点滴确定
            if(result === 'confirm') {
                let res = await this.$http.post('/data/department/delete', {id: row._id});
                console.log(res);
                if(res.errno === 0) {
                    this.$message.success('操作成功，即将刷新!');
                    setTimeout(() => {
                        this.$router.go(0);
                    }, 800)
                } else{
                    this.$message.alert(res.msg);
                }
            }
        }
    },

    async created() {
        // 获取数控
        let res = await this.$http('/data/department/list');
        // 判断请求是否是否成功
        if(res.errno === 0) {
            this.list = res.data;
        } else {
            this.$message.error(res.msg)
        }
    }
}

</script>
<style lang="scss">
.page-department-list {
    el-input {
        width: 100%;
    }
}

</style>