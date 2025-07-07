<script setup>
import { onMounted, ref } from 'vue';
import { useModalStore } from '../../../../stores/modalState';
import axios from 'axios';


const modalState = useModalStore();
const emit = defineEmits(['postSuccess', 'modalClose'])
const { id } = defineProps(['id']); 

const warehouseInfoDetail = ref({});

const searchDetail = () => {
    if(id == 0) return
    axios.post('/api/management/warehouseInfoDetailBody.do', {warehouseId: id}).then(res => {
        const resEmail = res.data.detailValue.email;
        const resPhone = res.data.detailValue.phone;

        const [email, emailDomain] =  resEmail.split('@');
        const [phone1, phone2, phone3] =  resPhone.split('-');

        warehouseInfoDetail.value = {
            address: res.data.detailValue.address
            , manager: res.data.detailValue.manager
            , name: res.data.detailValue.name
            , warehouseCode: res.data.detailValue.warehouseCode
            , zipCode: res.data.detailValue.zipCode
            , email: email
            , emailDomain: emailDomain
            , phone1: phone1
            , phone2: phone2
            , phone3: phone3
        }
    });
}

function daumPostcode() {
  new daum.Postcode({
    oncomplete: function (data) {
      // 주소 저장
      if (data.userSelectedType === 'R') {
        warehouseInfoDetail.value.address = data.roadAddress;
      } else {
        warehouseInfoDetail.value.address = data.jibunAddress;
      }

      // 상세주소 참고 정보 (원하는 경우만 추가)
      let extra = '';
      if (data.userSelectedType === 'R') {
        if (data.bname && /[동|로|가]$/g.test(data.bname)) {
          extra += data.bname;
        }
        if (data.buildingName && data.apartment === 'Y') {
          extra += (extra ? ', ' : '') + data.buildingName;
        }
      }

      warehouseInfoDetail.value.detailAddress = extra; // 참고항목 입력

      warehouseInfoDetail.value.zipCode = data.zonecode;

    }
  }).open();
}

const handlerSave = () => {
    if(!(warehouseInfoDetail.value.warehouseCode
    && warehouseInfoDetail.value.name
    && warehouseInfoDetail.value.manager
    && warehouseInfoDetail.value.email
    && warehouseInfoDetail.value.emailDomain
    && warehouseInfoDetail.value.phone1
    && warehouseInfoDetail.value.phone2
    && warehouseInfoDetail.value.phone3
    && warehouseInfoDetail.value.zipCode
    && warehouseInfoDetail.value.address
    )) return alert('필수 입력란을 모두 입력해주세요.')
    
    const param = new URLSearchParams(warehouseInfoDetail.value);

    axios.post('/api/management/warehouseInfoSave.do', param).then(res => {
        if(res.data.result != "success") return alert('창고 정보 저장에 실패하였습니다.');
        alert('창고 정보 저장에 성공하였습니다.');
        emit('postSuccess');
        modalState.setModalState();
    })
}

const handlerUpdate = () => {
    if(!(warehouseInfoDetail.value.warehouseCode
    && warehouseInfoDetail.value.name
    && warehouseInfoDetail.value.manager
    && warehouseInfoDetail.value.email
    && warehouseInfoDetail.value.emailDomain
    && warehouseInfoDetail.value.phone1
    && warehouseInfoDetail.value.phone2
    && warehouseInfoDetail.value.phone3
    && warehouseInfoDetail.value.zipCode
    && warehouseInfoDetail.value.address
    )) return alert('필수 입력란을 모두 입력해주세요.')
    const param = new URLSearchParams(warehouseInfoDetail.value);
    param.append('warehouseId', id);

    axios.post('/api/management/warehouseInfoUpdate.do', param).then(res => {
        if(res.data.result != "success") return alert('창고 정보 수정에 실패하였습니다.');

        alert('창고 정보 수정에 성공하였습니다.');
        emit('postSuccess');
        modalState.setModalState();
    })
}

const handlerDelete = () => {
    axios.post('/api/management/warehouseInfoDeleteBody.do',{warehouseId: id}).then(res => {
        if(res.data.result != "success") return alert('창고 정보 삭제에 실패하였습니다.')

        alert('창고 정보 삭제에 성공하였습니다.')
        emit('postSuccess');
        modalState.setModalState();
    })
}

onMounted(() => {
    searchDetail();
});

onUnmounted(() => {
    emit('modalClose', 0);
});

</script>

