<script setup>
import { onMounted, ref } from 'vue';
import { useModalStore } from '../../../../stores/modalState';
import axios from 'axios';

const { id } = defineProps(['id']);
const emit = defineEmits([`modalClose`, 'postSuccess']);
const modalState = useModalStore();

const performanceDetail = ref();

const searchDetail = () => {
    axios
        .post('/api/sales/performanceDetailBody.do', { supplyId: id })
        .then(res => {
            performanceDetail.value = res.data.detailValue;
            console.log(performanceDetail.value);
        });
};

onMounted(() => {
    id && searchDetail();
});
</script>
<template>
    <teleport to="body">
        <div class="backdrop">
            <div class="container">
                <h2 style="text-align: center; margin-top: 0px">거래 내역</h2>
                <template v-if="performanceDetail">
                    <table>
                        <colgroup>
                            <col width="25%" />
                            <col width="35%" />
                            <col width="20%" />
                            <col width="20%" />
                        </colgroup>
                        <thead>
                            <tr>
                                <th>기업고객명</th>
                                <th>제품명</th>
                                <th>매출액</th>
                                <th>거래날짜</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-if="performanceDetail.length > 0">
                                <tr
                                    v-for="(list, index) in performanceDetail"
                                    :key="index"
                                >
                                    <td>{{ list.supplierName }}</td>
                                    <td>{{ list.productName }}</td>
                                    <td>
                                        {{
                                            list.performance.toLocaleString()
                                        }}원
                                    </td>
                                    <td>{{ list.salesDate }}</td>
                                </tr>
                            </template>
                            <template v-else>
                                <tr>
                                    <td colspan="4" style="text-align: center">
                                        거래 내역이 없습니다.
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </template>
                <template v-else>
                    <div style="text-align: center">데이터를 불러오는중...</div>
                </template>
                <div class="button_area">
                    <button @click="modalState.setModalState()">닫기</button>
                </div>
            </div>
        </div>
    </teleport>
</template>
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
    font-weight: bold;
}

label {
    display: flex;
    flex-direction: column;
}

input[type='text'] {
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
}

.container {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    position: relative;
    width: 650px;
}

img {
    width: 100px;
    height: 100px;
}

.img-label {
    margin-top: 10px;
    padding: 6px 25px;
    background-color: #ccc;
    border-radius: 4px;
    color: rgba(0, 0, 0, 0.9);
    cursor: pointer;

    &:hover {
        background-color: #45a049;
        color: white;
    }

    &:active {
        background-color: #3e8e41;
        box-shadow: 0 2px #666;
        transform: translateY(2px);
    }
}

.button-box {
    text-align: right;
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
.button_area {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 10px;
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
    background: #f4f4f4;
    text-align: center;
}
</style>
