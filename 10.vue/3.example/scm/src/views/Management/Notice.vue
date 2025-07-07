<template>
    <div>
        <ContextBox>공지사항</ContextBox>
        <NoticeSearch />
        <NoticeMain />
    </div>
</template>

<script setup>
import { provide, ref } from 'vue';

const provideValue = ref();
const flagValue = ref();

provide('selectValue', provideValue);
provide('prFlag', flagValue);
</script>
