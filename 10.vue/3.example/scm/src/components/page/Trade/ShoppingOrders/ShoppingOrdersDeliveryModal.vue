<script setup>
import { ref } from 'vue';
import { useModalStore } from '../../../../stores/modalState';
import axios from 'axios';

const emit = defineEmits([`modalClose`, 'postSuccess']);
const modalState = useModalStore();
const { id } = defineProps(['id']);

const tableState = ref(false);

const deliveryOrder = ref({});
const deliveryManager = ref({});
const warehouseSelectList = ref({});
const selectedWarehouseId = ref(0);
const selectedWarehouse = ref([]);
const selectedWarehouseValue = ref([]);
const inputCount = ref(0);
const addedWarehouseItems = ref([]);
const totalCount = ref(0);
const selectManagerValue = ref('');

const searchDetail = () => {
    axios.post('/api/trade/deliveryOrderBody.do', { orderId: id }).then(res => {
        deliveryOrder.value = res.data.deliveryOrder;
        deliveryManager.value = res.data.deliveryManager;
        warehouseSelectList.value = res.data.warehouseSelectList;
    });
};

const handlerAddBtn = () => {
    if (!selectedWarehouse.value || selectedWarehouseId.value === 0) {
        alert('창고를 선택해주세요.');
        return;
    }

    if (inputCount.value <= 0) {
        alert('주문 개수를 1개이상 입력해주세요.');
        return;
    }

    if (totalCount.value + inputCount.value > deliveryOrder.value.count) {
        alert('주문수량을 초과할 수 없습니다.');
        return;
    }

    tableState.value = true;

    const existingItem = addedWarehouseItems.value.find(
        item => item.warehouseName === selectedWarehouse.value.name
    );

    if (existingItem) {
        existingItem.count += inputCount.value;
    } else {
        addedWarehouseItems.value.push({
            warehouseName: selectedWarehouse.value.name,
            count: inputCount.value,
        });
    }

    selectedWarehouseValue.value.push({
        orderCount: inputCount.value,
        warehouseId: selectedWarehouseId.value,
    });

    totalCount.value = addedWarehouseItems.value.reduce(
        (sum, item) => sum + item.count,
        0
    );

    // 선택 값 초기화
    selectedWarehouseId.value = 0;
    inputCount.value = 0;
};

const handlerDeleteBtn = () => {
    const isConfirmed = confirm('초기화하시겠습니까?');
    if (isConfirmed) {
        addedWarehouseItems.value = [];
        tableState.value = false;
        totalCount.value = 0;
    }
};

const updateShoopingDelivery = () => {
    if (!selectManagerValue.value) {
        alert('배송담당자를 선택해 주세요!');
        return;
    }
    if (totalCount.value !== deliveryOrder.value.count) {
        alert('주문수량에 맞게 신청해주세요!');
        return;
    }

    const textData = {
        orderId: id,
        productId: deliveryOrder.value.productId,
        deliveryManager: selectManagerValue.value,
        warehouseList: selectedWarehouseValue.value,
    };

    axios.post('/api/tasks/deliveryOrderSaveBody.do', textData).then(res => {
        if (res.data.result === 'success') {
            alert('배송요청 완료!');
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

watch(selectedWarehouseId, () => {
    for (let i = 0; i < warehouseSelectList.value.length; i++) {
        if (
            selectedWarehouseId.value ===
            warehouseSelectList.value[i].warehouseId
        ) {
            selectedWarehouse.value = warehouseSelectList.value[i];
        }
    }

    // 창고 바뀔 때마다 입력값 초기화
    inputCount.value = 0;
});
</script>

<template>
    <teleport to="body">
        <div class="backdrop">
            <div class="container">
                <h3>배송 지시서</h3>
                <table>
                    <colgroup>
                        <col width="10%" />
                        <col width="20%" />
                        <col width="15%" />
                        <col width="15%" />
                        <col width="10%" />
                        <col width="30%" />
                    </colgroup>
                    <thead>
                        <th scope="col">주문번호</th>
                        <th scope="col">주문일자</th>
                        <th scope="col">고객명</th>
                        <th scope="col">상품명</th>
                        <th scope="col">주문수량</th>
                        <th scope="col">배송담당자</th>
                    </thead>
                    <tbody>
                        <template v-if="deliveryOrder">
                            <tr :key="deliveryOrder.orderId">
                                <td>{{ deliveryOrder.orderId }}</td>
                                <td>{{ deliveryOrder.salesDate }}</td>
                                <td>{{ deliveryOrder.customerName }}</td>
                                <td>{{ deliveryOrder.productName }}</td>
                                <td>{{ deliveryOrder.count }}</td>
                                <td>
                                    <select v-model="selectManagerValue">
                                        <option value="">
                                            배송담당자 선택
                                        </option>
                                        <option
                                            v-for="manager in deliveryManager"
                                            :key="manager.loginID"
                                            :value="manager.name"
                                        >
                                            {{ manager.name }}
                                        </option>
                                    </select>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
                <br />
                <div style="display: flex; align-items: center; gap: 10px">
                    <h3 style="margin: 0">창고별 품목 추가</h3>
                    <button @click="handlerAddBtn()">추가</button>
                    <!--TODO: 밑에 테이블 있을때만 초기화버튼 생성-->
                    <template v-if="addedWarehouseItems !== null">
                        <button @click="handlerDeleteBtn()">초기화</button>
                    </template>
                </div>
                <table>
                    <colgroup>
                        <col width="35%" />
                        <col width="30%" />
                        <col width="35%" />
                    </colgroup>
                    <thead>
                        <th scope="col">창고선택</th>
                        <th scope="col">총 재고 건수</th>
                        <th scope="col">주문 개수 입력</th>
                    </thead>
                    <tbody>
                        <template v-if="deliveryOrder">
                            <tr :key="deliveryOrder.orderId">
                                <td>
                                    <select v-model="selectedWarehouseId">
                                        <option value="0">창고 선택</option>
                                        <option
                                            v-for="warehouse in warehouseSelectList"
                                            :key="warehouse.warehouseId"
                                            :value="warehouse.warehouseId"
                                        >
                                            {{ warehouse.name }}
                                        </option>
                                    </select>
                                </td>
                                <td>
                                    <span v-if="selectedWarehouse">{{
                                        selectedWarehouseId.value === 0
                                            ? 0
                                            : selectedWarehouse.totalProductStock
                                    }}</span>
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        v-model="inputCount"
                                        :max="
                                            selectedWarehouse
                                                ? selectedWarehouse.totalProductStock
                                                : 0
                                        "
                                    />
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
                <br />
                <template v-if="tableState">
                    <table>
                        <colgroup>
                            <col width="50%" />
                            <col width="50%" />
                        </colgroup>
                        <thead>
                            <th scope="col">창고</th>
                            <th scope="col">주문 개수</th>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(item, index) in addedWarehouseItems"
                                :key="index"
                            >
                                <td>{{ item.warehouseName }}</td>
                                <td>{{ item.count }}</td>
                            </tr>
                        </tbody>
                    </table>
                </template>

                <div class="button-box">
                    <button @click="updateShoopingDelivery()">신청</button>
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
