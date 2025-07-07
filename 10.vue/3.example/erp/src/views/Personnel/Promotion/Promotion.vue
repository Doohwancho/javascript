<script setup>
import { inject, onMounted, reactive } from 'vue';
import PromotionSearchBar from '../../../components/page/personnel/Promotion/PromotionSearchBar.vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import Pagination from '../../../components/common/Pagination.vue';
import { useQuery } from '@tanstack/vue-query';

// const PromotionList = ref([]);
const FilterPromotionList = ref([]);
const route = useRoute();
const cPage = ref(1);

const PromotionsearchParams = inject('PromotionsearchParams');

const PromotionSearchList = async () => {

    const param = {
        ...PromotionsearchParams.value,
        pageSize: 5,
        currentPage: cPage.value,
    };

    const result =  await axios
        .post(`/api/personnel/promotionListBody`, param, {
            headers: {
                'Content-Type': 'application/json', // JSON 형식으로 전송
            },
        });

        return result.data;

    //AxiosRequest('promotionListBody',param ,PromotionList);
    //FilterPromotionList.value = PromotionList.promotionList.filter(item => item.employeeNumber);

};

const { data : PromotionList, refetch,isLoading } = useQuery({
    queryKey: ['PromotionList',PromotionsearchParams, cPage],
    queryFn: PromotionSearchList,
});


//Axios 요청 함수 
const AxiosRequest =  (UrlInfo, param) => {
    axios
        .post(`/api/personnel/${UrlInfo}`, param, {
            headers: {
                'Content-Type': 'application/json', // JSON 형식으로 전송
            },
        })
        .then(res => {

        })
        .catch(err => {
            console.error('에러 발생:', err);
        });
}

function promotionSearch() {
}


//값읋 감지해서 다른 페이지 있더라도 바로 1페이지로 갈 수 있게끔 
watch(
  () => PromotionsearchParams.value,
  () => {
    cPage.value = 1;
  },
  { deep: true }
);

</script>

<template>

    <div class="promotion-container">
        <div class="page-header">
            🏠
            <span class="nav-path">인사/급여</span> &gt;
            <strong>승진내역 관리</strong>
        </div>

        <h2 class="section-title">승진내역 관리</h2>

        <PromotionSearchBar 
        />

        <!-- 테이블 -->
        <table class="promotion-table">
            <thead>
                <tr>
                    <th>사번</th>
                    <th>사원이름</th>
                    <th>부서코드</th>
                    <th>부서명</th>
                    <th>직급</th>
                    <th>발령일자</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(List, index) in PromotionList?.promotionList" :key="`${List.employeeId}-${index}`">
                    <td>{{ List.employeeNumber }}</td>
                    <td>{{ List.employeeName }}</td>
                    <td>{{ List.departmentCode }}</td>
                    <td>{{ List.departmentDetailName }}</td>
                    <td>{{ List.newJobGrade}}</td>
                    <td>{{ List.createdAt }}</td>
                    <td v-if="isLoading">...로딩중</td>
                </tr>
            </tbody>
        </table>
        <Pagination
            :totalItems="PromotionList?.promotionCnt"
            :items-per-page="5"
            :max-pages-shown="5"
            :onClick="refetch"
            v-model="cPage"
         />
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

</style>
