<script setup>
import axios from 'axios';
import { onMounted, ref, watch } from 'vue';
import Pagination from '../../../common/Pagination.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const approvalShoppingReturn = ref({});

const cPage = ref(1);
const searchApprovalShoppingReturn = () => {
    const param = {
        searchTitle: route.params.searchTitle || '',
        searchStDate: route.params.searchStDate || '',
        searchEdDate: route.params.searchEdDate || '',
        currentPage: cPage.value,
        pageSize: 5,
    };
    axios.post('/api/approval/shoppingReturnListBody.do', param).then(res => {
        approvalShoppingReturn.value = res.data;
    });
};

onMounted(() => {
    searchApprovalShoppingReturn();
});

const UpdateShoppingReturnApprove = id => {
    const isUpdateShoppingReturnApprove = confirm('반품승인 처리하시겠습니까?');
    if (isUpdateShoppingReturnApprove) {
        axios
            .post('/api/approval/shoppingReturnApproveUpdateBody.do', {
                shoppingReturnId: id,
            })
            .then(res => {
                if (res.data.result === 'success') {
                    searchApprovalShoppingReturn();
                }
            });
        alert(`반품번호 ${id}의 반품을 승인 처리하였습니다.`);
    }
};

watch(
    () => route.params,
    () => {
        cPage.value = 1;
        searchApprovalShoppingReturn();
    }
);
</script>
<template>
    <div class="divApprovalShoppingReturnMain">
        <table>
            <colgroup>
                <col width="15%" />
                <col width="15%" />
                <col width="14%" />
                <col width="14%" />
                <col width="14%" />
                <col width="14%" />
                <col width="14%" />
            </colgroup>
            <thead>
                <tr>
                    <th>반품고객</th>
                    <th>제품명</th>
                    <th>구매일</th>
                    <th>반품일</th>
                    <th>수량</th>
                    <th>금액</th>
                    <th>반품승인</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="approvalShoppingReturn">
                    <template
                        v-if="approvalShoppingReturn.shoppingReturnCnt > 0"
                    >
                        <tr
                            v-for="approvalShoppingReturn in approvalShoppingReturn.shoppingReturn"
                            :key="approvalShoppingReturn.refundId"
                        >
                            <td>{{ approvalShoppingReturn.userName }}</td>
                            <td>{{ approvalShoppingReturn.productName }}</td>
                            <td>{{ approvalShoppingReturn.shoppingDate }}</td>
                            <td>{{ approvalShoppingReturn.shoppingDate }}</td>
                            <td>{{ approvalShoppingReturn.count }}</td>
                            <td>
                                ￦{{
                                    Number(
                                        approvalShoppingReturn.price
                                    ).toLocaleString('ko-KR')
                                }}
                            </td>
                            <td>
                                <template
                                    v-if="
                                        approvalShoppingReturn.isApproved === 1
                                    "
                                    >반품승인완료</template
                                >
                                <template v-else
                                    ><button
                                        @click="
                                            UpdateShoppingReturnApprove(
                                                approvalShoppingReturn.refundId
                                            )
                                        "
                                    >
                                        반품승인
                                    </button></template
                                >
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
            :totalItems="approvalShoppingReturn?.shoppingReturnCnt || 0"
            :itemsPerPage="5"
            :maxPagesShown="5"
            :onClick="searchApprovalShoppingReturn"
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
