<script setup>
import axios from 'axios';
import { computed, defineProps, onMounted, onUnmounted, ref } from 'vue';
import { useModalStore } from '../../../../stores/modalState';
const modalState = useModalStore();
//response 데이터 저장
const clientData = ref('');
const orderDetailData = ref('');
const orderData = ref('');
const props = defineProps({
    orderId: {
        type: Number,
        required: true,
    },
    clientId: {
        type: Number,
        required: true,
    },
});

async function orderDetail() {
    const param = {
        orderId: props.orderId,
        clientId: props.clientId,
    };

    try {
        const response = await axios.post(
            '/api/business/order-information-list/orderDetailBody.do',
            param
        );
        clientData.value = response.data.client;
        orderDetailData.value = response.data.orderDetail;
        orderData.value = response.data.order;
    } catch (error) {
        console.log('에러');
    }
}

const totalOrderAmount = computed(() => {
    if (!orderDetailData.value || !Array.isArray(orderDetailData.value))
        return 0;

    return orderDetailData.value.reduce((sum, detail) => {
        const supply = detail.supplyPrice ?? 0;
        const tax = supply * 0.1;
        return sum + supply + tax;
    }, 0);
});

const emit = defineEmits(['modalClose', 'postSuccess']);

const closeModal = () => {
    modalState.setModalState();
};
onUnmounted(() => {
    emit('modalClose', 0);
});

onMounted(() => {
    if (props.clientId && props.orderId) {
        orderDetail();
    }
});
</script>

<template>
    <div>
        <teleport to="body">
            <div class="backdrop">
                <div class="container">
                    <h2>수주 상세</h2>
                    <h3>공급사</h3>
                    <table>
                        <tbody>
                            <!-- 공급 -->
                            <tr>
                                <th class="table-header">사업자번호</th>
                                <th class="table-header">회사명</th>
                                <th class="table-header">주소</th>
                                <th class="table-header">담당자</th>
                                <th class="table-header">TEL</th>
                            </tr>
                            <tr>
                                <td>{{ clientData.bizNum }}</td>
                                <td>{{ clientData.clientName }}</td>
                                <td>{{ clientData.addr }}</td>
                                <td>{{ clientData.person }}</td>
                                <td>{{ clientData.personPh }}</td>
                            </tr>
                        </tbody>
                    </table>

                    <h3>수급사</h3>
                    <table>
                        <tbody>
                            <!-- 공급 -->
                            <tr>
                                <th class="table-header">사업자번호</th>
                                <th class="table-header">회사명</th>
                                <th class="table-header">주소</th>
                                <th class="table-header">담당자</th>
                                <th class="table-header">TEL</th>
                            </tr>
                            <tr>
                                <td>01-1234-1567891</td>
                                <td>ERP HAPPY JOB</td>
                                <td>
                                    서울시 구로구 디지털로 285 에이스트윈타워
                                    1차 401호
                                </td>
                                <td>{{ orderData.orderEmpName }}</td>
                                <td>02-857-7819</td>
                            </tr>
                        </tbody>
                    </table>

                    <h3>견적내용</h3>
                    <table>
                        <tbody>
                            <!-- 공급 -->
                            <tr>
                                <th class="table-header">견적날자</th>
                                <th class="table-header">납기날자</th>
                            </tr>
                            <tr>
                                <td>{{ orderData.orderDate }}</td>
                                <td>{{ orderData.deliveryDate }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <h3>
                        귀사의 일이 번창하시길 기원합니다. 하기와 같이
                        수주내용을 보내드리오니 확인바랍니다.
                    </h3>

                    <h3>견적 상세 내용</h3>
                    <table>
                        <tbody>
                            <!-- 공급 -->
                            <tr>
                                <th class="table-header">제품</th>
                                <th class="table-header">납품개수</th>
                                <th class="table-header">제품단가</th>
                                <th class="table-header">
                                    제품단가 * 납품개수
                                </th>
                                <th class="table-header">세액</th>
                                <th class="table-header">총액</th>
                            </tr>
                            <tr
                                v-for="(detail, index) in orderDetailData"
                                :key="index"
                            >
                                <td>{{ detail.productName }}</td>
                                <td>{{ detail.quantity }}</td>
                                <td>
                                    {{ detail.unitPrice?.toLocaleString() }}
                                </td>
                                <td>
                                    {{ detail.supplyPrice?.toLocaleString() }}
                                </td>
                                <td>
                                    {{
                                        (
                                            detail.supplyPrice * 0.1
                                        )?.toLocaleString()
                                    }}
                                </td>
                                <td>
                                    {{
                                        (
                                            detail.supplyPrice +
                                            detail.supplyPrice * 0.1
                                        ).toLocaleString()
                                    }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table>
                        <th class="table-header">수주 총 금액</th>
                        <td>{{ totalOrderAmount.toLocaleString() }}</td>
                    </table>

                    <div class="button-container">
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

input[type='text'],
input[type='date'],
select {
    width: 90%;
    padding: 10px;
    margin-top: 5px;
    margin-bottom: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
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
    margin: 10px 0;
    cursor: pointer;
    border-radius: 12px;
    box-shadow: 0 4px #999;
    transition: 0.3s;
    width: 120px;
}

button:hover {
    background-color: #45a049;
}

button:active {
    background-color: #3e8e41;
    box-shadow: 0 2px #666;
    transform: translateY(2px);
}

.button-box {
    display: flex;
    text-align: center;
    justify-content: space-between;
    margin-top: 20px;
    width: 300px;
}

.button-box button {
    width: 48%;
}

input[type='text']:focus,
input[type='date']:focus,
select:focus {
    border-color: #3bb2ea;
    outline: none;
}

.button-container {
    display: flex;
    justify-content: flex-end; /* 오른쪽 정렬 */
    margin-bottom: 20px;
}
</style>
