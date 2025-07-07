<template>
    <div class="monthly-container">
        <MonthlyProductModal v-if="modal.modalState && modalTag === 'product'" :searchStDate="paramStDate"
            :searchEdDate="paramEdDate" />
        <MonthlyClientModal v-if="modal.modalState && modalTag === 'client'" :searchStDate="paramStDate"
            :searchEdDate="paramEdDate" />
        <div class="monthly-chart">
            <div class="monthly-graph">
                <Line class="Line-chart" :data="data" :options="options" />
            </div>
            <div class="monthly-statistics">
                <table>
                    <tr>
                        <th></th>
                        <td class="totalTd">금액 합계 (단위:원)</td>
                    </tr>
                    <tr>
                        <th>매출순수익 ①</th>
                        <td>{{ (sumAmountList.totalSupplyPrice - sumAmountList.totalUnitPrice).toLocaleString('ko-KR')
                        }}</td>
                    </tr>
                    <tr>
                        <th>지출 총액 ②</th>
                        <td>{{ sumAmountList.totalExpenseAmount?.toLocaleString('ko-KR') }}</td>
                    </tr>
                    <tr>
                        <th>미수금 총액 ③</th>
                        <td>{{ sumAmountList.totalReceivableAmount?.toLocaleString('ko-KR') }}</td>
                    </tr>
                    <tr>
                        <th>손익 총계 (① - ② - ③)</th>
                        <td class="total-account"
                            :style="{ color: priceDifference === 0 ? 'black' : priceDifference > 0 ? 'blue' : 'red' }">
                            <svg-icon v-if="priceDifference !== 0" type="mdi"
                                :path="priceDifference > 0 ? upPath : downPath" :size="24" />
                            {{ Math.abs(priceDifference)?.toLocaleString('ko-KR') }}
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="button-container">
            <button @click="handlerModal('product')">매출상위제품</button>
            <button @click="handlerModal('client')">매출상위기업</button>
        </div>
        <div class="monthly-table">
            <table>
                <colgroup>
                    <col width="10%">
                    <col width="10%">
                    <col width="10%">
                    <col width="10%">
                    <col width="10%">
                    <col width="10%">
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col">날짜</th>
                        <th scope="col">주문건수</th>
                        <th scope="col">매출</th>
                        <th scope="col">매출 원가</th>
                        <th scope="col">지출</th>
                        <th scope="col">미수금</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in monthlyList" :key="index">
                        <td>{{ item.orderDate }}</td>
                        <td>{{ item.orderCount }}</td>
                        <td>{{ item.totalSupplyPrice?.toLocaleString('ko-KR') }}</td>
                        <td>{{ item.totalUnitPrice?.toLocaleString('ko-KR') }}</td>
                        <td>{{ item.totalExpenseAmount?.toLocaleString('ko-KR') }}</td>
                        <td>{{ item.totalReceivableAmount?.toLocaleString('ko-KR') }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script setup>
import axios from 'axios';
import { computed, watch } from 'vue';
import { Line } from "vue-chartjs";
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiMenuUp, mdiMenuDown } from '@mdi/js'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import Swal from "sweetalert2";
import router from '@/router';
import { getMonth, getMonthPeriod } from '../../../../common/dateForm';
import { useModalStore } from '../../../../stores/modalState';
const modal = useModalStore()
const route = useRoute()
const maxValue = ref()
const stepSize = ref()
const monthlyList = ref([])
const sumAmountList = ref({})
const modalTag = ref('')
const upPath = mdiMenuUp
const downPath = mdiMenuDown
const paramStDate = ref('')
const paramEdDate = ref('')
ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
);


