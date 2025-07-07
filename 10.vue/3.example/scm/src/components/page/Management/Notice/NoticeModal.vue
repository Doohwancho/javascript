<script setup>
import { onMounted, onUnmounted, watchEffect } from 'vue';
import { useModalStore } from '../../../../stores/modalState';
import axios from 'axios';
import { useUserInfo } from '../../../../stores/userInfo';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';

const { id } = defineProps(['id']);
const emit = defineEmits([`modalClose`, 'postSuccess']);

const noticeDetail = ref({});
const modalState = useModalStore();
const imageUrl = ref('');
const fileData = ref('');
const userInfo = useUserInfo();
const queryClient = useQueryClient();

const searchDetail = async () => {
    const result = await axios.post('/api/management/noticeFileDetailBody.do', {
        noticeId: id,
    });

    return result.data.detailValue;

    // axios.post('/api/management/noticeFileDetailBody.do', {noticeId: id}).then(res => {
    //     noticeDetail.value = res.data.detailValue;
    //     if(noticeDetail.value.fileExt === 'jpg' || noticeDetail.value.fileExt === 'gif' || noticeDetail.value.fileExt === 'png') {
    //         // db에 있는 파일 데이터를 가지고 썸네일을 만들어 줌
    //         getFileImage();
    //     }
    // })
};

const { data: queryData, isSuccess } = useQuery({
    queryKey: ['noticeDetail', id],
    queryFn: searchDetail,
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
});

const getFileImage = () => {
    const param = new URLSearchParams();
    param.append('noticeId', id);
    axios
        .post('/api/management/noticeDownload.do', param, {
            responseType: 'blob',
        })
        .then(res => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            imageUrl.value = url;
        });
};

watchEffect(() => {
    if (isSuccess && queryData.value) {
        noticeDetail.value = { ...queryData.value };
        if (
            noticeDetail.value.fileExt === 'jpg' ||
            noticeDetail.value.fileExt === 'gif' ||
            noticeDetail.value.fileExt === 'png'
        ) {
            //         // db에 있는 파일 데이터를 가지고 썸네일을 만들어 줌
            getFileImage();
        }
    }
});

const downloadFile = () => {
    const param = new URLSearchParams();
    param.append('noticeId', id);

    axios
        .post('/api/management/noticeDownload.do', param, {
            responseType: 'blob',
        })
        .then(res => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', noticeDetail.value.fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
        });
};

const noticeSave = () => {
    const param = new URLSearchParams(noticeDetail.value);
    param.append('file', fileData.value);
    axios.post('/api/management/noticeSave.do', param).then(res => {
        if (res.data.result === 'success') {
            emit('postSuccess');
        }
    });
};

const noticeSaveFile = async () => {
    const textData = {
        fileContent: noticeDetail.value.content,
        fileTitle: noticeDetail.value.title,
        loginId: userInfo.user.loginId,
    };

    const formData = new FormData();
    if (fileData.value) formData.append('file', fileData.value);

    formData.append(
        'text',
        new Blob([JSON.stringify(textData)], { type: 'application/json' })
    );

    return await axios.post('/api/management/noticeSaveFileForm.do', formData);

    // axios.post('/api/management/noticeSaveFileForm.do', formData).then(res => {
    //     if (res.data.result === 'success') {
    //         emit('postSuccess');
    //     }
    // });
};

const { mutate: saveFile } = useMutation({
    mutationKey: ['noticeSave'],
    mutationFn: noticeSaveFile,
    onSuccess: result => {
        if (result.data.result === 'success') {
            //1. 리스트를 재조회 할껍니다. queryKey를 이용할꺼입니다.
            modalState.setModalState();
            queryClient.invalidateQueries({ queryKey: ['noticeList'] });
        }
    },
});

const noticeUpdate = () => {
    const param = new URLSearchParams(noticeDetail.value);
    param.append('noticeId', id);
    axios.post('/api/management/noticeUpdate.do', param).then(res => {
        if (res.data.result === 'success') {
            emit('postSuccess');
        }
    });
};

const noticeUpdateFile = async () => {
    const textData = {
        fileContent: noticeDetail.value.content,
        fileTitle: noticeDetail.value.title,
        noticeId: id,
    };

    const formData = new FormData();
    if (fileData.value) formData.append('file', fileData.value);

    formData.append(
        'text',
        new Blob([JSON.stringify(textData)], { type: 'application/json' })
    );

    return await axios.post(
        '/api/management/noticeUpdateFileForm.do',
        formData
    );

    // axios
    //     .post('/api/management/noticeUpdateFileForm.do', formData)
    //     .then(res => {
    //         if (res.data.result === 'success') {
    //             emit('postSuccess');
    //         }
    //     });
};

const { mutate: updateFile } = useMutation({
    mutationKey: ['noticeUpdate'],
    mutationFn: noticeUpdateFile,
    onSuccess: result => {
        if (result.data.result === 'success') {
            //1. 리스트를 재조회 할껍니다. queryKey를 이용할꺼입니다.
            modalState.setModalState();
            queryClient.invalidateQueries({ queryKey: ['noticeList'] });

            //exact -> querykey가 noticeDetail이고 id가 정확히 같은 것의 캐시를 무효화시킴
            queryClient.invalidateQueries({
                queryKey: ['noticeDetail', id],
                exact: true,
            });
        }
    },
});

const noticeDelete = async () => {
    return await axios.post('/api/management/noticeFileDeleteJson.do', {
        noticeId: id,
    });

    // axios
    //     .post('/api/management/noticeFileDeleteJson.do', { noticeId: id })
    //     .then(res => {
    //         if (res.data.result === 'success') {
    //             emit('postSuccess');
    //         }
    //     });
};

const { mutate: deleteFile } = useMutation({
    mutationKey: ['noticeDelete'],
    mutationFn: noticeDelete,
    onSuccess: result => {
        if (result.data.result === 'success') {
            //1. 리스트를 재조회 할껍니다. queryKey를 이용할꺼입니다.
            modalState.setModalState();
            queryClient.invalidateQueries({ queryKey: ['noticeList'] });
        }
    },
});

const handlerFile = e => {
    const fileInfo = e.target.files;
    const fileInfoSplit = fileInfo[0].name.split('.');
    const fileExtension = fileInfoSplit[1].toLowerCase();

    if (
        fileExtension === 'jpg' ||
        fileExtension === 'gif' ||
        fileExtension === 'png'
    ) {
        imageUrl.value = URL.createObjectURL(fileInfo[0]);
    }
    fileData.value = fileInfo[0];
};

// onMounted(() => {
//     id && searchDetail();
// });

onUnmounted(() => {
    emit('modalClose', 0);
});
</script>

<template>
    <teleport to="body">
        <div class="backdrop">
            <div class="container">
                <label>
                    제목 :<input type="text" v-model="noticeDetail.title" />
                </label>
                <label>
                    내용 :
                    <input type="text" v-model="noticeDetail.content" />
                </label>
                파일 :<input
                    type="file"
                    style="display: none"
                    id="fileInput"
                    @change="handlerFile"
                />
                <label class="img-label" htmlFor="fileInput">
                    파일 첨부하기
                </label>
                <div @click="downloadFile">
                    <div>
                        <label>미리보기</label>
                        <img :src="imageUrl" />
                    </div>
                </div>
                <div class="button-box">
                    <button @click="id ? updateFile() : saveFile()">
                        {{ id ? '수정' : '저장' }}
                    </button>
                    <button v-if="id" @click="deleteFile()">삭제</button>
                    <button @click="modalState.setModalState()">나가기</button>
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
    width: 400px;
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
</style>
