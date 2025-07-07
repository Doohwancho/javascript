<script setup>
import { onMounted, ref } from 'vue';
import { useUserInfo } from '../../../../stores/userInfo';
import axios from 'axios';

const visible = ref(true);
const emit = defineEmits(['visibleval']);
const props = defineProps(['summary','DetailAttendace']);

const userInfo = useUserInfo();
const attendanceDetail = ref({});

const attendanceList = ref([]);
const modalType = ref('');

const form = ref({
    id: '',
    empId: '',
    deptName: '', // lgnInfo.detail_name
    name: '', // lgnInfo.usr_nm
    number: '', // lgnInfo.usr_idx
    reqType: '연차',
    reqSt: '',
    reqEd: '',
    reqReason: '',
    reqTel: '',
    reqdate: '',
    reqStatus: '',
});


//기초 정보 불러오기 
const UserDetail = () => {
    
    axios
        .post(`/api/personnel/attendanceCntBody.do`,{
            headers: {
                'Content-Type': 'application/json', // JSON 형식으로 전송
            },
        })
        .then(res => {
            form.value.deptName = res.data.loginInfo.detail_name;
            form.value.name = res.data.loginInfo.usr_nm;
            form.value.number = res.data.loginInfo.usr_idx ;
            if(!form.value.reqdate){
                form.value.reqdate = new Date().toISOString().split('T')[0];
            }


        })
        .catch(err => {
            console.error('에러 발생:', err);
        });
};

//리스트 데이터 불러오기 
const search = () => {

const form = new URLSearchParams();

form.append('searchStDate', '');
form.append('searchEdDate', '');
form.append('searchReqType', '');
form.append('searchReqStatus', '');

form.append('pageSize', 20);
form.append('currentPage', 1);

axios
    .post(`/api/personnel/attendanceList.do`, form)
    .then(res => {
        attendanceList.value = res.data.attendanceList;
    })
    .catch(err => {
        console.error('에러 발생:', err);
    });

}

// 연차 신청
const submitForm = () => {

    //유효성 검사 
    if (form.value.reqReason === '') {
        alert('신청 사유를 입력해주세요 ');
        return;
    } 

    if( form.value.reqSt === ''){
        alert('시작일을 선택해주세요.');
        return;
    }

    if( form.value.reqEd === ''){
        alert('마감일을 선택해주세요.');
        return;
    }

    if( form.value.reqTel === ''){
        alert('비상 연락망을 입력해주세요.');
        return;
    }




    //시작일 마감일 체크 
    const startDate = form.value.reqSt; // 사용자 선택 시작일
    const endDate = form.value.reqEd;   // 사용자 선택 종료일
    const selectedName = form.value.name;

    if((new Date(endDate) - new Date(startDate)) < 0){
        alert("마감일이 시작일보다 먼저 일 수 없습니다.");
        return;
    }

    search();

    //겹치는 휴가가 있는지 필터링 취소 반려의 경우는 제외하고 
    if (isOverlappingRange(startDate, endDate, selectedName)) {
        alert('이미 겹치는 휴가 신청이 존재합니다.');
        return;
    }


    const params = new URLSearchParams();

    const leftAtt = props.summary.leftAttCnt;
    const edDate = new Date(form.value.reqEd);
    const StDate = new Date(form.value.reqSt);
    const reqDay = ref('');


    if (form.value.reqType == '연차' && (edDate - StDate) == 0) {
        if(confirm('반차를 사용하는지 알려주세요')){
            form.value.reqType = '반차';
        }else {
            form.value.reqType = '연차';
        }
    }

    if (leftAtt > 0 && (edDate - StDate) >= 0) {
        if((edDate - StDate) > 0){
        reqDay.value = (edDate - StDate) + 1;
        }else {
            reqDay.value = 0.5;
        }
    } 

    params.append('userIdx', userInfo.user.empId);
    params.append('searchStDate', form.value.reqSt);
    params.append('searchEdDate', form.value.reqEd);
    params.append('searchReqType', form.value.reqType);
    params.append('searchNumber', form.value.number);
    params.append('searchName', form.value.name);

    params.append('reqSt', form.value.reqSt);
    params.append('reqEd', form.value.reqEd);
    params.append('reqType', form.value.reqType);
    params.append('reqReason', form.value.reqReason);
    params.append('reqTel', form.value.reqTel);
    params.append('reqDay', reqDay.value);
    params.append('reqdate', form.value.reqdate);


    //총연차 구할때 얻어오는 id값 = attid랑 같다.
    params.append('attId', props.summary.id);
    
    params.append('empId', userInfo.user.empId);

    axios
        .post(`/api/personnel/attendanceRequest.do`, params)
        .then(res => {
            reLoadCloseModal();
        })
        .catch(err => {
            console.error('에러 발생:', err);
        });
};

