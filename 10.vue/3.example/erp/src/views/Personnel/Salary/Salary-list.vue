<template>
    <ContextBox>급여 내역서</ContextBox>
    <SalaryListSearch />
    <SalaryListMain />
</template>

<script setup>
import { provide, ref } from 'vue';

const provideValue = ref()

provide('selectValue', provideValue)
</script>
