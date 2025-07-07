<template>
    <div class="divExpenseReviewList">
        <VoucherListModal
            v-if="modal.modalState && selectedVoucher"
            :voucherDetail="selectedVoucher"
            :id="voucherNo"
            @modalClose="voucherNo = $event"
            @postSuccess="onPostSuccess"
        />
        <table>
            <thead>
                <tr>
                    <th>전표번호</th>
                    <th>일자</th>
                    <th>구분</th>
                    <th>거래처</th>
                    <th>차변계정과목</th>
                    <th>대변계정과목</th>
                    <th>장부금액</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="voucherList">
                    <tr
                        v-for="voucher in voucherList.voucher"
                        :key="voucher.voucher_no"
                        @click="handlerModal(voucher.voucher_no)"
                    >
                        <td>{{ voucher.voucher_no }}</td>
                        <td>{{ voucher.voucher_date }}</td>
                        <td>{{ voucher.exp_id ? '비용' : '매출' }}</td>
                        <td>{{ voucher.client_name }}</td>
                        <td>{{ voucher.debit_name }}</td>
                        <td>{{ voucher.crebit_name }}</td>
                        <td>{{ formatPayment(voucher.voucher_amount) }}</td>
                    </tr>
                </template>
                <template v-else>
                    <tr>
                        <td colspan="7">일치하는 검색 결과가 없습니다</td>
                    </tr>
                </template>
            </tbody>
        </table>
        <Pagination
            :totalItems="voucherList?.voucherCnt"
            :items-per-page="5"
            :max-pages-shown="10"
            :onClick="searchList"
            v-model="cPage"
        />
    </div>
</template>

<script setup>
import axios from 'axios';
import { watch } from 'vue';
import { useModalStore } from '../../../../stores/modalState';
const modal = useModalStore();
const cPage = ref(1);
const route = useRoute();
const voucherList = ref();
const voucherNo = ref(0);

const formatPayment = value => {
    const formattedValue = (value?.toString().replace(/,/g, '') || '').replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ','
    );
    return formattedValue + ' 원';
};

const searchList = async () => {
    const param = new URLSearchParams({
        ...route.query,
        pageSize: 5,
        currentPage: cPage.value,
    });

    try {
        const response = await axios.post('/api/account/voucherList.do', param);
        voucherList.value = response.data;
    } catch (e) {
        console.error('Axios Error:', e);
    }
};

const handlerModal = id => {
    voucherNo.value = id;
    modal.setModalState();
};

const onPostSuccess = () => {
    modal.setModalState();
    searchList();
};

const selectedVoucher = computed(() => {
    const v = voucherList.value?.voucher.find(
        v => v.voucher_no === voucherNo.value
    );
    if (!v) return null;
    return {
        ...v,
        type: v.exp_id ? '비용' : '매출',
    };
});

onMounted(() => {
    searchList();
});

watch(() => route.query, searchList);
</script>

<style lang="scss" scoped>
table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0px 0px 0px;
    font-size: 18px;

    th,
    td {
        padding: 8px;
        border: 1px solid #ddd;
        text-align: center;
    }

    th {
        background: #f4f4f4;
        font-weight: bold;
    }

    /* 테이블 올렸을 때 */
    tbody tr:hover {
        background-color: #d3d3d3;
        opacity: 0.9;
        cursor: pointer;
    }
}
</style>
