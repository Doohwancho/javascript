<script setup>
import axios from 'axios';
import { useModalStore, useModalStore2 } from '../../../../stores/modalState';
import { watch } from 'vue';
import EmailModal from './EmailModal.vue';
import Swal from 'sweetalert2';

const modalState = useModalStore();
const modalState2 = useModalStore2();

const { id } = defineProps(['id']);
const emit = defineEmits([`modalClose`, 'postSuccess']);
const idCheck = ref(false);
const emailCheck = ref(false);

const userInfoDetail = ref({
    action: 'F',
    loginID: '',
    userType: 'N',
    name: '',
    password: '',
    password2: '',
    sex: 'N',
    hp: '',
    email: '',
    reatedDate: '',
    birthday: '',
    userClass: '',
    statusYn: '',
    address: '',
    detailAddress: '',
    groupCode: '',
    detailCode: 'N',
    manager: '',
    zipCode: '',
});
const userTypeList = ref();

const searchDetail = () => {
    axios
        .post('/api/management/userInfoDetailBody.do', { loginID: id })
        .then(res => {
            userInfoDetail.value = {
                ...res.data.detailValue,
                password2: res.data.detailValue.password,
            };
        });
};

const handleUserType = () => {
    const codeList = {
        S: 'E10001X1',
        P: 'E10001X1',
        E: 'E10001X1',
        D: 'R20001P1',
        C: 'G00001A1',
    };
    const userClassCode = {
        S: 'SCM담당자',
        P: '구매담당자',
        E: '회사임원',
        D: '배송담당자',
        C: '기업고객',
    };
    if (
        userInfoDetail.value.groupCode !==
        codeList[userInfoDetail.value.userType]
    ) {
        userInfoDetail.value.detailCode = 'N';
    }
    userInfoDetail.value.userClass =
        userClassCode[userInfoDetail.value.userType];
    userInfoDetail.value.groupCode = codeList[userInfoDetail.value.userType];
    if (userInfoDetail.value.userType !== 'N') {
        axios
            .post('/api/management/detailCodeListBody.do', {
                groupCode: userInfoDetail.value.groupCode,
            })
            .then(res => {
                userTypeList.value = res.data.detailCode;
            });
    }
};

const checkUserData = () => {
    let flag = true;
    const warningMessage = {
        loginID: 'ID를 입력해주세요!',
        userType: '직원 유형을 선택해 주세요!',
        name: '이름/회사명을 입력해주세요!',
        password: '비밀번호를 입력해주세요!',
        password2: '비밀번호 확인을 입력해주세요!',
        sex: '성별을 선택해 주세요!',
        hp: '전화번호를 입력해 주세요!',
        email: '이메일을 입력해 주세요!',
        birthday: '생년월일을 입력해 주세요!',
        address: '주소를 입력해 주세요!',
        detailCode: '담당 업무를 선택해 주세요!',
        zipCode: '우편 번호를 입력해 주세요!',
    };
    const fieldsToCheck = [
        'userType',
        'detailCode',
        'loginID',
        'password',
        'password2',
        'name',
        'hp',
        'sex',
        'birthday',
        'email',
        'zipCode',
        'address',
    ];
    for (let field of fieldsToCheck) {
        if (
            userInfoDetail.value[field] === null ||
            userInfoDetail.value[field] === undefined ||
            userInfoDetail.value[field] === '' ||
            userInfoDetail.value[field] === 'N'
        ) {
            Swal.fire(warningMessage[field], '', 'warning');
            flag = false;
            break;
        }
    }
    return flag;
};

const updateInfo = () => {
    if (!checkUserData()) {
        return;
    }
    const passwordRules =
        /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    const hpRules = /^\d{2,3}-\d{3,4}-\d{4}$/;

    if (!passwordRules.test(userInfoDetail.value.password)) {
        Swal.fire(
            '비밀번호 형식을 확인해 주세요! (8~15자 영문,숫자,특문자 혼용)',
            '',
            'warning'
        );
        return;
    }
    if (userInfoDetail.value.password !== userInfoDetail.value.password2) {
        Swal.fire(
            '비밀번호와 비밀번호확인이 일치하지 않습니다!',
            '',
            'warning'
        );
        return;
    }
    if (!hpRules.test(userInfoDetail.value.hp)) {
        Swal.fire('전화번호 형식을 확인해 주세요!', '', 'warning');
        return;
    }

    axios
        .post('/api/management/UpdateScmBody2.do', userInfoDetail.value)
        .then(res => {
            if (res.data) {
                Swal.fire('수정 성공!', '', 'success').then(() =>
                    emit('postSuccess')
                );
            } else {
                Swal.fire('수정 실패', '', 'warning');
            }
        });
};

const searchPostcode = () => {
    new window.daum.Postcode({
        oncomplete: data => {
            userInfoDetail.value.address = data.address;
            userInfoDetail.value.zipCode = data.zonecode;
        },
    }).open();
};

