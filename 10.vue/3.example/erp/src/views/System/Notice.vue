<template>
    <ContextBox>공지사항</ContextBox>
    <NoticeSearch />
    <NoticeMain />
</template>

<script setup>
import { provide, ref } from 'vue';

const provideValue = ref()

provide('selectValue', provideValue)
</script>
