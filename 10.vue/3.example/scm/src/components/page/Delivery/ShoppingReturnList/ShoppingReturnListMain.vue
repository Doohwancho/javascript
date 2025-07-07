<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useModalStore } from '../../../../stores/modalState';
import ShoppingReturnListModal from './ShoppingReturnListModal.vue';
import Pagination from '../../../common/Pagination.vue';

const route = useRoute();
const modalState = useModalStore();

const deliveryReturnList = ref({});
const refundId = ref(0);
const cPage = ref(1);

const searchList = () => {
    const param = {
        ...route.query,
        pageSize: '5',
        currentPage: String(cPage.value),
    };
    axios.post('/api/delivery/deliveryReturnListBody.do', param).then(res => {
        deliveryReturnList.value = res.data;
        console.log(deliveryReturnList.value);
    });
};

const handlerModal = id => {
    refundId.value = id;
    modalState.setModalState();
};

const onPostSuccess = () => {
    modalState.setModalState();
    searchList();
};

onMounted(() => {
    searchList();
});

watch(() => route.query, searchList);
</script>

<template>
    <div class="divDeliveryReturnList">
        <ShoppingReturnListModal
            v-if="modalState.modalState"
            :id="refundId"
            @modalClose="refundId = $event"
            @postSuccess="onPostSuccess"
        />
        <table>
            <colgroup>
                <col width="10%" />
                <col width="20%" />
                <col width="20%" />
                <col width="30%" />
                <col width="20%" />
            </colgroup>
            <thead>
                <th scope="col">번호</th>
                <th scope="col">업체명</th>
                <th scope="col">총 금액</th>
                <th scope="col">반품처리일</th>
                <th scope="col">처리상태</th>
            </thead>
            <tbody>
                <template v-if="deliveryReturnList">
                    <template
                        v-if="deliveryReturnList.deliveryReturnListCnt > 0"
                    >
                        <tr
                            v-for="returnList in deliveryReturnList.deliveryReturnList"
                            :key="returnList.refundId"
                            @click="handlerModal(returnList.refundId)"
                        >
                            <td>{{ returnList.refundId }}</td>
                            <td>{{ returnList.name }}</td>
                            <td>{{ returnList.totalPrice }}</td>
                            <td>{{ returnList.returnsRequestDate }}</td>
                            <td>임원 승인 완료</td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr>
                            <td colspan="5">일치하는 검색 결과가 없습니다</td>
                        </tr>
                    </template>
                </template>
            </tbody>
        </table>
        <Pagination
            :totalItems="deliveryReturnList?.deliveryReturnListCnt"
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
