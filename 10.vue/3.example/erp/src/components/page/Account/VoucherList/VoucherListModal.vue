<template>
    <teleport to="body">
        <div class="backdrop">
            <div class="modal-container">
                <h1 class="title print-only">회계전표</h1>
                <table class="modal-table">
                    <tr>
                        <td class="label">전표번호</td>
                        <td>
                            <input
                                type="text"
                                :value="voucherDetail.voucher_no"
                                readonly
                            />
                        </td>
                        <td class="label">구분</td>
                        <td>
                            <input
                                type="text"
                                :value="voucherDetail.type"
                                readonly
                            />
                        </td>
                        <td class="label">담당자</td>
                        <td>
                            <input
                                type="text"
                                :value="voucherDetail.emp_name"
                                readonly
                            />
                        </td>
                        <td class="label">일자</td>
                        <td>
                            <input
                                type="date"
                                :value="voucherDetail.voucher_date"
                                readonly
                            />
                        </td>
                    </tr>
                    <tr>
                        <td class="label">거래처</td>
                        <td>
                            <input
                                type="text"
                                :value="voucherDetail.client_name"
                                readonly
                            />
                        </td>
                        <template v-if="voucherDetail.type === '매출'">
                            <td class="label">주문번호</td>
                            <td>
                                <input
                                    type="text"
                                    :value="voucherDetail.order_id"
                                    readonly
                                />
                            </td>
                        </template>
                        <template v-else-if="voucherDetail.type === '비용'">
                            <td class="label">지출번호</td>
                            <td>
                                <input
                                    type="text"
                                    :value="voucherDetail.exp_id"
                                    readonly
                                />
                            </td>
                        </template>
                    </tr>
                </table>
                <table class="content-table">
                    <thead>
                        <tr>
                            <th>계정과목</th>
                            <th>차변</th>
                            <th>대변</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input
                                    type="text"
                                    :value="voucherDetail.debit_name"
                                    readonly
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    :value="
                                        formattedPayment(
                                            voucherDetail.voucher_amount
                                        )
                                    "
                                    readonly
                                />
                            </td>
                            <td>
                                <input />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input
                                    type="text"
                                    :value="voucherDetail.crebit_name"
                                    readonly
                                />
                            </td>
                            <td>
                                <input />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    :value="
                                        formattedPayment(
                                            voucherDetail.voucher_amount
                                        )
                                    "
                                    readonly
                                />
                            </td>
                        </tr>
                        <tr class="row-table">
                            <td>합계</td>
                            <td>
                                <input
                                    type="text"
                                    :value="
                                        formattedPayment(
                                            voucherDetail.voucher_amount
                                        ) + ' 원'
                                    "
                                    readonly
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    :value="
                                        formattedPayment(
                                            voucherDetail.voucher_amount
                                        ) + ' 원'
                                    "
                                    readonly
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="button-box no-print">
                    <div class="print-page" id="pdf-content">
                        <button class="button" @click="downloadPdf">
                            PDF 저장
                        </button>
                    </div>
                    <button class="button" @click="printPage">인쇄</button>
                    <button @click="setModalState">나가기</button>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script setup>
import { useModalStore } from '../../../../stores/modalState';
import html2pdf from 'html2pdf.js/dist/html2pdf.bundle.min';
const emit = defineEmits(['modalClose', 'postSuccess']);
const { setModalState } = useModalStore();
const { voucherDetail } = defineProps({
    voucherDetail: {
        type: Object,
        required: true,
    },
});

const formattedPayment = x => {
    if (typeof x !== 'number') return '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const printPage = () => {
    window.print();
};

const downloadPdf = () => {
    const element = document.getElementById('pdf-content');
    const opt = {
        margin: 0.5,
        filename: '지출결의서.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape' },
    };
    html2pdf().set(opt).from(element).save();
};

onUnmounted(() => {
    emit('modalClose', 0);
});
</script>

<style scoped>
.backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}
.modal-container {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    width: 90vw;
    max-width: 1000px;
    overflow-x: auto;
}
.modal-table,
.content-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 15px;
}
.modal-table td,
.content-table td {
    border: 1px solid #ccc;
    padding: 10px;
}
.content-table th,
tr.row-table {
    border: 1px solid #ccc;
    background: #f4f4f4;
    font-weight: bold;
    text-align: center;
    font-size: 14px;
}
.label {
    background: #f0f0f0;
    font-weight: bold;
    text-align: left;
}
input {
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: 8px;
    margin: 5px 0;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 14px;
    background-color: #fdfdfd;
}
.button-box {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
}
button {
    background-color: #3bb2ea;
    border: none;
    color: white;
    padding: 10px 20px;
    margin-left: 10px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 6px;
    box-shadow: 0 2px #999;
    transition: 0.3s;
}
button:hover {
    background-color: #45a049;
}
button:active {
    background-color: #3e8e41;
    box-shadow: 0 2px #666;
    transform: translateY(2px);
}
.print-only {
    display: none;
}
@media print {
    @page {
        size: A4 landscape;
        margin: 0;
    }

    .print-only {
        display: block;
    }

    body {
        margin: 0;
        -webkit-print-color-adjust: exact;
    }

    .print-page {
        width: 100%;
        padding: 0;
        margin: 0;
        page-break-after: always;
    }

    h1.title {
        margin-top: 0;
    }

    .content-table th {
        background-color: #eee !important;
        -webkit-print-color-adjust: exact;
    }

    .no-print {
        display: none !important;
    }
}
</style>
