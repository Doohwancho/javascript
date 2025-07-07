<script setup>
import router from '@/router';
import { onMounted, ref } from 'vue';
import {
    useFecthClient,
    useProductListAll,
} from '../../../../hook/common/useSelectBoxQuery';

const searchClientId = ref('');
const searchDeliveryDate = ref('');
const searchEstimateDate = ref('');
const searchProductId = ref('');

//거래처 ,제품, 수주 날짜, 납기 날짜
const searchEstimate = () => {
    const query = [];
    !searchClientId.value ||
        query.push(`searchClientId=${searchClientId.value}`);
    !searchDeliveryDate.value ||
        query.push(`searchDeliveryDate=${searchDeliveryDate.value}`);
    !searchEstimateDate.value ||
        query.push(`searchEstimateDate=${searchEstimateDate.value}`);
    !searchProductId.value ||
        query.push(`searchProductId=${searchProductId.value}`);

    const queryString = query.length > 0 ? `?${query.join('&')}` : '';

    router.push(queryString);
};

onMounted(() => {
    window.location.search && router.replace(window.location.pathname);
});

const { data: clients } = useFecthClient();
const { data: productList } = useProductListAll();
</script>

<template>
    <div>
        <div class="search-box">
            <!-- 거래처, 제품, 수주 날짜 , 납기 날짜  -->
            <label for="">거래처 </label>
            <select v-model="searchClientId">
                <option value="" disabled>전체</option>
                <option
                    v-for="client in clients"
                    :key="client.id"
                    :value="client.id"
                >
                    {{ client.client_name }}
                </option>
            </select>
            <label for="">제품 </label>
            <select v-model="searchProductId">
                <option value="" disabled>전체</option>
                <option
                    v-for="product in productList"
                    :key="product.id"
                    :value="product.id"
                >
                    {{ product.name }}
                </option>
            </select>
            <label for="">수주 날짜</label>
            <input type="date" v-model="searchEstimateDate" />
            <label for="">납기 날짜</label>
            <input type="date" v-model="searchDeliveryDate" />
            <button class="button-box" @click="searchEstimate()">조회</button>
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
    margin-left: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
}

select {
    width: 15%;
    padding: 8px;
    margin-right: 5px;
    margin-left: 5px;
    margin-top: 5px;
    margin-bottom: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
}

label {
    margin-right: 10px;
    margin-left: 10px;
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
