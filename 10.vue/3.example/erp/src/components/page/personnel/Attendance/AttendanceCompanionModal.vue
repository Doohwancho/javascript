<script setup>
import axios from 'axios';
import { onMounted } from 'vue';

const props = defineProps(['AttIdInfo', 'companionVisible']);
const emit = defineEmits(['close']);

const attendanceDetail = ref({});

const closeModal = () => {
  emit('close');
};

//반려 모달창 열기 
const CompanionInfo = () => {
    const param = new URLSearchParams();

    param.append('id', props.AttIdInfo);

    axios
        .post(`/api/personnel/attendanceDetail.do`, param)
        .then(res => {

            //따로 저장
            attendanceDetail.value = res.data.detail;
        })
        .catch(err => {
            console.error('에러 발생:', err);
        });
};

onMounted( () => {
    CompanionInfo();
})

</script>

<template>
    <div class="modal-overlay" v-if="companionVisible">
      <div id="attendanceRejectReasonModal" class="layerPop layerType2">
        <dl>
          <dt>
            <strong>반려 사유</strong>
          </dt>
          <dd class="content" style="margin-left: 0;">
            <table class="row">
              <tbody>
                <tr>
                  <th scope="row">결재자</th>
                  <td colspan="3">
                    <input type="text" class="inputTxt p100" name="viewAppType" id="viewAppType" readonly :value="attendanceDetail.appType"/>


                  </td>
                </tr>
                <tr>
                  <th scope="row">반려 사유</th>
                  <td colspan="3">
                    <textarea class="inputTxt p100" name="appReason" id="appReason" :value="attendanceDetail.appReason"
                    ></textarea>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="btn_areaC mt30">
              <a href="#" class="btnType gray" @click.prevent="closeModal"><span>닫기</span></a>
            </div>
          </dd>
        </dl>
      </div>
    </div>
  </template>
  
  <style scoped>
  /* 모달 배경 오버레이 */
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
  #attendanceRejectReasonModal.layerPop.layerType2 {
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
  
  /* 제목 영역 */
  #attendanceRejectReasonModal dl > dt {
    background-color: #2f3651;
    color: white;
    padding: 14px 20px;
    font-size: 16px;
    font-weight: bold;
    position: relative;
  }
  
  /* 콘텐츠 영역 */
  #attendanceRejectReasonModal .content {
    padding: 20px;
    background-color: #f9f9f9;
  }
  
  /* 테이블 기본 */
  #attendanceRejectReasonModal table.row {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
    background: white;
  }
  
  #attendanceRejectReasonModal th {
    width: 120px;
    text-align: left;
    background-color: #f0f0f5;
    padding: 10px;
    color: #333;
    vertical-align: top;
  }
  
  #attendanceRejectReasonModal td {
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
  