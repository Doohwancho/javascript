<script setup>
import axios from 'axios';
import { onMounted, ref, computed } from 'vue';
import { useCartStore } from '../../../../stores/cartState';



const cartState = useCartStore();

const cartList = ref({});
const detailId = ref(0);
const today = new Date().toISOString().slice(0, 10);

const searchList = async () => {
    const res = await axios.post('/api/mall/cartDetailList.do', {});
    const formatCartList = res.data.cartDetailWithImage;

    for (const item of formatCartList) {
        if (item.image && item.image.filePath){
            item.imageUrl = await getImageURL(item.image.filePath);
        }
        const rawDate = item.cartDetail.requestedDeliveryDate;
        if (rawDate) {
            item.cartDetail.requestedDeliveryDate = rawDate.slice(0, 10);
        }
        item.isSelect = false
    }
    cartList.value = {
        ...res.data,
        cartDetailWithImage: formatCartList,
    };
    
    /* cartState.cartList = cartList.value */
    cartState.setCartList(cartList.value);

};

const getImageURL = async (filePath) => {
    
    try{
        const basePath = "V:\\FileRepository";
        const fileName = filePath.slice(basePath.length);
        const res = await axios.get('/api/image/showImg.do', {
            params: { fileName },
            responseType: 'arraybuffer'
        });

        const url = window.URL.createObjectURL(new Blob([res.data]));
        return url;
    }catch(error){
        return null;
    }
};




const handlerDelete = (id) => {
    detailId.value = id;
    axios.post('/api/mall/cartDetailDeleteBody.do',{cartdetailId: detailId.value}).then(res => {
        if(res.data.result != 'success') return alert('장바구니 삭제에 실패하였습니다.');
        alert('장바구니 삭제에 성공하였습니다.');
        searchList();
    })
}

onMounted(() => {
    searchList();
})

watch(() => cartState.triggerRefresh, (val) => {
  if (val) {
    searchList();
    cartState.triggerRefresh = false ;
  }
})

</script>

<template>
    <div>
        <div>
            <table class="col">
                <colgroup>
                    <col width="10%">
                    <col width="10%">
                    <col width="20%">
                    <col width="10%">
                    <col width="10%">
                    <col width="10%">
                    <col width="20%">
                    <col width="10%">
                </colgroup>

                <!-- 리스트 제목행 -->
                <thead>
                    <tr>
                        <th scope="col">선택</th>
                        <th scope="col">제품 사진</th>
                        <th scope="col">제품명</th>
                        <th scope="col">가격</th>
                        <th scope="col">수량</th>
                        <th scope="col">총금액</th>
                        <th scope="col">납품 희망일자</th>
                        <th scope="col">삭제</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="cartList">
                        <template v-if="cartList.cartCnt > 0">
                            <tr
                            v-for="cart in cartList.cartDetailWithImage"
                            :key="cart.cartDetail.cartdetailId"
                            >
                                <td>
                                    <input 
                                    type="checkbox"
                                    v-model="cart.isSelect"
                                    >
                                </td>
                                <td>
                                    <img :src="cart.imageUrl" class="product-image">
                                </td>
                                <td>{{ cart.cartDetail.name }}</td>
                                <td>{{ cart.cartDetail.price.toLocaleString() }}</td>
                                <td>
                                    <input type="number"
                                    v-model="cart.cartDetail.count"
                                    min="1"
                                    style="width: 36px;"
                                    >
                                </td>
                                <td>{{ (cart.cartDetail.price*cart.cartDetail.count).toLocaleString() }}</td>
                                <td>
                                    <input type="date"
                                            v-model="cart.cartDetail.requestedDeliveryDate"
                                            :min="today"
										    />
                                </td>
                                <td>
                                    <button
                                    @click="handlerDelete(cart.cartDetail.cartdetailId)">
                                        삭제
                                    </button>
                                </td>
                            </tr>
                        </template>
                        <template v-else>
                            <td colspan="8">장바구니에 담긴 제품이 없습니다</td>
                        </template>
                    </template>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
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

.product-image {
    width: 60px;
    height: 60px;
    object-fit: contain;
    border: 1px solid #ddd;
    background: white;
}
</style>