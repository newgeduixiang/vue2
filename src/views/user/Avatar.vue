<template>
<div class="page-inner">
    <h1 class="page-title">修改头像</h1>
    <image-clip 
        :src="$store.state.userinfo.avatar" 
        @submit="submitData"
    ></image-clip>
</div>
</template>
<script>
// 引入组件
import ImageClip from '../../components/ImageClip.vue';
export default {
    components: { ImageClip },

    methods: {
        // 裁剪后提交方法
        submitData(e) {
            console.log(e);
        }
    }
}
</script>