<script setup>
import axios from 'axios';
import { ref, onMounted, watch, readonly, inject, watchEffect, toRef, toRefs } from 'vue';
import { useUserInfo } from '../../../../stores/userInfo';
import EmployeeYearModal from './EmployeeYearModal.vue';
import { useMutation, useQuery } from '@tanstack/vue-query';

const address = ref('');
const addressCode = ref('');
const emit = defineEmits(['closeModal', 'OpenRetireModal', 'closeCommonModal', 'searchlist', 'update-retire-info']);
const props = defineProps([
    'employeeId',
    'jobGradeCode',
    'modalType',
    'isModalOpen',
    'UserDetail',
    'CommonModal',
    'regeResign'
]);

const { employeeId, jobGradeCode, modalType, isModalOpen, UserDetail, CommonModal, regeResign} = toRefs(props);

//사원 등록 및 파일업로드
const employeeForm = ref({});

const fileData = ref('');
const imgUrl = ref('');

//사진 랜더링 되고 나서 창 띄우기

//퇴직이유
const resignationReason = ref('');
//퇴직 날짜
const resignationDate = ref('');
//퇴직금
const severancePay = ref(0);
//연봉
const salary = ref(0);

//퇴직모달창에 내릴 변수 
const NowemployeeId = ref('');
const NowregDate = new Date();

//근무 연차
const years = ref('');

//연봉 계산 테이블
const salaryTable = {
    사원: {
        0: 30000000,
        1: 35000000,
        2: 40000000,
        3: 45000000,
        4: 50000000,
        5: 50000000,
    },
    대리: {
        0: 30000000,
        1: 35000000,
        2: 40000000,
        3: 45000000,
        4: 50000000,
        5: 50000000,
    },
    과장: {
        0: 35000000,
        1: 40000000,
        2: 45000000,
        3: 50000000,
        4: 55000000,
        5: 55000000,
    },
    부장: {
        0: 55000000,
        1: 70000000,
        2: 85000000,
        3: 100000000,
        4: 120000000,
        5: 120000000,
    },
};

const oldJobGrade = ref('');

const showModal = ref(false);

const OpenHobong = () => {
    showModal.value = true;
};

//개인 조회 
const searchDetail= async () => {

        imgUrl.value = '';

        const param = {
            employeeId: employeeId.value,
            jobGradeCode: jobGradeCode.value,
        }

        const result = await axios
            .post(`/api/personnel/employeeDetailBody`, param, {
                headers: {
                    'Content-Type': 'application/json', // JSON 형식으로 전송
                },
            });

        OntotalSalary(result.data.detail.employeeName);    

        return result.data.detail;  
}
    
  

//이미지 불러오기 
const getFileImage = async () => {
  const param = new URLSearchParams();
  param.append('employeeId', employeeId.value);

  await axios
    .post('/api/personnel/employeeDownloadVue.do', param, {
      responseType: 'blob',
    })
    .then(res => {
      if (res.status === 204 || res.data.size === 0) {
        imgUrl.value = '/images/default-profile.png'; // 기본 이미지 경로
        return;
      }

      const blob = new Blob([res.data], { type: res.headers['content-type'] });
      imgUrl.value = URL.createObjectURL(blob);
    })
    .catch(err => {
      console.error('이미지 요청 실패:', err);
      imgUrl.value = '/images/default-profile.png';
    });
};


//연봉 정보 불러오기 
const OntotalSalary = (val) => {

const param = {
    searchEmployeeName: val,
    pageSize: 1,
    currentPage: 1,
};

axios
    .post(`/api/personnel/salaryListBody`, param, {
        headers: {
            'Content-Type': 'application/json', // JSON 형식으로 전송
        },
    })
    .then(res => {
        employeeForm.value.salary = res.data.salaryList[0].salary;
        salary.value = employeeForm.value.salary;
    })
    .catch(err => {
        console.error('에러 발생:', err);
    });
}


//조회 useQuery
const {data: queryData, isSuccess} = useQuery({
    queryKey: ['DetailEmployee', employeeId],
    queryFn: searchDetail,
    enabled: !!employeeId,
    cacheTime: 1000 * 5,
});

