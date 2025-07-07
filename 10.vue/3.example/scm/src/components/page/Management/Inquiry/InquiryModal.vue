<script setup>
import Swal from 'sweetalert2';
import { useModalStore } from '../../../../stores/modalState';
import axios from 'axios';
const { id } = defineProps(['id']);
const emit = defineEmits([`modalClose`, 'postSuccess']);

const inquiryDetail = ref({});
const fileDetail = ref({});
const modalState = useModalStore();
const imageUrl = ref('');
const fileData = ref('');
const selectMenu = ref([
    '카테고리 선택',
    '이용문의',
    '구매',
    '환불/교환/반품',
    '제품',
    '개인정보',
    '기타',
]);

const searchDetail = () => {
    axios
        .post('/api/support/inquiryDetailBody.do', { inquiryId: id })
        .then(res => {
            inquiryDetail.value = res.data.detailValue;
            if (res.data.fileValue) {
                fileDetail.value = res.data.fileValue;
                const imageExtensions = [
                    'jpg',
                    'jpeg',
                    'png',
                    'gif',
                    'bmp',
                    'webp',
                ];
                if (
                    imageExtensions.some(
                        ext => ext === fileDetail.value.fileType
                    )
                ) {
                    getFileImage();
                }
            }
        });
};

const getFileImage = () => {
    const param = new URLSearchParams();
    param.append('inquiryId', id);
    axios
        .post('/api/support/inquiryDownload.do', param, {
            responseType: 'blob',
        })
        .then(res => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            imageUrl.value = url;
        });
};

const downloadFile = () => {
    const param = new URLSearchParams();
    param.append('inquiryId', id);

    axios
        .post('/api/support/inquiryDownload.do', param, {
            responseType: 'blob',
        })
        .then(res => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileDetail.value.fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
        });
};

const fileRemove = () => {
    axios
        .post('/api/support/inquiryFileRemoveBody.do', { inquiryId: id })
        .then(res => {
            if (res.data.result === 'success') {
                searchDetail();
            }
        });
};

const answerSave = () => {
    if (!inquiryDetail.value.ansContent) {
        Swal.fire('답변을 입력해 주세요!', '', 'warning');
        return;
    }
    const param = new URLSearchParams();
    param.append('inquiryId', id);
    param.append('fileAnsContent', inquiryDetail.value.ansContent);
    axios.post('/api/management/inquiryAnsSaveBody.do', param).then(res => {
        if (res.data.result === 'success') {
            Swal.fire('답변이 등록되었습니다', '', 'success').then(() =>
                emit('postSuccess')
            );
        }
    });
};

const deleteInquiry = () => {
    axios
        .post('/api/support/inquiryFileDeleteBody.do', { inquiryId: id })
        .then(res => {
            if (res.data.result === 'success') {
                Swal.fire('삭제되었습니다', '', 'success').then(() =>
                    emit('postSuccess')
                );
            }
        });
};

const callFunction = name => {
    const functionList = {
        answerSave,
        deleteInquiry,
    };
    functionList[name]?.();
};

const confirmAction = name => {
    const msg = {
        answerSave: '답변을 등록하시겠습니까?',
        deleteInquiry: '삭제 하시겠습니까?',
    };
    Swal.fire({
        title: msg[name],
        icon: 'question',
        showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
        confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
        cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
        confirmButtonText: '확인', // confirm 버튼 텍스트 지정
        cancelButtonText: '취소', // cancel 버튼 텍스트 지정
        reverseButtons: false, // 버튼 순서 거꾸로
    }).then(result => {
        if (result.isConfirmed) {
            callFunction(name);
        }
    });
};

onMounted(() => {
    id && searchDetail();
});
</script>
<template>
    <teleport to="body">
        <div class="backdrop">
            <div class="container">
                <h2 style="text-align: center">문의 상세</h2>
                <table>
                    <col width="20%" />
                    <col width="30%" />
                    <col width="20%" />
                    <col width="30%" />
                    <tr>
                        <th>작성자</th>
                        <td>{{ inquiryDetail.author }}</td>
                        <th>작성일시</th>
                        <td>{{ inquiryDetail.createdDate }}</td>
                    </tr>
                    <tr>
                        <th>카테고리</th>
                        <td colspan="3">
                            <select v-model="inquiryDetail.category">
                                <option
                                    v-for="(list, index) in selectMenu"
                                    :key="index"
                                    :disabled="inquiryDetail.category !== list"
                                >
                                    {{ list }}
                                </option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>제목</th>
                        <td colspan="3">
                            <input
                                type="text"
                                v-model="inquiryDetail.title"
                                class="long_input"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>내용</th>
                        <td colspan="3">
                            <textarea
                                rows="4"
                                v-model="inquiryDetail.content"
                                class="content"
                            ></textarea>
                        </td>
                    </tr>
                    <tr>
                        <th>문의 답변</th>
                        <td colspan="3">
                            <textarea
                                rows="4"
                                v-model="inquiryDetail.ansContent"
                                class="content"
                            ></textarea>
                        </td>
                    </tr>
                    <tr>
                        <th>파일</th>
                        <td :colspan="fileDetail.fileName ? 2 : 3">
                            <template v-if="fileDetail.fileName">
                                {{ fileDetail.fileName }}
                            </template>
                            <template v-else> 파일이 없습니다. </template>
                        </td>
                        <td v-if="fileDetail.fileName">
                            <button @click="fileRemove">파일삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <th>미리보기</th>
                        <td colspan="3">
                            <template v-if="fileDetail.fileName">
                                <img :src="imageUrl" @click="downloadFile" />
                            </template>
                        </td>
                    </tr>
                </table>
                <div class="button_area">
                    <button @click="confirmAction('answerSave')">
                        답변등록
                    </button>
                    <button @click="confirmAction('deleteInquiry')">
                        삭제
                    </button>
                    <button @click="modalState.setModalState()">닫기</button>
                </div>
            </div>
        </div>
    </teleport>
</template>
<style lang="scss" scoped>
.backdrop {
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    flex-flow: row wrep;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
    font-weight: bold;
}

label {
    display: flex;
    flex-direction: column;
}

input[type='text'] {
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
}

.container {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    position: relative;
    width: 500px;
}

img {
    width: 100px;
    height: 100px;
}

.img-label {
    margin-top: 10px;
    padding: 6px 25px;
    background-color: #ccc;
    border-radius: 4px;
    color: rgba(0, 0, 0, 0.9);
    cursor: pointer;

    &:hover {
        background-color: #45a049;
        color: white;
    }

    &:active {
        background-color: #3e8e41;
        box-shadow: 0 2px #666;
        transform: translateY(2px);
    }
}

.button-box {
    text-align: right;
    margin-top: 10px;
}
button {
    background-color: #3bb2ea;
    border: none;
    color: white;
    padding: 10px 22px;
    text-align: right;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 12px;
    box-shadow: 0 4px #999;
    transition: 0.3s;

    &:hover {
        background-color: #45a049;
    }

    &:active {
        background-color: #3e8e41;
        box-shadow: 0 2px #666;
        transform: translateY(2px);
    }
}
.button_area {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 10px;
}

textarea {
    width: 345px;
    resize: none;
}
select {
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
    width: 350px;
}
.long_input {
    width: 332px;
}
table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
}

th {
    background: #f4f4f4;
    text-align: center;
}
</style>
