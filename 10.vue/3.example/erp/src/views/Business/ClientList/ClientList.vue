<script setup>
import { provide, ref } from 'vue';
import ClientMain from '../../../components/page/Business/ClientList/ClientMain.vue';
import ClientSearch from '../../../components/page/Business/ClientList/ClientSearch.vue';

const provideValue = ref();
provide('selectValue', provideValue);
</script>

<template>
    <ContextBox>거래처 관리</ContextBox>
    <ClientSearch></ClientSearch>
    <ClientMain></ClientMain>
</template>
