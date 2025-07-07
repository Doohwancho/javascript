<script setup>
import { reactive, ref } from 'vue';
import router from '../../../../router';


const searchId = ref('');
const searchName = ref('');
const searchRegDateStart = ref('');
const searchRegDateEnd = ref('');
const department = ref('');
const jobGrade = ref('');

const PromotionsearchParams = inject('PromotionsearchParams');

const promotionSearch = () => {

    PromotionsearchParams.value.searchName = searchName.value;
    PromotionsearchParams.value.searchRegDateStart = searchRegDateStart.value;
    PromotionsearchParams.value.searchRegDateEnd = searchRegDateEnd.value;
    PromotionsearchParams.value.department = department.value;
    PromotionsearchParams.value.jobGrade = jobGrade.value;
    PromotionsearchParams.value.searchId = searchId.value;

};

const departmentGroupList = [
    { departmentDetailName: '회계부' },
    { departmentDetailName: '영업부' },
    { departmentDetailName: '총무부' },
    { departmentDetailName: '개발2부' },
    { departmentDetailName: '개발1부' },
    { departmentDetailName: '경영진' },
];

const jobGradeGroupList = [
    { jobGradeDetailName: '부장' },
    { jobGradeDetailName: '과장' },
    { jobGradeDetailName: '대리' },
    { jobGradeDetailName: '사원' },
];
</script>
<template>
    <!-- 검색 영역 -->
    <div class="search-box">
        <div class="search-line">
            <label
                >부서
                <select v-model="department">
                    <option value="">전체</option>
                    <option
                        v-for="d in departmentGroupList"
                        :key="d.departmentDetailName"
                        :value="d.departmentDetailName"
                    >
                        {{ d.departmentDetailName }}
                    </option>
                </select>
            </label>

            <label
                >직급
                <select v-model="jobGrade">
                    <option value="">전체</option>
                    <option
                        v-for="j in jobGradeGroupList"
                        :key="j.jobGradeDetailName"
                        :value="j.jobGradeDetailName"
                    >
                        {{ j.jobGradeDetailName }}
                    </option>
                </select>
            </label>

            <label
                >사번
                <input type="text" v-model="searchId" style="height: 20px" />
            </label>

            <label
                >이름
                <input
                    type="text"
                    v-model="searchName"
                    style="height: 20px"
                />
            </label>
        </div>

        <div
            class="search-line"
            style="
                display: flex;
                justify-content: flex-end;
                align-items: center;
            "
        >
            <label>기간별 조회</label>
            <input type="date" v-model="searchRegDateStart" />
            <input type="date" v-model="searchRegDateEnd" />

            <button class="btn-search" @click="promotionSearch" style="height: 30px; background-color: #007bff;; color: #fff; border: 0;">검색</button>
        </div>
    </div>

</template>

<style scoped>
.promotion-container {
    padding: 20px;
    font-family: 'Pretendard', sans-serif;
    color: #333;
}

.page-header {
    margin-bottom: 10px;
    font-size: 14px;
}

.section-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 15px;
}

.search-box {
    border: 1px solid #ddd;
    padding: 15px;
    border-radius: 6px;
    margin-bottom: 20px;
    background-color: #fafafa;
}

.filters {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-bottom: 10px;
}

.filters label {
    display: flex;
    align-items: center;
    gap: 5px;
}

.date-filter {
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: flex-end;
}

input,
select {
    height: 28px;
    padding: 2px 6px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.btn.search {
    background: #007bff;
    color: white;
    border: none;
    padding: 5px 12px;
    border-radius: 4px;
    cursor: pointer;
}

.promotion-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
}

.promotion-table thead {
    background-color: #f0f0f0;
}

.promotion-table th,
.promotion-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
}

.promotion-table tbody tr:hover {
    background-color: #f9f9f9;
}
</style>
