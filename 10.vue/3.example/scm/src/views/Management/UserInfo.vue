<template>
    <div>
        <ContextBox>기업/기업정보관리</ContextBox>
        <UserInfoSearch />
        <UserInfoMain />
    </div>
</template>

<script setup>
import { provide, ref } from 'vue';

const provideValue = ref();
const flagValue = ref();

provide('selectValue', provideValue);
provide('prFlag', flagValue);
</script>