watchEffect(() => {
    if(modalType.value !== 'register' && isSuccess && queryData.value ){
        employeeForm.value = { ...queryData.value };
        address.value = employeeForm.value.address;
        addressCode.value = employeeForm.value.zipCode;

        if(
            employeeForm.value.profileFileExt === 'jpg' ||
            employeeForm.value.profileFileExt === 'gif' || 
            employeeForm.value.profileFileExt === 'png') {
             // db에 있는 파일 데이터를 가지고 썸네일을 만들어 줌
             getFileImage();
         }

    }
})


//퇴직
const OnRetire = () => {

    //유효성 검사 
    if (
        severancePay.value == 0 
    ) {
        alert('퇴직금을 입력해주세요');
        return;
    }

    if (
        resignationReason.value == '' 
    ) {
        alert('퇴직사유를 입력해주세요');
        return;
    }


    if (
        resignationDate.value == ''
    ) {
        alert('퇴직날짜를 입력해주세요');
        return;
    }


    const regDate = new Date(props.UserDetail.detail.regDate);
    const resigDate = new Date(resignationDate.value);

    if(regDate > resigDate){
        alert('퇴사일이 입사일자보다 앞입니다.');
        return;
    }

    if(severancePay.value <= 0 || severancePay.value > 100000000){
        alert('퇴직금을 확인해주십쇼');
        return;
    }


    //부모 컴포넌트로 올리기 
    CommonModal.value = false;
    emit('update-retire-info', {
        resignationReason: resignationReason.value,
        resignationDate: resignationDate.value,
        severancePay: severancePay.value,
        salary: salary.value,
        employeeId: props.UserDetail.detail.employeeId,
    });
};

//파일 업로드
const handlerFile = e => {
    const fileInfo = e.target.files;
    const fileInfoSplit = fileInfo[0].name.split('.');
    const fileExtension = fileInfoSplit[1].toLowerCase();

    if (
        fileExtension === 'jpg' ||
        fileExtension === 'gif' ||
        fileExtension === 'png'
    ) {
        imgUrl.value = URL.createObjectURL(fileInfo[0]);
    }
    fileData.value = fileInfo[0];
};

//연봉 계산
const calculateSalary = () => {
    const job = employeeForm.value.jobGradeDetailName;
    const joinDate = new Date(employeeForm.value.regDate);
    const today = new Date();

    let years = today.getFullYear() - joinDate.getFullYear();
    const isBeforeAnniversary =
        today.getMonth() < joinDate.getMonth() ||
        (today.getMonth() === joinDate.getMonth() &&
            today.getDate() < joinDate.getDate());

    if (isBeforeAnniversary) {
        years -= 1;
    }

    // 범위: 최소 0년차, 최대 5년차 → 초과 시 5년차 연봉으로 고정
    const cappedYears = Math.min(Math.max(years, 0), 5);

    const jobSalaryTable = salaryTable[job];
    if (!jobSalaryTable) {
        console.warn(`"${job}" 직급에 대한 연봉 정보 없음`);
        salary.value = 0;
        return;
    }

    salary.value = jobSalaryTable[cappedYears] ?? 0;
};

