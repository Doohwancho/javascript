<script setup>
import router from '@/router';
import { onMounted } from 'vue';
import { useModalStore } from '../../../../stores/modalState';

const modalState = useModalStore();
const searchTitle = ref('');
const searchStDate = ref('');
const searchEdDate = ref('');

const handlerSearch = () => {
    const query = [];
    !searchTitle.value || query.push(`searchTitle=${searchTitle.value}`);
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
        제목:
        <!-- v-model을 이용하여 양방향 바인딩을 쉽게 할 수 있다. -->
        <input v-model.lazy="searchTitle" />
        <input type="date" v-model.lazy="searchStDate" />
        <input type="date" v-model.lazy="searchEdDate" />
        <!-- v-on:click="" 또는 @click=""으로 이벤트를 설정한다. -->
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
</style>
