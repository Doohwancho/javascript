<template>
    <div class="search-box">
        <span class="search-span">부서명</span>
        <input v-model="searchDepartmentName" placeholder="부서명을 입력하세요" />
        <button @click="handleSearch">조회</button>
        <button @click="setModalState">등록</button>
    </div>
</template>

<script setup>
import { ref, inject } from 'vue';
import { useModalStore } from '../../../../stores/modalState';

// modal 상태를 제어하는 store 함수 가져오기
const { setModalState } = useModalStore();
const injectedValue = inject('selectValue')
// 부서명 검색을 위한 reactive 상태
const searchDepartmentName = ref('');

// 검색 처리 함수
const handleSearch = () => {
    injectedValue.value = {
        searchDepartmentName:searchDepartmentName.value
    }
};

</script>

<style lang="scss" scoped>
.search-box {
    margin-bottom: 10px;
    display: block;
    float: inline-end;
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
