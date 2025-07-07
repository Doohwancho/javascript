<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import router from '@/router';

const productList = ref();
const supplyList = ref();
const warehouseList = ref();
const searchProduct = ref('');
const searchSupply = ref('');
const searchWarehouse = ref('');

const searchList = () => {
    const param = {
        searchProduct: searchProduct.value,
        searchSupply: searchSupply.value,
        searchWarehouse: searchWarehouse.value,
    };
    axios.post('/api/trade/inventorySelectBoxBody.do', param).then(res => {
        productList.value = res.data.detailValue.productList;
        supplyList.value = res.data.detailValue.supplyList;
        warehouseList.value = res.data.detailValue.warehouseList;
    });
};

const handlerSearch = () => {
    const query = [];
    !searchProduct.value || query.push(`searchProduct=${searchProduct.value}`);
    !searchSupply.value || query.push(`searchSupply=${searchSupply.value}`);
    !searchWarehouse.value ||
        query.push(`searchWarehouse=${searchWarehouse.value}`);
    const queryString = query.length > 0 ? `?${query.join('&')}` : '';

    router.push(queryString);
};

onMounted(() => {
    searchList();
    window.location.search && router.replace(window.location.pathname);
});
</script>

<template>
    <div class="search-box">
        제품명:
        <select v-model.lazy="searchProduct">
            <option value="">전체</option>
            <option
                v-for="product in productList"
                :key="product.selectBoxId"
                :value="product.selectBoxId"
            >
                {{ product.selectBoxName }}
            </option>
        </select>
        제조사명:
        <select v-model.lazy="searchSupply">
            <option value="">전체</option>
            <option
                v-for="supply in supplyList"
                :key="supply.selectBoxId"
                :value="supply.selectBoxId"
            >
                {{ supply.selectBoxName }}
            </option>
        </select>
        창고명:
        <select v-model.lazy="searchWarehouse">
            <option value="">전체</option>
            <option
                v-for="warehouse in warehouseList"
                :key="warehouse.selectBoxId"
                :value="warehouse.selectBoxId"
            >
                {{ warehouse.selectBoxName }}
            </option>
        </select>
        <button @click="handlerSearch()">검색</button>
    </div>
</template>

<style lang="scss" scoped>
.search-box {
    margin-bottom: 10px;
    display: block;
    float: inline-end;
}

input {
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 5px;
    margin-right: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
}

select {
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 5px;
    margin-right: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
}

button {
    text-align: center;
    text-decoration: none;
    display: inline-block;
    border: none;
    color: white;
    width: 70px;
    padding-top: 8px;
    padding-bottom: 8px;
    font-size: 12px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 12px;
    box-shadow: 0 4px #999;
    background-color: #3bb2ea;

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