<template>
   <div class="backdrop">
        <dl class="container">
            <dt>
                <strong>창고 정보</strong>
            </dt>
            <dd>
                <table>
                    <colgroup>
                        <col width="12%">
                        <col width="12%">
                        <col width="12%">
                        <col width="12%">
                        <col width="12%">
                        <col width="12%">
                        <col width="12%">
                    </colgroup>
                    
                    <tbody>
                        <tr>
                            <th colspan="2" scope="row">창고코드<span class="font_red">*</span></th>
                            <td colspan="7">
                                <input type="text" v-model="warehouseInfoDetail.warehouseCode" />
                            </td>
                        </tr>
                        <tr>
                            <th colspan="2" scope="row">창고명<span class="font_red">*</span></th>
                            <td colspan="7">
                                <input type="text" v-model="warehouseInfoDetail.name" />
                            </td>
                        </tr>
                        <tr>
                            <th colspan="2" scope="row">담당자<span class="font_red">*</span></th>
                            <td colspan="7">
                                <input type="text" v-model="warehouseInfoDetail.manager" />
                            </td>
                        </tr>
                        <tr>
                            <th colspan="2" scope="row">이메일<span class="font_red">*</span></th>
                            <td colspan="7">
                                <div style="display: flex; gap: 8px; align-items: center;">
                                    <input 
                                    type="text" 
                                    v-model="warehouseInfoDetail.email" 
                                    style="width: 35%;" />
                                    <span>@</span>
                                    <input 
                                    type="text" 
                                    v-model="warehouseInfoDetail.emailDomain" 
                                    style="width: 55%;" />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th colspan="2" scope="row">전화번호<span class="font_red">*</span></th>
                            <td colspan="7">
                                <div style="display: flex; gap: 8px; align-items: center;">
                                    <input 
                                    type="text" 
                                    v-model="warehouseInfoDetail.phone1"
                                    maxlength="3" 
                                    style="width: 25%;" />
                                    <span>-</span>
                                    <input 
                                    type="text" 
                                    v-model="warehouseInfoDetail.phone2"
                                    maxlength="6" 
                                    style="width: 40%;" />
                                    <span>-</span>
                                    <input 
                                    type="text" 
                                    v-model="warehouseInfoDetail.phone3"
                                    maxlength="6" 
                                    style="width: 40%;" />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th colspan="2" scope="row">우편번호<span class="font_red">*</span></th>
                            <td colspan="5">
                                <input 
                                type="text" 
                                v-model="warehouseInfoDetail.zipCode"
                                 />
                            </td>
                            <td colspan="2">
                                <input
                                type="button"
                                @click="daumPostcode"
                                value="우편번호 찾기"
                                > 
                                </input>
                            </td>
                        </tr>
                        <tr>
                            <th colspan="2" scope="row">창고위치<span class="font_red">*</span></th>
                            <td colspan="7">
                                <textarea 
                                class="text-area" 
                                v-model="warehouseInfoDetail.address"
                                 >

                                </textarea>
                            </td>
                        </tr>
                        <tr style="display: none;">
                            <th colspan="2" scope="row">상세주소<span class="font_red">*</span></th>
                            <td colspan="7">
                                <textarea 
                                class="text-area" 
                                v-model="warehouseInfoDetail.detailAddress" >

                                </textarea>
                            </td>
                        </tr>
                    </tbody>
                </table>
                
                <div class="button-box">
                    <button
                    @click="id ? handlerUpdate() : handlerSave()"
                    >
                        {{ id ? '수정' : '저장' }}
                    </button>
                    <button 
                    @click="handlerDelete"
                    style="margin-left: 8px;">삭제</button>
                    <button 
                    @click="modalState.setModalState()" 
                    style="margin-left: 8px;">취소</button>
                </div>
            </dd>
        </dl>
    </div>
</template>

<style lang="scss" scoped>
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
    width: 30%;
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
th,
td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
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

.custom-upload-btn {
    display: inline-block;
    background-color: #3bb2ea;
    border: none;
    color: white;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 6px;
    box-shadow: 0 2px #999;
    transition: 0.3s;
    font-family: sans-serif;
    font-weight: normal;

    &:hover {
        background-color: #45a049;
    }

    &:active {
        background-color: #3e8e41;
        box-shadow: 0 2px #666;
        transform: translateY(2px);
    }
}
.custom-td{
    width: 40%;
}

input{
    width: 100%;
}
dd {
  margin-inline-start: 0;
}

</style>