const checkId = () => {
    const idRules = /^[a-z0-9]{6,20}$/g;
    if (!idRules.test(userInfoDetail.value.loginID)) {
        Swal.fire('ID형식이 맞지 않습니다!', '', 'warning');
        return;
    }

    axios
        .post('/api/management/check_loginIDBody.do', {
            loginID: userInfoDetail.value.loginID,
        })
        .then(res => {
            if (res.data.duplicCnt === 0) {
                Swal.fire('사용가능한 ID 입니다.', '', 'success');
                idCheck.value = true;
            } else {
                Swal.fire('중복된 아이디가 있습니다!', '', 'warning');
            }
        });
};

const checkEmail = () => {
    const emailRules =
        /^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (!emailRules.test(userInfoDetail.value.email)) {
        Swal.fire('이메일 형식이 맞지 않습니다!', '', 'warning');
        return;
    }

    axios
        .post('/api/check_emailJson.do', {
            email: userInfoDetail.value.email,
        })
        .then(res => {
            if (res.data === 0) {
                Swal.fire('사용가능한 이메일 입니다.', '', 'success');
                emailCheck.value = true;
            } else {
                Swal.fire('중복된 이메일이 존재합니다!', '', 'warning');
            }
        });
};

const regiserInfo = () => {
    if (!checkUserData()) {
        return;
    }

    const passwordRules =
        /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    const hpRules = /^\d{2,3}-\d{3,4}-\d{4}$/;

    if (!idCheck.value) {
        Swal.fire('아이디 중복 체크를 진행해 주세요!', '', 'warning');
        return;
    }
    if (!passwordRules.test(userInfoDetail.value.password)) {
        Swal.fire(
            '비밀번호 형식을 확인해 주세요! (8~15자 영문,숫자,특문자 혼용)',
            '',
            'warning'
        );
        return;
    }
    if (userInfoDetail.value.password !== userInfoDetail.value.password2) {
        Swal.fire(
            '비밀번호와 비밀번호확인이 일치하지 않습니다!',
            '',
            'warning'
        );
        return;
    }
    if (!hpRules.test(userInfoDetail.value.hp)) {
        Swal.fire('전화번호 형식을 확인해 주세요!', '', 'warning');
        return;
    }
    if (!emailCheck.value) {
        Swal.fire('이메일 중복체크를 진행해 주세요!', '', 'warning');
        return;
    }
    userInfoDetail.value.action = 'I';
    axios.put('/api/registerScmBody2.do', userInfoDetail.value).then(res => {
        if (res.data.result === 'SUCCESS') {
            Swal.fire('등록 성공!', '', 'success').then(() =>
                emit('postSuccess')
            );
        } else {
            Swal.fire('등록 실패!', '', 'warning');
        }
    });
};

const deleteInfo = () => {
    axios
        .post('/api/management/userDeleteBody.do', { loginID: id })
        .then(res => {
            if (res.data.result === 'success') {
                Swal.fire('삭제되었습니다', '', 'success').then(() =>
                    emit('postSuccess')
                );
            }
        });
};

const restoreInfo = () => {
    axios
        .post('/api/management/userRecoveryBody.do', { loginID: id })
        .then(res => {
            if (res.data.result === 'success') {
                Swal.fire('복구되었습니다', '', 'success').then(() =>
                    emit('postSuccess')
                );
            }
        });
};
const emailChage = email => {
    userInfoDetail.value.email = email;
    modalState2.modalState2 = !modalState2.modalState2;
};

const callFunction = name => {
    const functionList = {
        regiserInfo,
        updateInfo,
        deleteInfo,
        restoreInfo,
    };
    functionList[name]?.();
};

