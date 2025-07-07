<script setup>
import axios from 'axios';
import { useModalStore } from '../../../../stores/modalState';
import Swal from 'sweetalert2';

const { id, isApproved } = defineProps(['id', 'isApproved']);
const emit = defineEmits([`modalClose`, 'postSuccess']);
const modalState = useModalStore();

const returnList = ref();
const selectWarehouseValue = ref(0);

const searchDetail = () => {
    axios.post('/api/trade/shoppingReturnListModalBody.do', {orderId: id}).then(res => {
        returnList.value = res.data;
    });
};

const updateReturn = () => {
    const param = {
        refundId: id,
        warehouseId: selectWarehouseValue.value,
    };

    if (selectWarehouseValue.value === 0) {
        Swal.fire({
            icon: "warning",
            title: "창고를 선택해주세요.",
            confirmButtonText: "확인",
        });
        return;
    };

    axios.post('/api/trade/shoppingReturnUpdateMallBody.do', param).then(res => {
        if(res.data.result === "success") {
            emit('postSuccess');
            Swal.fire({
                icon: "success",
                title: "승인 완료",
                confirmButtonText: "확인",
            });
        }
    });
};

onMounted(() => {
    searchDetail();
});

onUnmounted(() => {
    emit('modalClose', 0);
});
</script>

<template>
  <teleport to="body">
    <div class="backdrop">
        <div class="container">
            <h3>{{ isApproved }}</h3>
            <table>
                <colgroup>
                    <col width="5%" />
                    <col width="8%" />
                    <col width="8%" />
                    <col width="8%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="5%" />
                    <col width="12%" />
                    <col width="12%" />
                    <col width="22%" />
                </colgroup>
                <thead>
                    <th scope="col">번호</th>
                    <th scope="col">장비번호</th>
                    <th scope="col">장비구분</th>
                    <th scope="col">모델명</th>
                    <th scope="col">제조사</th>
                    <th scope="col">단가</th>
                    <th scope="col">개수</th>
                    <th scope="col">총 금액</th>
                    <th scope="col">반품신청일</th>
                    <th scope="col">창고</th>
                </thead>
                <tbody>
                    <template v-if="returnList">
                        <tr v-for="shoppingReturn in returnList.shoppingReturn"
                            :key="shoppingReturn.refundId"
                        >
                            <td>{{ shoppingReturn.refundId }}</td>
                            <td>{{ shoppingReturn.productNumber }}</td>
                            <td>{{ shoppingReturn.detailName }}</td>
                            <td>{{ shoppingReturn.productName }}</td>
                            <td>{{ shoppingReturn.supplyName }}</td>
                            <td>{{ shoppingReturn.price }}</td>
                            <td>{{ shoppingReturn.count }}</td>
                            <td>{{ shoppingReturn.totalPrice }}</td>
                            <td>{{ shoppingReturn.returnsRequestDate }}</td>
                            <td>
                                <select v-model="selectWarehouseValue">
                                    <option value="0">창고 선택</option>
                                    <option v-for="warehouse in returnList.warehouseList"
                                        :key="warehouse.warehouseId"
                                        :value="warehouse.warehouseId"
                                    >
                                        {{ warehouse.name }}
                                    </option>
                                </select>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
            <div class="button-box">
                <button @click="updateReturn()">승인하기</button>
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
  table-layout: fixed;
}

th, td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  font-size: 13px;
}

th {
  background: #f4f4f4;
  text-align: center;  
  white-space: nowrap;
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