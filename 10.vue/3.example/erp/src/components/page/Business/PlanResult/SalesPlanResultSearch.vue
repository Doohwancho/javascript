<script setup>
import router from '@/router';
import { onMounted, ref } from 'vue';
import {
    fetchProductsByManufacturer,
    fetchManufacturers,
    fetchClient,
} from '../../../../common/selectBoxApi';

const searchDate = ref(''); //검색 날짜
const SelectedClient = ref(''); //선택된 고객
const selectedManufacturer = ref(''); // 선택된 제조사
const manufacturer = ref(''); //제조사 목록
const productList = ref([]); //제품 목록
const selectedProduct = ref(''); // 선택된 제품
const clients = ref(''); // 고객 목록
const empId = ref(''); // 사원번호

const searchPlanResult = () => {
    const query = [];
    !selectedManufacturer.value ||
        query.push(`manufacturerId=${selectedManufacturer.value}`);
    !selectedProduct.value || query.push(`productId=${selectedProduct.value}`);
    !searchDate.value || query.push(`targetDate=${searchDate.value}`);
    !SelectedClient.value || query.push(`clientId=${SelectedClient.value}`);
    !empId.value || query.push(`empId=${empId.value}`);

    const queryString = query.length > 0 ? `?${query.join('&')}` : '';

    router.push(queryString);
};

// 제품 선택 이벤트 핸들러

async function handleManufacturerChange() {
    if (selectedManufacturer.value) {
        productList.value = await fetchProductsByManufacturer(
            selectedManufacturer.value
        );
    }
}

onMounted(() => {
    window.location.search && router.replace(window.location.pathname);
});

// 컴포넌트가 마운트될 때 제조사 목록을 가져오기
onMounted(async () => {
    manufacturer.value = await fetchManufacturers();
    clients.value = await fetchClient();
});
</script>
<template>
    <!-- 사번,조회날짜,제품이름,제조사,거래처처 -->
    <div>
        <div class="search-box">
            <label for="">제조사 </label>
            <select
                v-model="selectedManufacturer"
                @change="handleManufacturerChange"
            >
                <option value="" disabled>제조사</option>
                <option
                    v-for="manufacturer in manufacturer"
                    :key="manufacturer.manufacturer_id"
                    :value="manufacturer.manufacturer_id"
                >
                    {{ manufacturer.industryName }}
                </option>
            </select>
            <label for="">제품 이름 </label>
            <!-- 제품 목록 -->
            <select v-model="selectedProduct">
                <option value="" disabled>제품</option>
                <option
                    v-for="product in productList"
                    :key="product.id"
                    :value="product.id"
                >
                    {{ product.name }}
                </option>
            </select>
            <label for="">거래처 </label>
            <select v-model="SelectedClient">
                <option value="" disabled>전체</option>
                <option
                    v-for="client in clients"
                    :key="client.id"
                    :value="client.id"
                >
                    {{ client.client_name }}
                </option>
            </select>
            <label for="">사번 </label>
            <input type="text" v-model="empId" />
            <label for="">날짜 </label>
            <input type="date" v-model="searchDate" />

            <button @click="searchPlanResult">조회</button>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.search-box {
    margin-bottom: 15px;
    margin-top: 15px;
    display: block;
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
    width: 15%;
    padding: 8px;
    margin-right: 10px;
    margin-left: 10px;
    margin-top: 5px;
    margin-bottom: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
}

button {
    margin-left: 20px;
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
