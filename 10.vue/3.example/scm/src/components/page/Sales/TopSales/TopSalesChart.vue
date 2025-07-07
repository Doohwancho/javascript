<script setup>
import { ref, onMounted } from 'vue'; // Vue 컴포지션 API
import axios from 'axios';
import { useRoute } from 'vue-router';

import {
    Chart,
    ArcElement,
    Tooltip,
    Legend,
    Title,
    CategoryScale,
    LinearScale,
    PieController,
} from 'chart.js';

const { dataSet } = defineProps(['dataSet']);

// Chart.js에 필요한 요소들을 등록
Chart.register(
    ArcElement, // 파이 차트의 조각을 만들기 위한 요소
    Tooltip, // 툴팁 기능
    Legend, // 범례 기능
    Title, // 제목 기능
    CategoryScale, // 카테고리 스케일 (X축 등의 스케일을 설정하는 데 사용)
    LinearScale, // 선형 스케일 (Y축 등의 선형 스케일 설정에 사용)
    PieController // 파이 차트를 위한 컨트롤러
);

const route = useRoute();

// 1. 차트를 그릴 canvas에 대한 ref
const chartCanvas = ref(null);
const chartInstance = ref(null);

// 2. 차트 데이터
const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A8'];

// 3. 차트를 그리는 함수
const createChart = () => {
    const labels = dataSet.map(item => item.supplierName);
    const data = dataSet.map(item => item.performance);

    if (chartInstance.value) {
        chartInstance.value.destroy();
    } // 이미 차트가 존재할 경우 그 차트를 제거

    chartInstance.value = new Chart(chartCanvas.value, {
        type: 'pie', // 파이 차트
        data: {
            labels: labels,
            datasets: [
                {
                    data: data,
                    backgroundColor: colors,
                    hoverBackgroundColor: colors,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return (
                                tooltipItem.label +
                                ': ' +
                                String(tooltipItem.raw).toLocaleString() +
                                ' 원'
                            );
                        },
                    },
                },
            },
        },
    });

    // 차트 인스턴스를 생성
};

// 4. 컴포넌트가 마운트된 후 차트를 생성
onMounted(() => {
    createChart();
});
watch(() => route.query, createChart);
</script>
<template>
    <div class="chart">
        <canvas ref="chartCanvas"></canvas>
    </div>
</template>
<style lang="scss" scoped>
.chart {
    width: 100%;
}
</style>
