<script setup>
import { onMounted, ref } from 'vue';
import router from '@/router';

const searchOption = ref('');
const searchKeyword = ref('');
const searchStDate = ref('');
const searchEdDate = ref('');

const handlerSearch = () => {
    const query = [];
    !searchOption.value || query.push(`searchOption=${searchOption.value}`);
    !searchKeyword.value || query.push(`searchKeyword=${searchKeyword.value}`);
    !searchStDate.value || query.push(`searchStDate=${searchStDate.value}`);
    !searchEdDate.value || query.push(`searchEdDate=${searchEdDate.value}`);
    const queryString = query.length > 0 ? `?${query.join('&')}` : '';

    router.push(queryString);
};

onMounted(() => {
    window.location.search && router.replace(window.location.pathname);
});
</script>

<template>
    <div class="search-box">
        선택:
        <select v-model="searchOption">
            <option value="">전체</option>
            <option value="searchProduct">반품제품명</option>
            <option value="searchReturnDate">반품신청날짜</option>
        </select>
        <template v-if="searchOption === ''">
            검색어:
            <input
                v-model.lazy="searchKeyword"
                placeholder="검색어를 입력하세요."
            />
            기간:
            <span>
                <input type="date" v-model.lazy="searchStDate" />
                ~
                <input type="date" v-model.lazy="searchEdDate" />
            </span>
        </template>
        <template v-else-if="searchOption === 'searchProduct'">
            검색어:
            <input
                v-model.lazy="searchKeyword"
                placeholder="검색어를 입력하세요."
            />
        </template>
        <template v-else-if="searchOption === 'searchReturnDate'">
            기간:
            <input type="date" v-model.lazy="searchStDate" />
            ~
            <input type="date" v-model.lazy="searchEdDate" />
        </template>
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
