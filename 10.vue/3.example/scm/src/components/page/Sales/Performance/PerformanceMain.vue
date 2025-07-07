<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useModalStore } from '../../../../stores/modalState';
import PerformanceModal from './PerformanceModal.vue';

const route = useRoute();
const performanceList = ref();
const modalState = useModalStore();
const cPage = ref(1);
const supplyId = ref(0);

const searchList = () => {
    axios
        .post('/api/sales/performanceListBody.do', {
            ...route.query,
            pageSize: 10,
            currentPage: cPage.value,
        })
        .then(res => {
            console.log(res.data);
            performanceList.value = res.data;
        });
};

const handlerModal = id => {
    supplyId.value = id;
    modalState.setModalState();
};

watch(() => route.query, searchList);
onMounted(() => {
    searchList();
});
</script>
<template>
    <div>
        <PerformanceModal v-if="modalState.modalState" :id="supplyId" />
        <table>
            <thead>
                <th>기업고객명</th>
                <th>매출액</th>
            </thead>
            <tbody>
                <template v-if="performanceList">
                    <template v-if="performanceList.supplierCnt > 0">
                        <tr
                            v-for="list in performanceList.performanceList"
                            :key="list.supplyId"
                            @click="handlerModal(list.supplyId)"
                        >
                            <td>{{ list.supplierName }}</td>
                            <td>{{ list.performance.toLocaleString() }}원</td>
                        </tr>
                    </template>
                </template>
            </tbody>
        </table>
        <Pagination
            :totalItems="performanceList?.supplierCnt"
            :items-per-page="10"
            :max-pages-shown="5"
            :onClick="searchList"
            v-model="cPage"
        />
    </div>
</template>
<style lang="scss" scoped>
table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0px 0px 0px;
    font-size: 18px;
    text-align: left;

    th,
    td {
        padding: 8px;
        text-align: left;
        border-bottom: 1px solid #ddd;
        text-align: center;
    }

    th {
        background-color: #2676bf;
        color: #ddd;
    }

    /* 테이블 올렸을 때 */
    tbody tr:hover {
        background-color: #d3d3d3;
        opacity: 0.9;
        cursor: pointer;
    }
}
</style>
