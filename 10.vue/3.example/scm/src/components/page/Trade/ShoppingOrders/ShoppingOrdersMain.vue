<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import Pagination from '../../../common/Pagination.vue';
import { useModalStore } from '../../../../stores/modalState';
import ShoppingOrdersDeliveryModal from './ShoppingOrdersDeliveryModal.vue';
import ShoppingOrdersOrderModal from './ShoppingOrdersOrderModal.vue';

const shoppingOrdersList = ref();
const route = useRoute();
const cPage = ref(1);
const orderId = ref(0);
const modalState = useModalStore();
const modalType = ref('');

const searchList = () => {
    const param = {
        ...route.query,
        pageSize: 5,
        currentPage: cPage.value,
    };
    axios.post('/api/trade/shoppingListBody.do', param).then(res => {
        shoppingOrdersList.value = res.data;
    });
};

const handlerDeliveryModal = id => {
    orderId.value = id;
    modalType.value = 'delivery';
    modalState.setModalState();
};

const handlerOrderModal = id => {
    orderId.value = id;
    modalType.value = 'order';
    modalState.setModalState();
};

const onPostSuccess = () => {
    modalState.setModalState(false);
    modalType.value = '';
    searchList();
};

onMounted(() => {
    searchList();
});
</script>

<template>
    <div class="divShoppingOrdersList">
        <ShoppingOrdersDeliveryModal
            v-if="modalState.modalState && modalType === 'delivery'"
            :id="orderId"
            @modalClose="orderId = $event"
            @postSuccess="onPostSuccess"
        />
        <ShoppingOrdersOrderModal
            v-if="modalState.modalState && modalType === 'order'"
            :id="orderId"
            @modalClose="orderId = $event"
            @postSuccess="onPostSuccess"
        />
        <table>
            <colgroup>
                <col width="5%" />
                <col width="10%" />
                <col width="10%" />
                <col width="10%" />
                <col width="5%" />
                <col width="10%" />
                <col width="5%" />
                <col width="10%" />
                <col width="10%" />
                <col width="5%" />
                <col width="10%" />
                <col width="10%" />
            </colgroup>

            <thead>
                <tr>
                    <th scope="col">주문 번호</th>
                    <th scope="col">주문 일자</th>
                    <th scope="col">고객 기업명</th>
                    <th scope="col">주문 제품명</th>
                    <th scope="col">총 재고 개수</th>
                    <th scope="col">단가</th>
                    <th scope="col">주문 개수</th>
                    <th scope="col">금액 합계</th>
                    <th scope="col">반품 요청일자</th>
                    <th scope="col">결제 상태</th>
                    <th scope="col">배송지시서</th>
                    <th scope="col">발주지시서</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="shoppingOrdersList">
                    <template v-if="shoppingOrdersList.shoppingCnt > 0">
                        <tr
                            v-for="shoppingOrders in shoppingOrdersList.shoppingList"
                            :key="shoppingOrders.orderId"
                        >
                            <td>{{ shoppingOrders.orderId }}</td>
                            <td>{{ shoppingOrders.salesDate }}</td>
                            <td>{{ shoppingOrders.customerName }}</td>
                            <td>{{ shoppingOrders.productName }}</td>
                            <td>{{ shoppingOrders.totalQuantity }}</td>
                            <td>{{ shoppingOrders.sellPrice }}</td>
                            <td>{{ shoppingOrders.count }}</td>
                            <td>{{ shoppingOrders.totalPrice }}</td>
                            <td>
                                {{
                                    shoppingOrders.requestsReturnDate
                                        ? shoppingOrders.requestsReturnDate
                                        : '미반품'
                                }}
                            </td>
                            <td>
                                {{
                                    shoppingOrders.paymentStatus === 0
                                        ? '❌'
                                        : '⭕'
                                }}
                            </td>
                            <td>
                                <template
                                    v-if="
                                        shoppingOrders.salesState ===
                                            'ordering' ||
                                        shoppingOrders.salesState ===
                                            'salesRequest'
                                    "
                                >
                                    <template
                                        v-if="
                                            shoppingOrders.totalQuantity >=
                                                shoppingOrders.count &&
                                            shoppingOrders.orderingState !==
                                                'return'
                                        "
                                    >
                                        <button
                                            @click="
                                                handlerDeliveryModal(
                                                    shoppingOrders.orderId
                                                )
                                            "
                                        >
                                            배송
                                        </button>
                                    </template>
                                </template>
                                <template
                                    v-else-if="
                                        shoppingOrders.salesState === 'delivery'
                                    "
                                >
                                    <span
                                        style="color: green; font-weight: bold"
                                        >배송중</span
                                    >
                                </template>
                                <template
                                    v-else-if="
                                        shoppingOrders.salesState ===
                                        'deliveryComplete'
                                    "
                                >
                                    <span
                                        style="color: green; font-weight: bold"
                                        >배송완료</span
                                    >
                                </template>
                                <template
                                    v-else-if="
                                        shoppingOrders.salesState ===
                                        'mallReturnsComplete'
                                    "
                                >
                                    <span
                                        style="color: green; font-weight: bold"
                                        >반품완료</span
                                    >
                                </template>
                                <template
                                    v-else-if="
                                        shoppingOrders.salesState ===
                                        'mallReturnsRequest'
                                    "
                                >
                                    <span
                                        style="color: green; font-weight: bold"
                                        >반품요청</span
                                    >
                                </template>
                                <template
                                    v-else-if="
                                        shoppingOrders.salesState ===
                                        'salesComplete'
                                    "
                                >
                                    <span
                                        style="color: green; font-weight: bold"
                                        >구매확정</span
                                    >
                                </template>
                                <template v-else>
                                    <span></span>
                                </template>
                            </td>
                            <td>
                                <template
                                    v-if="
                                        shoppingOrders.salesState === 'ordering'
                                    "
                                >
                                    <template
                                        v-if="
                                            !shoppingOrders.requestsReturnDate &&
                                            shoppingOrders.orderingState !==
                                                'return'
                                        "
                                    >
                                        <div>
                                            <span
                                                style="
                                                    color: green;
                                                    font-weight: bold;
                                                "
                                                >발주처리</span
                                            >
                                        </div>
                                    </template>
                                    <template v-else>
                                        <button
                                            @click="
                                                handlerOrderModal(
                                                    shoppingOrders.orderId
                                                )
                                            "
                                        >
                                            발주
                                        </button>
                                    </template>
                                </template>
                                <template
                                    v-else-if="
                                        shoppingOrders.salesState ===
                                        'salesRequest'
                                    "
                                >
                                    <button
                                        v-if="
                                            shoppingOrders.totalQuantity <
                                            shoppingOrders.count
                                        "
                                        @click="
                                            handlerOrderModal(
                                                shoppingOrders.orderId
                                            )
                                        "
                                    >
                                        발주
                                    </button>
                                </template>
                            </td>
                        </tr>
                    </template>
                </template>
                <template v-else>
                    <tr>
                        <td colspan="12">일치하는 검색 결과가 없습니다</td>
                    </tr>
                </template>
            </tbody>
        </table>
        <Pagination
            :totalItems="shoppingOrdersList?.shoppingCnt"
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
        font-size: 15px;
        white-space: nowrap;
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
    background-color: #9e9e9e;

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
