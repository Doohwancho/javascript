<script setup>
import { ref } from 'vue';
import axios from 'axios';

const { inventoryId, productId, supplyId, warehouseId } = defineProps(['inventoryId', 'productId', 'supplyId', 'warehouseId']);
const emit = defineEmits([`modalClose`, 'postSuccess']);

const inventoryDetail = ref();

const searchDetail = () => {
    const param = {
        inventoryId: inventoryId,
        productId: productId,
        supplyId: supplyId,
        warehouseId: warehouseId,
    }
    axios.post('/api/trade/inventoryDetailBody.do', param).then(res => {
        inventoryDetail.value = res.data.detailValue;
    });
};

onMounted(() => {
    inventoryId && productId && supplyId && warehouseId && searchDetail();
});
</script>
    
<template>
  <div class="inventoryDetailList">
    <table>
        <colgroup>
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="20%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
        </colgroup>
        <thead>
            <tr>
                <th scope="col">제품명</th>
                <th scope="col">제조사명</th>
                <th scope="col">창고명</th>
                <th scope="col">창고코드</th>
                <th scope="col">창고위치</th>
                <th scope="col">담당자</th>
                <th scope="col" style="color: blue; font-weight: bold;">입고량</th>
                <th scope="col" style="color: red; font-weight: bold;">출고량</th>
                <th scope="col">결과수량</th>
            </tr>
            
        </thead>
        <tbody>
            <tr
                v-for="inventory in inventoryDetail"
                :key="inventory.inventoryId"
            >
                <td>{{ inventory.productName }}</td>
                <td>{{ inventory.supplyName }}</td>
                <td>{{ inventory.warehouseName }}</td>
                <td>{{ inventory.warehouseCode }}</td>
                <td>{{ inventory.warehouseAddress }}</td>
                <td>{{ inventory.warehouseManager }}</td>
                <td style="color: blue; font-weight: bold;">{{ inventory.input }}</td>
                <td style="color: red; font-weight: bold;">{{ inventory.output }}</td>
                <td>{{ inventory.quantity }}</td>
            </tr>
        </tbody>
    </table>
    <div class="button-box">
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
</style>