//파일 저장
const saveEmployee = async() => {
    //유효성 검사
    const requiredFields = [
        { key: 'employeeName', label: '이름' },
        { key: 'registrationNumber', label: '주민등록번호' },
        { key: 'sex', label: '성별' },
        { key: 'birthday', label: '생년월일' },
        { key: 'email', label: '이메일' },
        { key: 'finalEducation', label: '최종학력' },
        { key: 'addressDetail', label: '상세주소' },
        { key: 'hp', label: '휴대폰 번호' },
        { key: 'bank', label: '은행명' },
        { key: 'bankAccount', label: '계좌번호' },
        { key: 'departmentDetailName', label: '부서' },
        { key: 'jobGradeDetailName', label: '직급' },
        { key: 'regDate', label: '입사일' },
    ];

    // employeeForm 내부 필드 검사
    for (const field of requiredFields) {
        const value = employeeForm.value[field.key];
        if (!value || value === '') {
            alert(`${field.label}을(를) 입력해주세요.`);
            return;
        }
    }

    // ref로 선언된 외부 값 검사
    if (!address.value) {
        alert('주소를 입력해주세요.');
        return;
    }

    //연봉 계산
    calculateSalary();

    //생년월일 yyyy-mm-dd 형시기 아닐경우 리턴
    const birthday = employeeForm.value.birthday;

    // YYYY-MM-DD 형식인지 확인
    const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(birthday);

    if (!isValidDate) {
        alert('생년월일 형식은 YYYY-MM-DD로 입력해주세요.');
        return;
    }

    //axios로 보내기
    const formData = new FormData();
    if (fileData.value) formData.append('file', fileData.value);

    // Onsalary(employeeForm.value.regDate);
    employeeForm.value.emplStatus = 'W';

    formData.append('employeeName', employeeForm.value.employeeName);
    formData.append('registrationNumber',employeeForm.value.registrationNumber);
    formData.append('sex', employeeForm.value.sex);
    formData.append('birthday', employeeForm.value.birthday);
    formData.append('finalEducation', employeeForm.value.finalEducation);
    formData.append('email', employeeForm.value.email);
    formData.append('hp', employeeForm.value.hp);
    formData.append('address', address.value);
    formData.append('addressDetail', employeeForm.value.addressDetail);
    formData.append('bank', employeeForm.value.bank);
    formData.append('bankAccount', employeeForm.value.bankAccount);
    formData.append('departmentDetailName',employeeForm.value.departmentDetailName);
    formData.append('jobGradeDetailName',employeeForm.value.jobGradeDetailName);
    formData.append('jobRoleDetailName', employeeForm.value.jobRoleDetailName);
    formData.append('regDate', employeeForm.value.regDate);
    formData.append('emplStatus', employeeForm.value.emplStatus);
    formData.append('salary', salary.value);
    formData.append('zipCode', employeeForm.value.zipCode);
    formData.append('paymentDate', employeeForm.value?.regDate.slice(0, 7));

    return await axios.post('/api/personnel/employeeSave.do', formData)
};

const { mutate: saveFile } = useMutation({
    mutationKey: ['EmployeeSave'],
    mutationFn: saveEmployee,
    onSuccess: result => {
        if(result.data.result === 'success'){
            alert('사원정보 저장 완료');
            closeModal();
            emit('searchlist');
        }
    } 
})



//파일 수정
const updateEmployee = async () => {
    const formData = new FormData();
    if (fileData.value) formData.append('file', fileData.value);

    formData.append('employeeName', employeeForm.value.employeeName);
    formData.append(
        'registrationNumber',
        employeeForm.value.registrationNumber
    );
    formData.append('sex', employeeForm.value.sex);
    formData.append('birthday', employeeForm.value.birthday);
    formData.append('finalEducation', employeeForm.value.finalEducation);
    formData.append('email', employeeForm.value.email);
    formData.append('hp', employeeForm.value.hp);
    formData.append('address', address.value);
    formData.append('addressDetail', employeeForm.value.addressDetail);
    formData.append('bank', employeeForm.value.bank);
    formData.append('bankAccount', employeeForm.value.bankAccount);
    formData.append(
        'departmentDetailName',
        employeeForm.value.departmentDetailName
    );
    formData.append(
        'jobGradeDetailName',
        employeeForm.value.jobGradeDetailName
    );
    formData.append('jobRoleDetailName', employeeForm.value.jobRoleDetailName);
    formData.append('regDate', employeeForm.value.regDate);
    formData.append('emplStatus', employeeForm.value.emplStatus);
    formData.append('employeeId', employeeForm.value.employeeId);
    formData.append('zipCode', employeeForm.value.zipCode);

    return await axios.post('/api/personnel/employeeUpdate.do', formData)
};


//수정 useMutation으로
const {mutate: updateEmployeeMutate} = useMutation({
    mutationkey : ['updateEmployeeMutate'],
    mutationFn: updateEmployee,
    onSuccess: result => {
        if(result.data.result === 'success'){
            alert('사원정보 수정 완료');
            closeModal();
            emit('searchlist');
        }
    }
})

