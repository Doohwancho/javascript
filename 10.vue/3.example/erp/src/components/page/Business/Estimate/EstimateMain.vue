<script setup>
import axios from 'axios';
import { useRoute } from 'vue-router';
import { onMounted, ref, watch, watchEffect } from 'vue';
import { useModalStore } from '../../../../stores/modalState';
import EstimateDetailModal from './EstimateDetailModal.vue';
import EstimateRegisModal from './EstimateRegisModal.vue';
import { useQuery } from '@tanstack/vue-query';
const estimateList = ref();
const estimateCnt = ref();
const cPage = ref(1);
const modalType = ref('');
const modalState = useModalStore();
const selectedEstimateId = ref(null);
const selectedClientId = ref(null);
const route = useRoute();
const injectedValue = inject('selectValue');

// 견적서 목록 불러오기 (검색 조건 포함)
const loadEstimateList = async () => {
    const param = {
        currentPage: cPage.value,
        pageSize: 5,
        ...injectedValue.value,
    };

    const result = await axios.post(
        '/api/business/estimate-list/estimateListBody.do',
        param
    );
    return result.data;
};

const { data: estimate, isSuccess } = useQuery({
    queryKey: ['estimate', cPage, injectedValue],
    queryFn: loadEstimateList,
});

watchEffect(() => {
    if (isSuccess && estimate.value) {
        estimateList.value = estimate.value.estimateList;
        estimateCnt.value = estimate.value.estimateCnt;
    }
});

// 모달 성공 처리
const onPostSuccess = () => {
    modalState.setModalState(); // 모달 닫기
    modalType.value = ''; // 모달 타입 초기화
    loadEstimateList(); // 데이터 새로고침
};

// 등록 모달 열기
const registerEstiModal = () => {
    modalType.value = 'register';
    modalState.setModalState(true);
};

// 상세 보기 모달
const detailEst = (clientId, id) => {
    modalType.value = 'view';
    modalState.setModalState(true);
    selectedEstimateId.value = id;
    selectedClientId.value = clientId;
};

onMounted(() => {
    loadEstimateList(); // 페이지 로드 시 데이터 불러오기
});
</script>

<template>
    <div>
        <!-- 상세 보기 모달 -->
        <EstimateDetailModal
            v-if="modalState.modalState && modalType === 'view'"
            :estimateId="selectedEstimateId"
            :clientId="selectedClientId"
            @modalClose="onModalClose"
            @postSuccess="onPostSuccess"
        />

        <!-- 등록 모달 -->
        <EstimateRegisModal
            v-if="modalState.modalState && modalType === 'register'"
            @postSuccess="onPostSuccess"
            @modalClose="onModalClose"
        />

        <!-- 신규 등록 버튼 -->
        <div class="button-container">
            <button @click="registerEstiModal()">견적서 등록</button>
        </div>
        <table>
            <thead>
                <tr>
                    <th scope="col">담당자</th>
                    <th scope="col">날짜</th>
                    <th scope="col">거래처</th>
                    <th scope="col">제품</th>
                    <th scope="col">납기일자</th>
                    <th scope="col">납품수량</th>
                    <th scope="col">단가 총금액</th>
                    <th scope="col">세액</th>
                    <th scope="col">총 금액</th>
                    <th scope="col">영역구분</th>
                    <th scope="col">상세조회</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="estimateList">
                    <template v-if="estimateCnt > 0">
                        <tr v-for="est in estimateList" :key="est.id">
                            <td>{{ est.estimateEmpName }}</td>
                            <td>{{ est.estimateDate }}</td>
                            <td>{{ est.clientName }}</td>
                            <td>{{ est.productName }}</td>
                            <td>{{ est.deliveryDate }}</td>
                            <td>{{ est.totalDeliveryCount }}</td>
                            <td>{{ est.totalSupplyPrice.toLocaleString() }}</td>
                            <td>{{ est.totalTax.toLocaleString() }}</td>
                            <td>{{ est.depositAmount.toLocaleString() }}</td>
                            <td>{{ est.salesArea }}</td>
                            <td>
                                <button
                                    @click="detailEst(est.clientId, est.id)"
                                >
                                    상세조회
                                </button>
                            </td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr>
                            <td colspan="10">일치하는 검색 결과가 없습니다</td>
                        </tr>
                    </template>
                </template>
            </tbody>
        </table>

        <!-- 페이징 -->
        <Pagination
            :totalItems="estimateCnt"
            :items-per-page="5"
            :max-pages-shown="5"
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
    width: 100px;
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

/* 버튼을 오른쪽 정렬하기 위한 스타일 */
.button-container {
    display: flex;
    justify-content: flex-end; /* 오른쪽 정렬 */
    margin-bottom: 20px;
}
</style>
