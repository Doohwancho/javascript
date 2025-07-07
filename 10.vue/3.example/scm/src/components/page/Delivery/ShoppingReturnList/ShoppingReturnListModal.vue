<script setup>
import { onMounted, ref } from 'vue';
import { useModalStore } from '../../../../stores/modalState';
import axios from 'axios';
import Swal from 'sweetalert2';

const modalState = useModalStore();
const { id } = defineProps(['id']);
const emit = defineEmits([`modalClose`, 'postSuccess']);

const detailList = ref();
const productNumber = ref();
const supplyName = ref();
const quantity = ref();
const warehouseId = ref();

const searchDetail = () => {
    axios
        .post('/api/delivery/deliveryReturnModalListBody.do', { refundId: id })
        .then(res => {
            detailList.value = res.data.deliveryReturnModalList;
            productNumber.value = detailList.value[0].productNumber;
            supplyName.value = detailList.value[0].supplyName;
            quantity.value = detailList.value[0].count;
            warehouseId.value = detailList.value[0].warehouseId;
        });
};

const deliveryReturn = () => {
    const param = {
        refundId: id,
        productNumber: productNumber.value,
        supplyName: supplyName.value,
        quantity: quantity.value,
        warehouseId: warehouseId.value,
    };
    axios
        .post('/api/delivery/deliveryReturnInsertInventoryBody.do', param)
        .then(res => {
            if (res.data.result === 'success') {
                emit('postSuccess');
                Swal.fire({
                    icon: 'success',
                    title: '재고처리 완료',
                    confirmButtonText: '확인',
                });
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: '재고처리 실패!',
                    confirmButtonText: '확인',
                });
            }
        });
};

onMounted(() => {
    id && searchDetail();
});

onUnmounted(() => {
    emit('modalClose', 0);
});
</script>

<template>
    <teleport to="body">
        <div class="backdrop">
            <div class="container">
                <h3>주문 반품</h3>
                <table>
                    <colgroup>
                        <col width="5%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="15%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="5%" />
                        <col width="10%" />
                        <col width="15%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th scope="col">번호</th>
                            <th scope="col">장비번호</th>
                            <th scope="col">장비구분</th>
                            <th scope="col">모델명</th>
                            <th scope="col">제조사</th>
                            <th scope="col">단가</th>
                            <th scope="col">개수</th>
                            <th scope="col">총 금액</th>
                            <th scope="col">창고</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="detail in detailList" :key="detail.refundId">
                            <td>{{ detail.refundId }}</td>
                            <td>{{ detail.productNumber }}</td>
                            <td>{{ detail.detailName }}</td>
                            <td>{{ detail.productName }}</td>
                            <td>{{ detail.supplyName }}</td>
                            <td>{{ detail.price }}</td>
                            <td>{{ detail.count }}</td>
                            <td>{{ detail.totalPrice }}</td>
                            <td>{{ detail.warehouseName }}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="button-box">
                    <button @click="deliveryReturn()">재고 처리</button>
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
    width: 90%;
    max-width: 1000px;
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
    text-align: center;
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
    text-align: center;
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
    margin: 5px;

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
