<script setup>
import axios from 'axios';
import { useModalStore } from '../../../../stores/modalStore';
import { onMounted, watchEffect } from 'vue';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';

const modalStore = useModalStore();
const commonCodeDetail = ref({});
const emit = defineEmits(['modalClose','postSuccess'])
const { id } = defineProps(['id']);

const queryClient = useQueryClient();

const searchDetail = async () => {
       const result = await axios.post('/api/management/commonCodeDetailJson.do', {groupIdx: id})

       return result.data.detailValue;

};

const {
    data: queryData,
    isSuccess
} = useQuery({
    queryKey: ['commonCodeDetail', id],
    queryFn: searchDetail,
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
})


const handlerSave = async () =>{
    if(!(commonCodeDetail.value.groupCode
    && commonCodeDetail.value.groupName
    && commonCodeDetail.value.note
    && commonCodeDetail.value.useYn
    )) return alert('필수 입력란을 모두 입력해주세요.')

    const param = new URLSearchParams(commonCodeDetail.value);
    const result =  await axios.post('/api/management/commonCodeSave.do', param);

    return result.data;
}

const  { mutate: save } = useMutation({
    mutationKey: ['commonCodeSave'],
    mutationFn: handlerSave,
    onSuccess: (res) => {
        if(res.result ==="success"){
            modalStore.close('commonCode');
            queryClient.invalidateQueries({queryKey: ['commonCodeList']});
            alert('공통코드 정보가 저장되었습니다.');
        } else {
            return alert('요청에 실패하였습니다.');
        }
    }
})

const handlerUpdate = () =>{
    if(!(commonCodeDetail.value.groupCode
    && commonCodeDetail.value.groupName
    && commonCodeDetail.value.note
    && commonCodeDetail.value.useYn
    )) return alert('필수 입력란을 모두 입력해주세요.')
    const param = new URLSearchParams(commonCodeDetail.value);
    param.append("groupIdx", id);
    const result = axios.post('/api/management/commonCodeUpdate.do', param);
    
    return result;
}

const { mutate: update } = useMutation({
    mutationKey: ['commonCodeUpdate'],
    mutationFn: handlerUpdate,
    onSuccess: (res) => {
        if(res.data.result ==="success"){
            modalStore.close('commonCode');
            queryClient.invalidateQueries({queryKey: ['commonCodeList']});
            alert('공통코드 정보가 수정되었습니다.');
        } else {
            return alert('요청에 실패하였습니다.');
        }
    }
})

const handlerDelete = () =>{
    const confirm = window.confirm('정말 삭제하시겠습니까?');
    if(!confirm) return alert('공통코드 삭제가 취소되었습니다.')
    const result =  axios.post('/api/management/commonCodeDeleteBody.do', {groupIdx: id});

    return result;
}

const { mutate: del } = useMutation({
    mutationKey: ['commonCodeDelete'],
    mutationFn: handlerDelete,
    onSuccess: (res) => {
        if(res.data.result === "success") {
            queryClient.invalidateQueries({queryKey: ['commonCodeList']});
            modalStore.close('commonCode');

            return alert('공통코드가 삭제되었습니다.');
        }
        else {
            return alert('요청에 실패하였습니다.')
        }
    }
})

watchEffect(() => {
    if(isSuccess && queryData.value){
        commonCodeDetail.value = {...queryData.value};

    }
})

onUnmounted(() => {
    emit('modalClose', 0);
})

</script>

<template>
    <teleport to="body">
        <div class="backdrop">
            <dl class="container">
                <dt>
                    <strong>공통코드관리</strong>
                </dt>
                <dd>
                    <table>
                        <tbody>
                            <tr>
                                <th scope="row">그룹코드 <span class="font_red">*</span></th>
                                <td colspan="3">
                                    <input 
                                    type="text"
                                    v-model="commonCodeDetail.groupCode"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">그룹코드명<span class="font_red">*</span></th>
                                <td colspan="3">
                                    <input 
                                    type="text" 
                                    v-model="commonCodeDetail.groupName"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">그룹코드설명<span class="font_red">*</span></th>
                                <td colspan="3">
                                    <input 
                                    type="text"
                                    v-model="commonCodeDetail.note"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">사용여부<span class="font_red">*</span></th>
                                <td colspan="3">
                                    <label>
                                        <input type="radio" value="Y" v-model="commonCodeDetail.useYn" /> Yes
                                    </label>
                                    <label>
                                        <input type="radio" value="N" v-model="commonCodeDetail.useYn" /> No
                                    </label>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="button-box">
                        <button @click="id? update() : save()">{{ id ? '수정' : '저장' }}</button> 
                        <button v-if="id" @click="del()">삭제</button>
                        <button @click="modalStore.close('commonCode')"><span>취소</span></button>
                    </div>
                </dd>
            </dl>
        </div>
    </teleport>
</template>

<style scoped>
.backdrop {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10;
    font-weight: bold;
}

.container {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    position: relative;
    width: 90%;
    max-width: 800px;
    z-index: 11;
}

table {
    width: 100%;
    border-collapse: collapse;
}

dt{
    text-align: center;
    margin-bottom: 8px;
    font-size: 24px;
}

th, td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
}

th {
    background: #f4f4f4;
    text-align: center;
}

.product-image {
    width: 100px;
    height: 100px;
    object-fit: contain;
    border: 1px solid #ddd;
    background: white;
}

.text-area {
    width: 100%;
    height: 60px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: none;
    box-sizing: border-box;
}

.button-box {
    text-align: center;
    margin-top: 10px;
}

button {
    background-color: #3bb2ea;
    border: none;
    color: white;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 6px;
    box-shadow: 0 2px #999;
    transition: 0.3s;
    margin: 5px;

    &:hover {
        background-color: #45a049;
    }

    &:active {
        background-color: #3e8e41;
        box-shadow: 0 2px #666;
        transform: translateY(2px);
    }
}

.font_red {
    color: #fe1414;
}
dd {
  margin-inline-start: 0;
}
</style>