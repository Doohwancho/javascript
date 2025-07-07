<template>
    <div class="container">
        <div class="search-box">
            <div class="search-date">
                <span class="search-span">기간</span>
                <select class="year-select" v-model="startYear">
                    <option v-for="(year, idx) in selectYearList" :key="idx" :value="year">
                        {{ year }} 년
                    </option>
                </select>
                <span class="search-span">~</span>
                <select class="year-select" v-model="endYear">
                    <option v-for="(year, idx) in selectYearList" :key="idx" :value="year">
                        {{ year }} 년
                    </option>
                </select>
            </div>
            <div class="search-button">
                <button @click="handleSearch">조회</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import router from '@/router';
import { onMounted } from 'vue';
const startYear = ref('')
const endYear = ref('')
const selectYearList = ref([])
const setSelectYear = () => {
    const now = new Date();
    const now_year = now.getFullYear()

    const yearList = [...Array(2050 - 1980 + 1)]
        .map((_, index) => 1980 + index);

    selectYearList.value = yearList
    startYear.value = now_year
    endYear.value = now_year
}

const handleSearch = () => {
    console.log(startYear)
    const query = []
    !startYear.value || query.push(`searchStDate=${startYear.value}`)
    !endYear.value || query.push(`searchEdDate=${endYear.value}`)
    const queryString = query.length > 0 ? `?${query.join('&')}` : ''
    router.push(queryString)
}

onMounted(() => {
    setSelectYear()
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


.year-select {
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