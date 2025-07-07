<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useUserInfo } from '../../../../stores/userInfo';


const props = defineProps(['visible','AttId','DetailRestatus']);
const emit = defineEmits(['CloseModal','ListSearch']);

const attendanceApprovalDetail = ref({});
const ApprovalReason = ref('');
const userInfo = useUserInfo();
const reqId = ref('');



const closeModal = () => {
  emit('CloseModal', false);
}

//목록 재조회 
const ListSearch = () => {
  emit('ListSearch');
}


//id로 개인 상세 조회 
const ApprovalInfo = () => {
    const param = new URLSearchParams();

    param.append('id', props.AttId);
    //유저타입 A,C냐 따라 다르게 보이기 하기 
    reqId.value = props.AttId;

    axios
        .post(`/api/personnel/attendanceDetail.do`, param)
        .then(res => {
            //따로 저장
            attendanceApprovalDetail.value = res.data.detail;
        })
        .catch(err => {
            console.error('에러 발생:', err);
        });
};

//A타입 승인 대기상태 
const OnSignFist = () => {

  const params = new URLSearchParams();

  params.append('reqId', reqId.value);
  params.append('userIdx', userInfo.user.empId);
  params.append('appReason', ApprovalReason.value);



  axios
      .post(`/api/personnel/attendanceFirstApprove.do`, params)
      .then(res => {
          ListSearch();
          alert('승인되었습니다.');
          closeModal();
      })
      .catch(err => {
          console.error('에러 발생:', err);
      });

}

//C타입 승인
const OnSignSecond = () => {

const params = new URLSearchParams();

params.append('reqId', reqId.value);
params.append('userIdx', userInfo.user.empId);



axios
    .post(`/api/personnel/attendanceSecondApprove.do`, params)
    .then(res => {
        ListSearch();
        alert('승인되었습니다.');
        closeModal();
    })
    .catch(err => {
        console.error('에러 발생:', err);
    });

}


//반려 
const reject = () => {

  if(attendanceApprovalDetail.value.appReason == ''){
    alert('사유란은 공란일 수 없습니다.');
    return;
  }

  const params = new URLSearchParams();

  params.append('reqId', reqId.value);
  params.append('userIdx', userInfo.user.empId);
  params.append('appReason', ApprovalReason.value);


  axios
      .post(`/api/personnel/attendanceReject.do`, params)
      .then(res => {
          ListSearch();
          alert('반려되었습니다.');
          closeModal();
      })
      .catch(err => {
          console.error('에러 발생:', err);
      });

}

onMounted(() => {
  ApprovalInfo();  
})


</script>
<template>
    <div v-if="visible" class="modal-overlay">
      <div class="layerPop layerType2">
        <dl>
          <dt>
            <strong>연차 신청 상세 보기</strong>
          </dt>
          <dd class="content">
            <table class="row">
              <tbody>
                <tr>
                  <th scope="row">근무부서</th>
                  <td colspan="3"><input type="text" class="inputTxt p100"  v-model="attendanceApprovalDetail.deptName" readonly /></td>
                </tr>
                <tr>
                  <th scope="row">성명</th>
                  <td><input type="text" class="inputTxt p100" v-model="attendanceApprovalDetail.name" readonly /></td>
                </tr>
                <tr>
                  <th scope="row">사번</th>
                  <td colspan="3"><input type="text" class="inputTxt p100" v-model="attendanceApprovalDetail.number"  readonly /></td>
                </tr>
                <tr>
                  <th scope="row">연/반차</th>
                  <td colspan="3"><input type="text" class="inputTxt p100"  v-model="attendanceApprovalDetail.reqType" readonly /></td>
                </tr>
                <tr>
                  <th scope="row">기간</th>
                  <td colspan="3">
                    <input type="date"  style="height: 30px; width: 120px;" v-model="attendanceApprovalDetail.reqSt" readonly /> ~
                    <input type="date"  style="height: 30px; width: 120px;" v-model="attendanceApprovalDetail.reqEd"readonly />
                  </td>
                </tr>
                <tr>
                  <th scope="row">신청사유</th>
                  <td colspan="3">
                    <textarea class="inputTxt p100" v-model="attendanceApprovalDetail.reqReason" readonly></textarea>
                  </td>
                </tr>
                <tr>
                  <th scope="row">사유</th>
                  <td colspan="3">
                    <textarea class="inputTxt p100" v-model="attendanceApprovalDetail.appReason"></textarea>
                  </td>
                </tr>
                <tr>
                  <th scope="row">비상연락처</th>
                  <td colspan="3"><input type="text" class="inputTxt p100" v-model="attendanceApprovalDetail.reqTel" readonly /></td>
                </tr>
                <tr>
                  <th scope="row">신청일</th>
                  <td colspan="3"><input type="text" class="inputTxt p100" v-model="attendanceApprovalDetail.reqdate" readonly /></td>
                </tr>
              </tbody>
            </table>
  
            <div class="btn_areaC mt30">
              <a href="#" class="btnType blue"  @click.prevent="OnSignFist"
              v-if="props.DetailRestatus == '검토 대기' && userInfo.user.userType == 'A'"
              >승인</a>
              <a href="#" class="btnType blue"  @click.prevent="OnSignSecond"
              v-if="props.DetailRestatus == '승인 대기' && userInfo.user.userType == 'C'"
              >승인</a>
              <a href="#" class="btnType blue" @click.prevent="reject"
              v-if="props.DetailRestatus !== '취소' && props.DetailRestatus !== '반려' && props.DetailRestatus !== '승인'"
              >반려</a>
              <a href="#" class="btnType gray" @click.prevent="closeModal">닫기</a>
            </div>
          </dd>
        </dl>
      </div>
    </div>
  </template>
    
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
  
  .layerPop.layerType2 {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border-radius: 8px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    width: 600px;
    font-family: 'Segoe UI', sans-serif;
  }
  
  .layerPop dl > dt {
    background-color: #2f3651;
    color: white;
    padding: 14px 20px;
    font-size: 16px;
    font-weight: bold;
  }
  
  .layerPop .content {
    padding: 20px;
    background-color: #f9f9f9;
  }
  
  table.row {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
    background: white;
  }
  
  th {
    width: 120px;
    text-align: left;
    background-color: #f0f0f5;
    padding: 10px;
    color: #333;
    vertical-align: top;
  }
  
  td {
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