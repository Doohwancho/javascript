<template>
    <div class="container">
        <div class="search-box">
            <div class="left-search">
                <div class="date">
                    <span class="search-span">수주일자</span>
                    <input class="start-date" v-model="searchStDate" type="date" />
                    <input type="date" class="end-date" v-model="searchEdDate" />
                </div>
                <div class="product">
                    <span class="search-span">제품명</span>
                    <input type="text" v-model="productName" />
                </div>
            </div>
            <div class="right-search">
                <div class="status">
                    <span class="search-span">수금상태</span>
                    <select class="receivables-select" v-model="receivableStatus">
                        <option value="">전체</option>
                        <option value="N">미수금</option>
                        <option value="Y">수금완료</option>
                    </select>
                </div>
                <div class="client">
                    <span class="search-span">거래처</span>
                    <input type="text" v-model="clientName" />
                </div>
            </div>
        </div>
        <div class="search-button">
            <button @click="handleSearch">조회</button>
        </div>
    </div>
</template>
<script setup>
import { onMounted } from 'vue'
import router from '@/router';
const productName = ref('')
const clientName = ref('')
const searchStDate = ref('')
const searchEdDate = ref('')
const receivableStatus = ref('')
const handleSearch = () => {
    const query = []
    !productName.value || query.push(`productName=${productName.value}`)
    !searchStDate.value || query.push(`searchStDate=${searchStDate.value}`)
    !searchEdDate.value || query.push(`searchEdDate=${searchEdDate.value}`)
    !clientName.value || query.push(`clientName=${clientName.value}`)
    !receivableStatus.value || query.push(`receivableStatus=${receivableStatus.value}`)
    const queryString = query.length > 0 ? `?${query.join('&')}` : ''
    router.push(queryString)
}


onMounted(() => {
    window.location.search && router.replace(window.location.pathname)
})


</script>
<style lang="scss" scoped>
.container {
    width: 100%;
    display: flex;
    margin-bottom: 10px;
    margin-top: 5px;
    justify-content: space-between;
    align-items: center;
}

.search-box {
    margin-bottom: 10px;
    display: flex;
    /* 양쪽 배치 */
    width: 100%;
    gap: 200px;
}

.left-search,
.right-search {
    display: flex;
    flex-direction: column;
    /* 세로로 배치 */
    gap: 20px;
    /* 입력 간 간격 */
}

.search-span {
    font-size: 13px;
    margin-right: 20px;
}

.receivables-select {
    width: 170px;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
}

.start-date {
    margin-right: 15px;
}

input {
    width: 150px;
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