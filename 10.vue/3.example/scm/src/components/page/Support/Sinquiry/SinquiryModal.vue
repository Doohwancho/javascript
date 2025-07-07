<script setup>
import { useModalStore } from '../../../../stores/modalState';
import axios from 'axios';
import { useUserInfo } from '../../../../stores/userInfo';
import { onMounted, onUnmounted } from 'vue';
import Swal from 'sweetalert2';
const { id } = defineProps(['id']);
const emit = defineEmits([`modalClose`, 'postSuccess']);

const inquiryDetail = ref({
    inquiryId: '',
    title: '',
    content: '',
    author: '',
    createdDate: '',
    updatedDate: '',
    ansContent: '',
    ansDate: '',
    ansWriter: '',
    category: '카테고리 선택',
    ansState: 'N',
});
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
const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
const userInfo = useUserInfo();
const removeFlag = ref(false);

const searchDetail = () => {
    axios
        .post('/api/support/inquiryDetailBody.do', { inquiryId: id })
        .then(res => {
            inquiryDetail.value = res.data.detailValue;
            if (res.data.fileValue) {
                fileDetail.value = res.data.fileValue;

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

const handlerFile = e => {
    const fileInfo = e.target.files;
    const fileInfoSplit = fileInfo[0].name.split('.');
    const fileExtension = fileInfoSplit[1].toLowerCase();

    if (imageExtensions.some(ext => ext === fileExtension)) {
        imageUrl.value = URL.createObjectURL(fileInfo[0]);
    }
    fileData.value = fileInfo[0];
    removeFlag.value = false;
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
    removeFlag.value = true;
    imageUrl.value = undefined;
    fileDetail.value.fileName = undefined;
};

const checkInsertData = () => {
    let flag = true;
    const warningMessage = {
        category: '카테고리를 선택해 주세요!',
        title: '제목을 입력해주세요!',
        content: '내용을 입력해주세요!',
    };
    const fieldsToCheck = ['category', 'title', 'content'];
    for (let field of fieldsToCheck) {
        if (
            inquiryDetail.value[field] === null ||
            inquiryDetail.value[field] === undefined ||
            inquiryDetail.value[field] === '' ||
            inquiryDetail.value[field] === '카테고리 선택'
        ) {
            Swal.fire(warningMessage[field], '', 'warning');
            flag = false;
            break;
        }
    }
    return flag;
};

const insertInquiry = () => {
    if (!checkInsertData()) {
        return;
    }
    const formData = new FormData();
    if (fileData.value) formData.append('fileInput', fileData.value);
    formData.append('fileTitle', inquiryDetail.value.title);
    formData.append('fileCategory', inquiryDetail.value.category);
    formData.append('fileContent', inquiryDetail.value.content);

    axios.post('/api/support/inquiryFileSave.do', formData).then(res => {
        if (res.data.result === 'success') {
            Swal.fire('문의 등록 성공', '', 'success').then(() =>
                emit('postSuccess')
            );
        }
    });
};

const updateInquiry = () => {
    const formData = new FormData();

    if (removeFlag.value) {
        axios
            .post('/api/support/inquiryFileRemoveBody.do', { inquiryId: id })
            .then(res => {
                if (res.data.result === 'success') {
                    searchDetail();
                }
            });
    }
    if (fileData.value) formData.append('fileInput', fileData.value);
    formData.append('fileTitle', inquiryDetail.value.title);
    formData.append('fileCategory', inquiryDetail.value.category);
    formData.append('fileContent', inquiryDetail.value.content);
    formData.append('inquiryId', inquiryDetail.value.inquiryId);

    axios.post('/api/support/inquiryFileUpdate.do', formData).then(res => {
        if (res.data.result === 'success') {
            Swal.fire('문의 수정 성공', '', 'success').then(() =>
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
        insertInquiry,
        updateInquiry,
        deleteInquiry,
    };
    functionList[name]?.();
};

const confirmAction = name => {
    const msg = {
        insertInquiry: '등록 하시겠습니까?',
        updateInquiry: '수정 하시겠습니까?',
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
onUnmounted(() => {
    emit('modalClose', 0);
});
</script>
<template>
    <teleport to="body">
        <div class="backdrop">
            <div class="container">
                <template v-if="inquiryDetail.inquiryId || id === 0">
                    <div style="text-align: center; margin-top: -10px">
                        <h2 v-if="id !== 0">문의 상세</h2>
                        <h2 v-if="id === 0">문의 등록</h2>
                    </div>
                    <table>
                        <col width="20%" />
                        <col width="30%" />
                        <col width="20%" />
                        <col width="30%" />
                        <tr v-if="id !== 0">
                            <th>작성자</th>
                            <td>{{ inquiryDetail.author }}</td>
                            <th>작성일시</th>
                            <td>{{ inquiryDetail.createdDate }}</td>
                        </tr>
                        <tr>
                            <th>카테고리<span class="font_red">*</span></th>
                            <td colspan="3">
                                <select v-model="inquiryDetail.category">
                                    <option
                                        v-for="(list, index) in selectMenu"
                                        :key="index"
                                        :disabled="list === '카테고리 선택'"
                                    >
                                        {{ list }}
                                    </option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>제목<span class="font_red">*</span></th>
                            <td colspan="3">
                                <input
                                    type="text"
                                    v-model="inquiryDetail.title"
                                    class="long_input"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>내용<span class="font_red">*</span></th>
                            <td colspan="3">
                                <textarea
                                    rows="5"
                                    v-model="inquiryDetail.content"
                                    class="content"
                                ></textarea>
                            </td>
                        </tr>
                        <tr v-if="inquiryDetail.ansState === 'Y'">
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
                            <td
                                :colspan="
                                    fileDetail.fileName &&
                                    inquiryDetail.ansState === 'N'
                                        ? 2
                                        : 3
                                "
                            >
                                <template v-if="fileDetail.fileName">
                                    {{ fileDetail.fileName }}
                                </template>
                                <template
                                    v-else-if="inquiryDetail.ansState === 'N'"
                                >
                                    <input
                                        type="file"
                                        style="display: none"
                                        id="fileInput"
                                        @change="handlerFile"
                                    />
                                    <label
                                        class="img-label"
                                        htmlFor="fileInput"
                                    >
                                        파일 첨부하기
                                    </label>
                                </template>
                                <template v-else>파일이 없습니다.</template>
                            </td>
                            <td
                                v-if="
                                    fileDetail.fileName &&
                                    inquiryDetail.ansState === 'N'
                                "
                            >
                                <button @click="fileRemove">파일삭제</button>
                            </td>
                        </tr>
                        <tr>
                            <th>미리보기</th>
                            <td colspan="3">
                                <template v-if="imageUrl">
                                    <img
                                        :src="imageUrl"
                                        @click="downloadFile"
                                    />
                                </template>
                            </td>
                        </tr>
                    </table>
                    <div class="button_area">
                        <button
                            @click="answerSave"
                            v-if="userInfo.user.userType === 'S'"
                        >
                            답변등록
                        </button>
                        <button
                            @click="confirmAction('insertInquiry')"
                            v-if="id === 0"
                        >
                            등록
                        </button>
                        <button
                            @click="confirmAction('updateInquiry')"
                            v-if="inquiryDetail.ansState === 'N' && id !== 0"
                        >
                            수정
                        </button>
                        <button
                            @click="confirmAction('deleteInquiry')"
                            v-if="id !== 0"
                        >
                            삭제
                        </button>
                        <button @click="modalState.setModalState()">
                            닫기
                        </button>
                    </div>
                </template>
                <template v-else>
                    <div style="text-align: center">
                        데이터를 불러오는 중...
                    </div>
                </template>
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
.font_red {
    color: #fe1414;
}
</style>
