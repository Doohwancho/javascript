<script setup>
import { ref } from 'vue';

const props = defineProps(['detailList','showModal']);
const emit = defineEmits(['OnshowModal']);

const onshowModal = () => {
    const showModal = ref(false);
    emit('OnshowModal', showModal.value);

}

</script>
<template>
<div class="modal-overlay" v-if="showModal">
  <div class="layerPop layerType2">
    <dl style="margin: 0;">
      <dt>
        <div class="modal-header">
          <span class="modal-title">신청 현황</span>
          <button class="modal-close" @click="onshowModal">×</button>
        </div>
      </dt>
      <dd class="content" style="margin-left: -8px;">
        <table class="jsgrid-table">
          <thead>
            <tr><th>부서</th><th>사원명</th><th>신청구분</th></tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in detailList" :key="i">
              <td>{{ item.deptName }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.reqType }}</td>
            </tr>
          </tbody>
        </table>
        <div class="btn_areaC mt30">
          <button class="btnType gray" @click="onshowModal"><span>닫기</span></button>
        </div>
      </dd>
    </dl>
  </div>
</div>

</template>
<style scoped>
/* 배경 흐림 효과 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

/* 모달 박스 */
.layerPop.layerType2 {
  background: white;
  width: 600px;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  font-family: sans-serif;
}

/* 헤더 */
.layerPop dl > dt {
  background-color: #2f3651;
  color: white;
  padding: 0;
}

/* 헤더 내부 */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 20px;
}

/* 제목 텍스트 */
.modal-title {
  font-size: 16px;
  font-weight: bold;
}

/* 닫기 버튼 (오른쪽 X) */
.modal-close {
  background: none;
  border: none;
  font-size: 20px;
  color: white;
  cursor: pointer;
}

/* 모달 내용 */
.layerPop dl > dd.content {
  padding: 20px;
  background-color: #f9f9f9;
}

/* 테이블 */
.jsgrid-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  font-size: 14px;
}

.jsgrid-table th {
  background-color: #f0f0f5;
  color: #333;
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ccc;
}

.jsgrid-table td {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

/* 버튼 영역 */
.btn_areaC {
  text-align: center;
  margin-top: 30px;
}

/* 닫기 버튼 스타일 */
.btnType.gray {
  background: linear-gradient(to bottom, #bfc9d6 0%, #8e9eab 100%);
  border: none;
  padding: 10px 25px;
  color: white;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
}

.btnType.gray:hover {
  background: linear-gradient(to bottom, #9daab9 0%, #6c7a89 100%);
}
</style>

