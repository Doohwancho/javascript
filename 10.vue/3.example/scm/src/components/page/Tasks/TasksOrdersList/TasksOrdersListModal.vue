<script setup>
import { onMounted, ref } from 'vue';
import { useModalStore } from '../../../../stores/modalState';
import axios from 'axios';

const { id } = defineProps(['id']);
const emit = defineEmits(['modalClose', 'postSuccess']);

const modalState = useModalStore();
const orderDetail = ref({});

const searchorderDetailJson = () => {
    axios.post('/api/tasks/orderDetailJson.do', { orderId: id }).then(res => {
        orderDetail.value = res.data.detailValue;
    });
};

const updateOrderState = () => {
    axios
        .post('/api/tasks/orderStateUpdateBody.do', { orderId: id })
        .then(res => {
            if (res.data.result === 'success') {
                emit('postSuccess');
            }
        });
    alert(`발주번호 ${id}의 발주서를 전송하였습니다.`);
};
onMounted(() => {
    id && searchorderDetailJson();
});

onUnmounted(() => {
    emit('modalClose', 0);
});
</script>
<template>
    <teleport to="body">
        <div class="backdrop">
            <div class="container">
                <label>발주 지시서 상세</label>
                <table>
                    <colgroup>
                        <col width="40%" />
                        <col width="60%" />
                    </colgroup>
                    <tr>
                        <th>발주번호</th>
                        <td>{{ orderDetail.orderId }}</td>
                    </tr>
                    <tr>
                        <th>발주회사</th>
                        <td>{{ orderDetail.supplyName }}</td>
                    </tr>
                    <tr>
                        <th>제품명</th>
                        <td>{{ orderDetail.productName }}</td>
                    </tr>
                    <tr>
                        <th>제품번호</th>
                        <td>{{ orderDetail.productNumber }}</td>
                    </tr>
                    <tr>
                        <th>제품수량</th>
                        <td>{{ orderDetail.count }}</td>
                    </tr>
                </table>
                <div class="button-box">
                    <button
                        v-if="
                            orderDetail.orderId &&
                            orderDetail.isPaid === 1 &&
                            orderDetail.orderState === 'purchase'
                        "
                        @click="updateOrderState"
                    >
                        발주서 전송
                    </button>
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
    padding: 10px 22px;
    text-align: right;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 12px;
    box-shadow: 0 4px #999;
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
