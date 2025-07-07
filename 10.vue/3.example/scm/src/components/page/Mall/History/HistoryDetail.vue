<script setup>
import axios from 'axios';
import { onMounted, ref, watch } from 'vue';
import { useHistoryStore } from '../../../../stores/historyState';
import { useModalStore } from '../../../../stores/modalState';
import HistoryModal from './HistoryModal.vue';

const historyState = useHistoryStore();
const modalState = useModalStore();
const orderId = ref(0);
const historyDetail = ref({});
const refundCount = ref(0);
const isChecked = ref(false);

const searchDetail = () => {
    axios.post('/api/mall/historyDetailBody.do', {orderId: orderId.value}).then(res => {
        historyDetail.value = res.data;
    });
};

const handlerReturn = () => {
    if(!isChecked.value) return alert('선택하신 항목이 없습니다.');
    if(refundCount.value < 1) return alert('반품하실 수량을 선택해주세요.')
    modalState.setModalState();
}

const handlerSalesComplete = () => {
    if(!isChecked.value) return alert('선택하신 항목이 없습니다.');
    const result = window.confirm("구매 확정 하시겠습니까?");
    if(!result) return alert('구매 확정이 취소되었습니다.');
    axios.post('/api/mall/historySalesCompleteBody.do', {orderId: historyState.orderId}).then(res =>{
        if(res.data.result != 'success') return alert('구매 확인에 실패되었습니다.')
        alert('구매 확인되었습니다.');
        historyState.mainRendering();
        historyState.setDetailState(historyState.orderId);
    })
};

onMounted(() => {
    orderId.value = historyState.orderId;
    searchDetail();
})
watch(() => historyState.orderId, (newVal)=> {
    orderId.value = newVal;
    isChecked.value = false;
    refundCount.value = 0;
    searchDetail();
})

</script>

<template>
    <div style="margin-top: 36px;">
        <HistoryModal 
        v-if="modalState.modalState"
        :count="refundCount"
        />
        <div>
        <hr>
            <table class="col">
                <colgroup>
                    <col width="8%">
                    <col width="8%">
                    <col width="14%">
                    <col width="20%">
                    <col width="12%">
                    <col width="14%">
                    <col width="10%">
                    <col width="14%">
                </colgroup>

                <!-- 리스트 제목행 -->
                <thead>
                    <tr>
                        <th scope="col">체크</th>
                        <th scope="col">반품 수량</th>
                        <th scope="col">제품 구분</th>
                        <th scope="col">제품명</th>
                        <th scope="col">제조사</th>
                        <th scope="col">제품 가격</th>
                        <th scope="col">주문 수량</th>
                        <th scope="col">결제 금액</th>
                    </tr>
                </thead>

                <!-- 리스트 내용행 -->
                <tbody>
                    <template v-if="!historyDetail || !historyDetail.historyDetail">
                        <tr>
                            <td colspan="8">로딩 중입니다...</td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr>
                            <td>
                                <input
                                type="checkbox"
                                :disabled="(!!historyDetail.returnResultCount)
                                || historyDetail.historyDetail.salesState=='salesRequest'
                                || historyDetail.historyDetail.salesState=='salesComplete'"
                                v-model="isChecked"
                                />
                            </td>

                            <td>
                                <template v-if="historyDetail.returnResultCount">
                                    <span class="font_red">{{ historyDetail.returnResultCount }}</span>
                                </template>
                                <template 
                                v-else-if="historyDetail.historyDetail.salesState=='salesRequest'
                                || historyDetail.historyDetail.salesState=='salesComplete'">
                                    <span> 0 </span>
                                </template>
                                <template v-else>
                                <input
                                    type="number"
                                    min="0"
                                    :max="historyDetail.historyDetail.count"
                                    v-model="refundCount"
                                />
                                </template>
                            </td>

                            <td>{{ historyDetail.historyDetail.detailName }}</td>
                            <td>{{ historyDetail.historyDetail.productName }}</td>
                            <td>{{ historyDetail.historyDetail.supplyName }}</td>
                            <td>{{ historyDetail.historyDetail.price.toLocaleString() }}</td>
                            <td>{{ historyDetail.historyDetail.count }}</td>
                            <td>{{ (historyDetail.historyDetail.count * historyDetail.historyDetail.price).toLocaleString() }}</td>
                        </tr>
                    </template>
                </tbody>
            </table>
            <template v-if="!historyDetail || !historyDetail.historyDetail">
                <div></div>
            </template>
            <template v-else>
                <div
                v-if="historyDetail.historyDetail.salesState =='delivery'
                || historyDetail.historyDetail.salesState =='deliveryComplete'" 
                class="button-box">
                    <button
                    @click="handlerReturn()"
                    >반품 신청</button> 
                    <button
                    @click="handlerSalesComplete()"
                    >구매 확인</button> 
                </div>
            </template>
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
.font_red {
    color: #fe1414;
}
.button-box {
    text-align: center;
    margin-top: 10px;
}

button {
    margin: 8px;
    background-color: #3bb2ea;
    border: none;
    color: white;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 6px;
    box-shadow: 0 2px #999;
    transition: 0.3s;

    &:hover {
        background-color: #45a049;
    }

    &:active {
        background-color: #3e8e41;
        box-shadow: 0 2px #666;
        transform: translateY(2px);
    }
}
input{
    width: 50%;
}

</style>