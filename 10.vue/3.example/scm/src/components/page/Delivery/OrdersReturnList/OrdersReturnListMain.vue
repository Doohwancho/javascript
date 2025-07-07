<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Pagination from '../../../common/Pagination.vue';
import OrdersReturnSubgrid from './OrdersReturnSubgrid.vue';

const route = useRoute();
const modalType = ref('');

const returnList = ref();
const cPage = ref(1);
const supplyId = ref(0);
const orderReturnDate = ref('');

const searchList = () => {
    const param = {
        ...route.query,
        pageSize:"5",
        currentPage: String(cPage.value),
    };

    axios.post('/api/delivery/orderReturnGroupListBody.do', param).then(res => {
        returnList.value = res.data;
    });
};

const handlerSubgrid = (id, date) => {
    if(supplyId.value + orderReturnDate.value === id + date) {
        modalType.value = '';
        supplyId.value = undefined;
        orderReturnDate.value = undefined;
    } else {
        supplyId.value = id;
        orderReturnDate.value = date;
    }  
};

const onPostSuccess = ()=> {
    modalType.value = '';
    searchList();
};

onMounted(() => {
    searchList();
});

watch(() => route.query, searchList);

watch(supplyId, (newVal) => {
    if (newVal) {
        modalType.value = 'ordersReturnListDetail';
    }
});
</script>

<template>
  <div class="divOrdersReturnList">
    <table>
        <colgroup>
            <col width="10%" />
            <col width="30%" />
            <col width="30%" />
            <col width="30%" />
        </colgroup>
        <thead>
            <tr>
                <th scope="col">No.</th>
                <th scope="col">업체명</th>
                <th scope="col">총액</th>
                <th scope="col">반품처리일</th>
            </tr>
        </thead>
        <tbody>
            <template v-if="returnList">
                <template v-if="returnList.orderReturnGroupCnt > 0">
                    <tr
                        v-for="(returnList, index) in returnList.orderReturnGroup"
                        :key="returnList.supplyId + '_' + returnList.orderReturnDate"
                        @click="handlerSubgrid(returnList.supplyId, returnList.orderReturnDate)"
                    >
                        <td>{{ index + 1 }}</td>
                        <td>{{ returnList.supplyName }}</td>
                        <td>{{ returnList.totalAmount }}</td>
                        <td>{{ returnList.orderReturnDate }}</td>
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
        :totalItems="returnList?.orderReturnGroupCnt"
        :items-per-page="5"
        :max-pages-shown="5"
        :onClick="searchList"
        v-model="cPage"
    />
    <OrdersReturnSubgrid 
        v-if="modalType === 'ordersReturnListDetail'"
        :id="supplyId"
        :date="orderReturnDate"
        :key="supplyId + '_' + orderReturnDate"
        @modalClose="modalType=$event"
        @postSuccess="onPostSuccess"
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