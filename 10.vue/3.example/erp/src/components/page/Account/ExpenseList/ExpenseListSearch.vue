<template>
    <div class="search-container">
        <div class="search-box">
            <div>
                <label>신청일자 : </label>
                <input type="date" v-model="searchStDate" />
                <input type="date" v-model="searchEdDate" />
            </div>
            <div>
                <label>승인여부 : </label>
                <select v-model="searchApproval">
                    <option value="">선택</option>
                    <option value="W">검토대기</option>
                    <option value="F">승인대기</option>
                    <option value="S">승인</option>
                    <option value="N">반려</option>
                    <option value="C">취소</option>
                </select>
            </div>
            <div>
                <label>계정대분류 : </label>
                <select v-model="searchGroup">
                    <option value="">선택</option>
                    <option value="AC03">온라인지출</option>
                    <option value="AC04">영업지출</option>
                </select>
            </div>
            <div>
                <label>계정과목 : </label>
                <select v-model="searchDetail">
                    <option value="">선택</option>
                    <option
                        v-for="item in expenseDetailName"
                        :key="item.detail_code"
                        :value="item.detail_code"
                    >
                        {{ item.detail_name }}
                    </option>
                </select>
            </div>

            <button @click="handleSearch">검색</button>
        </div>

        <div class="register-box">
            <button @click="setModalState">신청</button>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import router from '@/router';
import { ref, onMounted } from 'vue';
import { useModalStore } from '../../../../stores/modalState';
const { setModalState } = useModalStore();
const searchGroup = ref('');
const searchDetail = ref('');
const searchStDate = ref('');
const searchEdDate = ref('');
const searchApproval = ref('');
const expenseDetailName = ref([]);

const fetchLoginInfo = async () => {
    try {
        const res = await axios.post(
            '/api/account/expenseLoginInfoBody.do',
            {}
        );
        expenseDetailName.value = res.data.expenseDetailName;
    } catch (e) {
        console.error('사용자 정보 불러오기 실패:', e);
    }
};

const handleSearch = () => {
    const query = [];
    !searchGroup.value || query.push(`searchGroup=${searchGroup.value}`);
    !searchDetail.value || query.push(`searchDetail=${searchDetail.value}`);
    !searchApproval.value ||
        query.push(`searchApproval=${searchApproval.value}`);
    !searchStDate.value || query.push(`searchStDate=${searchStDate.value}`);
    !searchEdDate.value || query.push(`searchEdDate=${searchEdDate.value}`);
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
