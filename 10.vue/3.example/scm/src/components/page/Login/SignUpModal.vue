<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useModalStore } from '../../../stores/modalStore';



const loginId = ref('');
const loginIdError = ref('');
const password = ref('');
const passwordError = ref('');
const confirmPassword = ref('');
const confirmError = ref('');
const name = ref('');
const manager = ref('');
const hp = ref('');
const hpFirst = ref('');
const hpSecond = ref('');
const hpThird = ref('');
const hpError = ref('');
const sex = ref('');
const birthday = ref('');
const email = ref('');
const emailError = ref('');
const zipCode = ref('');
const address = ref('');
const detailAdress = ref('');
const checkId = ref(false);
const checkEmail = ref(false);
const detailAddressRef = ref();


const modalStore = useModalStore();

/* ======================== function: validate========================= */

const validateLoginId = () => {
    const regex = /^[a-z0-9]{6,20}$/;
    if (!regex.test(loginId.value)) {
        loginIdError.value = '아이디는 영문 숫자 조합으로 6~20자여야 합니다.';
        return false;
  } else {
        loginIdError.value = '';
        return true;
  }
}

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

const validateHp = () => {
    const regex = /^01[016789]-\d{3,4}-\d{4}$/;
    hp.value = `${hpFirst.value}-${hpSecond.value}-${hpThird.value}`;
    if (!regex.test(hp.value)) {
        hpError.value = '옳바른 휴대번호 형식이 아닙니다.';
        return false;
  } else {
        hpError.value = '';
        return true;
  }
}

watch([hpFirst, hpSecond, hpThird], () => {
  validateHp();
});

const validateEmail = () => {
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!regex.test(email.value)) {
        emailError.value = '옳바른 이메일 형식이 아닙니다.';
        return false;
    } else {
        emailError.value = '';
        return true;
  }
}

/* ======================== function: 기능 구현 ======================== */

/* ======================== 중복 확인 ======================== */

const checkDuplicateId = () => {
    if(!validateLoginId()) return alert('옳바른 형식이 아닙니다.')

    const param = {
        loginID: loginId.value
    }
    console.log(param);
    axios.post('/api/check_loginIDJson', param)
        .then(res => {
            console.log(res)
            if(res.data === 1){
                alert("중복 된 아이디 입니다.")
            } else {
                alert("사용 가능한 아이디 입니다.")
                checkId.value = true;
            }
        });
}

const checkDuplicateEmail = () => {
    if(!validateEmail()) return alert('옳바른 형식이 아닙니다.')

    const param = {
        email: email.value
    }
    axios.post('/api/check_emailJson', param)
        .then(res => {
            console.log(res)
            if(res.data === 1){
                alert("중복 된 이메일 입니다.")
            } else {
                alert("사용 가능한 이메일 입니다.")
                checkEmail.value = true;
            }
        });
}
/* ========================== Daum Postcode API ====================== */
// script 적용
onMounted(() => {
  const script = document.createElement('script');
  script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
  document.head.appendChild(script);
});

