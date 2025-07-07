<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const emit = defineEmits([`modalClose`, 'postSuccess']);
const { id, date } = defineProps(['id', 'date']);

const ordersDetailList = ref();
const orderDirectionDetail = ref([]);
const warehouseList = ref();
const selectedWarehouseId = ref(0);

const searchDetail = () => {
    const param = {
        supplyId: id,
        orderDirectionDate: date,
    };
    axios
        .post('/api/delivery/orderDirectionDetailListBody.do', param)
        .then(res => {
            ordersDetailList.value = res.data;
            orderDirectionDetail.value = res.data.orderDirectionDetail;
        });
};

const searchInventoryList = () => {
    axios.post('/api/delivery/inventoryList.do').then(res => {
        warehouseList.value = res.data;
    });
};

const updateConfirm = () => {
    if (selectedWarehouseId === 0) {
        Swal.fire('창고를 선택해주세요!', '', 'warning');
        return;
    }

    Swal.fire({
        title: '발주 처리 하시겠습니까?',
        icon: 'question',
        showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
        confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
        cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
        confirmButtonText: '확인', // confirm 버튼 텍스트 지정
        cancelButtonText: '취소', // cancel 버튼 텍스트 지정
        reverseButtons: false, // 버튼 순서 거꾸로
    }).then(result => {
        if (result.isConfirmed) {
            updateInventory();
        }
    });
};

const updateInventory = () => {
    const data = Array.isArray(orderDirectionDetail.value)
        ? orderDirectionDetail.value.map(item => ({
              productId: String(item.productId),
              supplyId: String(item.supplyId),
              orderId: String(item.orderId),
              warehouseId:
                  selectedWarehouseId.value > 0
                      ? String(selectedWarehouseId.value)
                      : null,
              productCnt: String(item.count),
          }))
        : [];
    axios.post('/api/delivery/orderInventoryUpdate.do', data).then(res => {
        if (res.data.result === 'success') {
            emit('postSuccess');
            Swal.fire({
                icon: 'success',
                title: '발주 완료',
                confirmButtonText: '확인',
            });
        }
    });
};

onMounted(() => {
    id && date && searchDetail();
    searchInventoryList();
});
</script>

<template>
    <div class="ordersListDetail">
        <table>
            <colgroup>
                <col width="5%" />
                <col width="20%" />
                <col width="10%" />
                <col width="10%" />
                <col width="15%" />
                <col width="10%" />
                <col width="10%" />
                <col width="20%" />
            </colgroup>
            <thead>
                <tr>
                    <th scope="col">No.</th>
                    <th scope="col">장비번호</th>
                    <th scope="col">장비구분</th>
                    <th scope="col">모델번호</th>
                    <th scope="col">모델명</th>
                    <th scope="col">판매가격</th>
                    <th scope="col">수량</th>
                    <th scope="col">발주 창고</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="ordersDetailList">
                    <tr
                        v-for="(
                            ordersDetail, index
                        ) in ordersDetailList.orderDirectionDetail"
                        :key="ordersDetail.orderId"
                    >
                        <td>{{ index + 1 }}</td>
                        <td>{{ ordersDetail.categoryNumber }}</td>
                        <td>{{ ordersDetail.categoryName }}</td>
                        <td>{{ ordersDetail.productNumber }}</td>
                        <td>{{ ordersDetail.productName }}</td>
                        <td>{{ ordersDetail.sellPrice }}</td>
                        <td>{{ ordersDetail.count }}</td>
                        <td>
                            <select v-model="selectedWarehouseId">
                                <option value="0">창고 선택</option>
                                <option
                                    v-for="warehouse in warehouseList"
                                    :key="warehouse.warehouseId"
                                    :value="warehouse.warehouseId"
                                >
                                    {{ warehouse.warehouseName }}
                                </option>
                            </select>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
        <div class="button-box">
            <button @click="updateConfirm()">발주 처리</button>
            <button @click="emit('modalClose', '')">닫기</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0px 0px 0px;
    font-size: 18px;
    text-align: left;

    th,
    td {
        padding: 8px;
        text-align: left;
        border-bottom: 1px solid #ddd;
        text-align: center;
    }

    th {
        background-color: #e0e0e0;
        color: #000;
    }

    /* 테이블 올렸을 때 */
    tbody tr:hover {
        background-color: #d3d3d3;
        opacity: 0.9;
        cursor: pointer;
    }
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

select {
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 5px;
    margin-right: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
}
</style>
