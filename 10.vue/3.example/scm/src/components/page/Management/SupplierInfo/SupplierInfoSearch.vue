<script setup>
import { inject, onMounted } from 'vue';
import { useModalStore } from '../../../../stores/modalState';

const modalState = useModalStore();

const groupCodeSelect = ref('searchSupplier');
const searchTitle = ref('');

const injectedValue = inject('selectValue');
const flag = inject('prFlag');

const handlerSearch = () => {
    flag.value = true;
    injectedValue.value = {
        searchOption: groupCodeSelect.value,
        searchKeyword: searchTitle.value,
    };
};
</script>
<template>
    <div class="search-box">
        <select v-model="groupCodeSelect">
            <option value="searchSupplier">납품업체명</option>
            <option value="searchProduct">제품명</option>
        </select>
        <input v-model.lazy="searchTitle" />
        <button @click="handlerSearch">검색</button>
        <button @click="modalState.modalState = !modalState.modalState">
            등록
        </button>
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
select {
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
    width: 120px;
    text-align: center;
}
</style>
