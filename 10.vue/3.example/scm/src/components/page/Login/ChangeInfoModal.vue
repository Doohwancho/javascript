<script setup>
import axios from 'axios';
import { useModalStore } from '../../../stores/modalStore';


const modalStore = useModalStore();

const{ loginID } = defineProps(['loginID']);
const password = ref('');
const passwordError = ref('');
const confirmPassword = ref('');
const confirmError = ref('');


const validatePassword = () => {
    const regex = /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,15}$/;
    if (!regex.test(password.value)) {
        passwordError.value = '비밀번호는 영문 특수문자 숫자 조합으로 8~15자여야 합니다.';
        return false;
  } else {
        passwordError.value = '';
        return true;
  }
}

const validateConfirmPassword = () => {
    if (password.value === confirmPassword.value) {
        confirmError.value = '';
        return true;
    }
    else{
        confirmError.value = '입력하신 비밀번호와 다릅니다.'
        return false;
    }

}

const handlerUpdate = () => {
    if(!(validatePassword()&validateConfirmPassword())) return alert('옳바르지 않은 형식이 있습니다.')
    const param = {
        loginID: loginID
        , chPassword: password.value
    }
    axios.post('/api/changePwd.do', param).then(res=> {
        if(res.data.result != 'success') return alert('비밀번호 재설정에 실패하였습니다.');
        alert('비밀번호 재설정에 성공하였습니다 로그인 해주세요!');
        modalStore.close('changeInfo');
    })
}


</script>

<template>
    <div class="backdrop">
        <div class="container" style="width: 600px;">
		<dl>
			<dt>
				<strong>비밀번호 변경</strong>
			</dt>
			<dd>
				<table>
					<tbody>
                        <tr>
                            <th scope="row">아이디 </th>
                            <td>
                                <div class="input-box">
                                    <input
                                    type="text"
                                    :value="loginID"
                                    disabled
                                    />
                                </div>
                            </td>
                        </tr> 	
                        <tr>
                            <th scope="row">비밀번호 <span class="font_red">*</span></th>
                            <td colspan="4">
                                <div class="input-box">
                                    <input 
                                    type="password"
                                    placeholder="숫자, 영문자, 특수문자 조합으로 8~15자리 " 
                                    v-model="password"
                                    @blur="validatePassword" 
                                    />
                                    <span 
                                    class="valid-text"
                                    v-if="passwordError">
                                    {{ passwordError }}
                                    </span>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <th scope="row" style="padding: 0 0">비밀번호 확인<span
                                class="font_red">*</span></th>
                            <td colspan="4">
                                <div class="input-box">
                                    <input type="password"
                                        placeholder="숫자, 영문자, 특수문자 조합으로 8~15자리 "
                                        v-model="confirmPassword"
                                        @blur="validateConfirmPassword"
                                        />
                                        <span 
                                        class="valid-text"
                                        v-if="confirmError">
                                            {{ confirmError }} </span>
                                </div>
                            </td>
                        </tr>
					</tbody>
				</table>
				<div class="btn_areaC mt30">
					<button
                    @click="handlerUpdate()"
                    >비밀번호 변경</button> 
					<button
                    @click="modalStore.close('changeInfo')"
                    >취소</button>
					<br>
				</div>
			</dd>
		</dl>
	</div>
    </div>
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

input{
    width: 400px;
}

.font_red {
    color: #fe1414;
}

.input-box{
    display: flex; 
    flex-direction: column;
    align-items: center;
    width: auto;
}
.valid-text{
    color: #fe1414; 
    font-size: 0.8em; 
    margin-top: 4px;
}
dd {
  margin-inline-start: 0;
}
</style>