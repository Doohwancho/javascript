<script setup>
import { onMounted, ref, onUnmounted } from 'vue';
import {
    fetchClient,
    fetchManufacturers,
} from '../../../../common/selectBoxApi';
import { useModalStore } from '../../../../stores/modalState';
import axios from 'axios';
const modalState = useModalStore();
const clients = ref(''); // 고객 목록
const manufacturers = ref(''); //제조사 목록
const selectedClient = ref('');
const searchClient = ref('');
const cPage = ref(1);

// 수주 저장

const orderDeliveryDate = ref('');
const orderSalesArea = ref('');
const orderEstiId = ref(0);
//미수주 견적서 조회
const orderEstimateList = ref('');
const orderEstimateCnt = ref('');

//견적서 조회 후 견적서 내 상품 데이터 조회
const orderEstiProductList = ref([]);

const emit = defineEmits(['modalClose', 'postSuccess']);

onMounted(async () => {
    manufacturers.value = await fetchManufacturers();
    clients.value = await fetchClient();
    // getOrderEstimateList();
});

//수주 페이지에서 견적서 조회
const getOrderEstimateList = () => {
    const param = {
        currentPage: cPage.value,
        pageSize: 5,
        clientId: searchClient.value,
    };
    axios.post('/api/business/orderEstimateListBody', param).then(res => {
        orderEstimateList.value = res.data.orderEstimateList;
        orderEstimateCnt.value = res.data.orderEstimateCnt;
    });
};

// 견적서 내 상품 조회
async function orderEstiDetailList(estiId) {
    const param = new URLSearchParams({
        estimateId: estiId,
    });

    try {
        const response = await axios.post(
            `/api/business/orderEstimateDetilBody`,
            param
        );
        orderEstiProductList.value = response.data.estimateDetail;
        orderEstimateList.value = '';
        orderEstimateCnt.value = '';
    } catch (error) {
        alert('상품을 조회할 수 없습니다.');
    }
}

// 수주 저장

async function saveOrder() {
    if (!orderDeliveryDate.value) {
        alert('납기일을 선택해주세요.');
    }
    orderEstiId.value = orderEstiProductList.value[0]?.estimateId;
    orderSalesArea.value = orderEstiProductList.value[0]?.salesArea;
    selectedClient.value = orderEstiProductList.value[0]?.clientId;
    const param = {
        clientId: selectedClient.value,
        orderDeliveryDate: orderDeliveryDate.value,
        orderSalesArea: orderSalesArea.value,
        orderList: orderEstiProductList.value,
        estimateId: orderEstiId.value,
    };

    try {
        await axios.post(`/api/business/saveOrder`, param);
        alert('저장되었습니다.');
        emit('postSuccess');
        closeModal();
    } catch (error) {
        alert('수주를 작성할 수 없습니다.');
    }
}

const closeModal = () => {
    modalState.setModalState();
};

onUnmounted(() => {
    emit('modalClose', 0);
});
</script>