const toDateOnly = (dateStr) => {
  const [year, month, day] = dateStr.split('-');
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day)); // 시간 제거한 Date 객체
};

//겹치는 날짜 거르기 시작 날자, 끝날짜 , 이름으로 
const isOverlappingRange = (selectedStartDate, selectedEndDate, selectedName) => {
  const selectedStart = toDateOnly(selectedStartDate);
  const selectedEnd = toDateOnly(selectedEndDate);

  return attendanceList.value.some(item => {

    if(item.reqStatus === '반려' || item.reqStatus === '취소') return false;

    if (!item.reqSt || !item.reqEd || !item.name) return false;

    const existingStart = toDateOnly(item.reqSt);
    const existingEnd = toDateOnly(item.reqEd);

    // 💥 이름도 같고 날짜도 겹치는 경우
    return (
      item.name === selectedName &&
      selectedStart <= existingEnd &&
      selectedEnd >= existingStart
    );
  });
};

//수정할때 거르기  
const UpdateOverlappingRange = (selectedStartDate, selectedEndDate, selectedName, editingId = null) => {
  const selectedStart = new Date(selectedStartDate);
  const selectedEnd = new Date(selectedEndDate);

  return attendanceList.value.some(item => {
    // 수정 중인 항목이면 제외
    if (item.id === editingId) return false;

    if(item.reqStatus === '반려' || item.reqStatus === '취소') return false;

    if (!item.reqSt || !item.reqEd || !item.name) return false;

    const existingStart = new Date(item.reqSt);
    const existingEnd = new Date(item.reqEd);

    return (
      item.name === selectedName &&
      selectedStart <= existingEnd &&
      selectedEnd >= existingStart
    );
  });
};



const closeModal = () => {
    visible.value = false;
    emit('visibleval', visible.value);
};

const reLoadCloseModal = () => {
    visible.value = false;
    emit('reLoadCloseModal', visible.value);
};

function StatusAttendance(item) {
    DetailAttendance(item);
}

const DetailAttendance = (item) => {
    const params = new URLSearchParams();

    modalType.value = '수정'

    params.append('id', item);

    axios
        .post(`/api/personnel/attendanceDetail.do`, params)
        .then(res => {
            form.value.reqdate = res.data.detail.reqdate;
            form.value.reqSt = res.data.detail.reqSt;
            form.value.reqEd = res.data.detail.reqEd;
            form.value.reqTel = res.data.detail.reqTel;
            form.value.reqReason = res.data.detail.reqReason;
            form.value.reqType =res.data.detail.reqType;
            form.value.reqStatus = res.data.detail.reqStatus;
            form.value.id = res.data.detail.id;
            
            
            const start = new Date(form.value.reqSt)
            const end = new Date(form.value.reqEd)

            const diffInTime = end - start  // 밀리초 차이
            const diffInDays = diffInTime / (1000 * 60 * 60 * 24)  // 일수 변환

            form.value.reqDay = diffInDays + 1;

            attendanceDetail.value = res.data.detail;
            
        })
        .catch(err => {
            console.error('에러 발생:', err);
        });



}

