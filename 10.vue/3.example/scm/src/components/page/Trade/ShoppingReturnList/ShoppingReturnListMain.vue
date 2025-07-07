<script setup>
import axios from 'axios';
import { ref } from 'vue';
import Pagination from '../../../common/Pagination.vue';
import ShoppingReturnListModal from './ShoppingReturnListModal.vue';
import { useModalStore } from '../../../../stores/modalState';
import { useRoute } from 'vue-router';

const route = useRoute();
const shoppingReturnList = ref();
const cPage = ref(1);
const refundId = ref(0);
const modalState = useModalStore();
const isApprovalText = ref("");

const searchList = () => {
    const param = {
        ...route.query,
        pageSize: 5,
        currentPage: cPage.value,
    };
    axios.post('/api/trade/shoppingReturnListBody.do', param).then(res => {
        shoppingReturnList.value = res.data;
    });
};

const getApprovalStatusText = (status) => {
    switch (status) {
        case 0: return "SCM 승인 대기중";
        case 1: return "임원 승인 대기중";
        case 2: return "임원 승인 완료";
        case 3: return "창고 이동 완료";
        default: return "알 수 없는 상태";
    }
};

const handlerModal = (id, isApprovedText) => {
    refundId.value = id;
    isApprovalText.value = isApprovedText;
    modalState.setModalState();
};

const onPostSuccess = ()=> {
    modalState.setModalState();
    searchList();
};

onMounted(() => {
    searchList();
});

watch(() => route.query, searchList);
</script>

<template>
  <div class="divShoppingReturnList">
    <ShoppingReturnListModal v-if="modalState.modalState"
        :id="refundId"
        :isApproved="isApprovalText"
        @modalClose="refundId=$event"
        @postSuccess="onPostSuccess"
    />
    <table>
        <colgroup>
            <col width="5%" />
            <col width="15%" />
            <col width="20%" />
            <col width="15%" />
            <col width="5%" />
            <col width="10%" />
            <col width="10%" />
            <col width="15%" />
        </colgroup>
        <thead>
            <tr>
                <th scope="col">번호</th>
                <th scope="col">업체명</th>
                <th scope="col">제품명</th>
                <th scope="col">단가</th>
                <th scope="col">개수</th>
                <th scope="col">총 가격</th>
                <th scope="col">반품신청일</th>
                <th scope="col">처리상태</th>
            </tr>
        </thead>
        <tbody>
            <template v-if="shoppingReturnList">
                <template v-if="shoppingReturnList.shoppingReturnListCnt > 0">
                    <tr v-for="shoppingReturnList in shoppingReturnList.shoppingReturnList"
                        :key="shoppingReturnList.refundId"
                        @click="handlerModal(shoppingReturnList.refundId, getApprovalStatusText(shoppingReturnList.isApproved))"    
                    >
                        <td>{{ shoppingReturnList.refundId }}</td>
                        <td>{{ shoppingReturnList.name }}</td>
                        <td>{{ shoppingReturnList.productName }}</td>
                        <td>{{ shoppingReturnList.price }}</td>
                        <td>{{ shoppingReturnList.count }}</td>
                        <td>{{ shoppingReturnList.totalPrice }}</td>
                        <td>{{ shoppingReturnList.returnsRequestDate }}</td>
                        <td>{{ getApprovalStatusText(shoppingReturnList.isApproved) }}</td>
                    </tr>
                </template>
                <template v-else>
                    <tr>
                        <td colspan="8">일치하는 검색 결과가 없습니다</td>
                    </tr>
                </template>
            </template>
        </tbody>
    </table>
    <Pagination
        :totalItems="shoppingReturnList?.shoppingReturnListCnt"
        :items-per-page="5"
        :max-pages-shown="5"
        :onClick="searchList"
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
        background-color: #2676bf;
        color: #ddd;
    }

    /* 테이블 올렸을 때 */
    tbody tr:hover {
        background-color: #d3d3d3;
        opacity: 0.9;
        cursor: pointer;
    }
}
</style>