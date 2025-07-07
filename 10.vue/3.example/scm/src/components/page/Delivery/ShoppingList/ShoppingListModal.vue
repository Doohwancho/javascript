<script setup>
import axios from 'axios';
import { useModalStore } from '../../../../stores/modalState';
import { ref } from 'vue';
import Swal from 'sweetalert2';

const emit = defineEmits([`modalClose`, 'postSuccess']);
const modalState = useModalStore();
const { id, state } = defineProps(['id', 'state']);

const deliveryDetail = ref();
const deliveryId = ref();
const productId = ref();
const supplyId = ref();
const startLocation = ref('');
const output = ref();

const searchDetail = () => {
    axios
        .post('/api/delivery/shoppingDeliveryModalBody.do', { deliveryId: id })
        .then(res => {
            deliveryDetail.value = res.data.shoppingDeliveryModal;
            deliveryId.value = deliveryDetail.value.deliveryId;
            productId.value = deliveryDetail.value.productId;
            supplyId.value = deliveryDetail.value.supplyId;
            startLocation.value = deliveryDetail.value.startLocation;
            output.value = deliveryDetail.value.count;
        });
};

const updateDeliveryState = () => {
    const param = {
        orderId: deliveryDetail.value.orderId,
        deliveryState: '배송완료',
        salesState: 'deliveryComplete',
        deliveryId: deliveryId.value,
        productId: productId.value,
        supplyId: supplyId.value,
        startLocation: startLocation.value,
        output: output.value,
    };
    axios.post('/api/delivery/updateDeliveryStateBody.do', param).then(res => {
        if (res.data.result === 'success') {
            emit('postSuccess');
            Swal.fire({
                icon: 'success',
                title: '배송 완료',
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
                <h3>주문 배송 목록</h3>
                <table>
                    <colgroup>
                        <col width="50%" />
                        <col width="50%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th scope="col">제품명</th>
                            <th scope="col">제품수량</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-if="deliveryDetail">
                            <tr :key="deliveryDetail.deliveryId">
                                <td>{{ deliveryDetail.productName }}</td>
                                <td>{{ deliveryDetail.count }}</td>
                            </tr>
                        </template>
                    </tbody>
                </table>
                <div class="button-box">
                    <template v-if="state === '배송중'">
                        <button @click="updateDeliveryState()">배달완료</button>
                    </template>
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
    max-width: 500px;
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
