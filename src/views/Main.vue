<template>
<div class="page-main">
    <!-- 第一个部分 -->
    <el-row :gutter="15" class="part1">
        <el-col :span="6" v-for="(item, index) in main.part1" :key="index">
            <el-card shadow="hover">
                <i :class="item.icon" :style="{ backgroundColor: item.color }"></i>
                <div class="content">
                    <h3>{{item.title}}</h3>
                    <p>{{item.intro}}</p>
                </div>
            </el-card>
        </el-col>
    </el-row>
    <!-- 第二个部分 -->
    <el-row :gutter="15" class="row2">
        <el-col :span="12">
            <el-card class="part2" shadow="hover">
                <div slot="header" class="card-title">
                    <h2>{{main.part2.title}}</h2>
                    <p>{{main.part2.intro}}</p>
                </div>
                <el-row :gutter="15">
                    <el-col :span="6" v-for="(item, index) in main.part2.data" :key="index">
                        <div class="inner-card">
                            <h3>{{item.value}}</h3>
                            <p>{{item.label}}</p>
                        </div>
                    </el-col>
                </el-row>
            </el-card>
            <el-card shadow="hover">
                <div slot="header" class="card-title">
                    <h2>{{main.part3.title}}</h2>
                    <p>{{main.part3.intro}}</p>
                </div>
                <el-row :gutter="15">
                    <el-col :span="4" v-for="(item, index) in main.part3.data" :key="index">
                        <div class="inner-card">
                            <h3>{{item.value}}</h3>
                            <p>{{item.label}}</p>
                        </div>
                    </el-col>
                </el-row>
            </el-card>
        </el-col>
        <el-col :span="12">
            <el-card shadow="hover">
                <div class="card-title" slot="header">
                    <h2>{{main.part4.title}}</h2>
                    <p>{{main.part4.intro}}</p>
                </div>
                <v-echarts :option="main.part4.data" style="height: 355px"></v-echarts>
            </el-card>
        </el-col>
    </el-row>
    <!-- 第三个部分 -->
    <el-row :gutter="15" class="row3">
        <el-col :span="12">
            <el-card shadow="hover">
                <div class="card-title" slot="header">
                    <h2>{{main.part5.title}}</h2>
                    <p>{{main.part5.intro}}</p>
                </div>
                <el-descriptions :column="1" border>
                    <el-descriptions-item v-for="(item, index) in main.part5.data" :key="index" :label="item[0]">
                        <h3>{{item[1]}}</h3>
                        <p>{{item[2]}}</p>
                    </el-descriptions-item>
                </el-descriptions>
            </el-card>
        </el-col>
        <el-col :span="12">
            <el-card shadow="hover">
                <div class="card-title" slot="header">
                    <h2>{{main.part5.title}}</h2>
                    <p>{{main.part6.intro}}</p>
                </div>
                <el-table border stripe :data="main.part6.data">
                    <el-table-column type="index" align="center" width="80" label="序号"></el-table-column>
                    <el-table-column prop="title" :label="main.part6.titles[0]"></el-table-column>
                    <el-table-column prop="value" :label="main.part6.titles[1]" width="150"></el-table-column>
                </el-table>
            </el-card>
        </el-col>
    </el-row>
</div>
</template>
<style lang="scss">
.page-main {
    overflow-x: hidden;
    h2, 
    h3, 
    p {
        padding: 0;
        margin: 0;
        font-weight: normal;
    }
    .part1 {
        margin-bottom: 15px;
        .el-card__body {
            display: flex;
            align-items: center;
        }
        i {
            font-size: 30px;
            padding: 5px;
            color: #fff;
            margin-right: 10px;
        }
        .content {
            flex: 1;
        }
    }
    .card-title {
        display: flex;
        h2 {
            flex: 1;
            font-size: 20px;
        }
    }
    .inner-card {
        background-color: #efefef;
        border-radius: 10px;
        text-align: center;
        padding: 30px 10px 20px;
        h3 {
            font-size: 24px;
            margin-bottom: 5px;
        }
    }
    .part2 {
        margin-bottom: 15px;
    }
    .el-descriptions-row {
        display: flex;
        .el-descriptions-item__content {
            flex: 1;
        }
        .el-descriptions-item__label {
            padding-left: 30px!important;
            padding-right: 30px!important;
            // IFC居中
            &:after {
                content: "";
                display: inline-block;
                height: 100%;
                vertical-align: middle;
            }
        }
    }
    .row2 {
        margin-bottom: 15px;
    }
    .row3 {
        align-items: stretch;
        display: flex;
        .el-col {
            float: none;
        }
        .el-card {
            height: 100%;
        }
    }
}
</style>
<script>
export default {
    computed: {
        main() {
            return this.$store.state.main;
        }
    }
}
</script>