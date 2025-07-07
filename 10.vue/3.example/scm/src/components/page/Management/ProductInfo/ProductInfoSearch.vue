<script setup>
import { useModalStore } from '../../../../stores/modalState';
import router from '@/router';

const modalState = useModalStore();
const searchOption = ref('searchProduct');
const searchKeyword = ref('');


/* ===================== handler ===================== */
const handlerSearch = () => {
    const query = [];
    !searchKeyword.value || query.push(`searchKeyword=${searchKeyword.value}`);
    !searchOption.value || query.push(`searchOption=${searchOption.value}`);
    const queryString = query.length > 0 ? `?${query.join('&')}` : '';

    router.push(queryString);
}

/* =========================== hook: 생명주기 ============================== */

onMounted(() => {
    window.location.search && router.replace(window.location.pathname);
});
</script>

<template>
    <div class="search-box">
        <div class="search-container">        
            <select v-model="searchOption">
                <option value="searchProduct">제품명</option>
                <option value="searchSupplier">납품업체</option>
            </select>
            <input v-model.lazy="searchKeyword"/>
            <button @click="handlerSearch">검색</button>
            <button @click="modalState.setModalState()">등록</button>

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