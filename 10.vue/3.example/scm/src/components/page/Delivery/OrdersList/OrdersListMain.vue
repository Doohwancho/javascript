<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Pagination from '../../../common/Pagination.vue';
import OrdersListSubgrid from './OrdersListSubgrid.vue';

const route = useRoute();
const modalType = ref('');

const ordersList = ref();
const cPage = ref(1);
const supplyId = ref(0);
const orderDirectionDate = ref('');

const searchList = () => {
  const param = {
    ...route.query,
    pageSize:"5",
    currentPage: String(cPage.value),
  }
  axios.post('/api/delivery/orderDirectionGroupListBody.do', param).then(res => {
    ordersList.value = res.data;
  });
};

const handlerSubgrid = (id, date) => {
  if(supplyId.value + orderDirectionDate.value === id + date) {
      modalType.value = '';
      supplyId.value = undefined;
      orderDirectionDate.value = undefined;
  } else {
      supplyId.value = id;
      orderDirectionDate.value = date;
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
        modalType.value = 'ordersListDetail';
    }
});
</script>

<template>
  <div class="divOrdersMain">
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
          <th scope="col">발주처리일</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="ordersList">
          <template v-if="ordersList.orderDirectionGroupCnt > 0">
            <tr 
              v-for="(orders, index) in ordersList.orderDirectionGroup"
              :key="orders.supplyId + '_' + orders.orderDirectionDate"
              @click="handlerSubgrid(orders.supplyId, orders.orderDirectionDate)"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ orders.supplyName }}</td>
              <td>{{ orders.totalAmount }}</td>
              <td>{{ orders.orderDirectionDate }}</td>
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
      :totalItems="ordersList?.orderDirectionGroupCnt"
      :items-per-page="5"
      :max-pages-shown="5"
      :onClick="searchList"
      v-model="cPage"
    />
    <OrdersListSubgrid 
      v-if="modalType === 'ordersListDetail'"
      :id="supplyId"
      :date="orderDirectionDate"
      :key="supplyId + '_' + orderDirectionDate"
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