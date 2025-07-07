<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useModalStore } from '../../../../stores/modalState';

const { id } = defineProps(['id']);
const modalState = useModalStore();
const orderDetailJson = ref({});

const searchOrderDetailJson = () => {
    axios.post('/api/tasks/orderDetailJson.do', { orderId: id }).then(res => {
        orderDetailJson.value = res.data.detailValue;
    });
};

const getIsOrderStateStr = isOrderState => {
    switch (isOrderState) {
        case 'purchase':
            return '발주단계';
            break;
        case 'delivery':
            return '배송단계';
            break;
        case 'executive':
            return '승인단계';
            break;
        case 'return':
            return '반품처리';
            break;
        default:
            return;
            break;
    }
};

onMounted(() => {
    id && searchOrderDetailJson();
});
</script>
<template>
    <teleport to="body">
        <div class="backdrop">
            <div class="container">
                <label>발주 지시서 상세 </label>
                <table>
                    <colgroup>
                        <col width="40%" />
                        <col width="60%" />
                    </colgroup>
                    <tr>
                        <th>발주번호</th>
                        <td>{{ orderDetailJson.orderId }}</td>
                    </tr>
                    <tr>
                        <th>제품번호</th>
                        <td>{{ orderDetailJson.productNumber }}</td>
                    </tr>
                    <tr>
                        <th>제품명</th>
                        <td>{{ orderDetailJson.productName }}</td>
                    </tr>
                    <tr>
                        <th>발주업체명</th>
                        <td>{{ orderDetailJson.supplyName }}</td>
                    </tr>
                    <tr>
                        <th>발주날짜</th>
                        <td>
                            {{ orderDetailJson?.orderDate?.split(' ')[0] }}
                        </td>
                    </tr>
                    <tr>
                        <th>발주수량</th>
                        <td>{{ orderDetailJson.count }}</td>
                    </tr>
                    <tr>
                        <th>발주금액</th>
                        <td>
                            ￦{{
                                Number(orderDetailJson.price).toLocaleString(
                                    'ko-KR'
                                )
                            }}
                        </td>
                    </tr>
                    <tr>
                        <th>승인여부</th>
                        <td>
                            {{
                                orderDetailJson.isApproved === 0
                                    ? '미승인'
                                    : '승인'
                            }}
                        </td>
                    </tr>
                    <tr>
                        <th>결제여부</th>
                        <td>
                            {{
                                orderDetailJson.isPaid === 0 ? '미결제' : '결제'
                            }}
                        </td>
                    </tr>
                    <tr>
                        <th>발주상태</th>
                        <td>
                            {{ getIsOrderStateStr(orderDetailJson.orderState) }}
                        </td>
                    </tr>
                </table>
                <div class="button-box">
                    <button @click="modalState.setModalState()">나가기</button>
                </div>
            </div>
        </div>
    </teleport>
</template>
<style lang="scss" scoped>
.backdrop {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10;
    font-weight: bold;
}

.container {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    position: relative;
    width: 30%;
    max-width: 800px;
    z-index: 11;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
}

th {
    background: #f4f4f4;
    text-align: center;
}

.product-image {
    width: 100px;
    height: 100px;
    object-fit: contain;
    border: 1px solid #ddd;
    background: white;
}

.text-area {
    width: 100%;
    height: 60px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: none;
    box-sizing: border-box;
}

.button-box {
    text-align: right;
    margin-top: 10px;
}

button {
    background-color: #3bb2ea;
    border: none;
    color: white;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 6px;
    box-shadow: 0 2px #999;
    transition: 0.3s;

    &:hover {
        background-color: #45a049;
    }

    &:active {
        background-color: #3e8e41;
        box-shadow: 0 2px #666;
        transform: translateY(2px);
    }
}

.font_red {
    color: #fe1414;
}
</style>