<template>
    <div>
        <teleport to="body">
            <div class="backdrop">
                <div class="container">
                    <h2>수주 작성</h2>
                    <h3>견적서 조회</h3>

                    <!-- search Box -->
                    <label for="">거래처 </label>
                    <select v-model="searchClient">
                        <option value="">전체</option>
                        <option
                            v-for="client in clients"
                            :key="client.id"
                            :value="client.id"
                        >
                            {{ client.client_name }}
                        </option>
                    </select>

                    <button @click="getOrderEstimateList()">조회</button>

                    <table v-if="orderEstimateList.length > 0">
                        <thead>
                            <tr>
                                <th>견적일</th>
                                <th>거래처</th>
                                <th>제품명</th>
                                <th>총 수량</th>
                                <th>총 금액</th>
                                <th>총 세금</th>
                                <th>등록</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="orderEsti in orderEstimateList"
                                :key="orderEsti.id"
                            >
                                <td>{{ orderEsti.estimateDate }}</td>
                                <td>{{ orderEsti.clientName }}</td>
                                <td>{{ orderEsti.productName }}</td>
                                <td>{{ orderEsti.totalDeliveryCount }}</td>
                                <td>
                                    {{
                                        orderEsti.totalSupplyPrice?.toLocaleString()
                                    }}
                                </td>
                                <td>
                                    {{ orderEsti.totalTax?.toLocaleString() }}
                                </td>
                                <td>
                                    <button
                                        @click="
                                            orderEstiDetailList(orderEsti.id)
                                        "
                                    >
                                        추가
                                    </button>
                                </td>
                            </tr>

                            <tr v-if="orderEstimateList.length === 0">
                                <td colspan="7">
                                    일치하는 검색 결과가 없습니다
                                </td>
                                <Pagination
                                    :totalItems="orderEstimateCnt"
                                    :items-per-page="5"
                                    :max-pages-shown="5"
                                    :onClick="getOrderEstimateList"
                                    v-model="cPage"
                                />
                            </tr>
                        </tbody>
                    </table>

                    <h3>수주서 작성</h3>

                    <div>
                        <p style="margin-right: 10px">
                            납기일
                            <input type="date" v-model="orderDeliveryDate" />
                        </p>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th class="table-header">제조업체</th>
                                <th class="table-header">제품명</th>
                                <!-- <th class="table-header">납기일</th> -->
                                <th class="table-header">영역구분</th>
                                <th class="table-header">제품단가</th>
                                <th class="table-header">수량</th>
                                <th class="table-header">공급가액</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-if="orderEstiProductList.length > 0">
                                <tr
                                    v-for="(
                                        item, index
                                    ) in orderEstiProductList"
                                    :key="index"
                                >
                                    <td>{{ item.manufacturerName }}</td>
                                    <td>{{ item.productName }}</td>
                                    <!-- <td>
                                        <input
                                            type="date"
                                            v-model="orderDeliveryDate"
                                        />
                                    </td> -->
                                    <td>{{ item.salesArea }}</td>
                                    <td>
                                        {{ item.unitPrice?.toLocaleString() }}
                                    </td>
                                    <td>
                                        {{ item.quantity }}
                                    </td>
                                    <td>
                                        {{ item.supplyPrice?.toLocaleString() }}
                                    </td>
                                </tr>
                            </template>
                            <template v-else>
                                <tr>
                                    <td colspan="7">
                                        견적서 내역에서 수주할 내역을
                                        추가해주세요.
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                    <div class="button-container">
                        <button
                            v-if="orderEstiProductList.length > 0"
                            @click="saveOrder()"
                        >
                            등록
                        </button>

                        <button type="button" @click="closeModal()">
                            취소
                        </button>
                    </div>
                </div>
            </div>
        </teleport>
    </div>
</template>

<style lang="scss" scoped>
.search-box {
    margin-bottom: 10px;
    display: block;
    width: 300px;
}

.search-select {
    width: 40%;
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
}

.backdrop {
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
}

.container {
    background: white;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    width: 1000px;
    font-size: 14px;
}

h2 {
    font-size: 24px;
    margin-bottom: 20px;
    font-weight: bold;
    text-align: center;
    background-color: #f0f0f0; /* 회색 배경 */
    padding: 10px 0; /* 여백 추가 */
    border-bottom: 2px solid #ccc; /* 제목 아래 선 추가 */
}

table {
    width: 100%;
    border-spacing: 0;
    margin-bottom: 20px;
}

th.table-header {
    background-color: #f0f0f0;
    padding: 12px 15px;
    font-weight: bold;
    border-right: 2px solid #ccc; /* 선 추가 */
    text-align: left;
    width: 150px;
}

td {
    padding: 12px 15px;
}

button {
    background-color: #3bb2ea;
    border: none;
    color: white;
    padding: 10px 22px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 10px 10px;
    cursor: pointer;
    border-radius: 12px;
    box-shadow: 0 4px #999;
    transition: 0.3s;
    width: 100px;
}

button:hover {
    background-color: #45a049;
}

button:active {
    background-color: #3e8e41;
    box-shadow: 0 2px #666;
    transform: translateY(2px);
}

/* 버튼을 오른쪽 정렬하기 위한 스타일 */
.button-container {
    display: flex;
    justify-content: flex-end; /* 오른쪽 정렬 */
    margin-bottom: 20px;
}

input[type='text']:focus,
input[type='date']:focus,
select:focus {
    border-color: #3bb2ea;
    outline: none;
}
select {
    width: 200px;
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 10px;
    margin: 10px 15px;
    border-radius: 4px;
    border: 1px solid #ccc;
}

input {
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 5px;
    margin-right: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
}
</style>
