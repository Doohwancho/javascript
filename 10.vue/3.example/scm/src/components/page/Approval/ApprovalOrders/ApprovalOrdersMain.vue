<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import Pagination from '../../../common/Pagination.vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const orderList = ref({});

const cPage = ref(1);

const searchApprovalOrders = () => {
    const param = {
        searchTitle: route.params.searchTitle || '',
        searchStDate: route.params.searchStDate || '',
        searchEdDate: route.params.searchEdDate || '',
        currentPage: cPage.value,
        pageSize: 5,
    };
    axios.post('/api/approval/orderListBody.do', param).then(res => {
        orderList.value = res.data;
    });
};

const orderApproveUpdate = id => {
    const isUpdateOrderApprove = confirm('구매승인 처리하시겠습니까?');
    if (isUpdateOrderApprove) {
        axios
            .post('/api/approval/orderApproveUpdateBody.do', { orderId: id })
            .then(res => {
                if (res.data.result === 'success') {
                    searchApprovalOrders();
                }
            });
        alert(`발주번호 ${id}의 구매를 승인 처리하였습니다.`);
    }
};

onMounted(() => {
    searchApprovalOrders();
});

watch(
    () => route.params,
    () => {
        cPage.value = 1;
        searchApprovalOrders();
    }
);
</script>
<template>
    <div class="divApprovalOrdersMain">
        <table>
            <colgroup>
                <col width="18%" />
                <col width="18%" />
                <col width="16%" />
                <col width="16%" />
                <col width="16%" />
                <col width="16%" />
            </colgroup>
            <thead>
                <tr>
                    <th>발주업체명</th>
                    <th>제품명</th>
                    <th>수량</th>
                    <th>금액</th>
                    <th>구매일자</th>
                    <th>구매승인</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="orderList">
                    <template v-if="orderList.orderCnt > 0">
                        <tr
                            v-for="order in orderList.orderList"
                            :key="order.orderId"
                        >
                            <td>{{ order.supplyName }}</td>
                            <td>{{ order.productName }}</td>
                            <td>{{ order.count }}</td>
                            <td>
                                ￦{{
                                    Number(order.price).toLocaleString('ko-KR')
                                }}
                            </td>
                            <td>{{ order.orderDate }}</td>
                            <td>
                                <template v-if="order.isApproved === 1"
                                    >구매승인완료</template
                                >
                                <template v-else>
                                    <button
                                        @click="
                                            orderApproveUpdate(order.orderId)
                                        "
                                    >
                                        구매승인
                                    </button>
                                </template>
                            </td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr>
                            <td colspan="6">데이터가 존재하지 않습니다.</td>
                        </tr>
                    </template>
                </template>
            </tbody>
        </table>
        <Pagination
            :totalItems="orderList.orderCnt"
            :itemsPerPage="5"
            :maxPagesShown="5"
            :onclick="searchApprovalOrders"
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
