<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import Pagination from '../../../common/Pagination.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const ordersReturnList = ref({});
const cPage = ref(1);

const searchOrdersReturnList = () => {
    const param = {
        searchTitle: route.params.searchTitle || '',
        searchKeyword: route.params.searchKeyword || '',
        searchStDate: route.params.searchStDate || '',
        searchEdDate: route.params.searchEdDate || '',
        currentPage: cPage.value,
        pageSize: 5,
    };
    axios.post('/api/tasks/orderReturnListBody.do', param).then(res => {
        ordersReturnList.value = res.data;
    });
};

const updateOrdersReturn = updateoObjParam => {
    const isUpdateOrdersReturn = confirm('반품을 처리하시겠습니다?');
    if (isUpdateOrdersReturn) {
        const param = {
            orderRequestsId: updateoObjParam.orderRequestsId,
            productId: updateoObjParam.productId,
            supplyId: updateoObjParam.supplyId,
            price: updateoObjParam.price,
            count: updateoObjParam.count,
            warehouseId: updateoObjParam.warehouseId,
        };
        axios.post('/api/tasks/ordersReturnUpdateBody.do', param).then(res => {
            if (res.data.result === 'success') {
                searchOrdersReturnList();
            }
        });
        alert(
            `주문번호 ${updateoObjParam.orderRequestsId} 의 반품을 처리하였습니다.`
        );
    }
};

onMounted(() => {
    searchOrdersReturnList();
});

watch(
    () => route.params,
    () => {
        cPage.value = 1;
        searchOrdersReturnList();
    }
);
</script>
<template>
    <div class="divOrderReturnList">
        <table>
            <colgroup>
                <col width="10%" />
                <col width="17%" />
                <col width="18%" />
                <col width="17%" />
                <col width="10%" />
                <col width="14%" />
                <col width="14%" />
            </colgroup>
            <thead>
                <tr>
                    <th>주문번호</th>
                    <th>업체명</th>
                    <th>제품명</th>
                    <th>제품종류</th>
                    <th>반품수량</th>
                    <th>주문일자</th>
                    <th>반품확인</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="ordersReturnList">
                    <template v-if="ordersReturnList.ordersReturnListCnt > 0">
                        <tr
                            v-for="ordersReturn in ordersReturnList.ordersReturnList"
                            :key="ordersReturn.orderRequestsId"
                        >
                            <td>{{ ordersReturn.orderRequestsId }}</td>
                            <td>{{ ordersReturn.supplyName }}</td>
                            <td>{{ ordersReturn.productName }}</td>
                            <td>{{ ordersReturn.detailName }}</td>
                            <td>{{ ordersReturn.count }}</td>
                            <td>
                                {{
                                    ordersReturn.requestsOrderDate.split(' ')[0]
                                }}
                            </td>
                            <td>
                                <template
                                    v-if="
                                        ordersReturn.orderState !== 'return' &&
                                        ordersReturn.returnIsPaid === 0
                                    "
                                    ><button
                                        @click="
                                            updateOrdersReturn(ordersReturn)
                                        "
                                    >
                                        반품처리
                                    </button>
                                </template>
                                <template v-else>반품완료</template>
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
            :totalItems="ordersReturnList?.ordersReturnListCnt || 0"
            :itemsPerPage="5"
            :maxPagesShown="5"
            :onClick="searchOrdersReturnList"
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
