<template>
    <ContextBox>부서관리</ContextBox>
    <DepartmentSearch />
    <DepartmentMain />
</template>

<script setup>
import { provide, ref } from 'vue';

const provideValue = ref()

provide('selectValue', provideValue)
</script>
