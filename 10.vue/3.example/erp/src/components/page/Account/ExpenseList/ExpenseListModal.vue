<template>
    <teleport to="body">
        <div class="backdrop">
            <div class="modal-container">
                <table class="modal-table">
                    <tr>
                        <td class="label">결의번호</td>
                        <td>
                            <input
                                type="text"
                                v-model="expenseDetail.id"
                                readonly
                                :placeholder="!id ? '자동으로 입력됩니다.' : ''"
                            />
                        </td>
                        <td class="label">신청일자</td>
                        <td>
                            <input
                                type="date"
                                v-model="expenseDetail.req_date"
                                :readonly="isReadOnly"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td class="label">
                            사용일자<span class="font_red">*</span>
                        </td>
                        <td>
                            <input
                                type="date"
                                v-model="expenseDetail.use_date"
                                :readonly="isReadOnly"
                            />
                        </td>
                        <td class="label">사번</td>
                        <td>
                            <input
                                type="text"
                                v-model="expenseDetail.emp_no"
                                :readonly="isReadOnly"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td class="label">사원명</td>
                        <td>
                            <input
                                type="text"
                                v-model="expenseDetail.name"
                                :readonly="isReadOnly"
                            />
                        </td>
                        <td class="label">사용부서</td>
                        <td>
                            <input
                                type="text"
                                v-model="expenseDetail.use_department"
                                :readonly="isReadOnly"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td class="label">
                            계정대분류명<span class="font_red">*</span>
                        </td>
                        <td>
                            <template v-if="isEditMode">
                                <input
                                    type="text"
                                    v-model="expenseDetail.group_name"
                                    readonly
                                />
                            </template>
                            <template v-else>
                                <select v-model="expenseDetail.group_name">
                                    <option value="">선택</option>
                                    <option value="온라인지출">
                                        온라인지출
                                    </option>
                                    <option value="영업지출">영업지출</option>
                                </select>
                            </template>
                        </td>

                        <td class="label">
                            계정과목<span class="font_red">*</span>
                        </td>
                        <td>
                            <template v-if="isEditMode">
                                <input
                                    type="text"
                                    v-model="expenseDetail.detail_name"
                                    readonly
                                />
                            </template>
                            <template v-else>
                                <select v-model="expenseDetail.debit_code">
                                    <option
                                        v-for="item in expenseDetailName"
                                        :key="item.detail_code"
                                        :value="item.detail_code"
                                    >
                                        {{ item.detail_name }}
                                    </option>
                                </select>
                            </template>
                        </td>
                    </tr>
                    <tr>
                        <td class="label">
                            거래처명<span class="font_red">*</span>
                        </td>
                        <td>
                            <template v-if="isEditMode">
                                <input
                                    type="text"
                                    v-model="expenseDetail.client_name"
                                    readonly
                                />
                            </template>
                            <template v-else>
                                <select v-model="expenseDetail.client_id">
                                    <option
                                        v-for="client in clientList"
                                        :key="client.id"
                                        :value="client.id"
                                    >
                                        {{ client.clientName }}
                                    </option>
                                </select>
                            </template>
                        </td>
                        <td class="label">
                            결의금액<span class="font_red">*</span>
                        </td>
                        <td>
                            <input
                                type="text"
                                v-model="formattedPayment"
                                placeholder="결의금액 입력"
                                :readonly="isReadOnly"
                            />
                        </td>
                    </tr>
                    <tr v-if="isEditMode">
                        <td class="label">승인여부</td>
                        <td>
                            <span class="approval-display">{{
                                approvalMap[expenseDetail.is_approval]
                            }}</span>
                        </td>
                        <td class="label">승인일자</td>
                        <td>
                            <template>
                                <input
                                    type="date"
                                    v-model="expenseDetail.approval_date"
                                    :readonly="isReadOnly"
                                />
                            </template>
                        </td>
                    </tr>
                    <tr>
                        <td class="label">
                            첨부파일<span class="font_red">*</span>
                        </td>
                        <td>
                            <template v-if="isReadOnly">
                                <button
                                    @click="downloadFileImage"
                                    class="button-box"
                                >
                                    다운로드
                                </button>
                            </template>
                            <template v-else>
                                <input
                                    type="file"
                                    id="fileInput"
                                    @change="fileHandler"
                                    style="display: none"
                                />
                                <label class="img-label" htmlFor="fileInput">
                                    파일 첨부하기
                                </label>
                            </template>
                        </td>
                    </tr>
                    <tr>
                        <td class="label">비고</td>
                        <td colspan="3">
                            <textarea
                                v-model="expenseDetail.memo"
                                :readonly="isReadOnly"
                            ></textarea>
                        </td>
                    </tr>
                </table>
                <div class="button-box">
                    <button v-if="!isReadOnly" @click="expenseListSave()">
                        신청
                    </button>
                    <button
                        v-if="id && expenseDetail.is_approval === 'W'"
                        @click="expenseListDelete"
                    >
                        삭제
                    </button>
                    <button @click="setModalState">나가기</button>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useModalStore } from '../../../../stores/modalState';
