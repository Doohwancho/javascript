<template>
    <div class="container">
        <div class="search-box">
            <div class="search-select">
                <span class="search-span">거래처명</span>
                <select class="daily-select" v-model="searchClient">
                    <option value="">전체</option>
                    <option v-for="client in clientList" :key="client.id" :value="client.id">
                        {{ client.name }}
                    </option>
                </select>
            </div>
            <div class="search-date">
                <span class="search-span">기간</span>
                <input type="date" v-model="searchDate" />
                <svg-icon @click="getDay(-1)" class="icon" type="mdi" :path="leftPath" :size="24"></svg-icon>
                <button @click="moveToday">오늘</button>
                <svg-icon @click="getDay(1)" class="icon" type="mdi" :path="rightPath" :size="24"></svg-icon>
            </div>
            <div class="search-button">
                <button @click="handleSearch">조회</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import axios from 'axios';
import router from '@/router';
import { onMounted } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiArrowLeftDropCircleOutline, mdiArrowRightDropCircleOutline } from '@mdi/js'
import { formatDate, getToday } from '../../../../common/dateForm';
const clientList = ref([])
const searchClient = ref('')
const searchDate = ref('');
const leftPath = mdiArrowLeftDropCircleOutline
const rightPath = mdiArrowRightDropCircleOutline
const setSelectClient = async () => {
    try {
        const res = await axios.post('/api/business/clientNames')
        clientList.value = res.data
    } catch (e) {
        console.error(e)
    }
}

const handleSearch = () => {
    const query = []
    !searchClient.value || query.push(`clientId=${searchClient.value}`)
    !searchDate.value || query.push(`orderDate=${searchDate.value}`)
    const queryString = query.length > 0 ? `?${query.join('&')}` : ''
    router.push(queryString)
}

const getDay = (day) => {
    const baseDate = new Date(searchDate.value)
    baseDate.setDate(baseDate.getDate() + day);
    const transformDate = formatDate(baseDate)
    searchDate.value = transformDate
}

const moveToday = () => {
    searchDate.value = getToday()
}

onMounted(() => {
    setSelectClient()
    searchDate.value = getToday()
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

.daily-select {
    width: 200px;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
}

.search-box {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 15px;
}

.search-select,
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

.icon {
    cursor: pointer;
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