//수정
const UpdateForm = () => {

    const params = new URLSearchParams();

    params.append('reqSt', form.value.reqSt);
    params.append('reqEd', form.value.reqEd);
    params.append('reqReason', form.value.reqReason);
    params.append('reqTel', form.value.reqTel);

    const start = new Date(form.value.reqSt)
    const end = new Date(form.value.reqEd)

    if((end - start) < 0 ){
        alert('마감일이 시작일보다 먼저 일 수 없습니다.');
        return;
    }

    const diffInTime = end - start  // 밀리초 차이
    const diffInDays = diffInTime / (1000 * 60 * 60 * 24)  // 일수 변환

    form.value.reqDay = diffInDays + 1;

    params.append('reqDay', form.value.reqDay);
    params.append('reqId', form.value.id);

    const startDate = form.value.reqSt; // 사용자 선택 시작일
    const endDate = form.value.reqEd;   // 사용자 선택 종료일
    const selectedName = form.value.name;

    if (UpdateOverlappingRange(startDate, endDate, selectedName, form.value.id)) {
        alert('겹치는 휴가가 존재하거나 동일한 날짜를 입력하셨습니다.');
        return;
    }


    axios
        .post(`/api/personnel/attendanceUpdate.do`, params)
        .then(res => {
            alert('수정 완료');
            reLoadCloseModal();
        })
        .catch(err => {
            console.error('에러 발생:', err);
        });
}


//취소 
const CancleForm = () => {

    const params = new URLSearchParams();

    params.append('reqId', form.value.id);

    axios
        .post(`/api/personnel/attendanceCancle.do`, params)
        .then(res => {
            alert('취소 완료');
            reLoadCloseModal();
        })
        .catch(err => {
            console.error('에러 발생:', err);
        });
    
}

//번호 숫자 형식 바꾸기 
const formatPhone = () => {
  // 숫자만 남기기
  let digits = form.value.reqTel.replace(/\D/g, '');

  // 010-1234-5678 형식으로 만들기
  if (digits.length <= 3) {
    form.value.reqTel = digits;
  } else if (digits.length <= 7) {
    form.value.reqTel = `${digits.slice(0, 3)}-${digits.slice(3)}`;
  } else if (digits.length <= 11) {
    form.value.reqTel = `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
  } else {
    form.value.reqTel = `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
  }
};


defineExpose({
  StatusAttendance
})

onMounted(() => {
    UserDetail();
    search();
});
</script>