import axios from 'axios';
import Swal from 'sweetalert2';
const { setModalState } = useModalStore();
const isEditMode = computed(() => !!id);
const expenseDetail = ref({
    group_name: '온라인지출',
    debit_code: 'AC03101',
    client_id: '0',
});
const clientList = ref([]);
const expenseDetailName = ref([]);
const fileData = ref('');
const imgUrl = ref('');
const isReadOnly = ref(true);
const { id } = defineProps(['id']);
const emit = defineEmits(['postSuccess', 'modalClose']);

const approvalMap = computed(() => ({
    W: '검토 대기',
    F: '승인 대기',
    S: '승인',
    N: '반려',
    C: '취소',
}));

const formattedPayment = computed({
    get() {
        const value =
            expenseDetail.value.expense_payment?.toString().replace(/,/g, '') ||
            '';
        return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' 원';
    },
    set(value) {
        const numberValue = value.replace(/[^0-9]/g, '');
        expenseDetail.value.expense_payment = parseInt(numberValue, 10) || 0;
    },
});

const fetchLoginInfo = async () => {
    try {
        const res = await axios.post(
            '/api/account/expenseLoginInfoBody.do',
            {}
        );
        const info = res.data.lgnInfo;
        expenseDetail.value.emp_no = info.usr_idx;
        expenseDetail.value.name = info.usr_nm;
        expenseDetail.value.use_department = info.detail_name;
        clientList.value = res.data.clientList;
        expenseDetailName.value = res.data.expenseDetailName;
    } catch (e) {
        console.error('사용자 정보 불러오기 실패:', e);
    }
};

const searchDetail = async () => {
    try {
        const response = await axios.post('/api/account/expenseDetail.do', {
            id,
        });
        expenseDetail.value = response.data.expenseDetail;
        clientList.value = response.data.clientList;
        expenseDetailName.value = response.data.expenseDetailName;
    } catch (e) {
        console.error('상세정보 불러오기 실패:', e);
    }
};

const downloadFileImage = async () => {
    const param = new URLSearchParams();
    param.append('expenseSeq', expenseDetail.value.id);
    try {
        const res = await axios.post('/api/account/expenseDownload.do', param, {
            responseType: 'blob',
        });
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', expenseDetail.value.file_name);
        document.body.appendChild(link);
        link.click();
        link.remove();
    } catch (e) {
        console.error('파일 다운로드 실패:', e);
    }
};

const fileHandler = e => {
    const fileInfo = e.target.files;
    const fileInfoSplit = fileInfo[0].name.split('.');
    const fileExtension = fileInfoSplit[1].toLowerCase();

    if (
        fileExtension === 'jpg' ||
        fileExtension === 'gif' ||
        fileExtension === 'png' ||
        fileExtension === 'jpeg'
    ) {
        imgUrl.value = URL.createObjectURL(fileInfo[0]);
    }

    fileData.value = fileInfo[0];
};

