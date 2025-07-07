<template>
    <teleport to="body">
        <div class="backdrop">
            <div class="container">
                <dt>
                    <strong>미수금 조회</strong>
                    <svg-icon @click="setModalState" class="icon" type="mdi" :path="path" :size="27"></svg-icon>
                </dt>
                <table>
                    <tbody>
                        <tr>
                            <th>수주일자</th>
                            <td>
                                <input class="information-input" type="text" v-model="detail.orderDate">
                            </td>
                            <th>납품일자</th>
                            <td>
                                <input class="information-input" type="text" v-model="detail.deliveryDate">
                            </td>
                        </tr>
                        <tr>
                            <th>처리부서</th>
                            <td>
                                <input class="information-input" type="text" v-model="detail.departmentName">
                            </td>
                            <th>전표번호</th>
                            <td>
                                <input class="information-input" type="text" v-model="detail.voucherNo">
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="table-container">
                    <table>
                        <colgroup>
                            <col width="10%">
                            <col width="20%">
                            <col width="10%">
                            <col width="10%">
                            <col width="10%">
                            <col width="10%">
                        </colgroup>
                        <thead>
                            <tr>
                                <th scope="col">번호</th>
                                <th scope="col">제품명</th>
                                <th scope="col">수량</th>
                                <th scope="col">제품단가</th>
                                <th scope="col">공급가</th>
                                <th scope="col">공급합계</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-if="detailList">
                                <template v-if="detailListCnt > 0">
                                    <tr v-for="item in detailList" :key="item.productId">
                                        <td>{{ item.receivableId }}</td>
                                        <td td> {{ item.productName }}</td>
                                        <td td> {{ item.quantity }}</td>
                                        <td td> {{ item.unitPrice.toLocaleString('ko-KR') }}</td>
                                        <td td> {{ item.supplyPrice.toLocaleString('ko-KR') }}</td>
                                        <td td> {{ (item.supplyPrice * 1.1).toLocaleString('ko-KR') }}</td>
                                    </tr>
                                </template>
                            </template>
                        </tbody>
                    </table>
                    <Pagination :totalItems="detailListCnt" :items-per-page="5" :max-pages-shown="5"
                        :onClick="searchDetail" v-model="cPage" />
                </div>
                <table>
                    <tbody>
                        <tr>
                            <th>총 납품개수</th>
                            <td>
                                <input class="information-input" type="text" v-model="detail.totalDeliveryCount">
                            </td>
                            <th>총 공급가</th>
                            <td>
                                <input class="information-input" type="text"
                                    :value="formatCurrency(detail.totalSupplyPrice)">
                            </td>
                        </tr>
                        <tr>
                            <th>총 세액</th>
                            <td>
                                <input class="information-input" type="text" :value="formatCurrency(detail.totalTax)">
                            </td>
                            <th>총 금액(공급가+세액)</th>
                            <td>
                                <input class="information-input" type="text"
                                    :value="formatCurrency(detail.depositAmount)">
                            </td>
                        </tr>
                        <tr>
                            <th>수납상태</th>
                            <td>
                                <input :style="{ color: detail.receivableStatus === '미수금' ? 'red' : 'blue' }"
                                    class="information-input" type="text" v-model="detail.receivableStatus">
                            </td>
                            <th>미납액</th>
                            <td>
                                <input :style="{ color: detail.receivableStatus === '미수금' ? 'red' : 'black' }"
                                    class="information-input" type="text"
                                    :value="formatCurrency(detail.totalReceivableAmount)">
                            </td>
                        </tr>
                        <tr v-if="userType === 'B' && detail.receivableStatus === '미수금'">
                            <th>입금액</th>
                            <td>
                                <input class="deposit-input" type="text" v-model="inputDepositAmount">
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="client-info">
                    <span class="span-title">
                        거래처 정보
                    </span>
                    <table>
                        <tbody>
                            <tr>
                                <th>거래처명</th>
                                <td>
                                    <input class="information-input" type="text" v-model="detail.clientName">
                                </td>
                                <th>담당자</th>
                                <td>
                                    <input class="information-input" type="text" v-model="detail.person">
                                </td>
                                <th>연락처</th>
                                <td>
                                    <input class="information-input" type="text" v-model="detail.personPh">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="manager-info">
                    <span class="span-title">
                        처리자
                    </span>
                    <table>
                        <tbody>
                            <tr>
                                <th>처리자</th>
                                <td>
                                    <input class="information-input" type="text" v-model="detail.managerName">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="button-box">
                    <button type="button" @click="setModalState">취소</button>
                    <button @click="insertDeposit" v-if="userType === 'B' && detail.receivableStatus === '미수금'"
                        type="button">직접
                        입금</button>
                </div>
            </div>
        </div>
    </teleport>
