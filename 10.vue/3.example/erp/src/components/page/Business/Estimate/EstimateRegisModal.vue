<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import {
    fetchClient,
    fetchManufacturers,
    fetchProductsByManufacturer,
} from '../../../../common/selectBoxApi';
import { useModalStore } from '../../../../stores/modalState';
import axios from 'axios';
const modalState = useModalStore();
const clients = ref(''); // 고객 목록
const manufacturers = ref(''); //제조사 목록
const productList = ref([]); //제품 목록
const selectedClient = ref('');
const selectedManufacturer = ref(''); // 선택된 제조사
const selectedProduct = ref(''); // 선택된 제품
const quantity = ref(''); // 수량 저장
const supplyPrice = ref(0); // 총 금액

// 견적서 저장

const estimateDeliveryDate = ref('');
const estimateSalesArea = ref('');
const estimateList = ref([]);

const emit = defineEmits(['modalClose', 'postSuccess']);

// 추가 버튼 클릭 시
const addEstimateItem = () => {
    // 유효성 검사
    if (!selectedManufacturer.value || !selectedProduct.value) {
        alert('제조사와 제품을 선택해주세요.');
        return;
    }
    if (!quantity.value || isNaN(quantity.value) || quantity.value <= 0) {
        alert('유효한 수량을 입력해주세요.');
        return;
    }

    // 총액 계산
    // 새로운 항목을 estimateList 배열에 추가
    estimateList.value.push({
        manufacturerId: selectedManufacturer.value.manufacturerId,
        majorCategoryId: selectedProduct.value.industry_code,
        subCategoryId: selectedProduct.value.product_code,
        productId: selectedProduct.value.id,
        unitPrice: selectedProduct.value.unit_price,
        quantity: quantity.value,
        supplyPrice: supplyPrice.value, // 공급가액 포함
        // 데이터 출력을 위한 것
        productName: selectedProduct.value.name,
        industryName: selectedManufacturer.value.industryName,
    });

    (selectedManufacturer.value = ''),
        (selectedProduct.value = ''),
        (quantity.value = ''),
        (supplyPrice.value = '');
};

const saveEstimate = async () => {
    // 유효성 검사
    if (!selectedClient.value) {
        alert('거래처를 선택해주세요.');
        return;
    }

    if (!estimateDeliveryDate.value) {
        alert('납기일을 선택해주세요.');
        return;
    }

    if (!estimateSalesArea.value) {
        alert('영역구분을 선택해주세요.');
    }
    const param = {
        clientId: selectedClient.value,
        estimateDeliveryDate: estimateDeliveryDate.value,
        estimateSalesArea: estimateSalesArea.value,
        estimateList: estimateList.value,
    };

    try {
        await axios.post('/api/business/saveEstimate', param).then(() => {
            alert('저장 완료되었습니다.');
            emit('postSuccess');
            closeModal();
        });
    } catch (error) {
        alert('거래처 등록을 다시 시도해주세요.');
    }
};

const closeModal = () => {
    modalState.setModalState();
};

// 제품 선택 이벤트 핸들러

async function handleManufacturerChange() {
    if (selectedManufacturer.value) {
        productList.value = await fetchProductsByManufacturer(
            selectedManufacturer.value.industryCode
        );
    }
}
//  총액 = 제품 단가 * 수량
const calculateSupplyPrice = () => {
    supplyPrice.value = quantity.value * selectedProduct.value.unit_price;
};

onMounted(async () => {
    manufacturers.value = await fetchManufacturers();
    clients.value = await fetchClient();
});

onUnmounted(() => {
    emit('modalClose', 0);
});
</script>