<template>
    <div class="modal-overlay" v-if="visible">
        <div
            id="attendanceRequestModal"
            class="layerPop layerType2"
            style="width: 600px"
        >
            <dl style="margin-top: 0;">
                <dt>
                    <strong v-if="modalType === '수정'">연차 상세</strong>
                    <strong v-else>연차 신청</strong>
                </dt>
                <dd class="content">
                    <table class="row" style="margin-left: -20px;">
                        <tbody>
                            <tr>
                                <th scope="row">근무부서</th>
                                <td colspan="3">
                                    <input
                                        type="text"
                                        class="inputTxt p100"
                                        v-model="form.deptName"
                                        readonly
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">성명</th>
                                <td>
                                    <input
                                        type="text"
                                        class="inputTxt p100"
                                        v-model="form.name"
                                        readonly
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">사번</th>
                                <td colspan="3">
                                    <input
                                        type="text"
                                        class="inputTxt p100"
                                        v-model="form.number"
                                        readonly
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    연/반차<span class="font_red">*</span>
                                </th>
                                <td colspan="3">
                                    <select v-model="form.reqType">
                                        <option value="연차">연차</option>
                                        <option value="반차">반차</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    기간<span class="font_red">*</span>
                                </th>
                                <td colspan="3">
                                    <input
                                        type="date"
                                        v-model="form.reqSt"
                                        style="height: 30px; width: 120px"
                                    />
                                    ~
                                    <input
                                        type="date"
                                        v-model="form.reqEd"
                                        style="height: 30px; width: 120px"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    신청사유<span class="font_red">*</span>
                                </th>
                                <td colspan="3">
                                    <textarea
                                        class="inputTxt p100"
                                        v-model="form.reqReason"
                                    ></textarea>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    비상연락처<span class="font_red">*</span>
                                </th>
                                <td colspan="3">
                                    <input
                                        type="text"
                                        class="inputTxt p100"
                                        v-model="form.reqTel"
                                        @input="formatPhone"
                                        maxlength="13"
                                        placeholder="010-0000-0000"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">신청일</th>
                                <td colspan="3">
                                    <input
                                        type="text"
                                        class="inputTxt p100"
                                        v-model="form.reqdate"
                                        disabled
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="btn_areaC mt30">
                        <a
                            v-if="modalType !== '수정'"
                            href="#"
                            class="btnType blue"
                            @click.prevent="submitForm"
                            ><span>연차 신청</span></a
                        >
                        <a
                        v-show="form.reqStatus"
                        v-if="modalType === '수정' && form.reqStatus === '검토 대기'"
                        href="#"
                        class="btnType blue"
                        @click.prevent="UpdateForm"
                        ><span>수정</span></a
                        >
                        <a
                            v-show="form.reqStatus"
                            v-if="modalType === '수정'
                            && form.reqStatus !== '반려'
                            && form.reqStatus !== '취소'
                            "
                            href="#"
                            class="btnType blue"
                            @click.prevent="CancleForm"
                            ><span>신청취소</span></a
                        >
                        <a
                            href="#"
                            class="btnType gray"
                            @click.prevent="closeModal"
                            ><span>닫기</span></a
                        >
                    </div>
                </dd>
            </dl>
            <a href="#" class="closePop" @click.prevent="closeModal"
                ><span class="hidden">닫기</span></a
            >
        </div>
    </div>
</template>

<style scoped>
/* 모달 배경 오버레이는 별도 div에서 감쌀 경우 추가 */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
}

/* 모달 본체 */
#attendanceRequestModal.layerPop.layerType2 {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border-radius: 8px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    font-family: 'Segoe UI', sans-serif;
}

/* 제목 영역 */
#attendanceRequestModal dl > dt {
    background-color: #2f3651;
    color: white;
    padding: 14px 20px;
    font-size: 16px;
    font-weight: bold;
    position: relative;
}

/* 닫기 버튼 (오른쪽 상단) */
.closePop {
    position: absolute;
    top: 12px;
    right: 14px;
    font-size: 20px;
    color: white;
    text-decoration: none;
    cursor: pointer;
}

/* 숨김 텍스트 */
.closePop .hidden {
    display: none;
}

/* 콘텐츠 영역 */
#attendanceRequestModal .content {
    padding: 20px;
    background-color: #f9f9f9;
}

/* 테이블 기본 */
#attendanceRequestModal table.row {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
    background: white;
}

#attendanceRequestModal th {
    width: 120px;
    text-align: left;
    background-color: #f0f0f5;
    padding: 10px;
    color: #333;
    vertical-align: top;
}

#attendanceRequestModal td {
    padding: 10px;
}

.inputTxt.p100,
select,
textarea {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
}

textarea {
    resize: vertical;
    min-height: 80px;
}

.font_red {
    color: red;
    margin-left: 4px;
}

/* 버튼 영역 */
.btn_areaC {
    text-align: center;
    margin-top: 30px;
}

.btnType {
    display: inline-block;
    padding: 10px 25px;
    border-radius: 4px;
    font-weight: bold;
    text-decoration: none;
    color: white;
    margin: 0 5px;
}

.btnType.blue {
    background: linear-gradient(to bottom, #4b91f1 0%, #357ae8 100%);
}

.btnType.blue:hover {
    background: linear-gradient(to bottom, #357ae8 0%, #2a65c5 100%);
}

.btnType.gray {
    background: linear-gradient(to bottom, #bfc9d6 0%, #8e9eab 100%);
}

.btnType.gray:hover {
    background: linear-gradient(to bottom, #9daab9 0%, #6c7a89 100%);
}
</style>
