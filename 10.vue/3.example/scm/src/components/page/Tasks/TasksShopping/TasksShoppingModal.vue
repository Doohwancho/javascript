<script setup>
import axios from 'axios';
import { onMounted } from 'vue';
import { useModalStore } from '../../../../stores/modalState';

const { id } = defineProps(['id']);
const modalState = useModalStore();
const deliveryDetail = ref({});

const searchDeliveryOrderDetail = () => {
    axios
        .post('/api/tasks/deliveryDetailBody.do', { deliveryId: id })
        .then(res => {
            deliveryDetail.value = res.data.detailValue;
        });
};

onMounted(() => {
    id && searchDeliveryOrderDetail();
});
</script>
<template>
    <teleport to="body">
        <div class="backdrop">
            <div class="container">
                <label>배송 지시서 상세 목록</label>
                <table>
                    <colgroup>
                        <col width="40%" />
                        <col width="60%" />
                    </colgroup>
                    <tr>
                        <th>주문일자</th>
                        <td>{{ deliveryDetail.salesDate }}</td>
                    </tr>
                    <tr>
                        <th>고객명</th>
                        <td>{{ deliveryDetail.customerName }}</td>
                    </tr>
                    <tr>
                        <th>제품명</th>
                        <td>{{ deliveryDetail.productName }}</td>
                    </tr>
                    <tr>
                        <th>주문개수</th>
                        <td>{{ deliveryDetail.count }}</td>
                    </tr>
                    <tr>
                        <th>배송담당자</th>
                        <td>{{ deliveryDetail.deliveryManager }}</td>
                    </tr>
                    <tr>
                        <th>결제상태</th>
                        <td>
                            {{
                                deliveryDetail.paymentStatus === 0
                                    ? '미결제'
                                    : '결제완료'
                            }}
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
