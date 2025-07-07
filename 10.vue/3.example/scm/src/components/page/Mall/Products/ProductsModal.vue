<script setup>
import { onMounted, ref } from 'vue';
import { useModalStore } from '../../../../stores/modalState';
import axios from 'axios';


const { id, userType } = defineProps(['id', 'userType']);
const modalState = useModalStore();
const productsDetail = ref({});
const imageDetail = ref({});

const imageUrl = ref('');
const fileName = ref('');
const emit = defineEmits(['modalClose']);

const searchDetail = () => {
    axios.post('/api/mall/productsDetailBody.do', {productId: id}).then(res => {
        productsDetail.value = {
            orderCount: 1,
            requestedDeliveryDate: getToday(),
            ...res.data.detailValue
        };
        imageDetail.value = res.data.attachmentValue;

        if(imageDetail.value == null) return;


        const fullPath = imageDetail.value.filePath;
        const basePath = "V:\\FileRepository";
        fileName.value = fullPath.slice(basePath.length);
        getFileImage();
    })
};

const getToday = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const getFileImage = () => {
    axios.get('/api/image/showImg.do',{
            params: { fileName: fileName.value },
            responseType: 'arraybuffer'})
            .then(res => {
                const url = window.URL.createObjectURL(new Blob([res.data]));
                imageUrl.value = url;
    });
};

const handlerToCart = () => {
    const param = {
        productId : productsDetail.value.productId
        ,supplyId : productsDetail.value.supplyId
        ,price : productsDetail.value.sellPrice
        ,count : productsDetail.value.orderCount
        ,requestedDeliveryDate : productsDetail.value.requestedDeliveryDate
    };
    axios.post('/api/mall/cartDetailSaveBody.do',param).then(res => {
        if(res.data.result != 'success') return alert('장바구니 저장에 실패하였습니다.');
        alert('장바구니 저장에 성공하였습니다.');
        modalState.setModalState();
    });
}

const handlerToOrder = () => {
    const result = window.confirm('입금 하시겠습니까?');
    if(!result) return alert('주문이 취소되었습니다.')
    const param = {
        productId : productsDetail.value.productId
        ,supplyId : productsDetail.value.supplyId
        ,price : productsDetail.value.sellPrice
        ,count : productsDetail.value.orderCount
        ,requestedDeliveryDate : productsDetail.value.requestedDeliveryDate
    };
    axios.post('/api/mall/historySaveBody.do',param).then(res => {
        if(res.data.result != 'success') return alert('주문에 실패하였습니다.');
        alert('주문에 성공하였습니다.');
        modalState.setModalState();
    });
}

onMounted(()=> {
    searchDetail();
})

onUnmounted(() => {
    emit('modalClose', 0);
});


</script>

<template>
    <div class="backdrop">
        <div class="container">
			<dl>
				<dt>
					<strong>제품 상세보기</strong>
				</dt>
				<dd style="display: flex; flex-direction: column; margin: 0 auto;">
					<div style="display: flex; justify-content: flex-end; gap: 8px;">
						<label>{{ productsDetail.productId }}</label> 
						<label> | </label> 
						<label>{{ productsDetail.categoryName }}</label>
					</div>
					<div class="wrapper">
						<div>
							<img :src="imageUrl" class="product-image"/> 
						</div>
						<div>
							<table class="row">
								<colgroup>
									<col width="120px">
									<col width="*">
									<col width="120px">
									<col width="*">
								</colgroup>
								<tbody>
									<tr>
										<th scope="row">제품 번호</th>
										<td colspan="3">
                                            <input 
                                            type="text"
                                            v-model="productsDetail.productId"
                                            readonly/>
                                        </td>
									</tr>
									<tr>
										<th scope="row">제조사</th>
										<td colspan="3">
                                            <input type="text"
                                            v-model="productsDetail.supplyName"
                                            readonly/>
                                        </td>
									</tr>
									<tr>
										<th scope="row">판매 가격</th>
										<td colspan="3">
                                            <input type="text"
                                            :value="productsDetail.sellPrice?.toLocaleString()"
                                            readonly/>
                                        </td>
									</tr>
								</tbody>
							</table>
						</div>
						<div>
							<table class="row">
								<colgroup>
									<col width="150px">
									<col width="*">
									<col width="120px">
									<col width="*">
								</colgroup>
								<tbody>
									<tr>
										<th scope="row">주문 수량<span class="font_red">*</span></th>
										<td colspan="3">
                                            <input type="number"
                                            v-model="productsDetail.orderCount"
                                            min="1"/></td>
									</tr>
									<tr>
										<th scope="row">납품 희망일자<span class="font_red">*</span></th>
										<td colspan="3">
                                            <input type="date"
                                            v-model="productsDetail.requestedDeliveryDate"
                                            :min="getToday()"
										    />
                                        </td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div calss="productInfo3">
						<table class="row">
							<colgroup>
								<col width="120px">
								<col width="*">
								<col width="120px">
								<col width="*">
							</colgroup>
							<tbody>
								<tr>
									<th scope="row">제품 상세 정보</th>
									<td colspan="3">
                                        <textarea 
                                        class="text-area" cols="40" rows="5" readonly
                                        v-model="productsDetail.description"
                                        > 
                                    </textarea>
                                </td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="button-box">
                        <template v-if="userType == 'C'">
                            <button
                            @click="handlerToCart()"
                            >장바구니 담기</button> 
                            <button
                            @click="handlerToOrder()"
                        >주문</button>
                        </template>
						<button
                        @click="modalState.setModalState()"
                        >취소</button>
					</div>
				</dd>
			</dl>
		</div>
    </div>
</template>

<style lang="scss" scoped>
.backdrop {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10;
    font-weight: bold;
}

.container {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    position: relative;
    width: 30%;
    max-width: 800px;
    z-index: 11;
}

table {
    width: 100%;
    border-collapse: collapse;
}
dt{
    text-align: center;
    margin-bottom: 8px;
    font-size: 24px;
}
th,
td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
}

th {
    background: #f4f4f4;
    text-align: center;
}

.product-image {
    width: 168px;
    height: 198px;
    object-fit: contain;
    border: 1px solid #ddd;
    background: white;
}

.text-area {
    width: 100%;
    height: 60px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: none;
    box-sizing: border-box;
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

.font_red {
    color: #fe1414;
}

.custom-upload-btn {
    display: inline-block;
    background-color: #3bb2ea;
    border: none;
    color: white;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 6px;
    box-shadow: 0 2px #999;
    transition: 0.3s;
    font-family: sans-serif;
    font-weight: normal;

    &:hover {
        background-color: #45a049;
    }

    &:active {
        background-color: #3e8e41;
        box-shadow: 0 2px #666;
        transform: translateY(2px);
    }
}
.custom-td{
    width: 40%;
}

.wrapper{
    display: flex; 
    flex-direction: row;
}

.wrapper> div > table.row{
    flex: 1;
    height: 200px;
}

input{
    width: 100%;
}
dd {
  margin-inline-start: 0;
}


</style>