<script setup>
import emailjs from 'emailjs-com';
import { ref } from 'vue';
import { useModalStore } from '../../../stores/modalStore';
import axios from 'axios';

const findId = ref(true);
const findPwd = ref(false);
const checkLoginID = ref(false);
const checkEmail = ref(false);
const email = ref('');
const loginID = ref('');
const timer = ref(0);
const generatedCode = ref('');
const userInputCode = ref('');

const modalStore = useModalStore();
const emit = defineEmits(['loginID']);

/* ======================= handler ==================== */
const handlerFindId = () =>{
    findId.value = true;
    findPwd.value = false;
    email.value = '';
    generatedCode.value = '';
    timer.value = 0;
    checkEmail.value = false;
    loginID.value = '';
    checkLoginID.value = false;
    userInputCode.value = '';
}

const handlerFindPwd = () => {
    findId.value = false;
    findPwd.value = true;
    email.value = '';
    generatedCode.value = '';
    timer.value = 0;
    checkEmail.value = false;
    loginID.value = '';
    checkLoginID.value = false;
    userInputCode.value = '';
}

const handlerSendMail = () => {
    const param = new URLSearchParams({email: email.value});
    axios.post('/api/selectFindInfoId.do', param)
        .then(res => {
            if(res.data.result === "SUCCESS"){
                checkEmail.value = true;
                sendVerificationCode();
                startTimer();
                loginID.value = res.data.resultModel.loginID;
            } else {
                alert("존재하지 않는 메일입니다.");
            }
        });
}

const handlerValidateFindIdCode = () => {
    if(generatedCode.value!==userInputCode.value) return alert("잘못된 코드가 입력되었습니다.");
    const param = new URLSearchParams({email: email.value});
    axios.post('/api/selectFindInfoId.do', param)
        .then(res => {
            if(res.data.result === "SUCCESS"){
                alert("아이디: " + res.data.resultModel.loginID);
                stopTimer();
                modalStore.close('findInfo');
            } else {
                alert("존재하지 않는 메일입니다.");
            }
        });
}


const handlerCheckId = () => {
    const param = new URLSearchParams({loginID: loginID.value});
    axios.post('/api/registerIdCheck.do', param)
        .then(res => {
            if(res.data.result === "SUCCESS"){
                checkLoginID.value = true;
            } else {
                alert("존재하지 않는 아이디입니다.");
            }
        });

}

const handlerCheckInfo = () => {
    const param = new URLSearchParams({
        loginID: loginID.value
        ,email: email.value
    });
    axios.post('/api/selectFindInfoPw.do', param)
        .then(res => {
            if(res.data.result === "SUCCESS"){
                checkEmail.value = true;
                sendVerificationCode();
                startTimer();
            } else {
                alert("존재하지 않는 정보입니다.");
            }
        });
}

const handlerValidateFindPwdCode = () =>{
    if(generatedCode.value!==userInputCode.value) return alert("잘못된 코드가 입력되었습니다.")
    const param = new URLSearchParams({
        loginID: loginID.value
        ,email: email.value
    });
    axios.post('/api/selectFindInfoPw.do', param)
        .then(res => {
            if(res.data.result === "SUCCESS"){
                /* alert("비밀번호: " + res.data.resultModel.password); */
                alert('인증에 성공하였습니다. 비밀번호를 변경해주세요.');
                stopTimer();
                emit('loginID', loginID.value);
                modalStore.close('findInfo');
                modalStore.open('changeInfo');
            } else {
                alert("존재하지 않는 정보입니다.");
            }
        });
    
}

/* ============================ function: 기능 구현============================== */

/* ======================= 난수 생성 ========================= */

const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/* ===================== 인증 메일 보내기 ====================== */
const sendVerificationCode = async () => {

    generatedCode.value = generateCode();

    const templateParams = {
        to_email: email.value,
        code: generatedCode.value,
    };

    try {
    await emailjs.send(
      'service_0htybpt',
      'template_rvl8ir9',
      templateParams,
      '0AM_7oBQUDRLAuHD8'
    );
    alert('인증번호가 전송되었습니다.');
  } catch (err) {
    console.error('메일 전송 실패:', err);
  }
};
/* ==================== 타이머 ====================== */
const timerText = computed(() => {
  const min = String(Math.floor(timer.value / 60)).padStart(2, '0');
  const sec = String(timer.value % 60).padStart(2, '0');
  return `${min}:${sec}`;
});

let timerInterval = null;

