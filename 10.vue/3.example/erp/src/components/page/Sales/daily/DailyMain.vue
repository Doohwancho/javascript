<template>
    <div class="daily-container">
        <div class="daily-chart">
            <div class="daily-graph">
                <Bar class="bar-chart" :data="data" :options="options" />
            </div>
            <div class="daily-statistics">
                <table>
                    <tr>
                        <th></th>
                        <td class="totalTd">금액 합계 (단위:원)</td>
                    </tr>
                    <tr>
                        <th>매출총액 ①</th>
                        <td>{{ dailyStatistics.totalSupplyPrice?.toLocaleString('ko-KR') }}</td>
                    </tr>
                    <tr>
                        <th>지출 총액 ②</th>
                        <td>{{ dailyStatistics.totalExpenseAmount?.toLocaleString('ko-KR') }}</td>
                    </tr>
                    <tr>
                        <th>손익 총계 (① - ②)</th>
                        <td class="total-account"
                            :style="{ color: priceDifference === 0 ? 'black' : priceDifference > 0 ? 'blue' : 'red' }">
                            <svg-icon v-if="priceDifference !== 0" type="mdi"
                                :path="priceDifference > 0 ? upPath : downPath" :size="24" />
                            {{ priceDifference?.toLocaleString('ko-KR') }}
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="daily-table">
            <span class="table-span">※ 검색일자를 기준으로 최근 5일간의 데이터입니다.</span>
            <div class="table-container">

                <table>
                    <colgroup>
                        <col width="10%">
                        <col width="10%">
                        <col width="10%">
                        <col width="10%">
                        <col width="10%">
                        <col width="10%">
                        <col width="10%">
                        <col width="10%">
                        <col width="20%">
                    </colgroup>
                    <thead>
                        <tr>
                            <th scope="col">날짜</th>
                            <th scope="col">구분</th>
                            <th scope="col">기업코드</th>
                            <th scope="col">기업명</th>
                            <th scope="col">매출 구분</th>
                            <th scope="col">매출 상세</th>
                            <th scope="col">수익 금액</th>
                            <th scope="col">지출 금액</th>
                            <th scope="col">당일 미수금 기록</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-if="dailyCnt > 0">
                            <tr v-for="(item, index) in dailyList" :key="index">
                                <td>{{ item.salesDate }}</td>
                                <td>{{ item.type }}</td>
                                <td>{{ item.clientId }}</td>
                                <td>{{ item.clientName }}</td>
                                <td>{{ item.crebitCode }}</td>
                                <td>{{ item.debitCode }}</td>
                                <td>{{ item.totalSupplyPrice ? item.totalSupplyPrice.toLocaleString('ko-KR') : null }}
                                </td>
                                <td>{{ item.totalExpenseAmount ? item.totalExpenseAmount.toLocaleString('ko-KR') : null }}
                                </td>
                                <td>{{ item.totalReceivableAmount ? item.totalReceivableAmount.toLocaleString('ko-KR') :
                                    null }}</td>
                            </tr>
                        </template>
                    </tbody>
                </table>
                <Pagination :totalItems="dailyCnt" :items-per-page="10" :max-pages-shown="5"
                    :onClick="searchDaily" v-model="cPage" />
            </div>
        </div>
    </div>
</template>
<script setup>
import axios from 'axios';
import { computed, watch } from 'vue';
import { Bar } from "vue-chartjs";
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiMenuUp, mdiMenuDown } from '@mdi/js'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
} from "chart.js";
import { getToday } from '../../../../common/dateForm';
const route = useRoute();
const cPage = ref(1);
const maxValue = ref();
const stepSize = ref();
const dailyList = ref([])
const dailyListChart = ref([])
const dailyStatistics = ref({})
const dailyCnt = ref(0)
const upPath = mdiMenuUp
const downPath = mdiMenuDown

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

const searchDaily = async () => {
    const param = new URLSearchParams({
        clientId: route.query['clientId'] ? route.query['clientId'] : "",
        orderDate: route.query['orderDate'] ? route.query['orderDate'] : getToday(),
        pageSize: 10,
        currentPage: cPage.value
    })

    try {
        const res = await axios.post('/api/sales/dailyList.do', param)
        const dailyData = res.data
        dailyList.value = dailyData.dailyList
        dailyListChart.value = dailyData.dailyListChart
        dailyStatistics.value = dailyData.dailyStatistics
        dailyCnt.value = dailyData.dailyListCnt
        if (dailyData.dailyListChart) {
            const allValues = dailyListChart.value.flatMap(item => [
                item.totalSupplyPrice,
                item.totalExpenseAmount,
                item.totalReceivableAmount
            ]);
            maxValue.value = Math.max(...allValues);
            stepSize.value = Math.ceil(maxValue.value / 5 / 10000) * 10000;
        }
    } catch (e) {
        console.error(e)
    }
}

const priceDifference = computed(() => {
    const supply = dailyStatistics.value.totalSupplyPrice || 0;
    const expense = dailyStatistics.value.totalExpenseAmount || 0;
    return supply - expense;
});



const data = computed(() => {
    return {
        labels: dailyListChart.value.map(item => item.salesDate),
        datasets: [
            {
                label: "매출",
                data: dailyListChart.value.map(item => item.totalSupplyPrice),
                backgroundColor: "#FF6384",
            },
            {
                label: "지출",
                data: dailyListChart.value.map(item => item.totalExpenseAmount),
                backgroundColor: "#36A2EB",
            },
            {
                label: "미수금",
                data: dailyListChart.value.map(item => item.totalReceivableAmount),
                backgroundColor: "#FFCE56",
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
        y: {
            beginAtZero: true,
            max: stepSize.value * 5,
            ticks: {
                stepSize: stepSize.value,
                callback: (value) => value?.toLocaleString() + " 원",
            }
        }
    }
}));



onMounted(() => {
    searchDaily();
});

watch(() => route.query, searchDaily);
</script>
<style lang="scss" scoped>
.daily-chart {
    display: flex;
    align-items: center;
    gap: 100px;
    /* ✅ 중간 여백 */
}

.daily-graph,
.daily-statistics {
    flex: 1;
}

.daily-table {
    margin-top: 50px;
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

.table-container {
    margin-top: 10px;
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
</style>