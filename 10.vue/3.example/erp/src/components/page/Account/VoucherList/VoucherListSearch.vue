<template>
    <div class="search-container">
        <div class="search-box">
            <div>
                <label>일자 : </label>
                <input type="date" v-model="searchStDate" />
                <input type="date" v-model="searchEdDate" />
            </div>
            <div>
                <label>구분 : </label>
                <select v-model="searchType">
                    <option value="">선택</option>
                    <option value="sales">매출</option>
                    <option value="expense">비용</option>
                </select>
            </div>
            <div>
                <label>거래처명 : </label>
                <select v-model="searchClientName">
                    <option value="">선택</option>
                    <option
                        v-for="item in clientList"
                        :key="item.clientName"
                        :value="item.clientName"
                    >
                        {{ item.clientName }}
                    </option>
                </select>
            </div>
            <div>
                <label>차변계정과목 : </label>
                <select v-model="searchDebitName">
                    <option value="">선택</option>
                    <option
                        v-for="item in expenseDetailName"
                        :key="item.detail_name"
                        :value="item.detail_name"
                    >
                        {{ item.detail_name }}
                    </option>
                </select>
            </div>
            <div>
                <label>대변계정과목 : </label>
                <select v-model="searchCrebitName">
                    <option value="">선택</option>
                    <option
                        v-for="item in crebitList"
                        :key="item.detail_name"
                        :value="item.detail_name"
                    >
                        {{ item.detail_name }}
                    </option>
                </select>
            </div>

            <button @click="handleSearch">검색</button>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import router from '@/router';
import { ref, onMounted } from 'vue';
const searchStDate = ref('');
const searchEdDate = ref('');
const searchType = ref('expense');
const searchClientName = ref('');
const searchDebitName = ref('');
const searchCrebitName = ref('');
const crebitList = ref([]);
const expenseDetailName = ref([]);
const clientList = ref([]);

const fetchLoginInfo = async () => {
    try {
        const res = await axios.post(
            '/api/account/expenseLoginInfoBody.do',
            {}
        );
        crebitList.value = res.data.crebitList;
        expenseDetailName.value = res.data.expenseDetailName;
        clientList.value = res.data.clientList;
    } catch (e) {
        console.error('사용자 정보 불러오기 실패:', e);
    }
};

const handleSearch = () => {
    const query = [];
    !searchStDate.value || query.push(`searchStDate=${searchStDate.value}`);
    !searchEdDate.value || query.push(`searchEdDate=${searchEdDate.value}`);
    !searchType.value || query.push(`searchType=${searchType.value}`);
    !searchClientName.value ||
        query.push(`searchClientName=${searchClientName.value}`);
    !searchDebitName.value ||
        query.push(`searchDebitName=${searchDebitName.value}`);
    !searchCrebitName.value ||
        query.push(`searchCrebitName=${searchCrebitName.value}`);
    const queryString = query.length > 0 ? `?${query.join('&')}` : '';

    router.push(queryString);
};

onMounted(() => {
    fetchLoginInfo();
    window.location.search && router.replace(window.location.pathname);
});
</script>

<style lang="scss" scoped>
.search-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.search-box {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 12px 15px;
    margin: 10px 0;
}

.register-box {
    display: flex;
    justify-content: flex-end;
}

select,
input {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
}

button {
    width: 70px;
    padding: 8px;
    font-size: 12px;
    cursor: pointer;
    border-radius: 12px;
    box-shadow: 0 4px #999;
    background-color: #3bb2ea;
    color: white;
    border: none;

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
