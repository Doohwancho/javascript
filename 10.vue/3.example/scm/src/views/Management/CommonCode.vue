<script setup>
import { provide, ref, watch } from 'vue';
import CommonCodeMain from '../../components/page/Management/CommonCode/CommonCodeMain.vue';
import CommonCodeSearch from '../../components/page/Management/CommonCode/CommonCodeSearch.vue';
import DetailCodeSearch from '../../components/page/Management/CommonCode/DetailCodeSearch.vue';
import DetailCodeMain from '../../components/page/Management/CommonCode/DetailCodeMain.vue';

const selectedGroupCode = ref(null)


const handlerOpenDetail = (groupCode) => {
    selectedGroupCode.value = groupCode;
}

const provideValue = ref({});

provide('selectValue', provideValue);
</script>

<template>
    <ContextBox>공통코드관리</ContextBox>
    <CommonCodeSearch />
    <CommonCodeMain @openDetail="handlerOpenDetail"/>

    <div v-if="selectedGroupCode" style="margin-top: 36px;">
        <ContextBox>상세코드관리</ContextBox>
        <DetailCodeSearch :groupCode="selectedGroupCode"/>
        <DetailCodeMain :groupCode="selectedGroupCode" :key="selectedGroupCode"/>
    </div>
</template>