<template>
    <teleport to="body">
        <div class="backdrop">
            <div class="container">
                <h2>견적서 작성</h2>

                <table>
                    <tr>
                        <th>거래처<span class="font_red">*</span></th>
                        <td>
                            <select v-model="selectedClient">
                                <option value="" disabled>전체</option>
                                <option
                                    v-for="client in clients"
                                    :key="client.id"
                                    :value="client.id"
                                >
                                    {{ client.client_name }}
                                </option>
                            </select>
                        </td>
                        <th>납기일<span class="font_red">*</span></th>
                        <td>
                            <input type="date" v-model="estimateDeliveryDate" />
                        </td>
                        <th>영역구분<span class="font_red">*</span></th>
                        <td>
                            <select v-model="estimateSalesArea">
                                <option value="" disabled>전체</option>
                                <option value="SCM">SCM</option>
                                <option value="영업">영업</option>
                            </select>
                        </td>
                    </tr>
                </table>
                <hr />

                <table>
                    <tr>
                        <th>제조업체<span class="font_red"> *</span></th>
                        <td>
                            <select
                                v-model="selectedManufacturer"
                                @change="handleManufacturerChange"
                            >
                                <option value="" disabled>제조사</option>
                                <option
                                    v-for="manufacturer in manufacturers"
                                    :key="manufacturer.manufacturer_id"
                                    :value="manufacturer"
                                >
                                    {{ manufacturer.industryName }}
                                </option>
                            </select>
                        </td>
                        <th>제품<span class="font_red"> *</span></th>
                        <td>
                            <select v-model="selectedProduct">
                                <option value="" disabled>제품</option>
                                <option
                                    v-for="product in productList"
                                    :key="product.id"
                                    :value="product"
                                >
                                    {{ product.name }}
                                </option>
                            </select>
                        </td>
                        <th>제품 단가</th>
                        <td>
                            {{ selectedProduct.unit_price?.toLocaleString() }}
                        </td>
                    </tr>
                    <tr>
                        <th>수량<span class="font_red"> *</span></th>
                        <td>
                            <input
                                type="text"
                                v-model="quantity"
                                @input="calculateSupplyPrice"
                            />
                        </td>
                        <th>총액</th>
                        <td>
                            {{ supplyPrice?.toLocaleString() }}
                        </td>
                    </tr>
                </table>
                <div class="button-container">
                    <button @click="addEstimateItem">추가</button>
                </div>

                <table>
                    <tbody>
                        <input type="text" hidden />

                        <tr>
                            <th class="table-header">제조업체</th>
                            <th class="table-header">제품명</th>
                            <th class="table-header">제품단가</th>
                            <th class="table-header">수량</th>
                            <th class="table-header">공급가액</th>
                            <th class="table-header">삭제</th>
                        </tr>
                        <tr v-for="(item, index) in estimateList" :key="index">
                            <td>{{ item.industryName }}</td>
                            <td>{{ item.productName }}</td>
                            <td>{{ item.unitPrice?.toLocaleString() }}</td>
                            <td>{{ item.quantity }}</td>
                            <td>{{ item.supplyPrice?.toLocaleString() }}</td>
                            <td>
                                <div>
                                    <button
                                        @click="estimateList.splice(index, 1)"
                                    >
                                        삭제
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div class="button-container">
                    <div v-if="estimateList.length > 0">
                        <button @click="saveEstimate()">등록</button>
                    </div>
                    <button type="button" @click="closeModal()">취소</button>
                </div>
            </div>
        </div>
    </teleport>
</template>
<style lang="scss" scoped>
.search-box {
    margin-bottom: 10px;
    display: flex;
    text-align: center;
    width: 700px;
    height: 50px;
}

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

button {
    background-color: #3bb2ea;
    border: none;
    color: white;
    padding: 10px 22px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;

    cursor: pointer;
    border-radius: 12px;
    box-shadow: 0 4px #999;
    transition: 0.3s;
    width: 100px;
    margin: 10px 10px;
}

button:hover {
    background-color: #45a049;
}

button:active {
    background-color: #3e8e41;
    box-shadow: 0 2px #666;
    transform: translateY(2px);
}

input[type='text']:focus,
input[type='date']:focus,
select:focus {
    border-color: #3bb2ea;
    outline: none;
}
select {
    width: 90%;
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
}

input {
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 5px;
    margin-right: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
}

.button-box button {
    width: 48%;
}

input[type='text']:focus,
input[type='date']:focus,
select:focus {
    border-color: #3bb2ea;
    outline: none;
}

.button-container {
    display: flex;
    justify-content: flex-end; /* 오른쪽 정렬 */
    margin-bottom: 20px;
}

.font_red {
    color: #fe1414;
}
</style>