const startTimer = () => {
  clearInterval(timerInterval);
  timer.value = 180;
  timerInterval = setInterval(() => {
    if (timer.value > 0) {
      timer.value--;
    } else {
      clearInterval(timerInterval);
      alert("인증 시간이 만료되었습니다.");
    }
  }, 1000);
};

const stopTimer = () => {
  clearInterval(timerInterval);
  timerInterval = null; 
};
</script>

<template>
    <div>
        <div class="container">
            <dl>
                <dt>
                    <strong>아이디/비밀번호 찾기</strong>
                </dt>
                <dd  style="padding: 30px 30px !important;">
                    <div class="init-style button-container" style="margin-top: 0px !important;">
                        <button @click="handlerFindId">
                            <span>아이디 찾기</span>
                        </button> 
                        <button @click="handlerFindPwd">
                            <span>비밀번호 찾기</span>
                        </button>
                    </div>
                </dd>

                <dd>
                    <!-- 아이디/비밀번호 찾기 폼 -->
                    <table v-if="findId" >
                        <tbody>
                            <tr>
                                <th scope="row" style="width: 85px;" >
                                    이메일<span class="font_red">*</span>
                                </th>
                                <td >
                                <input 
                                type="text" 
                                placeholder="이메일을 입력하세요." 
                                v-model="email"
                                size="34" 
                                style="height: 30px;" /> 
                                    <button @click="handlerSendMail()">
                                        <span>이메일 전송</span></button>
                                    </td>
                            </tr>
                            <tr v-if="checkEmail">		
                                <th scope="row" style="width: 85px;" >
                                    인증번호<span class="font_red">*</span>
                                </th>
                                <td >
                                    <input 
                                    type="text"
                                    placeholder="전송된 인증번호를 입력하세요" 
                                    size="34" 
                                    style="height: 30px;" 
                                    v-model="userInputCode"
                                    />
                                    <button @click="handlerValidateFindIdCode"><span>인증하기</span></button>
                                </td>
                            </tr>
                            <tr v-if="checkEmail">		
                                <th scope="row" style="width: 85px;" >
                                    유효시간<span class="font_red">*</span>
                                </th>
                                <td id="">
                                    <span>{{ timerText }}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <table v-if="findPwd">
                        <tbody>
                            <tr>
                                <th scope="row" style="width: 85px;" >
                                    아이디<span class="font_red">*</span>
                                </th>
                                <td >
                                <input 
                                type="text" 
                                placeholder="가입하신 아이디를 입력하세요" 
                                size="34" style="height: 30px;" 
                                v-model="loginID"
                                />
                                    <button @click="handlerCheckId">
                                    <span>가입 여부 확인</span></button>
                                </td>
                            </tr>
                            <tr v-if="checkLoginID">
                                <th scope="row" style="width: 85px;" >
                                    이메일<span class="font_red">*</span>
                                </th>
                                <td >
                                    <input 
                                    type="text" 
                                    v-model="email"
                                    placeholder="가입하신 이메일을 입력하세요" 
                                    size="34"
                                    style="height: 30px;" /> 
                                    <button @click="handlerCheckInfo"><span>인증 메일 전송</span></button></td>
                        </tr>
                        <tr v-if="checkEmail">
                                <th scope="row" style="width: 85px;" >
                                    인증번호<span class="font_red">*</span>
                                </th>
                                <td >
                                    <input 
                                    type="text" 
                                    placeholder="인증번호를 입력하세요" 
                                    size="34"
                                    style="height: 30px;" 
                                    v-model="userInputCode"
                                    /> <button @click="handlerValidateFindPwdCode"><span>인증하기</span></button></td>
                            </tr>
                            <tr v-if="checkEmail">		
                                <th scope="row" style="width: 85px;" >
                                    유효시간<span class="font_red">*</span>
                                </th>
                                <td id="">
                                    <span>{{ timerText }}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button @click="modalStore.close('findInfo')">닫기</button>
                </dd>
            </dl>
	    </div>
    </div>
</template>

<style scoped>
div {
        width: 100%;
        height: 100%;
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, 0.5);
        z-index: 10;
        font-weight: bold;

        .container {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
            width: auto;
            height: auto;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th, td {
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

        .button-container {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
            flex-direction: row;
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
            color:#fe1414;
        }
    }
.init-style {
    all: unset;
    display: flex;
    flex-direction: column;
}
dd {
  margin-inline-start: 0;
}
</style>