<script setup>
import { ref, watch } from 'vue';
import router from '@/router';
import { useRoute } from 'vue-router';

const route = useRoute();

const searchTag = ref('supplyName');
const searchTitle = ref('');
const searchStDate = ref('');
const searchEdDate = ref('');

const options = [
    { label: '발주업체', value: 'supplyName' },
    { label: '제품명', value: 'productName' },
    { label: '미승인', value: 'notApproved' },
    { label: '승인', value: 'approved' },
];

const handlerSearchOrderDirectionList = () => {
    const searchParamObj = {
        searchTag: searchTag.value,
        searchTitle: searchTitle.value,
        searchStDate: searchStDate.value,
        searchEdDate: searchEdDate.value,
    };

    router.push({ params: { ...searchParamObj } });
};

onMounted(() => {
    window.location.search && router.replace(window.location.pathname);
});

watch(
    () => route.params,
    () => {
        if (Object.keys(route.params).length === 0) {
            searchTag.value = 'supplyName';
            searchTitle.value = '';
            searchStDate.value = '';
            searchEdDate.value = '';
        }
    }
);
</script>
<template>
    <div class="search-box">
        <select v-model.lazy="searchTag">
            <option
                v-for="option in options"
                :key="option.value"
                :value="option.value"
            >
                {{ option.label }}
            </option>
        </select>
        <input v-model.lazy="searchTitle" />
        <span>
            <input type="date" v-model.lazy="searchStDate" />
            ~
            <input type="date" v-model.lazy="searchEdDate"
        /></span>
        <button @click="handlerSearchOrderDirectionList">검색</button>
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
