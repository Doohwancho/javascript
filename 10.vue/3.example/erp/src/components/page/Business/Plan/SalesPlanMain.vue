<script setup>
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useUserInfo } from '../../../../stores/userInfo';
import { useModalStore } from '../../../../stores/modalState';
import { onMounted, ref, watch } from 'vue';
import SalesRegisterModal from './SalesRegisterModal.vue';
import SalesDetailModal from './SalesDetailModal.vue';

const salesPlanListData = ref([]);
const salesPlanListCnt = ref(0);
const userId = useUserInfo();
const modalState = useModalStore();
const planNum = ref(0);
const cPage = ref(1);
const route = useRoute();
const modalType = ref('');

const salesPlanDefaultList = () => {
    const param = {
        empId: userId.user.empId,
        pageSize: 5,
        currentPage: cPage.value,
    };
    axios.post('/api/business/sales-plan/getAllSalesPlan', param).then(res => {
        salesPlanListData.value = res.data.searchPlanList || []; // 빈 배열로 초기화
        salesPlanListCnt.value = res.data.salesPlanCnt || 0; // 기본값 0으로 설정
    });
};

const searchList = () => {
    const param = new URLSearchParams({
        ...route.query,
        empId: userId.user.empId,
        pageSize: 5,
        currentPage: cPage.value,
    });
    axios
        .post('/api/business/sales-plan/getSearchSalesPlan', param)
        .then(res => {
            salesPlanListData.value = res.data.searchPlanList || [];
            salesPlanListCnt.value = res.data.salesPlanCnt || 0;
        });
};

// 모달이 성공적으로 닫힌 후 실행될 함수
const onPostSuccess = () => {
    modalState.setModalState(); // 모달 열기
    modalType.value = ''; // 모달 타입 초기화
    salesPlanDefaultList(); // 목록 새로고침
};

// 모달을 여는 함수 (보기 모달)
const handlerModal = id => {
    planNum.value = id;
    modalType.value = 'view'; // 'view' 모달 열기
    modalState.setModalState(true); // 모달 열기
};

// 등록 모달 열기
const openRegisterModal = () => {
    modalType.value = 'register'; // 'register' 모달 열기
    modalState.setModalState(true); // 모달 열기
};
// 페이지 로드 시 기본 판매 계획 목록 불러오기
onMounted(() => {
    salesPlanDefaultList();
});
// watch로 라우트 쿼리 변경을 감지하여 목록을 갱신
watch(() => route.query, searchList);
</script>

<template>
    <div class="divSalesPlanList">
        <!-- 상세보기 모달 -->
        <SalesDetailModal
            v-if="modalState.modalState && modalType === 'view'"
            :id="planNum"
            @modalClose="planNum = $event"
            @postSuccess="onPostSuccess"
        />

        <!-- 등록 모달 -->
        <SalesRegisterModal
            v-if="modalState.modalState && modalType === 'register'"
            @postSuccess="onPostSuccess"
            @modalClose="onModalClose"
        />

        <!-- 신규 등록 버튼 -->
        <div class="button-container">
            <button @click="openRegisterModal()">신규 등록</button>
        </div>
        <!-- 판매 계획 목록 테이블 -->
        <table>
            <thead>
                <tr>
                    <th scope="col">목표날짜</th>
                    <th scope="col">거래처 이름</th>
                    <th scope="col">제조업체</th>
                    <th scope="col">제품코드</th>
                    <th scope="col">제품명</th>
                    <th scope="col">목표수량</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="salesPlanListData.length > 0">
                    <template v-if="salesPlanListCnt > 0">
                        <tr
                            v-for="plan in salesPlanListData"
                            :key="plan.plan_num"
                            @click="handlerModal(plan.plan_num)"
                        >
                            <td>{{ plan.target_date }}</td>
                            <td>{{ plan.client_name }}</td>
                            <td>{{ plan.name }}</td>
                            <td>{{ plan.detail_code }}</td>
                            <td>{{ plan.product_name }}</td>
                            <td>{{ plan.goal_quanti }}</td>
                        </tr>
                    </template>
                </template>
                <template v-else>
                    <tr>
                        <td colspan="6">일치하는 검색 결과가 없습니다</td>
                    </tr>
                </template>
            </tbody>
        </table>

        <!-- 페이징 -->
        <Pagination
            :totalItems="salesPlanListCnt"
            :items-per-page="5"
            :max-pages-shown="5"
            :onClick="salesPlanDefaultList"
            v-model="cPage"
        />
    </div>
</template>

<style lang="scss" scoped>
table {
    width: 100%;

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

    /* 테이블 올렸을 때 */
    tbody tr:hover {
        background-color: #d3d3d3;
        opacity: 0.9;
        cursor: pointer;
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
    border-radius: 5px;
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

/* 버튼을 오른쪽 정렬하기 위한 스타일 */
.button-container {
    display: flex;
    justify-content: flex-end; /* 오른쪽 정렬 */
    margin-bottom: 20px;
}
</style>