const expenseListSave = async () => {
    try {
        if (!expenseDetail.value.use_date) {
            Swal.fire({
                icon: 'warning',
                title: '사용일자를 입력해주세요.',
                confirmButtonText: '확인',
            });
            return;
        }

        if (!expenseDetail.value.group_name) {
            Swal.fire({
                icon: 'warning',
                title: '계정대분류명을 선택해주세요.',
                confirmButtonText: '확인',
            });
            return;
        }

        if (!expenseDetail.value.debit_code) {
            Swal.fire({
                icon: 'warning',
                title: '계정과목을 선택해주세요.',
                confirmButtonText: '확인',
            });
            return;
        }

        if (!expenseDetail.value.client_id) {
            Swal.fire({
                icon: 'warning',
                title: '거래처명을 선택해주세요.',
                confirmButtonText: '확인',
            });
            return;
        }

        if (!expenseDetail.value.expense_payment) {
            Swal.fire({
                icon: 'warning',
                title: '결의금액을 입력해주세요.',
                confirmButtonText: '확인',
            });
            return;
        }

        if (!fileData.value) {
            Swal.fire({
                icon: 'warning',
                title: '첨부파일을 선택해주세요.',
                confirmButtonText: '확인',
            });
            return;
        }

        const formData = new FormData();
        const textData = {
            req_date: expenseDetail.value.req_date,
            use_date: expenseDetail.value.use_date,
            emp_no: expenseDetail.value.emp_no,
            name: expenseDetail.value.name,
            use_dept: expenseDetail.value.use_department,
            group_name: expenseDetail.value.group_name,
            detail_name: expenseDetail.value.detail_name,
            accountDetail: expenseDetail.value.debit_code,
            clientId: expenseDetail.value.client_id,
            exp_pay: expenseDetail.value.expense_payment,
        };

        Object.entries(textData).forEach(([key, value]) => {
            formData.append(key, value);
        });
        formData.append('file', fileData.value);

        const res = await axios.post(
            '/api/account/expenseFileSave.do',
            formData
        );

        if (res.data.result === 'success') {
            emit('postSuccess');
        } else {
            Swal.fire({
                icon: 'error',
                title: '저장 실패',
                text: '잠시 후 다시 시도해주세요.',
                confirmButtonText: '확인',
            });
        }
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: '오류 발생',
            text: '저장 중 문제가 발생했습니다.',
            confirmButtonText: '확인',
        });
    }
};

const expenseListDelete = async () => {
    const param = new URLSearchParams();
    param.append('exp_id', expenseDetail.value.id);

    try {
        const res = await axios.post('/api/account/expenseDelete.do', param);

        if (res.data.result === 'success') {
            emit('postSuccess');
        } else {
            Swal.fire({
                icon: 'error',
                title: '삭제 실패',
                text: '잠시 후 다시 시도해주세요.',
                confirmButtonText: '확인',
            });
        }
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: '삭제 중 오류 발생',
            text: '문제가 발생했습니다. 다시 시도해주세요.',
            confirmButtonText: '확인',
        });
    }
};

onMounted(() => {
    if (id) {
        searchDetail();
        isReadOnly.value = true;
    } else {
        fetchLoginInfo();
        isReadOnly.value = false;

        const today = new Date().toISOString().slice(0, 10);
        expenseDetail.value.req_date = today;
    }
});

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
    width: 700px;
}
.modal-table {
    width: 100%;
    border-collapse: collapse;
}
.modal-table td {
    border: 1px solid #ccc;
    padding: 10px;
}
.radio-group {
    display: flex;
    gap: 20px;
    align-items: center;
}
.radio-group input[type='radio'] {
    display: inline-block;
    margin-right: 5px;
}

.label {
    background: #f0f0f0;
    font-weight: bold;
    text-align: left;
    width: 150px;
}
input:not([type='radio']),
select,
textarea {
    display: block;
    width: 100%;
    color: black;
    opacity: 1;
    box-sizing: border-box;
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
}
textarea {
    min-height: 80px;
    resize: vertical;
}
.button-box {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}
button {
    flex: 1;
    background-color: #3bb2ea;
    border: none;
    color: white;
    padding: 10px;
    margin: 0 5px;
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
.font_red {
    color: #fe1414;
}
</style>
