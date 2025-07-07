<template>
    <div>
        <ContextBox>매출 상위</ContextBox>
        <TopSalesSearch />
        <TopSalesMain />
    </div>
</template>

<script setup>
import TopSalesMain from '../../components/page/Sales/TopSales/TopSalesMain.vue';
import TopSalesSearch from '../../components/page/Sales/TopSales/TopSalesSearch.vue';
import { provide, ref } from 'vue';

const provideValue = ref();

provide('selectValue', provideValue);
</script>
