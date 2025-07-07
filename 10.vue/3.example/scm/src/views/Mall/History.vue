<template>
    <ContextBox>주문이력 조회 & 반품</ContextBox>
    <HistorySearch />
    <HistoryMain />
    <HistoryDetail 
    v-if="historyState.detailState"
    />
</template>

<script setup>
import HistoryDetail from '../../components/page/Mall/History/HistoryDetail.vue';
import HistoryMain from '../../components/page/Mall/History/HistoryMain.vue';
import HistorySearch from '../../components/page/Mall/History/HistorySearch.vue';
import { useHistoryStore } from '../../stores/historyState';

const historyState = useHistoryStore();

</script>