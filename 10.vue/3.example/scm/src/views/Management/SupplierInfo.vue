<template>
    <div>
        <ContextBox>납품업체정보</ContextBox>
        <SupplierInfoSearch />
        <SupplierInfoMain />
    </div>
</template>

<script setup>
import SupplierInfoMain from '../../components/page/Management/SupplierInfo/SupplierInfoMain.vue';
import SupplierInfoSearch from '../../components/page/Management/SupplierInfo/SupplierInfoSearch.vue';
import { provide, ref } from 'vue';

const provideValue = ref();
const flagValue = ref();

provide('selectValue', provideValue);
provide('prFlag', flagValue);
</script>
