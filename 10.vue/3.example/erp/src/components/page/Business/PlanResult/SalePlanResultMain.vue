<script setup>
import axios from 'axios';
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
const cPage = ref(1);
const salesPlanResultListData = ref(); // 빈 배열로 초기화
const salesPlanResultListCnt = ref();
const route = useRoute();
// 판매 계획 목록을 불러오는 함수
const salesPlanReultDefaultList = () => {
    const param = {
        empId: route.query.empId || '', // route.query에서 empId 값 가져오기
        clientId: route.query.clientId || '', // route.query에서 clientId 값 가져오기
        targetDate: route.query.targetDate || '', // route.query에서 targetDate 값 가져오기
        productId: route.query.productId || '', // route.query에서 productId 값 가져오기
        manufacturerId: route.query.manufacturerId || '', // route.query에서 manufacturerId 값 가져오기
        pageSize: 5,
        currentPage: cPage.value,
    };
    axios
        .post('/api/business/sales-plan/searchPlanResult.do', param)
        .then(res => {
            salesPlanResultListData.value = res.data.searchPlanResultList;
            salesPlanResultListCnt.value = res.data.salesPlanCnt;
        });
};

onMounted(() => {
    salesPlanReultDefaultList();
});

watch(() => route.query, salesPlanReultDefaultList); // route.query 변경 시 salesPlanReultDefaultList 함수 호출
</script>

<template>
    <div class="divSalesPlanResultList">
        <!-- 판매 계획 목록 테이블 -->
        <table>
            <thead>
                <tr>
                    <th scope="col">이름</th>
                    <th scope="col">날자</th>
                    <th scope="col">제품코드</th>
                    <th scope="col">제품이름</th>
                    <th scope="col">목표수량</th>
                    <th scope="col">실적수량</th>
                    <th scope="col">달성률</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="salesPlanResultListData">
                    <template v-if="salesPlanResultListCnt > 0">
                        <tr
                            v-for="plan in salesPlanResultListData"
                            :key="plan.plan_num"
                        >
                            <td>{{ plan.employee_name }}</td>
                            <td>{{ plan.client_name }}</td>
                            <td>{{ plan.detail_code }}</td>
                            <td>{{ plan.product_name }}</td>
                            <td>{{ plan.goal_quanti }}</td>
                            <td>{{ plan.perform_qut }}</td>
                            <td>
                                {{
                                    Math.round(
                                        (plan.perform_qut / plan.goal_quanti) *
                                            100
                                    )
                                }}%
                            </td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr>
                            <td colspan="7">일치하는 검색 결과가 없습니다</td>
                        </tr>
                    </template>
                </template>
            </tbody>
        </table>

        <!-- 페이징 -->
        <Pagination
            :totalItems="salesPlanResultListCnt"
            :items-per-page="5"
            :max-pages-shown="5"
            :onClick="salesPlanReultDefaultList"
            v-model="cPage"
        />
    </div>
</template>

<style lang="scss" scoped>
table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0px 0px 0px;
    font-size: 18px;
    text-align: left;

    th,
    td {
        padding: 8px;
        text-align: left;
        border-bottom: 1px solid #ddd;
        text-align: center;
    }

    th {
        background: #f4f4f4;
        font-weight: bold;
        color: black;
    }
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
