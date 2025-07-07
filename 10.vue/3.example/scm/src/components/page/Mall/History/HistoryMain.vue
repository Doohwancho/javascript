<script setup>
import axios from 'axios';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useHistoryStore } from '../../../../stores/historyState'

const cPage = ref(1);
const route = useRoute();
const historyList = ref({});
const historyState = useHistoryStore();


const searchList = () => {
    const param = {
        ...route.query
        , currentPage: cPage.value
        , pageSize: 5
    };
    axios.post('/api/mall/historyListBody.do', param).then(res => {
        historyList.value = res.data;
    });
}

const getSalesStateText = (state) => {
  const salesStateMap = {
    salesRequest: '주문 완료',
    delivery: '배송 중',
    deliveryComplete: '배송 완료',
    salesComplete: '구매 확인',
    mallReturnsRequest: '반품 신청',
    mallReturnsComplete: '반품 완료',
  };
  return salesStateMap[state] || '';
};

watch(() => route.query, searchList);

watch(() => historyState.rendering, (val) => {
    if(val){
        searchList();
        historyState.reset();
    }
})

onMounted(() => {
    historyState.detailState = false;
    searchList();
})

</script>

<template>
    <div>
        현재 페이지: {{ cPage }} 총 개수 : {{ historyList.historyCnt }}
        <div>
            <table class="col">
                <colgroup>
                    <col width="14%">
                    <col width="14%">
                    <col width="14%">
                    <col width="15%">
                    <col width="14%">
                    <col width="15%">
                    <col width="14%">
                </colgroup>

                <!-- 리스트 제목행 -->
                <thead>
                    <tr>
                        <th scope="col">주문 번호</th>
                        <th scope="col">결제 금액</th>
                        <th scope="col">주문 일자</th>
                        <th scope="col">주문 상태</th>
                        <th scope="col">배송 희망 일자</th>
                        <th scope="col">배송 상태</th>
                        <th scope="col">비고</th>
                    </tr>
                </thead>

                <!-- 리스트 내용행 -->
                <tbody>
                    <template v-if="historyList">
                        <template v-if="historyList.historyCnt > 0">
                            <tr 
                            v-for="history in historyList.history"
                            :key="history.orderId"
                            >
                                <td> {{ history.orderId }} </td>
                                <td> {{ (history.price*history.count).toLocaleString() }} </td>
                                <td> {{ history.salesDate.slice(0, 10) }} </td>
                                <td> {{ getSalesStateText(history.salesState) }} </td>
                                <td> {{ history.requestedDeliveryDate.slice(0, 10) }} </td>
                                <td> {{ history.deliveryState ? history.deliveryState : '배송 준비 중' }} </td>
                                <td> <button
                                    @click="historyState.setDetailState(history.orderId)"
                                    :class="{'selected-button': historyState.orderId === history.orderId}"
                                    >상세보기</button></td>
                                
                            </tr>
                        </template>
                        <template v-else>
                            <tr>
                                <td colspan="7">일치하는 검색 결과가 없습니다</td>
                            </tr>
                        </template>
                    </template>
                </tbody>
            </table>

            <!-- 페이징 처리 -->
            <Pagination 
            :totalItems = "historyList?.historyCnt"
            :items-per-page="5"
            :max-pages-shown="5"
            :onClick="searchList"
            v-model="cPage"
        />    
        </div>
    </div>
</template>

<style lang="css" scoped>
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

.product-image {
    width: 60px;
    height: 60px;
    object-fit: contain;
    border: 1px solid #ddd;
    background: white;
}

.selected-button {
  background-color: #45a049 !important; 
  color: white;
}
</style>