const searchMonthly = async () => {
    paramStDate.value = route.query['searchStDate'] ? route.query['searchStDate'] : getMonth()
    paramEdDate.value = route.query['searchEdDate'] ? route.query['searchEdDate'] : getMonth()

    const monthPeriod = getMonthPeriod(paramStDate.value, paramEdDate.value)
    if (monthPeriod < 0) {
        Swal.fire({
            icon: "error",
            title: "시작일이 끝나는 날 이후일 수 없습니다.",
        })

        window.location.search && router.replace(window.location.pathname)
        return
    } 

    if (monthPeriod > 5) {
        Swal.fire({
            icon: "error",
            title: "6개월 이내의 데이터만 검색 가능합니다."
        })

        window.location.search && router.replace(window.location.pathname)
        return
    } 

    const param = new URLSearchParams({
        searchStDate: route.query['searchStDate'] ? route.query['searchStDate'] : getMonth(),
        searchEdDate: route.query['searchEdDate'] ? route.query['searchEdDate'] : getMonth(),
    })


    try {
        const res = await axios.post('/api/sales/monthlyList.do', param)
        const monthlyData = res.data
        monthlyList.value = monthlyData.monthlyList
        const total = monthlyData.monthlyList.reduce((acc, curr) => {
            acc.totalSupplyPrice += curr.totalSupplyPrice
            acc.totalUnitPrice += curr.totalUnitPrice;
            acc.totalReceivableAmount += curr.totalReceivableAmount;
            acc.totalExpenseAmount += curr.totalExpenseAmount;
            return acc;
        }, { totalSupplyPrice: 0, totalUnitPrice: 0, totalReceivableAmount: 0, totalExpenseAmount: 0 })
        sumAmountList.value = total
        const allValues = monthlyList.value.flatMap(item => [
            item.totalSupplyPrice,
            item.totalExpenseAmount,
        ]);
        maxValue.value = Math.max(...allValues)
        stepSize.value = Math.ceil(maxValue.value / 5 / 10000) * 10000

    } catch (e) {
        console.error(e)
    }
}

const priceDifference = computed(() => {
    const supply = sumAmountList.value.totalSupplyPrice || 0
    const expense = sumAmountList.value.totalExpenseAmount || 0
    const receivable = sumAmountList.value.totalReceivableAmount || 0
    return supply - expense - receivable;
});

const data = computed(() => {
    const isSingleData = monthlyList.value.length === 1;

    const labels = isSingleData
        ? ["", monthlyList.value[0].orderDate, ""]
        : monthlyList.value.map(item => item.orderDate);

    const salesData = isSingleData
        ? [null, monthlyList.value[0].totalSupplyPrice, null]
        : monthlyList.value.map(item => item.totalSupplyPrice);

    const expenseData = isSingleData
        ? [null, monthlyList.value[0].totalExpenseAmount, null]
        : monthlyList.value.map(item => item.totalExpenseAmount);

    return {
        labels,
        datasets: [
            {
                label: "매출",
                data: salesData,
                borderColor: "#de4343",
                backgroundColor: "#e05151",
                fill: false,
                borderWidth: 2
            },
            {
                label: "지출",
                data: expenseData,
                borderColor: "#468be0",
                backgroundColor: "#5191e0",
                fill: false,
                borderWidth: 2
            },
        ]
    };
});

const options = computed(() => ({
    responsive: true,
    indexAxis: 'x',
    plugins: {
        legend: {
            position: "top",
        },
        tooltip: {
            callbacks: {
                label: (context) => {
                    const value = context.parsed.y;
                    return `${context.dataset.label}: ${value?.toLocaleString()} 원`;
                }
            }
        },
    },
    scales: {
        x: {
            beginAtZero: true
        },
        y: {
            beginAtZero: true,
            max: stepSize.value * 6,
            ticks: {
                stepSize: stepSize.value,
                callback: (value) => value?.toLocaleString() + " 원",
            }
        }
    }
}));

const handlerModal = tag => {
    modalTag.value = tag
    modal.setModalState();
};

onMounted(() => {
    searchMonthly();
});

watch(() => route.query, searchMonthly);

</script>
<style lang="scss" scoped>
.monthly-chart {
    display: flex;
    align-items: center;
    gap: 100px;
    /* ✅ 중간 여백 */
}

.monthly-graph,
.monthly-statistics {
    flex: 1;
}

.monthly-table {
    margin-top: 10px;
}


table {
    width: 100%;
    border-collapse: collapse;

}

.total-account {
    vertical-align: middle;
}

.total-account svg,
.total-account svg-icon {
    vertical-align: middle;
}

th,
td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
}

th,
.totalTd {
    background: #f4f4f4;
    font-weight: bold;
}

.button-container {
    margin-top: 60px;
    display: flex;
    justify-content: flex-end;
    /* 오른쪽 정렬 */
}

button {
    text-align: center;
    text-decoration: none;
    display: inline-block;
    border: none;
    color: white;
    width: 100px;
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