</template>
<script setup>
import { useModalStore } from '../../../../stores/modalState';
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiClose } from '@mdi/js'
import axios from 'axios';
import Swal from "sweetalert2";
const { setModalState } = useModalStore()
const { id } = defineProps(['id'])
const emit = defineEmits(['postSuccess'])
const path = mdiClose
const inputDepositAmount = ref()
const cPage = ref(1)
const detailList = ref([])
const detail = ref({})
const detailListCnt = ref(0)
const userType = ref("")

const searchDetail = async () => {
    const param = new URLSearchParams({
        orderId: id,
        pageSize: 5,
        currentPage: cPage.value
    });
    try {
        const response = await axios.post('/api/sales/receivableDetail.do', param)
        detailList.value = response.data.detailList
        detail.value = response.data.detail
        detailListCnt.value = response.data.detailListCnt
        userType.value = response.data.userType

        if (detail.value.receivableStatus === "N") {
            detail.value.receivableStatus = '미수금';
        } else {
            detail.value.receivableStatus = '수금 완료'
        }


    } catch (e) {
        console.error(e);
    }
}

const formatCurrency = (value) => {
    if (!value) return "0";
    return value.toLocaleString('ko-KR');
}

const insertDeposit = async () => {
    const unpaidAmount = detail.value.totalReceivableAmount
    if (!inputDepositAmount.value) {
        Swal.fire({
            icon: "error",
            title: "입금할 금액을 입력해 주세요.",
        })
        return
    }

    if (inputDepositAmount.value <= 0 ) {
        Swal.fire({
            icon: "error",
            title: "금액을 정확히 입력해 주세요.",
        })
        return
    }

    if (unpaidAmount - inputDepositAmount.value < 0 ) {
        Swal.fire({
            icon: "error",
            title: "입금할 금액이 미납액보다 클 수 없습니다.",
        })
        return
    }


    const param = new URLSearchParams({
        orderId: detail.value.orderId,
        clientId: detail.value.clientId,
        empId: detail.value.empId,
        paymentAmount: detail.value.depositAmount,
        unpaidAmount: unpaidAmount - inputDepositAmount.value,
        depositAmount: inputDepositAmount.value,
        clientName: detail.value.clientName,
        orderDate: detail.value.orderDate,
        managerName: detail.value.managerName
    })
    try {
        const res = await axios.post('/api/sales/insertReceivableHistory.do', param)
        if (res.data.result === 'success') {
            console.log('저장성공')
            emit('postSuccess')
        } else {
            alert("저장 실패")
        }
    } catch (e) {
        console.error(e);
    }

}

onMounted(() => {
    searchDetail()
})

</script>
<style lang="scss" scoped>
.backdrop {
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    flex-flow: row wrep;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
}

.information-input {
    width: 95%;
    height: 24px;
    /* 기본 높이보다 줄임 */
    padding: 2px 4px;
    font-size: 15px;
    margin-top: 5px;
    margin-bottom: 5px;
    margin-right: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
    pointer-events: none;
    text-align: left;
}

.span-title {
    margin-left: 20px;
    font-size: 20px;
    font-weight: bold;

}

.deposit-input {
    width: 95%;
    height: 24px;
    /* 기본 높이보다 줄임 */
    padding: 2px 4px;
    font-size: 15px;
    margin-top: 5px;
    margin-bottom: 5px;
    margin-right: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
    text-align: left;
}

.client-info {
    margin-top: 20px;
}

.manager-info {
    margin-top: 20px;
}

.container {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    position: relative;
    width: 900px;
}

.icon {
    cursor: pointer;
}

.table-container {
    margin-top: 20px;
}

dt {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    background-color: #3498db;
    display: flex;
    color: white;
    padding: 10px;
    /* 텍스트와 배경 사이 간격 추가 */
    border-radius: 6px;
    /* 둥근 모서리 효과 */
    justify-content: space-between;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    border: 1px solid #ddd;
    padding: 2px 4px;
    /* 위아래 4px, 좌우 8px 정도로 축소 */
    text-align: center;
    line-height: 1.2;
}

th {
    background: #f4f4f4;
    text-align: center;
}

.font_red {
    color: #fe1414;
}

.font_blue {
    color: #3498db;
}

.button-box {
    text-align: center;
    margin-top: 10px;
}

button {
    background-color: #3bb2ea;
    border: none;
    color: white;
    padding: 10px 22px;
    text-align: right;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 12px;
    box-shadow: 0 4px #999;
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
</style>