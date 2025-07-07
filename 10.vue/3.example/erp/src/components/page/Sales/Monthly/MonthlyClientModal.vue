<template>
    <teleport to="body">
        <div class="backdrop">
            <div class="container">
                <dt>
                    <strong>매출 상위 기업</strong>
                    <svg-icon @click="setModalState" class="icon" type="mdi" :path="path" :size="27"></svg-icon>
                </dt>
                <div class="client-chart">
                    <div class="client-graph">
                        <Pie class="Line-chart" :data="data" :options="options" />
                    </div>
                    <div class="client-statistics">
                        <table>
                            <colgroup>
                                <col width="10%">
                                <col width="10%">
                                <col width="10%">
                            </colgroup>
                            <thead>
                                <tr>
                                    <th scope="col">순위</th>
                                    <th scope="col">기업명</th>
                                    <th scope="col">매출액</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in topClientList" :key="item.RNUM">
                                    <td>{{ item.RNUM }}</td>
                                    <td>{{ item.topTitle }}</td>
                                    <td>{{ item.totalSupplyPrice?.toLocaleString('ko-KR') }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    </teleport>
</template>
<script setup>
import { useModalStore } from '../../../../stores/modalState'
import axios from 'axios'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiClose } from '@mdi/js'
import { computed } from 'vue';
import { Pie } from "vue-chartjs";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title,
} from 'chart.js';
const { setModalState } = useModalStore();
const { searchStDate, searchEdDate } = defineProps(['searchStDate', 'searchEdDate'])
const topClientList = ref([])
const path = mdiClose

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    Title,
);

const searchClientDetail = async () => {
    const param = new URLSearchParams({
        searchStDate,
        searchEdDate
    })

    try {
        const res = await axios.post('/api/sales/monthlyTopClient.do', param)
        topClientList.value = res.data.detail

    } catch (e) {
        console.error(e)
    }
}

const data = computed(() => {
    const labels = topClientList.value.map(item => item.topTitle.split(" ")[0]);
    const chartData = topClientList.value.map(item => item.totalSupplyPrice)
    return {
        labels,
        datasets: [
            {
                data: chartData,
                backgroundColor: ["#f27777", "#f5a96c", "#f2c64b", "#a8e3bf", "#9bc6fa"],
            },
        ]
    }
})

const options = computed(() => ({
    plugins: {
        legend: {
            position: "top",
        },
        tooltip: {
            callbacks: {
                label: (context) => {
                    const label = context.label || '';
                    const value = context.parsed;
                    return `${value.toLocaleString()} 원`;
                }
            }
        },
    },

}));

onMounted(() => {
    searchClientDetail()
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

.container {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    position: relative;
    width: 750px;
}

.client-chart {
    display: flex;
    align-items: center;
    gap: 50px;
    /* ✅ 중간 여백 */
}

.client-graph,
.client-statistics {
    flex: 1;
}

.icon {
    cursor: pointer;
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
    padding: 10px;
    text-align: center;
}

th {
    background: #f4f4f4
}
</style>