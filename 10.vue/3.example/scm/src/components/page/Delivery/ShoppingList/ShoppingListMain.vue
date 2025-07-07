<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import Pagination from '../../../common/Pagination.vue';
import { useRoute } from 'vue-router';
import { useModalStore } from '../../../../stores/modalState';
import ShoppingListModal from './ShoppingListModal.vue';

const route = useRoute();
const modalState = useModalStore();

const shoppingList = ref();
const deliveryId = ref(0);
const deliveryState = ref("");
const cPage = ref(1);

const searchList = () => {
    const param = {
        ...route.query,
        pageSize:"5",
        currentPage: String(cPage.value),
    };

    axios.post('/api/delivery/shoppingDeliveryListJson.do', param).then(res => {
        shoppingList.value = res.data;
    });
};

const handlerModal = (id, state) => {
    deliveryId.value = id;
    deliveryState.value = state;
    modalState.setModalState();
};

const onPostSuccess = () => {
    modalState.setModalState();
    searchList();
};

onMounted(() => {
    searchList();
});

watch(() => route.query, searchList);
</script>

<template>
  <div class="divShoppingList">
    <ShoppingListModal 
        v-if="modalState.modalState"
        :id="deliveryId"
        :state="deliveryState"
        @modalClose="deliveryId=$event"
        @postSuccess="onPostSuccess"
    />
    <table>
        <colgroup>
            <col width="10%" />
            <col width="20%" />
            <col width="20%" />
            <col width="30%" />
            <col width="20%" />
        </colgroup>
        <thead>
            <tr>
                <th scope="col">배송 번호</th>
                <th scope="col">배송 담당자</th>
                <th scope="col">출발 창고지</th>
                <th scope="col">목적지</th>
                <th scope="col">배송 결과</th>
            </tr>
        </thead>
        <tbody>
            <template v-if="shoppingList">
                <template v-if="shoppingList.shoppingDeliveryListCnt > 0">
                    <tr v-for="shoppingDelivery in shoppingList.shoppingDeliveryList"
                        :key="shoppingDelivery.deliveryId"
                        @click="handlerModal(shoppingDelivery.deliveryId, shoppingDelivery.deliveryState)"
                    >
                        <td>{{ shoppingDelivery.deliveryId }}</td>
                        <td>{{ shoppingDelivery.deliveryManager }}</td>
                        <td>{{ shoppingDelivery.startLocation }}</td>
                        <td>{{ shoppingDelivery.endLocation }}</td>
                        <td>{{ shoppingDelivery.deliveryState }}</td>
                    </tr>
                </template>
                <template v-else>
                    <tr>
                        <td colspan="5">일치하는 검색 결과가 없습니다</td>
                    </tr>
                </template>
            </template>            
        </tbody>
    </table>
    <Pagination
        :totalItems="shoppingList?.shoppingDeliveryListCnt"
        :items-per-page="5"
        :max-pages-shown="5"
        :onClick="searchList"
        v-model="cPage"
/>
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
        cursor: pointer;
    }
}
</style>