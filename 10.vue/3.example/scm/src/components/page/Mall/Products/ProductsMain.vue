<script setup>
import axios from 'axios';
import { onMounted, ref, watch } from 'vue';
import ProductsModal from './ProductsModal.vue';
import { useModalStore } from '../../../../stores/modalState';
import { useRoute } from 'vue-router';

const route = useRoute();
const modalState = useModalStore();

const cPage = ref(1);
const productsList = ref({});
const productId = ref(0);
const userType = ref('');


const searchList = () => {
    const {searchCategory = '', searchSupplyName = '', searchTitle = ''} = route.query;
    const param = {
        searchCategory: searchCategory
        , searchSupplyName: searchSupplyName
        , searchTitle: searchTitle
        , currentPage: cPage.value
        , pageSize: 5
    }
    axios.post('/api/mall/productsListBody.do', param).then(res => {
        productsList.value = res.data;
        userType.value = productsList.value.userType;
    })
}

const handlerOpenModal = (id) => {
    productId.value = id;
    modalState.setModalState();
}

onMounted(() => {
    searchList();
})

watch(() => route.query, searchList);
</script>

<template>    
    <div>
        <ProductsModal
        v-if="modalState.modalState"
        :id="productId"
        :userType="userType"
        @modalClose="$event"
        />
        현재 페이지: {{ cPage }} 총 개수 : {{ productsList.productsCnt }}
        <div>
            <table class="col">
                <colgroup>
                    <col width="16%">
                    <col width="16%">
                    <col width="17%">
                    <col width="17%">
                    <col width="17%">
                    <col width="17%">
                </colgroup>

                <!-- 리스트 제목행 -->
                <thead>
                    <tr>
                        <th scope="col">제품 ID</th>
                        <th scope="col">제품 분류</th>
                        <th scope="col">제품 번호</th>
                        <th scope="col">제품 명</th>
                        <th scope="col">제조사</th>
                        <th scope="col">판매 가격</th>
                    </tr>
                </thead>

                <!-- 리스트 내용행 -->
                <tbody>
                    <template v-if="productsList">
                        <template v-if="productsList.productsCnt > 0">
                            <tr
                            v-for="products in productsList.products"
                            :key="products.productId"
                            >
                                <td>{{ products.productId }}</td>
                                <td>{{ products.categoryName }}</td>
                                <td
                                class="td-hover"
                                @click="handlerOpenModal(products.productId)"
                                >{{ products.productNumber }}</td>
                                <td>{{ products.name }}</td>
                                <td>{{ products.supplyName }}</td>
                                <td>{{ products.sellPrice.toLocaleString() }}</td>
                            </tr>
                        </template>
                        <template v-else>
                            <td colspan="6">일치하는 검색 결과가 없습니다</td>
                        </template>
                    </template>
                </tbody>
                
            </table>

            <!-- 페이징 처리 -->
            <Pagination 
            :totalItems = "productsList?.productsCnt"
            :items-per-page="5"
            :max-pages-shown="5"
            :onClick="searchList"
            v-model="cPage"
        />     
        </div>
    </div>
</template>

<style scoped>
.td-hover {
    cursor: pointer;
    transition: color 0.3s ease;
    font-weight: bold;
}
.td-hover:hover {
  text-decoration: underline;
  color: #fe1414;
}

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

</style>