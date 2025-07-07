<template>
    <teleport to="body">
        <div class="backdrop">
            <div class="modal-container">
                <table class="modal-table">
                    <tr>
                        <td class="label">
                            계정대분류명<span class="font_red">*</span>
                        </td>
                        <td>
                            <select v-model="searchAccount.group_code">
                                <option value="">선택</option>
                                <option value="AC01">온라인매출</option>
                                <option value="AC02">영업매출</option>
                                <option value="AC03">온라인지출</option>
                                <option value="AC04">영업지출</option>
                                <option value="AC05">유동자산</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="label">
                            계정세부명<span class="font_red">*</span>
                        </td>
                        <td>
                            <input
                                type="text"
                                v-model="searchAccount.detail_name"
                                placeholder="계정세부명 입력"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td class="label">
                            상세내용<span class="font_red">*</span>
                        </td>
                        <td>
                            <input
                                type="text"
                                v-model="searchAccount.content"
                                placeholder="상세내용 입력"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td class="label">
                            수입/지출 구분<span class="font_red">*</span>
                        </td>
                        <td>
                            <select v-model="searchAccount.code_type">
                                <option value="">선택</option>
                                <option value="수입">수입</option>
                                <option value="지출">지출</option>
                            </select>
                        </td>
                    </tr>
                    <tr v-if="!id || searchAccount.use_yn === 'N'">
                        <td class="label">
                            사용여부<span class="font_red">*</span>
                        </td>
                        <td>
                            <select v-model="searchAccount.use_yn">
                                <option value="Y">사용</option>
                                <option value="N">미사용</option>
                            </select>
                        </td>
                    </tr>
                </table>
                <div class="button-box">
                    <button @click="id ? manageUpdate() : manageSave()">
                        {{ id ? '수정' : '등록' }}
                    </button>
                    <button v-if="id" @click="manageDelete">삭제</button>
                    <button @click="setModalState">나가기</button>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useModalStore } from '../../../../stores/modalState';
import axios from 'axios';
import Swal from 'sweetalert2';
const { setModalState } = useModalStore();
const { id } = defineProps(['id']);
const emit = defineEmits(['modalClose', 'postSuccess']);
const searchAccount = ref({
    group_code: '',
    detail_name: '',
    content: '',
    code_type: '',
    use_yn: 'Y',
});

const searchDetail = async () => {
    try {
        const response = await axios.post('/api/account/accountGroupList.do', {
            detail_code: id,
        });
        searchAccount.value = response.data.accountGroupList[0];
    } catch (e) {
        console.error('상세정보 불러오기 실패:', e);
    }
};

const manageSave = async () => {
    if (
        !searchAccount.value.group_code ||
        searchAccount.value.group_code.trim() === ''
    ) {
        Swal.fire({
            icon: 'warning',
            title: '계정대분류명을 선택해주세요.',
            confirmButtonText: '확인',
        });
        return;
    }
    if (
        !searchAccount.value.detail_name ||
        searchAccount.value.detail_name.trim() === ''
    ) {
        Swal.fire({
            icon: 'warning',
            title: '계정세부명을 입력해주세요.',
            confirmButtonText: '확인',
        });
        return;
    }
    if (
        !searchAccount.value.content ||
        searchAccount.value.content.trim() === ''
    ) {
        Swal.fire({
            icon: 'warning',
            title: '상세내용을 입력해주세요.',
            confirmButtonText: '확인',
        });
        return;
    }
    if (
        !searchAccount.value.code_type ||
        searchAccount.value.code_type.trim() === ''
    ) {
        Swal.fire({
            icon: 'warning',
            title: '수입/지출을 입력해주세요.',
            confirmButtonText: '확인',
        });
        return;
    }
    const param = new URLSearchParams(searchAccount.value);

    try {
        const res = await axios.post('/api/account/accountSave.do', param);
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

const manageUpdate = async () => {
    const param = new URLSearchParams(searchAccount.value);

    try {
        const res = await axios.post('/api/account/accountUpdate.do', param);

        if (res.data.result === 'success') {
            emit('postSuccess');
        } else {
            Swal.fire({
                icon: 'error',
                title: '수정 실패',
                text: '잠시 후 다시 시도해주세요.',
                confirmButtonText: '확인',
            });
        }
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: '오류 발생',
            text: '수정 중 문제가 발생했습니다.',
            confirmButtonText: '확인',
        });
    }
};

const manageDelete = async () => {
    try {
        const res = await axios.post('/api/account/manageDelete.do', {
            detail_code: id,
        });

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
    id && searchDetail();
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
.modal-table td.button-box {
    border: none;
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