function daumPostcode() {
  new daum.Postcode({
    oncomplete: function (data) {
      // 주소 저장
      if (data.userSelectedType === 'R') {
        address.value = data.roadAddress;
      } else {
        address.value = data.jibunAddress;
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

      detailAdress.value = extra; // 참고항목 입력

      zipCode.value = data.zonecode;

      detailAddressRef.value.focus(); // 커서 이동
    }
  }).open();
}

/* ========================== 저장 ====================== */

const handlerSave = () => {
    if(!checkId.value) return alert("아이디 중복 검사를 해주세요.");
    if(!checkEmail.value) return alert("이메일 중복 검사를 해주세요.")
    if (!(validatePassword()
    && validateConfirmPassword()
    && validateEmail()
    && validateHp()
    && validateLoginId()
    )) return alert('옳바르지 않은 형식이 있습니다.');

    if(!(loginId.value 
    && password.value 
    && name.value 
    && confirmPassword.value 
    && manager.value
    && hp.value
    && sex.value
    && email.value
    && zipCode.value
    && address.value
    && birthday.value
    )) return alert('필수 입력란을 모두 입력해주세요.')
        
    const param = new URLSearchParams({
        loginID: loginId.value
        , password: password.value
        , name: name.value
        , sex: sex.value
        , hp: hp.value
        , email: email.value
        , birthday: birthday.value
        , address: address.value
        , detailAddress: detailAdress.value
        , zipCode: zipCode.value
        , manager: manager.value
        , action: "I"
        , groupCode: "G00001A1"
        , detailCode: "GB0000T13"
        , userType: "C"
        , userClass: "기업고객"
    });
    axios.post('/api/registerScm.do', param)
        .then(res => {
            console.log(res)
            if(res.data.result === "SUCCESS"){
                alert(res.data.resultMsg)
                modalStore.close('signUp');
            } else {
                alert(res.data.resultMsg)
            }
        });

}

</script>

<template>
    <div>
        <div class="container">
            <dl style="background-color: aliceblue;">
                <dt >		
                    <strong style="font-size:200%;">기업 회원가입</strong> 
                </dt>
                <dd>
                    <!-- s : 여기에 내용입력 -->
                    <table>
                        <colgroup>
                            <col width="120px"><!-- th 부분 -->
                            <col width="120px"><!-- td 1 부분 -->
                            <col width="120px"><!-- td 2 부분 -->			
                            <col width="80px"><!-- td 3 부분 -->
                        </colgroup>
                            <tbody>
                                <tr>
                                    <th scope="row">아이디<span class="font_red">*</span></th>
                                    <td colspan="3">
                                        <div class="init-style" style="display: flex; flex-direction: column;">
                                            <input
                                            type="text"
                                            placeholder="숫자, 영문자 조합으로 6~20자리"
                                            v-model="loginId"
                                            @blur="validateLoginId"
                                            />
                                            <span v-if="loginIdError" style="color: red; font-size: 0.8em; margin-top: 4px;">
                                            {{ loginIdError }}
                                            </span>
                                        </div>
                                        </td>
                                    <td colspan="1" style="width: 130px;">
                                    <input type="button" value="중복확인"
                                        @click="checkDuplicateId" 
                                        style="width: 130px; 
                                        height: 25px;" />
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">비밀번호 <span class="font_red">*</span></th>
                                    <td colspan="4">
                                        <div class="init-style" style="display: flex; flex-direction: column;">
                                            <input 
                                            type="password"
                                            placeholder="숫자, 영문자, 특수문자 조합으로 8~15자리 " 
                                            v-model="password"
                                            @blur="validatePassword" 
                                            />
                                            <span v-if="passwordError" style="color: red; font-size: 0.8em; margin-top: 4px;">
                                            {{ passwordError }}
                                            </span>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <th scope="row" style="padding: 0 0">비밀번호 확인<span
                                        class="font_red">*</span></th>
                                    <td colspan="4">
                                        <div class="init-style" style="display: flex; flex-direction: column;">
                                            <input type="password"
                                                placeholder="숫자, 영문자, 특수문자 조합으로 8~15자리 "
                                                v-model="confirmPassword"
                                                @blur="validateConfirmPassword"
                                                />
                                                <span v-if="confirmError" style="color: red; font-size: 0.8em; margin-top: 4px;">
                                                    {{ confirmError }} </span>
                                        </div>
                                    </td>
                                </tr>
                                
                                <tr>
                                    <th scope="row" id="registerName_th">회사명 <span class="font_red">*</span></th>
                                    <td colspan="4">
                                        <div class="init-style" style="display: flex; flex-direction: column;">
                                            <input 
                                                type="text" 
                                                v-model="name" 
                                                />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" id="registerManager_th">담당자명 <span class="font_red">*</span></th>
                                    <td colspan="4">
                                        <div class="init-style" style="display: flex; flex-direction: column;">
                                            <input 
                                                type="text" 
                                                class="inputTxt p100" 
                                                v-model="manager"/>
                                        </div>
                                    </td>
                                </tr>
                                <tr>

                                <th scope="row">전화번호<span class="font_red">*</span></th>
                                    <td colspan="4">
                                        <div class="init-style" style="display: flex; flex-direction: column;">
                                            <div class="init-style" style="flex-direction: row;">
                                                <input 
                                                class="inputTxt"
                                                style="width: 33%" maxlength="3"
                                                type="text" 
                                                v-model="hpFirst"> - 
                                                <input 
                                                class="inputTxt"
                                                style="width: 33%" maxlength="4" 
                                                type="text" 
                                                v-model="hpSecond"> - 
                                                <input 
                                                class="inputTxt"
                                                style="width: 33%" maxlength="4" 
                                                type="text"
                                                v-model="hpThird"
                                                >
                                            </div>
                                            <div class="init-style">
                                                <span v-if="hpError" style="color: red; font-size: 0.8em; margin-top: 4px;">
                                                    {{ hpError }} </span>

                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                
                                <tr>
                                    <th scope="row" id="rggender_th">성별<span class="font_red">*</span></th>
                                    
                                    <td colspan="4" id="rggender_td">
                                        <div class="init-style" style="display: flex;">
                                            <select  v-model="sex">
                                                    <option value="" selected="selected">선택</option>
                                                    <option value="1">남자</option>
                                                    <option value="2">여자</option>
                                            </select>
                                        </div>
                                    </td>
                                </tr>
                                <tr id="birthday1">
                                    <th scope="row">생년월일 <span class="font_red">*</span></th>
                                    <td colspan="4">
                                        <div class="init-style" style="display: flex;">
                                            <input type="date" 
                                            v-model="birthday"
                                            style="font-size: 15px" />
                                        </div>
                                    </td>
                                </tr>
                                
                                <tr>
                                    <th scope="row">이메일<span class="font_red">*</span></th>
                                        <td colspan="3">
                                            <div class="init-style" style="display: flex; flex-direction: column;">
                                                <input 
                                                type="text" 
                                                placeholder="ex) happyjob@happyjop.com"
                                                v-model="email"
                                                @blur="validateEmail"
                                                /> 
                                                <span v-if="emailError" style="color: red; font-size: 0.8em; margin-top: 4px;">
                                                    {{ emailError }} </span>
                                            </div>
                                        </td>
                                        <td colspan="1">	
                                            <input type="button" 
                                            value="중복확인"
                                            @click="checkDuplicateEmail" 
                                            style="width: 130px; height: 25px;" />
                                        </td>
                                </tr>
                                <tr>
                                    <th scope="row">우편번호<span class="font_red">*</span></th>
                                    
                                    <td colspan="3">
                                        <div class="init-style" style="display: flex; flex-direction: column;">
                                        <input 
                                        type="text" 
                                        v-model="zipCode" 
                                        style="background-color: #f5f5f5; cursor: not-allowed;"
                                        readonly/>
                                    </div>
                                </td>

                                    <td><input type="button" value="우편번호 찾기"
                                        @click="daumPostcode"
                                        style="width: 130px; height: 25px;" /></td>
                                </tr>
                                <tr>
                                    <th scope="row">주소<span class="font_red">*</span>
                                    </th>
                                    <td colspan="4">
                                        <div class="init-style" style="display: flex; flex-direction: column;">
                                        <input 
                                        type="text" 
                                        v-model="address"
                                        style="background-color: #f5f5f5; cursor: not-allowed;"
                                        readonly/>
                                    </div>
                                </td>
                                </tr>
                                <tr>
                                    <th scope="row">상세주소</th>
                                    <td colspan="4">
                                        <div class="init-style" style="display: flex; flex-direction: column;">
                                        <input 
                                        type="text" 
                                        class="inputTxt p100"
                                        v-model="detailAdress" 
                                        ref="detailAddressRef"
                                        />
                                    </div>
                                </td>
                                </tr>
                            </tbody>
                    </table>
                    <button @click="handlerSave">회원가입 완료</button>
                    <button @click="modalStore.close('signUp')">취소</button>
                            <br>

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