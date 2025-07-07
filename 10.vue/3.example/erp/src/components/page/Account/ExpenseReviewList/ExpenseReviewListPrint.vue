<template>
    <div class="page-container">
        <div class="button-group no-print">
            <button class="button" @click="printPage">🖨️ 인쇄하기</button>
            <button class="button" @click="downloadPdf">📄 PDF 저장</button>
        </div>
        <div class="print-page" id="pdf-content">
            <h1 class="title">지출결의서</h1>

            <table class="info-table">
                <tr>
                    <td>발의일자</td>
                    <td>{{ formatDate(expenseDetail.req_date) }}</td>
                    <td>작성자</td>
                    <td>
                        {{ expenseDetail.name }} /
                        {{ expenseDetail.use_department }}
                    </td>
                </tr>
                <tr>
                    <td>결의일자</td>
                    <td>{{ formatDate(expenseDetail.approval_date) }}</td>
                    <td>지출예정일</td>
                    <td>{{ formatDate(expenseDetail.use_date) }}</td>
                </tr>
            </table>

            <table class="title-table">
                <tr>
                    <td>제목</td>
                    <td colspan="5">{{ expenseDetail.expense_content }}</td>
                </tr>
                <tr>
                    <td>금액</td>
                    <td>
                        일금&nbsp;&nbsp;{{
                            convertToKoreanNumber(
                                expenseDetail.expense_payment
                            )
                        }}원정 ( ₩
                        {{
                            formattedPayment(expenseDetail.expense_payment) +
                            ' 원 '
                        }})
                    </td>
                </tr>
            </table>
            <table class="content-table">
                <thead>
                    <tr>
                        <th>날짜</th>
                        <th>적요</th>
                        <th>금액</th>
                        <th>비고</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in detailList" :key="index">
                        <td>{{ item.date }}</td>
                        <td>{{ item.description }}</td>
                        <td>{{ formattedPayment(item.amount) }}</td>
                        <td>{{ item.note }}</td>
                    </tr>
                    <tr v-for="n in 7 - detailList.length" :key="'empty-' + n">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr class="total-row">
                        <td colspan="2">합계</td>
                        <td>{{ formattedPayment(totalAmount) + ' 원' }}</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>

            <div class="footer">
                <p>위 금액을 증명하오니 결재 바랍니다.</p>
                <p class="date">{{ formattedToday }}</p>

                <p>
                    영 수 자 :
                    <span class="sign-box">{{ expenseDetail.name }} (인)</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import html2pdf from 'html2pdf.js/dist/html2pdf.bundle.min';
const expenseData = ref(null);
const expenseDetail = ref({});
const today = new Date();
const formattedToday = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

const formatDate = dateStr => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${year}년 ${month}월 ${day}일`;
};

const totalAmount = computed(() =>
    detailList.value.reduce((sum, item) => sum + item.amount, 0)
);

const formattedPayment = num => {
    if (!num && num !== 0) return '';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const convertToKoreanNumber = number => {
    if (number === 0) return '영';
    if (!number) return '';
    const hanA = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
    const danA = ['', '십', '백', '천'];
    const result = [];
    const strNum = number.toString().split('').reverse();

    for (let i = 0; i < strNum.length; i++) {
        const num = Number(strNum[i]);
        if (num !== 0) {
            result.unshift(hanA[num] + danA[i % 4]);
        } else {
            result.unshift('');
        }

        if (i % 4 === 3 && i !== strNum.length - 1) {
            result.unshift('만');
        }
    }
    return result.join('').replace(/undefined/g, '');
};

const detailList = ref([
    {
        date: expenseDetail.value.use_date,
        description: expenseDetail.value.detail_name,
        amount: expenseDetail.value.expense_payment,
        note: expenseDetail.value.group_name,
    },
]);

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

onMounted(() => {
    const raw = localStorage.getItem('printExpenseData');
    if (raw) {
        expenseData.value = JSON.parse(raw);
        expenseDetail.value = expenseData.value;

        detailList.value = [
            {
                date: expenseDetail.value.use_date,
                description: expenseDetail.value.detail_name,
                amount: expenseDetail.value.expense_payment,
                note: expenseDetail.value.group_name || '',
            },
        ];
    }
});
</script>
<style scoped>
.page-container {
    width: 800px;
    margin: 0 auto;
}
.button {
    background-color: transparent;
    color: #000;
    border: 2px solid #000;
    padding: 10px 16px;
    margin: 10px 10px 20px 0;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition:
        background-color 0.2s ease-in-out,
        color 0.2s ease-in-out,
        border-color 0.2s ease-in-out;
}
.button:hover {
    background-color: #f2f2f2;
    color: #000;
    border-color: #333;
}
.print-page {
    width: 800px;
    margin: 0 auto;
    padding: 40px;
    font-family: 'Malgun Gothic', sans-serif;
    font-size: 14px;
    color: #000;
}
h1.title {
    text-align: center;
    margin-bottom: 30px;
    font-size: 24px;
}
table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}
table td,
table th {
    border: 1px solid #000;
    padding: 8px;
    text-align: center;
}
.info-table td {
    width: 25%;
}
.title-table td {
    width: auto;
}
.content-table {
    table-layout: fixed;
}
.content-table td,
.content-table th {
    height: 10px;
    vertical-align: middle;
    padding: 8px;
    text-align: center;
}
.total-row td {
    font-weight: bold;
}
.footer {
    text-align: center;
    margin-top: 40px;
}
.sign-box {
    display: inline-block;
    width: 80px;
    border-bottom: 1px solid #000;
    margin-left: 10px;
}
@media print {
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
