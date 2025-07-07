<script setup>
import { useModalStore } from '../../../../stores/modalState';
import { inject } from 'vue';

const modalState = useModalStore();

const groupCodeSelect = ref('name');
const searchTitle = ref('');
const deleteInfoCheck = ref(false);

const injectedValue = inject('selectValue');
const flag = inject('prFlag');

const handlerSearch = infor => {
    infor
        ? (deleteInfoCheck.value = !deleteInfoCheck.value)
        : (flag.value = true);
    injectedValue.value = {
        inforAll: deleteInfoCheck.value ? 1 : 0,
        groupCodeSelect: groupCodeSelect.value,
        searchTitle: searchTitle.value,
    };
};
</script>
<template>
    <div class="search-box">
        <select v-model="groupCodeSelect">
            <option value="name">직원명/성명</option>
            <option value="manager">담당자</option>
            <option value="userClass">담당업무</option>
        </select>
        <input v-model.lazy="searchTitle" />
        삭제된 정보 표시
        <input type="checkbox" @click="handlerSearch(true)" />
        <button @click="handlerSearch(false)">검색</button>
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
