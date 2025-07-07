<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import Pagination from '../../../common/Pagination.vue';
import { useRoute } from 'vue-router';
import InventorySubgrid from './InventorySubgrid.vue';

const route = useRoute();
const inventoryList = ref();
const inventoryId = ref(0);
const productId = ref(0);
const supplyId = ref(0);
const warehouseId = ref(0);
const cPage = ref(1);
const modalType = ref('');

const searchList =  () => {
    const param = {
        ...route.query,
        pageSize: 5,
        currentPage: cPage.value,
    };

    axios.post('/api/trade/inventoryListBody.do', param).then(res => {
        inventoryList.value = res.data;       
    });
};

const onPostSuccess = ()=> {
    modalType.value = '';
    searchList();
};

const handlerSubgrid = (inventory, product, supply, warehouse) => {
    if (inventoryId.value === inventory) {
        modalType.value = '';
        inventoryId.value = undefined;
        productId.value = undefined;
        supplyId.value = undefined;
        warehouseId.value = undefined;
    } else {
        inventoryId.value = inventory;
        productId.value = product;
        supplyId.value = supply;
        warehouseId.value = warehouse;
    }
};

onMounted(() => {
    searchList();
});

watch(() => route.query, searchList);

watch(supplyId, (newVal) => {
    if (newVal) {
        modalType.value = 'inventoryDetail';
    }
});
</script>

<template>
  <div class="divInventory">
    <table>
        <colgroup>
            <col width="30%" />
            <col width="20%" />
            <col width="30%" />
            <col width="20%" />
        </colgroup>
        <thead>            
            <tr>
                <th scope="col">제품명</th>
                <th scope="col">제조사명</th>
                <th scope="col">창고명</th>
                <th scope="col">현재재고</th>
            </tr>
        </thead>
        <tbody>
            <template v-if="inventoryList">
                <template v-if="inventoryList.inventoryCnt > 0">
                    <tr 
                        v-for="inventory in inventoryList.inventoryList"
                        :key="inventory.inventoryId"
                        @click="handlerSubgrid(inventory.inventoryId, inventory.productId, inventory.supplyId, inventory.warehouseId)"
                    >
                        <td>{{ inventory.productName }}</td>
                        <td>{{ inventory.supplyName }}</td>
                        <td>{{ inventory.warehouseName }}</td>
                        <td>{{ inventory.quantity }}</td>
                    </tr>
                </template>  
                <template v-else>
                    <tr>
                        <td colspan="4">일치하는 검색 결과가 없습니다</td>
                    </tr>
                </template>              
            </template>
        </tbody>
    </table>
    <Pagination
        :totalItems="inventoryList?.inventoryCnt"
        :items-per-page="5"
        :max-pages-shown="5"
        :onclick="searchList"
        v-model="cPage"
    />
    <InventorySubgrid
        v-if="modalType === 'inventoryDetail'" 
        :inventoryId="inventoryId"
        :productId="productId"
        :supplyId="supplyId"
        :warehouseId="warehouseId"
        :key="inventoryId"
        @modalClose="modalType=$event"
        @postSuccess="onPostSuccess"
    />
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
        background-color: #2676bf;
        color: #ddd;
    }

    /* 테이블 올렸을 때 */
    tbody tr:hover {
        background-color: #d3d3d3;
        opacity: 0.9;
        cursor: pointer;
    }
}
</style>