//주소 찾기
const openDaumPostcode = () => {
    new window.daum.Postcode({
        oncomplete: function (data) {
            address.value = data.address; // 선택한 주소를 input에 적용
            employeeForm.value.zipCode = data.sigunguCode;
        },
    }).open();
};

//modal 코드

const saveModalOpen = ref(false);

const closeModal = () => {
    saveModalOpen.value = false;
    emit('closeModal', saveModalOpen.value);
};

const handleImgError = () => {
    imgUrl.value = '/images/default-profile.png';
};

const onJobGradeChange = () => {
    if (!confirm('직급을 변경하시겠습니까?')) {
        employeeForm.value.jobGradeDetailName = oldJobGrade.value;
    } else {
        oldJobGrade.value = employeeForm.value.jobGradeDetailName;
    }
};

const onemplStatus = () => {
    if (employeeForm.value.emplStatus == 'F') {

        CommonModal.value = true;
        
        //퇴직금 퇴직 사유 초기화 창열릴 떄마다 
        severancePay.value = '';
        resignationReason.value = '';

        emit('OpenRetireModal', employeeForm.value);
    }
};

//주민등록 번호
const formatResidentNumber = e => {
    let value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만
    if (value.length > 6) {
        value = value.slice(0, 6) + '-' + value.slice(6, 13);
    }
    employeeForm.value.registrationNumber = value;
};

//핸드폰 번호
//번호 숫자 형식 바꾸기
const formatPhone = () => {
    // 숫자만 남기기
    let digits = employeeForm.value.hp.replace(/\D/g, '');

    // 010-1234-5678 형식으로 만들기
    if (digits.length <= 3) {
        employeeForm.value.hp = digits;
    } else if (digits.length <= 7) {
        employeeForm.value.hp = `${digits.slice(0, 3)}-${digits.slice(3)}`;
    } else if (digits.length <= 11) {
        employeeForm.value.hp = `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
    } else {
        employeeForm.value.hp = `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
    }
};

//연봉 수샂 형식 변경 하기
// 표시용: 천 단위 콤마 붙여서 보여주기
const formattedSalary = computed(() => {
    if (!salary.value) return '';
    return Number(salary.value).toLocaleString();
});

const onSalaryInput = event => {
    const input = event.target.value;
    const onlyNumber = input.replace(/[^0-9]/g, ''); // 숫자만 남기기
    salary.value = onlyNumber;

    // 직접 input에 포맷된 값 넣어주기
    event.target.value = Number(onlyNumber).toLocaleString();
};

//퇴직금 숫자만 표시하기
const filterInput = event => {
    const input = event.target.value;
    const onlyNumber = input.replace(/[^0-9]/g, '');
    severancePay.value = onlyNumber;

    event.target.value = Number(onlyNumber).toLocaleString();
};

//은행 형식 계좌형으로 표기하기
const formatAccountNumber = () => {
  // 숫자만 남기고 하이픈 넣기 (3-3-6 기준)
  let digits = employeeForm.value.bankAccount.replace(/\D/g, '');

  if (digits.length <= 3) {
    employeeForm.value.bankAccount = digits;
  } else if (digits.length <= 6) {
    employeeForm.value.bankAccount = `${digits.slice(0, 3)}-${digits.slice(3)}`;
  } else if (digits.length <= 12) {
    employeeForm.value.bankAccount = `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 12)}`;
  } else {
    employeeForm.value.bankAccount = `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 12)}`;
  }
};

//퇴직 값이 들어오면 즉각 적용
watch(
    () => UserDetail.value,
    newVal => {
            //창 열릴때마다 퇴직금 이유 초기화 
            severancePay.value = '';
            resignationReason.value = '';
        if (newVal && newVal.detail && newVal.detail.employeeId) {
            NowemployeeId.value = newVal.detail.employeeId;
            NowregDate.value = newVal.detail.regDate;

        }
    },
    { immediate: true } // 필요에 따라 사용, 없으면 값 바뀔 때만 감지
);


