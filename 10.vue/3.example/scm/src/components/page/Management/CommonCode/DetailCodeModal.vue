<script setup>
import axios from 'axios';
import { useModalStore } from '../../../../stores/modalStore';
import { ref, onMounted } from 'vue';

const modalStore = useModalStore();
const detailCodeDetail = ref({useYn: "N"});
const emit = defineEmits(['postSuccess'])
const { id, groupCode } = defineProps(['id', 'groupCode']);

const searchDetail = () => {
    if(id!=0){
        axios.post('/api/management/commonDetailCodeDetailBody.do', {detailIdx: id})
        .then(res => {
            detailCodeDetail.value = res.data.detailValue
        })
    }
}

const handlerSave = () =>{
    if(!(detailCodeDetail.value.detailCode
    && detailCodeDetail.value.detailName
    && detailCodeDetail.value.note
    && detailCodeDetail.value.useYn
    )) return alert('필수 입력란을 모두 입력해주세요.')
    const param = new URLSearchParams({
        groupCode: groupCode
        , detailCode: detailCodeDetail.value.detailCode
        , detailName: detailCodeDetail.value.detailName
        , detailNote: detailCodeDetail.value.note
        , useYn: detailCodeDetail.value.useYn
    });
    axios.post('/api/management/commonDetailCodeSave.do', param)
    .then(res => {
        if(res.data.result ==="success"){
            emit('postSuccess');
            modalStore.close('detailCode');
            alert('상세코드 정보가 저장되었습니다.');
        } else {
            return alert('요청에 실패하였습니다.');
        }
    });
}

const handlerUpdate = () =>{
    if(!(detailCodeDetail.value.detailCode
    && detailCodeDetail.value.detailName
    && detailCodeDetail.value.note
    && detailCodeDetail.value.useYn
    )) return alert('필수 입력란을 모두 입력해주세요.')
    const param = new URLSearchParams({
        groupCode: groupCode
        , detailCode: detailCodeDetail.value.detailCode
        , detailName: detailCodeDetail.value.detailName
        , detailNote: detailCodeDetail.value.note
        , useYn: detailCodeDetail.value.useYn
    });
    param.append("detailIdx", id);
    axios.post('/api/management/commonDetailCodeUpdate.do', param)
    .then(res => {
        if(res.data.result ==="success"){
            emit('postSuccess');
            modalStore.close('detailCode');
            alert('상세코드 정보가 수정되었습니다.');
        } else {
            return alert('요청에 실패하였습니다.');
        }
    });
}

const handlerDelete = () =>{
    const result = window.confirm('정말 삭제하시겠습니까?');
    if(!result) return alert('상세코드 삭제가 취소되었습니다.')

    axios.post('/api/management/commonDetailCodeDeleteBody.do', {detailIdx: id})
        .then(res => {
            if(res.data.result === "success") {
                emit('postSuccess');
                modalStore.close('detailCode');

                return alert('상세코드가 삭제되었습니다.');
            }
            else {
                return alert('요청에 실패하였습니다.')
            }
        })
}

onMounted(() => {
    searchDetail()
})

onUnmounted(() => {
    emit('modalClose', 0);
});


</script>

<template>
    <teleport to="body">
        <div class="backdrop">
            <dl class="container">
                <dt>
                    <strong>상세코드관리</strong>
                </dt>
                <dd>
                    <table>
                        <tbody>
                            <tr>
                                <th scope="row">그룹코드 <span class="font_red">*</span></th>
                                <td colspan="3">
                                    <input 
                                    type="text"
                                    :value="groupCode"
                                    disabled
                                    readonly
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">상세코드 <span class="font_red">*</span></th>
                                <td colspan="3">
                                    <input 
                                    type="text"
                                    v-model="detailCodeDetail.detailCode"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">상세코드명<span class="font_red">*</span></th>
                                <td colspan="3">
                                    <input 
                                    type="text" 
                                    v-model="detailCodeDetail.detailName"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">그룹코드설명<span class="font_red">*</span></th>
                                <td colspan="3">
                                    <input 
                                    type="text"
                                    v-model="detailCodeDetail.note"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">사용여부<span class="font_red">*</span></th>
                                <td colspan="3">
                                    <label>
                                        <input type="radio" value="Y" v-model="detailCodeDetail.useYn" /> Yes
                                    </label>
                                    <label>
                                        <input type="radio" value="N" v-model="detailCodeDetail.useYn" /> No
                                    </label>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="button-box">
                        <button @click="id? handlerUpdate() : handlerSave()">{{ id ? '수정' : '저장' }}</button> 
                        <button v-if="id" @click="handlerDelete()">삭제</button>
                        <button @click="modalStore.close('detailCode')"><span>취소</span></button>
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