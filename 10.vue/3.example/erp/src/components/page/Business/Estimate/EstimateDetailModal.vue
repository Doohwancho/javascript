<script setup>
import axios from 'axios';
import { defineProps, onMounted, onUnmounted, ref } from 'vue';
import { useModalStore } from '../../../../stores/modalState';
const estimate = ref('');
const estimateDetailData = ref([]);
const client = ref('');
const modalState = useModalStore();
const props = defineProps({
    estimateId: {
        type: Number,
        required: true,
    },
    clientId: {
        type: Number,
        required: true,
    },
});

const emit = defineEmits(['modalClose', 'postSuccess']);

// estimateDetail 함수 수정
async function estimateDetail() {
    const param = {
        estimateId: props.estimateId,
        clientId: props.clientId,
    };

    try {
        const response = await axios.post(
            '/api/business/estimate-list/estimateDetailBody.do',
            param
        );
        estimate.value = response.data.estimate;
        estimateDetailData.value = response.data.estimateDetail;
        client.value = response.data.client;
    } catch (error) {
        alert('데이터를 불러올 수 없습니다.');
    }
}

async function updateEstimateDetail() {
    const param = {
        estimateId: props.estimateId,
        clientId: props.clientId,
        estimateDeliveryDate: estimate.value.deliveryDate,
        estimateSalesArea: estimate.value.salesArea,
        depositAmount: estimate.value.depositAmount,
        estimateList: estimateDetailData.value,
    };

    console.log('update' + param);
    axios.post(`/api/business/updateEstimate`, param).then(() => {
        alert('수정되었습니다.');
        emit('postSuccess');
        closeModal();
    });
}

const closeModal = () => {
    modalState.setModalState();
};

//  총액 = 제품 단가 * 수량
const updateSupplyPrice = detail => {
    detail.supplyPrice = detail.unitPrice * detail.quantity;
    updateTotalEstimateAmount();
};

const updateTotalEstimateAmount = () => {
    const totalSupply = estimateDetailData.value.reduce((sum, detail) => {
        return sum + detail.unitPrice * detail.quantity;
    }, 0);
    estimate.value.depositAmount = Math.floor(totalSupply * 1.1); // 10% 세금 포함
};

onMounted(() => {
    if (props.estimateId && props.clientId) {
        estimateDetail();
    }
});

onUnmounted(() => {
    emit('modalClose', 0);
});
</script>

<template>
    <div>
        <teleport to="body">
            <div class="backdrop">
                <div class="container">
                    <h2>견적서 상세</h2>
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
                                <td>{{ client.bizNum }}</td>
                                <td>{{ client.clientName }}</td>
                                <td>{{ client.addr }}</td>
                                <td>{{ client.person }}</td>
                                <td>{{ client.personPh }}</td>
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
                                <td>{{ estimate.estimateEmpName }}</td>
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
                                <td>{{ estimate.estimateDate }}</td>
                                <td>{{ estimate.deliveryDate }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <h3>
                        귀사의 일이 번창하시길 기원합니다. 하기와 같이
                        견적내용을 보내드리오니 확인바랍니다.
                    </h3>

                    <h3>견적 상세 내용</h3>
                    <table>
                        <tbody>
                            <!-- 공급 -->
                            <tr>
                                <th class="table-header">제품</th>
                                <th class="table-header">납품개수</th>
                                <th class="table-header">제품단가</th>
                                <th class="table-header">총액</th>
                                <th class="table-header">세금</th>
                                <th class="table-header">총 금액</th>
                            </tr>
                            <tr
                                v-for="(detail, index) in estimateDetailData"
                                :key="index"
                            >
                                <td>{{ detail.productName }}</td>

                                <td>
                                    <input
                                        type="number"
                                        v-model="detail.quantity"
                                        @input="updateSupplyPrice(detail)"
                                        min="1"
                                    />
                                </td>
                                <td>{{ detail.unitPrice.toLocaleString() }}</td>
                                <td>
                                    {{ detail.supplyPrice.toLocaleString() }}
                                </td>
                                <td>
                                    {{
                                        (
                                            detail.supplyPrice * 0.1
                                        ).toLocaleString()
                                    }}
                                </td>

                                <td>
                                    {{
                                        (
                                            detail.supplyPrice * 1.1
                                        ).toLocaleString()
                                    }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table>
                        <th class="table-header">견적서 총 금액</th>
                        <td>
                            {{ estimate.depositAmount?.toLocaleString() }}
                        </td>
                    </table>

                    <div class="button-container">
                        <button type="button" @click="closeModal()">
                            취소
                        </button>
                        <button type="button" @click="updateEstimateDetail()">
                            수정
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
    margin: 10px 10px;
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

.button-box button {
    width: 48%;
}

input[type='text']:focus,
input[type='date']:focus,
select:focus {
    border-color: #3bb2ea;
    outline: none;
}
input {
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 5px;
    margin-right: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
}

.button-container {
    display: flex;
    justify-content: flex-end; /* 오른쪽 정렬 */
    margin-bottom: 20px;
    margin: 15px 15px;
}
</style>