//타입 감지
watch(
    () => modalType.value,
    Type => {
        if (Type === 'register') {
            employeeForm.value = {}; // 선택 사항 (초기화)
            address.value = '';
            addressCode.value = '';
            salary.value = 0;
            imgUrl.value = '';
            return;
        }
    }
);

watch(
  () => regeResign.value,
  () => {
    if (modalType.value === 'register') {
      employeeForm.value = {};
      address.value = '';
      addressCode.value = '';
      salary.value = 0;
      imgUrl.value = '';
    }
  }
);


// 카카오 API 스크립트 로드
onMounted(() => {
    const script = document.createElement('script');
    script.src =
        '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.head.appendChild(script);
});


</script>
<template>
    <div v-if="modalType === 'register' || modalType === 'update' && isSuccess">
        <div class="modal-overlay">
            <div class="modal-container">
                <div class="modal-header">
                    <h2>사원 상세 정보</h2>
                    <button class="modal-close" @click="closeModal">×</button>
                </div>

                <EmployeeYearModal
                    :show="showModal"
                    @close="showModal = false"
                />

                <div class="modal-body">
                    <!-- 1. 기본 정보 -->
                    <table class="row">
                        <tbody>
                            <tr>
                                <td rowspan="2" colspan="2">
                                    <div id="preview">
                                        <img
                                            :src="imgUrl"
                                            alt="미리보기 이미지"
                                            @error="handleImgError"
                                            style="
                                                max-width: 150px;
                                                height: auto;
                                                border: 1px solid #ccc;
                                            "
                                        />
                                    </div>
                                </td>
                                <th>사번</th>
                                <td colspan="3">
                                    <input
                                        type="text"
                                        class="inputTxt"
                                        id="number"
                                        placeholder="자동 입력됨"
                                        readonly
                                        v-model="employeeForm.employeeId"
                                    />
                                </td>
                                <th>이름 <span class="required">*</span></th>
                                <td colspan="3">
                                    <input
                                        type="text"
                                        class="inputTxt"
                                        id="employeeName"
                                        v-model="employeeForm.employeeName"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th style="width: 80px;">
                                    주민번호 <span class="required">*</span>
                                </th>
                                <td colspan="3">
                                    <input
                                        type="text"
                                        class="inputTxt"
                                        id="registrationNumber"
                                        placeholder="숫자만 입력"
                                        @input="formatResidentNumber"
                                        v-model="
                                            employeeForm.registrationNumber
                                        "
                                        maxlength="14"
                                    />
                                </td>
                                <th>성별 <span class="required">*</span></th>
                                <td colspan="3">
                                    <label
                                        ><input
                                            type="radio"
                                            name="sex"
                                            value="남성"
                                            v-model="employeeForm.sex"
                                        />
                                        남자</label
                                    >
                                    <label
                                        ><input
                                            type="radio"
                                            name="sex"
                                            value="여자"
                                            v-model="employeeForm.sex"
                                        />
                                        여자</label
                                    >
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <input
                                        type="file"
                                        class="inputTxt"
                                        id="fileInput"
                                        @change="handlerFile"
                                    />
                                </td>
                                <th>
                                    생년월일 <span class="required">*</span>
                                </th>
                                <td colspan="3">
                                    <input
                                        type="date"
                                        class="inputTxt"
                                        id="birthday"
                                        v-model="employeeForm.birthday"
                                    />
                                </td>
                                <th style="width: 80px;">
                                    최종학력 <span class="required">*</span>
                                </th>
                                <td colspan="3">
                                    <select
                                        class="inputSelect"
                                        id="finalEducation"
                                        v-model="employeeForm.finalEducation"
                                    >
                                        <option value="">선택 필수</option>
                                        <option value="초졸">초졸</option>
                                        <option value="중졸">중졸</option>
                                        <option value="고졸">고졸</option>
                                        <option value="대졸">대졸</option>
                                        <option value="석사">석사</option>
                                        <option value="박사">박사</option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- 2. 연락처 및 계좌 -->
                    <table class="row">
                        <tbody>
                            <tr>
                                <th>이메일 <span class="required">*</span></th>
                                <td colspan="3">
                                    <input
                                        type="email"
                                        class="inputTxt"
                                        id="email"
                                        v-model="employeeForm.email"
                                    />
                                </td>
                                <th>연락처 <span class="required">*</span></th>
                                <td colspan="3">
                                    <input
                                        type="text"
                                        class="inputTxt"
                                        id="hp"
                                        placeholder="숫자만 입력"
                                        @input="formatPhone"
                                        v-model="employeeForm.hp"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    우편번호 <span class="required">*</span>
                                </th>
                                <td colspan="2">
                                    <input
                                        type="text"
                                        class="inputTxt"
                                        id="zipCode"
                                        v-model="employeeForm.zipCode"
                                    />
                                </td>
                                <td>
                                    <button
                                        @click="openDaumPostcode"
                                        class="btnType blue"
                                        style="width: 130px; height: 28px"
                                    >
                                        우편번호 찾기
                                    </button>
                                </td>
                                <th rowspan="2">
                                    은행계좌 <span class="required">*</span>
                                </th>
                                <td colspan="3">
                                    <select
                                        class="inputSelect"
                                        id="bank"
                                        v-model="employeeForm.bank"
                                    >
                                        <option value="">선택 필수</option>
                                        <option value="기업">기업</option>
                                        <option value="하나">하나</option>
                                        <option value="농협">농협</option>
                                        <option value="우리">우리</option>
                                        <option value="신한">신한</option>
                                        <option value="카카오뱅크">
                                            카카오뱅크
                                        </option>
                                        <option value="국민">국민</option>
                                        <option value="수협">수협</option>
                                        <option value="케이뱅크">
                                            케이뱅크
                                        </option>
                                        <option value="산업">산업</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th rowspan="2">
                                    주소 <span class="required">*</span>
                                </th>
                                <td colspan="3">
                                    <input
                                        type="text"
                                        class="inputTxt"
                                        id="address"
                                        placeholder="주소"
                                        v-model="address"
                                    />
                                </td>
                                <td colspan="3">
                                    <input
                                        type="text"
                                        class="inputTxt"
                                        id="bankAccount"
                                        placeholder="계좌번호"
                                        @input="formatAccountNumber"
                                        v-model="employeeForm.bankAccount"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colspan="6">
                                    <input
                                        type="text"
                                        class="inputTxt"
                                        id="addressDetail"
                                        placeholder="상세주소"
                                        v-model="employeeForm.addressDetail"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- 3. 부서 및 직무 -->
                    <table class="row">
                        <tbody>
                            <tr>
                                <th>부서 <span class="required">*</span></th>
                                <td colspan="3">
                                    <select
                                        class="inputSelect"
                                        id="departmentGroup"
                                        v-model="
                                            employeeForm.departmentDetailName
                                        "
                                    >
                                        <option value="">전체</option>
                                        <option value="개발">개발</option>
                                        <option value="회계부">회계부</option>
                                        <option value="영업부">영업부</option>
                                        <option value="경영진">경영진</option>
                                        <option value="부서부서">
                                            부서부서
                                        </option>
                                        <option value="인사부">인사부</option>
                                        <option value="총무부">총무부</option>
                                        <option value="개발1부">개발1부</option>
                                        <option value="개발2부">개발2부</option>
                                        <option value="전산부">전산부</option>
                                        <option value="리소스관리">
                                            리소스관리
                                        </option>
                                    </select>
                                </td>
                                <th style="width: 70px;">부서코드</th>
                                <td colspan="3">
                                    <input
                                        type="text"
                                        class="inputTxt"
                                        id="departmentCode"
                                        placeholder="자동 입력됨"
                                        readonly
                                        v-model="employeeForm.departmentCode"
                                    />
                                </td>
                                <th>직무</th>
                                <td colspan="3">
                                    <select
                                        class="inputSelect"
                                        id="jobRoleGroup"
                                        v-model="employeeForm.jobRoleDetailName"
                                    >
                                        <option value="">-</option>
                                        <option
                                            v-if="
                                                employeeForm.departmentDetailName ==
                                                '회계부'
                                            "
                                            value="회계분개"
                                        >
                                            회계분개
                                        </option>
                                        <option
                                            v-if="
                                                employeeForm.departmentDetailName ==
                                                '영업부'
                                            "
                                            value="배송기사"
                                        >
                                            배송기사
                                        </option>
                                        <option
                                            v-if="
                                                employeeForm.departmentDetailName ==
                                                '총무부'
                                            "
                                            value="예산기획"
                                        >
                                            예산기획
                                        </option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>직급 <span class="required">*</span></th>
                                <td colspan="3">
                                    <select
                                        class="inputSelect"
                                        id="jobGradeGroup"
                                        v-model="
                                            employeeForm.jobGradeDetailName
                                        "
                                        @change="onJobGradeChange"
                                    >
                                        <option value="">전체</option>
                                        <option value="사원">사원</option>
                                        <option value="대리">대리</option>
                                        <option value="과장">과장</option>
                                        <option value="부장">부장</option>
                                    </select>
                                </td>
                                <th>직급코드</th>
                                <td colspan="3">
                                    <input
                                        type="text"
                                        class="inputTxt"
                                        id="jobGradeCode"
                                        placeholder="자동 입력됨"
                                        readonly
                                        v-model="employeeForm.jobGradeCode"
                                    />
                                </td>
                                <th style="width: 80px;">
                                    재직구분
                                </th>
                                <td colspan="3" style="width: 230px;">
                                    <label
                                        ><input
                                            type="radio"
                                            name="emplStatus"
                                            value="W"
                                            v-model="employeeForm.emplStatus"
                                            :disabled="
                                                modalType == 'register' ||
                                                employeeForm.emplStatus == 'F'
                                            "
                                            @change="onemplStatus"
                                        />
                                        재직</label
                                    >
                                    <label
                                        ><input
                                            type="radio"
                                            name="emplStatus"
                                            value="F"
                                            v-model="employeeForm.emplStatus"
                                            :disabled="
                                                modalType == 'register' ||
                                                employeeForm.emplStatus == 'F'
                                            "
                                            @change="onemplStatus"
                                        />
                                        퇴직</label
                                    >
                                    <label
                                        ><input
                                            type="radio"
                                            name="emplStatus"
                                            value="O"
                                            v-model="employeeForm.emplStatus"
                                            :disabled="
                                                modalType == 'register' ||
                                                employeeForm.emplStatus == 'F'
                                            "
                                            @change="onemplStatus"
                                        />
                                        휴직</label
                                    >
                                </td>
                            </tr>
                            <tr>
                                <th style="width: 70px;">입사일 <span class="required">*</span></th>
                                <td colspan="3">
                                    <input
                                        type="date"
                                        class="inputTxt"
                                        id="regDate"
                                        v-model="employeeForm.regDate"
                                    />
                                </td>
                                <th>퇴직일</th>
                                <td colspan="3">
                                    <input
                                        type="date"
                                        class="inputTxt"
                                        id="resignationDate"
                                        readonly
                                        v-model="employeeForm.resignationDate"
                                    />
                                </td>
                                <th>근무연차</th>
                                <td colspan="3">
                                    <input
                                        type="text"
                                        class="inputTxt"
                                        id="workingYear"
                                        placeholder="자동 입력됨"
                                        readonly
                                        v-model="years"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>연봉</th>
                                <td colspan="3">
                                    <input
                                        type="text"
                                        class="inputTxt"
                                        id="salary"
                                        :value="formattedSalary"
                                        @input="onSalaryInput"
                                        :readonly="modalType === 'register'"
                                        placeholder="자동 입력됨"
                                    />
                                </td>
                                <th>퇴직금</th>
                                <td colspan="3">
                                    <input
                                        type="text"
                                        class="inputTxt"
                                        id="detailSeverancePay"
                                        placeholder="퇴직시 자동 입력됨"
                                        readonly
                                        v-model="employeeForm.severancePay"
                                    />
                                </td>
                                <th>비고</th>
                                <td colspan="3">
                                    <input
                                        type="text"
                                        class="inputTxt"
                                        id="empMemo"
                                    />
                                </td>
                            </tr>
                            <button
                                @click="OpenHobong"
                                style="
                                    background-color: #3e4566;
                                    color: aliceblue;
                                    width: 50px;
                                    height: 30px;
                                "
                            >
                                호봉
                            </button>
                        </tbody>
                    </table>

                    <!-- 버튼 영역 -->
                    <div class="btn_areaC mt30">
                        <button
                            class="btnType blue"
                            @click="saveFile"
                            v-if="modalType === 'register'"
                        >
                            등록
                        </button>
                        <button
                            class="btnType blue"
                            @click="updateEmployeeMutate"
                            v-if="
                                modalType !== 'register' &&
                                employeeForm.emplStatus !== 'F'
                            "
                        >
                            수정
                        </button>
                        <button class="btnType gray" @click="closeModal">
                            취소
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div v-if="modalType === 'retire'">
        <div class="modal-overlay">
            <div class="modal-container" style="width: 600px">
                <dl>
                    <dt style="display: flex; justify-content: space-between">
                        <strong style="margin-left: 10px">퇴직처리</strong>

                        <button class="closePop" @click="closeModal">
                            <span class="hidden">x</span>
                        </button>
                    </dt>
                    <dd class="content" style="margin: 0; padding: 0">
                        <table class="row">
                            <tbody>
                                <tr>
                                    <th scope="row">사번</th>
                                    <td colspan="3">
                                        <input
                                            type="text"
                                            class="inputTxt p100"
                                            readonly
                                            :value="
                                                UserDetail?.detail?.number || ''
                                            "
                                        />
                                    </td>
                                    <th scope="row">이름</th>
                                    <td colspan="3">
                                        <input
                                            type="text"
                                            class="inputTxt p100"
                                            readonly
                                            :value="
                                                UserDetail?.detail
                                                    ?.employeeName || ''
                                            "
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">입사일</th>
                                    <td colspan="3">
                                        <input
                                            type="date"
                                            class="inputTxt p100"
                                            readonly
                                            :value="
                                                UserDetail?.detail?.regDate ||
                                                ''
                                            "
                                        />
                                    </td>
                                    <th scope="row">
                                        퇴직일<span class="font_red">*</span>
                                    </th>
                                    <td colspan="3">
                                        <input
                                            type="date"
                                            class="inputTxt p100"
                                            v-model="resignationDate"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        퇴직사유<span class="font_red">*</span>
                                    </th>
                                    <td colspan="7">
                                        <input
                                            type="text"
                                            class="inputTxt p100"
                                            v-model="resignationReason"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        퇴직금<span class="font_red">*</span>
                                    </th>
                                    <td colspan="7">
                                        <input
                                            type="text"
                                            class="inputTxt p100"
                                            placeholder="숫자만 입력"
                                            @input="filterInput"
                                            v-model="severancePay"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div class="btn_areaC mt30">
                            <button class="btnType blue" @click="OnRetire">
                                <span>퇴직</span>
                            </button>
                        </div>
                    </dd>
                </dl>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* 등록창 css */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-container {
    background: #fff;
    width: 800px;
    max-height: 90vh;
    overflow-y: auto;
    border-radius: 10px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
    padding: 20px;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-close {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
}

.required {
    color: red;
}

.inputTxt,
.inputSelect {
    width: 100%;
    padding: 5px;
    box-sizing: border-box;
}

.row {
    width: 100%;
    margin-top: 10px;
    border-collapse: collapse;
}

.row th,
.row td {
    border: 1px solid #ccc;
    padding: 5px;
}

.btn_areaC {
    text-align: center;
    margin-top: 30px;
}

.btnType {
    display: inline-block;
    padding: 5px 15px;
    margin: 0 5px;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
    text-decoration: none;
}

.btnType.blue {
    background-color: #007bff;
    color: white;
}

.btnType.gray {
    background-color: #6c757d;
    color: white;
}

.closePop {
    border: none !important;
    background-color: white !important; /* 배경색 흰색 */
    color: black !important; /* 글자색은 필요에 따라 설정 (흰 배경엔 검정 추천) */
    cursor: pointer !important; /* 마우스 오버 시 포인터로 */
}
</style>