const confirmAction = name => {
    const msg = {
        regiserInfo: '등록 하시겠습니까?',
        updateInfo: '수정 하시겠습니까?',
        deleteInfo: '삭제 하시겠습니까?',
        restoreInfo: '복구 하시겠습니까?',
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

watch(() => userInfoDetail.value.userType, handleUserType);
onMounted(() => {
    id && searchDetail();
});
onUnmounted(() => {
    emit('modalClose', 0);
});
</script>
<template>
    <Teleport to="body">
        <EmailModal
            v-if="modalState2.modalState2"
            :email="userInfoDetail.email"
            @changeSuccess="emailChage"
        />
        <div class="backdrop">
            <div class="container">
                <div style="width: 100%">
                    <h2 style="text-align: center">기업고객 / 직원정보 관리</h2>
                    <table>
                        <colgroup>
                            <col width="15%" />
                            <col width="30%" />
                            <col width="15%" />
                            <col width="30%" />
                        </colgroup>
                        <tr>
                            <th>직원 유형<span class="font_red">*</span></th>
                            <td>
                                <select v-model="userInfoDetail.userType">
                                    <option value="N">선택</option>
                                    <option value="S">SCM담당자</option>
                                    <option value="P">구매담당자</option>
                                    <option value="E">회사임원</option>
                                    <option value="D">배송담당자</option>
                                    <option value="C">기업 고객</option>
                                </select>
                            </td>
                            <th>담당업무<span class="font_red">*</span></th>
                            <td>
                                <select v-model="userInfoDetail.detailCode">
                                    <option value="N">선택</option>
                                    <template
                                        v-if="userInfoDetail.userType !== 'N'"
                                    >
                                        <option
                                            v-for="list in userTypeList"
                                            :key="list.detailIdx"
                                            :value="list.detailCode"
                                        >
                                            {{ list.detailName }}
                                        </option>
                                    </template>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>아이디<span class="font_red">*</span></th>
                            <td>
                                <input
                                    type="text"
                                    v-model="userInfoDetail.loginID"
                                    placeholder="숫자, 영문자 조합 6~20자리"
                                    style="width: 150px"
                                    v-if="id === 0"
                                />
                                <input
                                    type="text"
                                    v-model="userInfoDetail.loginID"
                                    v-bind:readonly="id !== 0"
                                    placeholder="숫자, 영문자 조합 6~20자리"
                                    style="width: 210px"
                                    v-if="id !== 0"
                                />
                                <button
                                    style="margin-left: 5px; margin-right: 0px"
                                    v-if="id === 0"
                                    @click="checkId"
                                >
                                    중복체크
                                </button>
                            </td>
                            <th>비밀번호<span class="font_red">*</span></th>
                            <td>
                                <input
                                    type="password"
                                    v-model="userInfoDetail.password"
                                    placeholder="숫자, 영문자, 특문자 조합 8~15자리"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>이름/회사명<span class="font_red">*</span></th>
                            <td>
                                <input
                                    type="text"
                                    v-model="userInfoDetail.name"
                                />
                            </td>
                            <th>
                                비밀번호 확인<span class="font_red">*</span>
                            </th>
                            <td>
                                <input
                                    type="password"
                                    v-model="userInfoDetail.password2"
                                    placeholder="숫자, 영문자, 특문자 조합 8~15자리"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>담당자명</th>
                            <td>
                                <input
                                    type="text"
                                    v-model="userInfoDetail.manager"
                                />
                            </td>
                            <th>전화번호<span class="font_red">*</span></th>
                            <td>
                                <input
                                    type="text"
                                    v-model="userInfoDetail.hp"
                                    placeholder="000-0000-0000"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>성별<span class="font_red">*</span></th>
                            <td>
                                <select v-model="userInfoDetail.sex">
                                    <option value="N">선택</option>
                                    <option value="1">남자</option>
                                    <option value="2">여자</option>
                                </select>
                            </td>
                            <th>생년월일<span class="font_red">*</span></th>
                            <td>
                                <input
                                    type="date"
                                    v-model="userInfoDetail.birthday"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>이메일<span class="font_red">*</span></th>
                            <td colspan="3">
                                <input
                                    type="text"
                                    v-model="userInfoDetail.email"
                                    v-bind:readonly="id !== 0"
                                    placeholder="happyjob@happyjob.com"
                                    class="big_input"
                                />
                                <button
                                    class="Abutton"
                                    v-if="id !== 0"
                                    @click="
                                        modalState2.modalState2 =
                                            !modalState2.modalState2
                                    "
                                >
                                    이메일 변경
                                </button>
                                <button
                                    class="Abutton"
                                    v-if="id === 0"
                                    @click="checkEmail"
                                >
                                    중복체크
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <th>우편번호<span class="font_red">*</span></th>
                            <td colspan="3">
                                <input
                                    type="text"
                                    v-model="userInfoDetail.zipCode"
                                    readonly
                                    class="big_input"
                                />
                                <button class="Abutton" @click="searchPostcode">
                                    우편번호 찾기
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <th colspan="1">
                                주소<span class="font_red">*</span>
                            </th>
                            <td colspan="3">
                                <input
                                    type="text"
                                    v-model="userInfoDetail.address"
                                    readonly
                                    class="large_input"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>상세주소</th>
                            <td colspan="3">
                                <input
                                    type="text"
                                    v-model="userInfoDetail.detailAddress"
                                    class="large_input"
                                />
                            </td>
                        </tr>
                    </table>
                    <div class="button_area">
                        <button
                            @click="confirmAction('regiserInfo')"
                            v-if="id === 0"
                            class="button"
                        >
                            등록
                        </button>
                        <button
                            @click="confirmAction('updateInfo')"
                            v-if="id !== 0 && userInfoDetail.statusYn === '1'"
                            class="button"
                        >
                            수정
                        </button>
                        <button
                            v-if="id !== 0 && userInfoDetail.statusYn === '1'"
                            class="button"
                            @click="confirmAction('deleteInfo')"
                        >
                            삭제
                        </button>
                        <button
                            v-if="id !== 0 && userInfoDetail.statusYn === '0'"
                            class="button"
                            @click="confirmAction('restoreInfo')"
                        >
                            복구
                        </button>
                        <button
                            @click="modalState.setModalState()"
                            class="button"
                        >
                            닫기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
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
input {
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
    width: 210px;
}
select {
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
    width: 230px;
}

.Abutton {
    width: 120px;
    text-align: center;
    margin-left: 20px;
}

.big_input {
    width: 450px;
}
.large_input {
    width: 590px;
}

.button_area {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 10px;
}

.container {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    position: relative;
    width: 820px;
    height: 720px;
    display: flex;
    justify-content: center;
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
.button {
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
