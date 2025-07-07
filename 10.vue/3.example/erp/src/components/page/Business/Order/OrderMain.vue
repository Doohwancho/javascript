<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useModalStore } from '../../../../stores/modalState';
import OrderDetailModal from './OrderDetailModal.vue';
import OrderRegisterModal from './OrderRegisterModal.vue';
const cPage = ref(1);

const modalType = ref('');
const modalState = useModalStore();
const route = useRoute();
//조회한 데이터 저장
const orderList = ref();
const orderCnt = ref();

//전달받은 clientId와 orderId
const selectedClientId = ref('');
const selectedOrderId = ref('');

const getOrder = () => {
    const param = {
        currentPage: cPage.value,
        pageSize: 5,
        ...route.query,
    };

    axios
        .post('/api/business/order-information-list/orderListBody.do', param)
        .then(res => {
            orderList.value = res.data.orderList;
            orderCnt.value = res.data.orderCnt;
        });
};

//상세모달
const detailOrder = (id, clientId) => {
    modalType.value = 'view';
    modalState.setModalState(true);
    selectedClientId.value = clientId;
    selectedOrderId.value = id;
};

//등록 모달 열기
const registerOrderModal = () => {
    modalType.value = 'register';
    modalState.setModalState(true);
};

// 모달이 성공적으로 닫힌 후 실행될 함수
const onPostSuccess = () => {
    modalState.setModalState(); // 모달 열기
    modalType.value = ''; // 모달 타입 초기화
    getOrder(); // 목록 새로고침
};

onMounted(() => {
    getOrder();
});

watch(() => route.query, getOrder);
</script>

<template>
    <div>
        <OrderDetailModal
            v-if="modalState.modalState && modalType === 'view'"
            :orderId="selectedOrderId"
            :clientId="selectedClientId"
            @modalClose="onModalClose"
            @postSuccess="onPostSuccess"
        />
        <OrderRegisterModal
            v-if="modalState.modalState && modalType === 'register'"
            @postSuccess="onPostSuccess"
            @modalClose="onModalClose"
        />
        <!-- 신규 등록 버튼 -->
        <div class="button-container">
            <button @click="registerOrderModal()">수주 등록</button>
        </div>
        <table>
            <thead>
                <tr>
                    <th scope="col">수주 직원</th>
                    <th scope="col">수주 날짜</th>
                    <th scope="col">거래처</th>
                    <th scope="col">제품</th>
                    <th scope="col">납기일자</th>
                    <th scope="col">납품수량</th>
                    <th scope="col">공급가액</th>
                    <th scope="col">세액</th>
                    <th scope="col">영역구분</th>
                    <th scope="col">상세조회</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="orderList">
                    <template v-if="orderCnt > 0">
                        <tr v-for="order in orderList" :key="order.id">
                            <td>{{ order.orderEmpName }}</td>
                            <td>{{ order.orderDate }}</td>
                            <td>{{ order.clientName }}</td>
                            <td>{{ order.productName }}</td>
                            <td>{{ order.deliveryDate }}</td>
                            <td>{{ order.totalDeliveryCount }}</td>
                            <td>
                                {{ order.totalSupplyPrice?.toLocaleString() }}
                            </td>
                            <td>{{ order.totalTax?.toLocaleString() }}</td>
                            <td>{{ order.salesArea }}</td>
                            <td>
                                <button
                                    @click="
                                        detailOrder(order.id, order.clientId)
                                    "
                                >
                                    상세조회
                                </button>
                            </td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr>
                            <td colspan="7">일치하는 검색 결과가 없습니다</td>
                        </tr>
                    </template>
                </template>
            </tbody>
        </table>
        <!-- 페이징 -->
        <Pagination
            :totalItems="orderCnt"
            :items-per-page="5"
            :max-pages-shown="5"
            :onClick="getOrder"
            v-model="cPage"
        />
    </div>
</template>
<style lang="scss" scoped>
table {
    width: 100%;

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
        background: #f4f4f4;
        font-weight: bold;
        color: black;
    }

    /* 테이블 올렸을 때 */
    tbody tr:hover {
        background-color: #d3d3d3;
        opacity: 0.9;
        cursor: pointer;
    }
}

button {
    text-align: center;
    text-decoration: none;
    display: inline-block;
    border: none;
    color: white;
    width: 70px;
    padding-top: 8px;
    padding-bottom: 8px;
    font-size: 12px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 12px;
    box-shadow: 0 4px #999;
    background-color: #3bb2ea;

    &:hover {
        background-color: #45a049;
    }

    &:active {
        background-color: #3e8e41;
        box-shadow: 0 2px #666;
        transform: translateY(2px);
    }
}

/* 버튼을 오른쪽 정렬하기 위한 스타일 */
.button-container {
    display: flex;
    justify-content: flex-end; /* 오른쪽 정렬 */
    margin-bottom: 20px;
}
</style>
