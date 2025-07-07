<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import router from '@/router';


const categoryList = ref({});
const supplyNameList = ref({});
const searchTitle = ref('');
const categorySelected = ref('searchAll');
const supplyNameSelected = ref('searchAll');

const searchCategory = () => {
    axios.post('/api/mall/products/category').then(res => {
        categoryList.value = res.data.categoryValue;
    })
}

const searchSupplyName = () => {
    axios.post('/api/mall/products/supplyList').then(res => {
        supplyNameList.value = res.data.supplyList;
    })
}

const handlerSearch = () => {
    if(categorySelected.value == 'searchAll') categorySelected.value = '';
    if(supplyNameSelected.value == 'searchAll') supplyNameSelected.value = '';
    const query = [];
    !categorySelected.value || query.push(`searchCategory=${categorySelected.value}`);
    !supplyNameSelected.value || query.push(`searchSupplyName=${supplyNameSelected.value}`);
    !searchTitle.value || query.push(`searchTitle=${searchTitle.value}`);
    const queryString = query.length > 0 ? `?${query.join('&')}` : '';

    router.push(queryString);

    if(categorySelected.value == '') categorySelected.value = 'searchAll';
    if(supplyNameSelected.value == '') supplyNameSelected.value = 'searchAll';
}

onMounted(() => {
    searchCategory();
    searchSupplyName();
    window.location.search && router.replace(window.location.pathname);
})



</script>

<template>
    <div class="search-box">
        <div class="search-container">
            제품 분류:
            <select 
            v-model="categorySelected"
            >
                <option value="searchAll">전체</option>
                <option
                v-for="(category, index) in categoryList"
                :key="index"
                :value="category.detailName"
                >
                {{ category.detailName }}
                </option>
            </select>
            제조사:
            <select
            v-model="supplyNameSelected"
            >
                <option value="searchAll">전체</option>
                <option
                v-for="(supplyName, index) in supplyNameList"
                :key="index"
                :value="supplyName.name"
                > {{ supplyName.name }} 
                </option>
            </select>
            제품명:
            <input 
            type="text"
            v-model="searchTitle"
            />
            <button
            @click="handlerSearch()"
            >검색</button>
        </div>
    </div>
</template>

<style scoped>
.search-box {
    margin-bottom: 10px;
    display: block;
    float: inline-end;
}
.search-container{
    display: flex;
    align-items: center;
    input {
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 5px;
    margin-right: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
}

select{
    height: 32px;
    margin-right: 8px;
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
}
</style>