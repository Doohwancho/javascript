<script setup>
import axios from 'axios';
import { onMounted, ref, watch } from 'vue';
import Pagination from '../../../common/Pagination.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const shoppingReturnList = ref({});

const cPage = ref(1);
const searchShoppingReturnList = () => {
    const param = {
        searchKeyword: route.params.searchKeyword || '',
        searchStDate: route.params.searchStDate || '',
        searchEdDate: route.params.searchEdDate || '',
        searchTag: 'productName',
        currentPage: cPage.value,
        pageSize: 5,
    };
    axios.post('/api/tasks/shoppingReturnOrderListBody.do', param).then(res => {
        shoppingReturnList.value = res.data;
    });
};

const getIsApprovedStr = isApproved => {
    switch (isApproved) {
        case 0:
            return 'SCM 승인 대기중';
            break;
        case 1:
            return '임원 승인 대기중';
            break;
        case 2:
            return '임원 승인 완료';
            break;
        case 3:
            return '창고 이동 완료';
            break;
        default:
            return;
            break;
    }
};

onMounted(() => {
    searchShoppingReturnList();
});

watch(
    () => route.params,
    () => {
        cPage.value = 1;
        searchShoppingReturnList();
    }
);
</script>
<template>
    <div class="divShoppingReturn">
        <table>
            <colgroup>
                <col width="9%" />
                <col width="22%" />
                <col width="13%" />
                <col width="10%" />
                <col width="13%" />
                <col width="19%" />
                <col width="14%" />
            </colgroup>
            <thead>
                <tr>
                    <th>번호</th>
                    <th>제품명</th>
                    <th>단가</th>
                    <th>개수</th>
                    <th>총 금액</th>
                    <th>처리상태</th>
                    <th>날짜</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="shoppingReturnList">
                    <template
                        v-if="shoppingReturnList.shoppingReturnListCnt > 0"
                    >
                        <tr
                            v-for="shoppingReturn in shoppingReturnList.shoppingReturnList"
                            :key="shoppingReturn.refundId"
                        >
                            <td>{{ shoppingReturn.refundId }}</td>
                            <td>{{ shoppingReturn.productName }}</td>
                            <td>
                                ￦{{
                                    Number(shoppingReturn.price).toLocaleString(
                                        'ko-KR'
                                    )
                                }}
                            </td>
                            <td>{{ shoppingReturn.count }}</td>
                            <td>
                                ￦{{
                                    Number(
                                        shoppingReturn.totalPrice
                                    ).toLocaleString('ko-KR')
                                }}
                            </td>
                            <td>
                                {{
                                    getIsApprovedStr(shoppingReturn.isApproved)
                                }}
                            </td>
                            <td>{{ shoppingReturn.returnsRequestDate }}</td>
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
            :totalItems="shoppingReturnList.shoppingReturnListCnt || 0"
            :itemsPerPage="5"
            :maxPagesShown="5"
            :onClick="searchShoppingReturnList"
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
