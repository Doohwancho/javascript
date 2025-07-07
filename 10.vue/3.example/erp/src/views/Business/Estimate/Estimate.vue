<script setup>
import { provide, ref } from 'vue';
import EstimateMain from '../../../components/page/Business/Estimate/EstimateMain.vue';
import EstimateSearch from '../../../components/page/Business/Estimate/EstimateSearch.vue';

const provideValue = ref();
provide('selectValue', provideValue);
</script>

<template>
    <ContextBox>견적서</ContextBox>
    <EstimateSearch></EstimateSearch>
    <EstimateMain></EstimateMain>
</template>
