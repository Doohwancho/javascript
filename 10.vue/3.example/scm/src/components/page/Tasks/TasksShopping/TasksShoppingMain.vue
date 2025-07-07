<script setup>
import axios from 'axios';
import Pagination from '../../../common/Pagination.vue';
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useModalStore } from '../../../../stores/modalState';

const route = useRoute();

const deliveryOrderList = ref({});

const cPage = ref(1);

const modalState = useModalStore();
const deliveryId = ref(0);

const searchDeliveryOrderList = () => {
    const param = {
        customerName: route.params.customerName || '',
        searchStDate: route.params.searchStDate || '',
        searchEdDate: route.params.searchEdDate || '',
        pageSize: 5,
        currentPage: cPage.value,
    };
    axios.post('/api/tasks/deliveryOrderListBody.do', param).then(res => {
        deliveryOrderList.value = res.data;
    });
};

const handlerDeliveryOrderModal = id => {
    deliveryId.value = id;
    modalState.setModalState();
};
onMounted(() => {
    searchDeliveryOrderList();
});

watch(
    () => route.params,
    () => {
        cPage.value = 1;
        searchDeliveryOrderList();
    }
);
</script>
<template>
    <div class="divDeliveryOrderList">
        <TasksShoppingModal v-if="modalState.modalState" :id="deliveryId" />
        <table>
            <colgroup>
                <col width="15%" />
                <col width="45%" />
                <col width="15%" />
                <col width="25%" />
            </colgroup>

            <thead>
                <tr>
                    <th scope="col">주문번호</th>
                    <th scope="col">고객기업명</th>
                    <th scope="col">주문개수</th>
                    <th scope="col">주문일자</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="deliveryOrderList">
                    <template v-if="deliveryOrderList.deliveryOrderCnt > 0">
                        <tr
                            v-for="deliveryOrder in deliveryOrderList.deliveryOrderList"
                            :key="deliveryOrder.deliveryId"
                            @click="
                                handlerDeliveryOrderModal(
                                    deliveryOrder.deliveryId
                                )
                            "
                        >
                            <td>{{ deliveryOrder.deliveryId }}</td>
                            <td>{{ deliveryOrder.customerName }}</td>
                            <td>{{ deliveryOrder.count }}</td>
                            <td>{{ deliveryOrder.salesDate }}</td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr>
                            <td colspan="4">데이터가 존재하지 않습니다.</td>
                        </tr>
                    </template>
                </template>
            </tbody>
        </table>
        <Pagination
            :totalItems="deliveryOrderList?.deliveryOrderCnt || 0"
            :itemsPerPage="5"
            :maxPagesShown="5"
            :onClick="searchDeliveryOrderList"
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
