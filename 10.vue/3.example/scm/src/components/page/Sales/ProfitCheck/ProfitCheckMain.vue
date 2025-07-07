<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useModalStore } from '../../../../stores/modalState';
import ProfitCheckModal from './ProfitCheckModal.vue';

const route = useRoute();
const profitList = ref();
const modalState = useModalStore();
const cPage = ref(1);
const supplyId = ref(0);

const searchList = () => {
    axios
        .post('/api/sales/profitCheckListBody.do', {
            ...route.query,
            pageSize: 10,
            currentPage: cPage.value,
        })
        .then(res => {
            console.log(res.data);
            profitList.value = res.data;
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
        <ProfitCheckModal v-if="modalState.modalState" :id="supplyId" />
        <table>
            <thead>
                <th>기업명</th>
                <th>매출</th>
                <th>반품</th>
                <th>총손익</th>
            </thead>
            <tbody>
                <template v-if="profitList">
                    <template v-if="profitList.supplierCnt > 0">
                        <tr
                            v-for="(list, index) in profitList.profitCheckList"
                            :key="list.supplyId"
                            :class="{ first: index === 0 && cPage === 1 }"
                            @click="handlerModal(list.supplyId)"
                        >
                            <td>{{ list.supplierName }}</td>
                            <td>{{ list.performance.toLocaleString() }}원</td>
                            <td :class="{ red: list.returnPrice > 0 }">
                                <span v-if="list.returnPrice > 0">-</span
                                >{{ list.returnPrice.toLocaleString() }}원
                            </td>
                            <td :class="{ blue: list.profit > 0 }">
                                {{ list.profit.toLocaleString() }}원
                            </td>
                        </tr>
                    </template>
                </template>
            </tbody>
        </table>
        <Pagination
            :totalItems="profitList?.supplierCnt"
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
    .first {
        background-color: #fcfac6;
    }
    .red {
        color: #e64343;
    }
    .blue {
        color: #2676bf;
    }
}
</style>
