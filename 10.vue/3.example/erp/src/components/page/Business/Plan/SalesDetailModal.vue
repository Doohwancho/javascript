<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useModalStore } from '../../../../stores/modalState';

import axios from 'axios';

const { id } = defineProps(['id']);

// modal
const modalState = useModalStore();

//상세조회 데이터
const detailData = ref({
    manufacturer_id: 0,
    target_date: '',
    industry_code: '',
    emp_name: '',
    manufacturer_name: '',
    product_name: '',
    goal_quanti: 0,
    plan_memo: '',
    plan_num: 0,
    product_id: 0,
});

const emit = defineEmits(['modalClose', 'postSuccess']);

// 영업 계획 상세 조회
async function planDetail() {
    const param = new URLSearchParams({ planNum: id });
    axios
        .post(`/api/business/sales-plan/getDetailSalesPlan`, param)
        .then(res => {
            detailData.value = res.data.DetailSalesPlan;
        })
        .catch(error => {
            console.error('Request failed', error); // 오류 확인
        });
}

//영업계획 수정
async function updateSalesPlan() {
    const param = {
        planNum: id,
        goalQuanti: detailData.value.goal_quanti, // goal_quanti 값을 반드시 숫자 형태로 설정
        planMemo: detailData.value.plan_memo,
    };

    try {
        // 서버에 데이터 전송
        const response = await axios.post(
            `/api/business/sales-plan/updatePlanBody.do`,
            param
        );

        if (response.data.result === 'success') {
            alert('수정이 완료되었습니다.');
            emit('postSuccess');
        } else {
            alert('저장이 실패되었습니다.' + response.data.message);
        }
    } catch (error) {
        alert('저장이 실패되었습니다. 서버 오류가 발생했습니다.');
    }
}

onMounted(() => {
    if (id) {
        planDetail(); // id가 있을 때만 호출
    }
});

onUnmounted(() => {
    emit('modalClose', 0);
});
</script>

<template>
    <div v-if="detailData">
        <teleport to="body">
            <div class="backdrop">
                <div class="container">
                    <h2>영업 계획 상세</h2>
                    <table>
                        <tbody>
                            <!-- 사원 -->
                            <tr>
                                <th class="table-header">사원</th>
                                <td>
                                    <input
                                        type="text"
                                        v-model="detailData.emp_name"
                                        readonly
                                        disabled
                                    />
                                </td>
                                <th class="table-header">목표 일자</th>
                                <td>
                                    <input
                                        type="date"
                                        v-model="detailData.target_date"
                                        readonly
                                        disabled
                                    />
                                </td>
                            </tr>

                            <!-- 제조사 -->
                            <tr>
                                <th class="table-header">제조사</th>
                                <td>
                                    <input
                                        type="text"
                                        :value="detailData.manufacturer_name"
                                        readonly
                                        disabled
                                    />
                                </td>
                                <th class="table-header">상품명</th>
                                <td>
                                    <input
                                        type="text"
                                        :value="detailData.product_name"
                                        readonly
                                        disabled
                                    />
                                </td>
                            </tr>

                            <!-- 거래처 -->
                            <tr>
                                <th class="table-header">거래처</th>
                                <td>
                                    <input
                                        type="text"
                                        v-model="detailData.client_name"
                                        readonly
                                        disabled
                                    />
                                </td>
                                <th class="table-header">
                                    목표 수량<span class="font_red"> *</span>
                                </th>
                                <td>
                                    <input
                                        type="text"
                                        v-model="detailData.goal_quanti"
                                    />
                                </td>
                            </tr>

                            <!-- 메모 -->
                            <tr>
                                <th class="table-header">
                                    메모<span class="font_red"> *</span>
                                </th>
                                <td>
                                    <input
                                        type="text"
                                        v-model="detailData.plan_memo"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="button-container">
                        <button @click="updateSalesPlan()">수정</button>
                        <button
                            type="button"
                            @click="modalState.setModalState()"
                        >
                            취소
                        </button>
                    </div>
                </div>
            </div>
        </teleport>
    </div>
</template>

<style lang="scss" scoped>
.backdrop {
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
}

.container {
    background: white;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    width: 1000px;
    font-size: 14px;
}

h2 {
    font-size: 24px;
    margin-bottom: 20px;
    font-weight: bold;
    text-align: center;
    background-color: #f0f0f0; /* 회색 배경 */
    padding: 10px 0; /* 여백 추가 */
    border-bottom: 2px solid #ccc; /* 제목 아래 선 추가 */
}

table {
    width: 100%;
    border-spacing: 0;
    margin-bottom: 20px;
}

th.table-header {
    background-color: #f0f0f0;
    padding: 12px 15px;
    font-weight: bold;
    border-right: 2px solid #ccc; /* 선 추가 */
    text-align: left;
    width: 150px;
}

td {
    padding: 12px 15px;
}

input[type='text'],
input[type='date'],
select {
    width: 90%;
    padding: 10px;
    margin-top: 5px;
    margin-bottom: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
}

button {
    background-color: #3bb2ea;
    border: none;
    color: white;
    padding: 10px 22px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 10px 0;
    cursor: pointer;
    border-radius: 12px;
    box-shadow: 0 4px #999;
    transition: 0.3s;
    width: 120px;
    margin: 4px 2px;
}

button:hover {
    background-color: #45a049;
}

button:active {
    background-color: #3e8e41;
    box-shadow: 0 2px #666;
    transform: translateY(2px);
}

.button-box button {
    width: 48%;
}

/* 버튼을 오른쪽 정렬하기 위한 스타일 */
.button-container {
    display: flex;
    justify-content: flex-end; /* 오른쪽 정렬 */
    margin-bottom: 20px;
}

input[type='text']:focus,
input[type='date']:focus,
select:focus {
    border-color: #3bb2ea;
    outline: none;
}

.font_red {
    color: #fe1414;
}
</style>
