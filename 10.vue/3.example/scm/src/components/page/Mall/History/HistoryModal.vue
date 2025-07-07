<script setup>
import axios from 'axios';
import { useModalStore } from '../../../../stores/modalState';
import { useHistoryStore } from '../../../../stores/historyState';


const modalState = useModalStore();
const historyState = useHistoryStore();

const { count } = defineProps(['count']);

const returnDetail = ref({
    bank: 0
});


const handlerReturn = () => {
    const result = window.confirm("반품 하시겠습니까?");
    if(!result) return alert("반품이 취소되었습니다.");

    const param = new URLSearchParams({
        ...returnDetail.value
        ,orderId: historyState.orderId
        , count: count
    });
    axios.post('/api/mall/historyReturnRequest.do', param).then(res => {
        if(res.data.result != 'success') return alert('반품 요청이 실패되었습니다.')
        alert('반품 요청이 성공하였습니다.');
        historyState.mainRendering();
        historyState.setDetailState(historyState.orderId);
        modalState.setModalState();
    });
    
};




</script>

<template>
    <div class="backdrop">
        <div class="container" style="width: 600px;">
			<dl>
				<dt>
					<strong>반품 요청</strong>
				</dt>
				<dd>
				<label>반품 시 입금 받을 계좌를 입력하세요.</label>
					<table class="row">
						<colgroup>
							<col width="120px">
							<col width="*">
							<col width="120px">
							<col width="*">
						</colgroup>
						<tbody>
							<tr>
								<th scope="row">은행 선택</th>
								<td colspan="3">
								<select v-model="returnDetail.bank">
										<option disabled hidden value="0">은행 선택</option>
										<option value="088">신한</option>
										<option value="020">우리</option>
								</select>
								</td>
							</tr>
							<tr>
								<th scope="row">계좌번호</th>
								<td colspan="3">
                                    <input 
                                    type="text"
                                    v-model="returnDetail.accountNumber"
                                    /></td>
							</tr>
							<tr>
								<th scope="row">예금주</th>
								<td colspan="3">
                                    <input 
                                    type="text"
                                    v-model="returnDetail.accountHolder"
                                    /></td>
							</tr>
						</tbody>
					</table>
					<div class="button-box">
						<button
                        @click="handlerReturn()"
                        >반품</button>
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

input{
    width: 100%;
}

.font_red {
    color: #fe1414;
}

dd {
  margin-inline-start: 0;
}


</style>