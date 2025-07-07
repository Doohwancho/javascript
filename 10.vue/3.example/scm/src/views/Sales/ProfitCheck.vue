<template>
    <div>
        <ContextBox>손익 조회</ContextBox>
        <ProfitCheckSearch />
        <ProfitCheckMain />
    </div>
</template>

<script setup>
import ProfitCheckMain from '../../components/page/Sales/ProfitCheck/ProfitCheckMain.vue';
import ProfitCheckSearch from '../../components/page/Sales/ProfitCheck/ProfitCheckSearch.vue';
</script>
