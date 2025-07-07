<script setup>
import { ref } from 'vue';

const searchClientName = ref('');
const searchCustUpdateDate = ref('');
const injectedValue = inject('selectValue');
const searchClient = () => {
    injectedValue.value = {
        client_name: searchClientName.value,
        cust_update_date: searchCustUpdateDate.value,
    };
};
</script>

<template>
    <div>
        <label>업체명</label>
        <input type="text" v-model="searchClientName" />
        <label>날짜</label>
        <input type="date" v-model="searchCustUpdateDate" />
        <button @click="searchClient()">조회</button>
    </div>
</template>
<style lang="scss" scoped>
.search-box {
    margin-bottom: 10px;
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
    margin-top: 5px;
    margin-bottom: 10px;
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
