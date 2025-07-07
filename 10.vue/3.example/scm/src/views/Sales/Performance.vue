<template>
    <div>
        <ContextBox>매출 현황</ContextBox>
        <PerformanceSearch />
        <PerformanceMain />
    </div>
</template>

<script setup>
import PerformanceMain from '../../components/page/Sales/Performance/PerformanceMain.vue';
import PerformanceSearch from '../../components/page/Sales/Performance/PerformanceSearch.vue';
</script>
