<script setup>
import axios from 'axios';
import { inject, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import TopSalesChart from './TopSalesChart.vue';
import { useQuery } from '@tanstack/vue-query';

const topSalesListData = ref();
const chartFlag = ref(false);
const chartData = ref();

const injectedValue = inject('selectValue');

const searchList = async () => {
    chartFlag.value = '';
    const result = await axios.post('/api/sales/topSalesListBody.do', {
        ...injectedValue.value,
        pageSize: 10,
    });

    const startCount = result.data.topSalesList.length;
    if (result.data.topSalesList.length > 0) {
        chartData.value = [];
        for (let i = 0; i < startCount; i++) {
            chartData.value.push({
                supplierName: result.data.topSalesList[i].supplierName,
                currentRank: result.data.topSalesList[i].currentRank,
                performance: result.data.topSalesList[i].performance,
                previousRank: result.data.topSalesList[i].previousRank,
            });
        }
        chartFlag.value = true;
    } else {
        chartFlag.value = false;
    }
    topSalesListData.value = result.data;
    for (let i = 0; i < startCount; i++) {
        let changeLank = '-';
        let upDown = '';
        const cLank = topSalesListData.value.topSalesList[i].currentRank;
        const pLank = topSalesListData.value.topSalesList[i].previousRank;
        const change = Math.abs(pLank - cLank);
        if (pLank !== 0 && pLank > cLank) {
            changeLank = `${change}↑`;
            upDown = 'UP';
        } else if (pLank !== 0 && pLank < cLank) {
            changeLank = `${change}↓`;
            upDown = 'DOWN';
        } else if (pLank === 0) {
            changeLank = 'new!';
            upDown = 'N';
        }
        topSalesListData.value.topSalesList[i] = {
            ...topSalesListData.value.topSalesList[i],
            changeLank: changeLank,
            upDown: upDown,
        };
    }
    for (let i = startCount; i < 10; i++) {
        topSalesListData.value.topSalesList.push({
            currentRank: '-',
            supplierName: '-',
            performance: '-',
        });
    }

    return topSalesListData.value;
};

const { data: topSalesList, refetch } = useQuery({
    queryKey: ['topSalesList', injectedValue], // 필수항목
    queryFn: searchList,
    enabled: false,
});

const addClass = flag => {
    let addClass = '';
    if (flag) {
        flag === 'UP' ? (addClass = 'up') : (addClass = 'down');
        if (flag === 'N') {
            addClass = 'new';
        }
        return addClass;
    }
};

watch(
    injectedValue,
    (newVal, oldVal) => {
        if (JSON.stringify(newVal) === JSON.stringify(oldVal)) return;
        refetch();
    },
    { deep: true }
);
</script>
<template>
    <div class="topsales">
        <table>
            <colgroup>
                <col width="20%" />
                <col width="40%" />
                <col width="40%" />
            </colgroup>
            <thead>
                <tr>
                    <th>순위</th>
                    <th>기업고객명</th>
                    <th>매출액</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="topSalesList">
                    <tr
                        v-for="(list, index) in topSalesList.topSalesList"
                        :key="index"
                        :class="{ even: index % 2 === 1 }"
                    >
                        <td>
                            {{ list.currentRank
                            }}<span
                                v-if="list.currentRank !== '-'"
                                :class="addClass(list.upDown)"
                            >
                                ({{ list.changeLank }})</span
                            >
                        </td>
                        <td>{{ list.supplierName }}</td>
                        <td>{{ list.performance.toLocaleString('ko-KR') }}</td>
                    </tr>
                </template>
            </tbody>
        </table>
        <div class="chart_div">
            <template v-if="chartFlag === true">
                <TopSalesChart v-if="chartFlag" :dataSet="chartData" />
            </template>
            <template v-else-if="chartFlag === false">
                <img src="../../../../assets/noSalesImg2.png" />
            </template>
        </div>
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
        // cursor: pointer;
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
.topsales {
    width: 100%;
    display: flex;
}
.chart_div {
    width: 600px;
    margin-top: 55px;

    img {
        width: 100%;
        margin-left: 10px;
    }
}
.even {
    background-color: #f5f5f5;
}
.up {
    color: #2676bf;
}
.down {
    color: #d83f3f;
}
.new {
    color: #45a049;
}
</style>
