<script setup>
import { onMounted } from 'vue';
import { useModalStore } from '../../../../stores/modalState';
import axios from 'axios';

const { id } = defineProps(['id']);
const modalState = useModalStore();
const emit = defineEmits([`modalClose`, 'postSuccess']);

const orderingInstruction = ref({});
const selectedCount = ref(0);

const searchDetail = () => {
    axios
        .post('/api/trade/orderingInstructionBody.do', { orderId: id })
        .then(res => {
            orderingInstruction.value = res.data.orderingInstruction;
            selectedCount.value = res.data.orderingInstruction.workOrderCount;
        });
};

const updateOrderInstruction = () => {
    const textData = {
        orderId: id,
        count: selectedCount.value,
    };

    axios.post('/api/tasks/orderInstructionSaveBody.do', textData).then(res => {
        if (res.data.result === 'success') {
            alert('발주요청 완료!');
            emit('postSuccess');
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
                <h3>발주 지시서</h3>
                <table>
                    <colgroup>
                        <col width="50%" />
                        <col width="50%" />
                    </colgroup>
                    <tbody>
                        <template v-if="orderingInstruction">
                            <tr :key="orderingInstruction.orderId">
                                <th>제품번호</th>
                                <td>{{ orderingInstruction.productNumber }}</td>
                            </tr>
                            <tr>
                                <th>제품명</th>
                                <td>{{ orderingInstruction.productName }}</td>
                            </tr>
                            <tr>
                                <th>발주개수</th>
                                <td>
                                    <input
                                        type="number"
                                        v-model="selectedCount"
                                        :min="
                                            orderingInstruction
                                                ? orderingInstruction.workOrderCount
                                                : 0
                                        "
                                    />
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
                <div class="button-box">
                    <button @click="updateOrderInstruction()">신청</button>
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
