<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import Pagination from '../../../common/Pagination.vue';
import { useRoute } from 'vue-router';
import TasksOrdersListModal from './TasksOrdersListModal.vue';
import { useModalStore } from '../../../../stores/modalState';

const route = useRoute();
const orderDirectionList = ref({});
const cPage = ref(1);
const modalState = useModalStore();
const orderId = ref(0);

const searchOrderDirectionList = () => {
    const param = {
        searchTag: route.params.searchTag || '',
        searchTitle: route.params.searchTitle || '',
        searchStDate: route.params.searchStDate || '',
        searchEdDate: route.params.searchEdDate || '',
        currentPage: cPage.value,
        pageSize: 5,
    };
    axios.post('/api/tasks/orderDirectionListBody.do', param).then(res => {
        orderDirectionList.value = res.data;
    });
};

const handlerTasksOrdersListModal = id => {
    orderId.value = id;
    modalState.setModalState();
};

const onPostSuccess = () => {
    modalState.setModalState();
};

const updateOrderPaid = id => {
    const isUpdateOrderPaid = confirm('입금을 확인하시겠습니까?');
    if (isUpdateOrderPaid) {
        axios
            .post('/api/tasks/orderPaidUpdateBody.do', { orderId: id })
            .then(res => {
                if (res.data.result === 'success') {
                    searchOrderDirectionList();
                }
            });
        alert(`발주번호 ${id}의 입금을 확인하였습니다.`);
    }
};

onMounted(() => {
    searchOrderDirectionList();
});

watch(
    () => route.params,
    () => {
        cPage.value = 1;
        searchOrderDirectionList();
    }
);
</script>
<template>
    <div class="divOrderDirectionList">
        <TasksOrdersListModal
            v-if="modalState.modalState"
            :id="orderId"
            @modalClose="orderId = $event"
            @postSuccess="onPostSuccess"
        />
        <table>
            <colgroup>
                <col width="11%" />
                <col width="16%" />
                <col width="22%" />
                <col width="13%" />
                <col width="14%" />
                <col width="15%" />
                <col width="9%" />
            </colgroup>
            <thead>
                <tr>
                    <th>발주 번호</th>
                    <th>발주 회사</th>
                    <th>발주 제품</th>
                    <th>발주 수량</th>
                    <th>날짜</th>
                    <th>임원승인여부</th>
                    <th>입금확인</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="orderDirectionList">
                    <template v-if="orderDirectionList.orderDirectionCnt > 0">
                        <tr
                            v-for="orderDirection in orderDirectionList.orderDirection"
                            :key="orderDirection.orderId"
                        >
                            <td
                                class="td-hover"
                                @click="
                                    handlerTasksOrdersListModal(
                                        orderDirection.orderId
                                    )
                                "
                            >
                                {{ orderDirection.orderId }}
                            </td>
                            <td>{{ orderDirection.supplyName }}</td>
                            <td>{{ orderDirection.productName }}</td>
                            <td>{{ orderDirection.count }}</td>
                            <td>{{ orderDirection.orderDate }}</td>
                            <td>
                                {{
                                    orderDirection.isApproved === 0 ? 'N' : 'Y'
                                }}
                            </td>
                            <td>
                                <template v-if="orderDirection.isPaid === 1">
                                    {{ 'Y' }}
                                </template>
                                <template v-else>
                                    <button
                                        @click="
                                            updateOrderPaid(
                                                orderDirection.orderId
                                            )
                                        "
                                    >
                                        확인
                                    </button>
                                </template>
                            </td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr>
                            <td colspan="7">데이터가 존재하지 않습니다.</td>
                        </tr>
                    </template>
                </template>
            </tbody>
        </table>
        <Pagination
            :totalItems="orderDirectionList?.orderDirectionCnt || 0"
            :itemsPerPage="5"
            :maxPagesShown="5"
            :onClick="searchOrderDirectionList"
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
.td-hover {
    cursor: pointer;
    transition: color 0.3s ease;
}
.td-hover:hover {
    text-decoration: underline;
    color: #fe1414;
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
