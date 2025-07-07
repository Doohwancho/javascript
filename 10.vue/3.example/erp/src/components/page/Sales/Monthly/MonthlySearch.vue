<template>
    <div class="container">
        <div class="search-box">
            <div class="search-date">
                <span class="search-span">기간</span>
                <input type="month" v-model="searchStDate" />
                <input type="month" v-model="searchEdDate" />
            </div>
            <div class="search-button">
                <button @click="handleSearch">조회</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { getMonth } from '../../../../common/dateForm'
import router from '@/router';
import { onMounted } from 'vue';

const searchStDate = ref('')
const searchEdDate = ref('')

const handleSearch = () => {
    const query = []
    !searchStDate.value || query.push(`searchStDate=${searchStDate.value}`)
    !searchEdDate.value || query.push(`searchEdDate=${searchEdDate.value}`)
    const queryString = query.length > 0 ? `?${query.join('&')}` : ''
    router.push(queryString)
}

onMounted(() => {
    searchEdDate.value = getMonth()
    searchStDate.value = getMonth()
    window.location.search && router.replace(window.location.pathname)
})


</script>
<style lang="scss" scoped>
.container {
    width: 100%;
    display: flex;
    margin-bottom: 10px;
    margin-top: 5px;
}

.search-box {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 15px;
}


.search-date,
.search-button {
    display: flex;
    align-items: center;
    gap: 15px;
    /* 내부 요소 간격 */
}

.search-span {
    font-size: 13px;
}

input {
    width: 200px;
    padding: 8px;
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