<template>
<div class="page-inner">
    <h1 class="page-title">添加员工</h1>
    <!-- 传递方法,默认跳转员工列表第一页 -->
    <staff-create :submitCallback="e => $router.push('/staff/list/1')"></staff-create>
</div>
</template>


<script>
// 引入组件
import StaffCreate from '../../components/StaffCreate.vue';
export default {
    components: { StaffCreate }
}
</script>
