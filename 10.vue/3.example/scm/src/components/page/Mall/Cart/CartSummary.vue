<script setup>
import axios from 'axios'
import { useCartStore } from '../../../../stores/cartState'
import { ref } from 'vue';

const cartState = useCartStore();
const total = ref(0);
const selected = ref(0);

const totalAmount = () => {
    const list = cartState.cartList.cartDetailWithImage;
    if(!Array.isArray(list)) return;

    total.value = list.reduce((sum, item) => {
        return sum + (item.cartDetail.price * item.cartDetail.count)
    }, 0);
}

const selectedAmount = () => {
    const list = cartState.cartList.cartDetailWithImage;
    if(!Array.isArray(list)) return
    selected.value = list.reduce((sum, item) => {
        if(item.isSelect){
            return sum + (item.cartDetail.price * item.cartDetail.count);
        }
        return sum;
    }, 0);
}

const handlerOrderSave = () => {
    const cartDetailIdList = cartState.cartList.cartDetailWithImage
        .filter(item => item.isSelect)
        .map(item => item.cartDetail.cartdetailId) 

    if(!cartDetailIdList?.length) return alert('선택하신 상품이 없습니다.');
    let confirmOrder = window.confirm('입금 하시겠습니까?');
    
    if(!confirmOrder) return alert('상품 주문이 취소되었습니다.');
    
    axios.post('/api/mall/historysSaveBody.do', cartDetailIdList,{
 
        }).then(res => {
        if(res.data.result != 'success') return alert('주문에 실패하였습니다.');

        alert('상품 주문에 성공하였습니다.');
        cartState.triggerRefresh = true
    });
}

const handlerUpdateCount = (cartdetailId, count) => {
    const list = cartState.cartList.cartDetailWithImage;
    if(!Array.isArray(list)) return
    const param = new URLSearchParams({
        cartdetailId: cartdetailId
        , count: count
    });

    axios.post('/api/mall/cartDetailUpdate.do', param)
}

const handlerUpdateRequestedDeliveryDate = (cartdetailId, requestedDeliveryDate) => {
    const list = cartState.cartList.cartDetailWithImage;
    if(!Array.isArray(list)) return
    const param = new URLSearchParams({
        cartdetailId: cartdetailId
        , requestedDeliveryDate: requestedDeliveryDate
    });

    axios.post('/api/mall/cartDetailUpdate.do', param)
}

watch(() => cartState.cartList.cartDetailWithImage, () => {
    totalAmount();
    selectedAmount();
}, { immediate: true, deep: true });

watch(
    () => Array.isArray(cartState.cartList.cartDetailWithImage)
    ? cartState.cartList.cartDetailWithImage.map(item => item.cartDetail?.count)
    : [],
  (newVals, oldVals) => {
    newVals.forEach((val, index) => {
      if (val !== oldVals[index]) {
        const changedItem = cartState.cartList.cartDetailWithImage[index]
        handlerUpdateCount(changedItem.cartDetail.cartdetailId, changedItem.cartDetail.count);
      }
    })
  }
);

watch(
    () => Array.isArray(cartState.cartList.cartDetailWithImage)
    ? cartState.cartList.cartDetailWithImage.map(item => item.cartDetail?.requestedDeliveryDate)
    : [],
  (newVals, oldVals) => {
    newVals.forEach((val, index) => {
      if (val !== oldVals[index]) {
        const changedItem = cartState.cartList.cartDetailWithImage[index]
        handlerUpdateRequestedDeliveryDate(changedItem.cartDetail.cartdetailId, changedItem.cartDetail.requestedDeliveryDate);
      }
    })
  }
);
</script>

<template>
    <div class="summary-main">
        <div class="summary-container">
            <span class="summary-title">장바구니 총액</span><br>
            <hr>
            <div class = "summary-amount">
                <span >전체 금액: </span> 
                <div>
                    <span> {{ total.toLocaleString() }} </span> <span>원</span> 
                </div>
            </div>
            <div class = "summary-amount">
                <span>선택 금액: </span> 
                <div>
                    <span> {{ selected.toLocaleString() }} </span> <span>원</span> 
                </div>
            </div>
            <div>
                <button
                @click="handlerOrderSave"
                >주문</button>
            </div>
        </div>
    </div>
</template>


<style scoped>
.summary-main{
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
} 

.summary-container{
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 5px;
    gap:4px;
}

.summary-title{
    font-size: 20px;
    font-weight: bold;
}
.summary-amount{
    width: 100%;
    display: flex;
    justify-content: space-between;
}

hr{
    width: 100%;
    border: 1px solid #ccc;
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
</style>