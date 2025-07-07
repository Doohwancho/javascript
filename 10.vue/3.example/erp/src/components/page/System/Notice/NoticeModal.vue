<template>
    <teleport to="body">
        <div class="backdrop">
            <div class="container">
                <label> 제목 :<input type="text" v-model="noticeDetail.notiTitle" /> </label>
                <label>
                    내용 :
                    <textarea v-model="noticeDetail.notiContent" class="textContent"></textarea>
                </label>
                파일 :<input type="file" style="display: none" id="fileInput" @change="fileHandler" />
                <label class="img-label" htmlFor="fileInput">
                    파일 첨부하기
                </label>
                <div>
                    <div @click="downloadFileImage">
                        <img v-if="imgUrl" :src="imgUrl" />
                    </div>
                </div>
                <div class="button-box">
                    <button @click="id ? fileUpdate() : fileSave()">{{ id ? '수정' : '저장' }}</button>
                    <button v-if="id" @click="fileDelete()">삭제</button>
                    <button @click="setModalState">나가기</button>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script setup>
import { onUnmounted, watchEffect } from 'vue';
import { useUserInfo } from '../../../../stores/userInfo';
import { useModalStore } from '../../../../stores/modalState'
import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
const { setModalState } = useModalStore();
const { id } = defineProps(['id'])
const emit = defineEmits(['modalClose', 'postSuccess'])
const noticeDetail = ref({})
const userInfo = useUserInfo()
const imgUrl = ref('')
const fileData = ref('')
const queryClient = useQueryClient()

const searchDetail = async () => {
    const response = await axios.post('/api/system/noticeFileDetailBody.do', { noticeSeq: id })
    return response.data.detail
}

const { data: queryData, isSuccess } = useQuery({
    queryKey: ['noticeDetail', id],
    queryFn: searchDetail,
    staleTime: 1000 * 60 * 5,
    enabled: !!id
})


const getFileImage = async () => {
    const param = new URLSearchParams();
    param.append('noticeSeq', id)
    try {
        const res = await axios.post('/api/system/noticeDownload.do', param, { responseType: 'blob' })
        const url = window.URL.createObjectURL(new Blob([res.data]))
        imgUrl.value = url

    } catch (e) {
        console.error(e)
    }
}

watchEffect(() => {
    if (isSuccess && queryData.value) {
        noticeDetail.value = { ...queryData.value }
        if (noticeDetail.value.fileExt === 'png' || noticeDetail.value.fileExt === 'jpg' || noticeDetail.value.fileExt === "gif" || noticeDetail.value.fileExt === "jpeg") {
            getFileImage()
        }
    }
})

const downloadFileImage = async () => {
    const param = new URLSearchParams();
    param.append('noticeSeq', id)
    try {
        const res = await axios.post('/api/system/noticeDownload.do', param, { responseType: 'blob' })
        const url = window.URL.createObjectURL(new Blob([res.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', noticeDetail.value.fileName)
        document.body.appendChild(link)
        link.click()
        link.remove()
    } catch (e) {
        console.error(e)
    }
}

const noticeSave = async () => {
    const param = new URLSearchParams(noticeDetail.value)
    try {
        const res = await axios.post('/api/system/noticeSave.do', param)
        if (res.data.result === 'success') {
            emit('postSuccess')
        } else {
            alert("저장 실패")
        }
    } catch (e) {
        console.error(e);
    }

}

const noticeFileSave = async () => {
    const textData = {
        fileContent: noticeDetail.value.notiContent,
        fileTitle: noticeDetail.value.notiTitle,
        loginId: userInfo.user.loginId
    }
    const formData = new FormData()
    formData.append('text', new Blob([JSON.stringify(textData)], { type: 'application/json' }))
    if (fileData.value) {
        formData.append('file', fileData.value)
    }
    return await axios.post('/api/system/noticeSaveFileForm.do', formData)

}

const { mutate: fileSave } = useMutation({
    mutationKey: ['noticeSave'],
    mutationFn: noticeFileSave,
    onSuccess: result => {
        if (result.data.result === "success") {
            //1.리스트를 재조회
            setModalState()
            queryClient.invalidateQueries({ queryKey: ["noticeList"] })
        }
    }
})

const noticeFileUpdate = async () => {
    const textData = {
        fileContent: noticeDetail.value.notiContent,
        fileTitle: noticeDetail.value.notiTitle,
        noticeSeq: id
    }
    const formData = new FormData()
    formData.append('text', new Blob([JSON.stringify(textData)], { type: 'application/json' }))
    if (fileData.value) {
        console.log("fileData")
        formData.append('file', fileData.value)
    }
    return await axios.post('/api/system/noticeUpdateFileForm.do', formData)

}

const { mutate: fileUpdate } = useMutation({
    mutationKey: ['noticeUpdate'],
    mutationFn: noticeFileUpdate,
    onSuccess: result => {
        if (result.data.result === "success") {
            //1.리스트를 재조회
            setModalState()
            queryClient.invalidateQueries({ queryKey: ["noticeList"] })
            //exact -> queryKey가 noticeDetail이고 id가 정확히 같은 것의 캐시 무효화
            queryClient.invalidateQueries({ queryKey: ["noticeDetail", id], exact:true })
        }
    }
})



const noticeUpdate = async () => {
    const param = new URLSearchParams(noticeDetail.value)
    param.append("noticeId", id)
    try {
        const res = await axios.post('/api/management/noticeUpdate.do', param)
        if (res.data.result === 'success') {
            emit('postSuccess')
        } else {
            alert("업데이트 실패")
        }
    } catch (e) {
        console.error(e);
    }
}

const noticeDelete = async () => {
    return await axios.post('/api/system/noticeDeleteBody.do', { noticeSeq: id })
}

const { mutate: fileDelete } = useMutation({
    mutationKey: ['noticeDelete'],
    mutationFn: noticeDelete,
    onSuccess: result => {
        if (result.data.result === "success") {
            //1.리스트를 재조회
            setModalState()
            queryClient.invalidateQueries({ queryKey: ["noticeList"] }) 
        }
    }
})


const fileHandler = (e) => {
    const fileInfo = e.target.files
    const fileInfoSplit = fileInfo[0].name.split('.')
    const fileExtension = fileInfoSplit[1].toLowerCase()

    if (fileExtension === 'jpg' || fileExtension === 'gif' || fileExtension === 'png' || fileExtension === 'jpeg') {
        imgUrl.value = URL.createObjectURL(fileInfo[0])
    }

    fileData.value = fileInfo[0];

}

</script>

<style lang="scss" scoped>
.textContent {
    padding: 10px;
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 4px;
    font-size: 13px;
    box-sizing: border-box;
    min-height: 150px;
    width: 100%;
    resize: vertical;
    overflow-wrap: anywhere;
    word-wrap: break-word;
    word-break: break-word;
    white-space: pre-wrap;
    overflow: auto;
    border: 1px solid #ccc;
    display: block;
}

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
    margin-top: 5px;
    border-radius: 10px;
    width: 100%;
    max-height: 400px;
    /* or vh 단위 사용 */
    height: auto;
    object-fit: cover;
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
