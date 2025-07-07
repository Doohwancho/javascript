<template>
    <div class="container">
        <div class="search-box">
            <span class="search-span">기준년월</span>
            <input type="month" v-model="searchPaymentMonth" />
            <!-- v-on:click="" 또는 @click=""으로 이벤트를 설정한다. -->
            <button @click="handleSearch">검색</button>
        </div>
    </div>
</template>
<script setup>
import { inject, } from 'vue';

const searchPaymentMonth = ref('')
const injectedValue = inject('selectValue')

const handleSearch = () => {
    injectedValue.value = {
        searchPaymentMonth: searchPaymentMonth.value,
    }
}
</script>
<style lang="scss" scoped>
.container {
    width: 100%;
    display: flex;
}
.search-box {
  margin-bottom: 10px;
  margin-left: auto; /* 오른쪽 정렬의 핵심 */
}

.search-span {
    font-size: 13px;
    margin-right: 5px;
}

input {
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