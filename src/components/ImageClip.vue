<template>
    <div class="image-clip">
        <div class="box"
            :style="{
                backgroundImage: `url(${src})`,
                width: width + 'px',
                height: height + 'px'
            }"    
        >
            <div class="mask">
                <div class="layer">
                    <div class="dot"></div>
                </div>
            </div>
        </div>
        <!-- 提交按钮 -->
        <el-button type="success" @click="submitData">提交</el-button>
    </div>
</template>
<script>
export default {
    props: ['src'],
    data() {
        return {
            // 容器宽高
            width: 0,
            height: 0,
            // 选框偏移
            layerTop: 0,
            layerLeft: 0,
            // 选框宽高
            layerWidth: 0,
            layerHeight: 0,

        }
    }
}
</script>
<style lang="scss">

</style>