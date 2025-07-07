<template>
    <div>
        <ReceivablesModal v-if="modal.modalState" :id="orderId" @postSuccess="onPostSuccess" />
        <div class="table-container">
            <table>
                <colgroup>
                    <col width="10%">
                    <col width="10%">
                    <col width="10%">
                    <col width="20%">
                    <col width="10%">
                    <col width="10%">
                    <col width="10%">
                    <col width="10%">
                    <col width="10%">
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col">주문번호</th>
                        <th scope="col">처리부서</th>
                        <th scope="col">거래처</th>
                        <th scope="col">제품명</th>
                        <th scope="col">수주일자</th>
                        <th scope="col">배송일자</th>
                        <th scope="col">미수금</th>
                        <th scope="col">수금상태</th>
                        <th scope="col">처리자</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="receivableList">
                        <template v-if="receivableList.receivableCnt > 0">
                            <tr v-for="item in receivableList.receivableList" :key="item.orderId"
                                @click="handlerModal(item.orderId)">
                                <td>{{ item.orderId }}</td>
                                <td td> {{ item.departmentName }}</td>
                                <td td> {{ item.clientName }}</td>
                                <td td> {{ item.productName }}</td>
                                <td td> {{ item.orderDate }}</td>
                                <td td> {{ item.deliveryDate }}</td>
                                <td td> {{ item.receivableAmount?.toLocaleString('ko-KR') }}
                                </td>
                                <td td> {{ item.receivableStatus === 'Y' ? '수금완료' : '미수금' }}
                                </td>
                                <td td> {{ item.managerName }}</td>
                            </tr>
                        </template>
                    </template>
                </tbody>
            </table>
            <Pagination :totalItems="receivableList?.receivableCnt" :items-per-page="10" :max-pages-shown="5"
                :onClick="searchReceivable" v-model="cPage" />
        </div>
    </div>
</template>
<script setup>
import axios from 'axios';
import { watch } from 'vue';
import { useModalStore } from '../../../../stores/modalState';
const route = useRoute();
const receivableList = ref();
const modal = useModalStore();
const orderId = ref(0);
const cPage = ref(1);

const searchReceivable = async () => {
    const param = new URLSearchParams({
        ...route.query,
        pageSize: 10,
        currentPage: cPage.value
    });

    try {
        const response = await axios.post(
            '/api/sales/receivableList.do',
            param
        );
        receivableList.value = response.data;
    } catch (e) {
        console.error(e);
    }
};

const handlerModal = id => {
    orderId.value = id;
    modal.setModalState();
};

onMounted(() => {
    searchReceivable();
});

const onPostSuccess = () => {
    modal.setModalState();
    searchReceivable();
};

watch(() => route.query, searchReceivable);

</script>
<style lang="scss" scoped>
.table-container {
    margin-top: 10px;
}


table {
    width: 100%;
    border-collapse: collapse;

}

/* 테이블 올렸을 때 */
tbody tr:hover {
    background-color: #d3d3d3;
    opacity: 0.9;
    cursor: pointer;
}


th,
td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
}

th {
    background: #f4f4f4;
    font-weight: bold;
}
</style>