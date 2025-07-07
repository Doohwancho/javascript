<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import AttendanceRequestModal from '../../../components/page/personnel/Attendance/AttendanceRequestModal.vue';
import { useUserInfo } from '../../../stores/userInfo';
import AttendanceCompanionModal from '../../../components/page/personnel/Attendance/AttendanceCompanionModal.vue';

const searchStDate = ref('');
const searchEdDate = ref('');
const searchReqType = ref('');
const searchReqStatus = ref('');

const attendanceList = ref([]);

//총연차, 남은 연차 등등  담을 변수 
const summary = ref({});

//등록 모달창용 v-if 변수 
const visible = ref(false);

//반려 모달창용 v-if 변수 
const companionVisible = ref(false);
const AttIdInfo = ref('');

//유저 정보 
const userInfo = useUserInfo();

const cPage = ref(1);

const DetailAttendace = ref(null);
const detailModalRef = ref(null)

//리스트 데이터 불러오기 
const search = () => {

    //검색 값이 존재하면 cPage 1로 초기화 
    if(searchStDate.value != '' || searchEdDate.value != '' ||
       searchReqType.value != '' || searchReqStatus.value != '' 
    ){
      cPage.value = 1;
    }  
  
    const form = new URLSearchParams();

    form.append('searchStDate', searchStDate.value);
    form.append('searchEdDate', searchEdDate.value);
    form.append('searchReqType', searchReqType.value);
    form.append('searchReqStatus', searchReqStatus.value);

    form.append('pageSize', 5);
    form.append('currentPage', cPage.value);

    axios
        .post(`/api/personnel/attendanceList.do`, form)
        .then(res => {
            console.log(res.data);
            attendanceList.value = res.data;
        })
        .catch(err => {
            console.error('에러 발생:', err);
        });

}

const Pagesearch = () => {

const form = new URLSearchParams();

form.append('searchStDate', searchStDate.value);
form.append('searchEdDate', searchEdDate.value);
form.append('searchReqType', searchReqType.value);
form.append('searchReqStatus', searchReqStatus.value);

form.append('pageSize', 5);
form.append('currentPage', cPage.value);

axios
    .post(`/api/personnel/attendanceList.do`, form)
    .then(res => {
        console.log(res.data);
        attendanceList.value = res.data;
    })
    .catch(err => {
        console.error('에러 발생:', err);
    });

}

//총 연차, 남은 연차, 사용연차 구하기 
const anualLeave = () => {

    const form = new URLSearchParams();

    form.append('userIdx', userInfo.user.empId);

    axios
        .post(`/api/personnel/attendanceCnt.do`,form)
        .then(res => {
            summary.value = res.data.attendanceCnt[0];
        })
        .catch(err => {
            console.error('에러 발생:', err);
        });

}

//등록 창 변수값 하위에서 다시 받기 
//안하면 modal에서 창당하기하면 위에서 visible 값이 안바뀜 
//등록창 v-if 변수 
const visibleval = (val) => {
    visible.value = false;
} 

//등록이 완료되었을때 창 없애는 역할 
const reLoadCloseModal = (val) => {
    visible.value = false;

    search();
    anualLeave();

}

const AttendanceStatus = async (item) => {
  DetailAttendace.value = item.id;
  visible.value = true;
  await nextTick() // 하위 컴포넌트가 렌더링된 다음 실행
  detailModalRef.value?.StatusAttendance(item.id);
}

const CompanionReason = (attid) => {
  AttIdInfo.value = attid;
  companionVisible.value = true;
}

const close = () => {
  companionVisible.value = false;
}


const openModal = () => {
    visible.value = true;
}

onMounted(() => {
    search();
    anualLeave();
})

</script>
<template>
    <div id="container">
      <div class="contents">
        <div class="content">
  
          <!-- 위치 경로 -->
          <p class="Location">
            <i class="icon-home" /> 
            /
            <a href="#" class="btn_nav bold">인사/급여</a>
            /
            <span class="btn_nav bold">근태 신청</span>
            <a href="#" class="btn_set refresh">
                <i class="icon-refresh" />
            </a>
          </p>
  
          <!-- 검색/등록 영역 -->
          <div class="conTitle">
            <h2>근태 신청</h2>
            <div class="conTitleSub">
              <span class="fr search-bar">
              <label>기간</label>
              <input type="date" v-model="searchStDate" />
              ~
              <input type="date" v-model="searchEdDate" />
              
              <label>연차 타입</label>
              <select v-model="searchReqType">
                <option value="">전체</option>
                <option value="연차">연차</option>
                <option value="반차">반차</option>
              </select>
  
              <label>승인 상태</label>
              <select v-model="searchReqStatus">
                <option value="">전체</option>
                <option value="검토 대기">검토 대기</option>
                <option value="승인 대기">승인 대기</option>
                <option value="승인">승인</option>
                <option value="반려">반려</option>
                <option value="취소">취소</option>
              </select>
  
              <button class="btn red" @click="search">검색</button>
              <button class="btn blue" @click="openModal">등록</button>
            </span>
            </div>
        </div>

        <!-- 등록 모달 -->
        <AttendanceRequestModal v-if="visible && summary.leftAttCnt !== undefined"
            ref="detailModalRef"
            @visibleval="visibleval"
            @reLoadCloseModal="reLoadCloseModal"
            :summary="summary"
            :DetailAttendace="DetailAttendace"
        /> 


        <!-- 반려 모달 -->

        <AttendanceCompanionModal v-if="companionVisible"
        :companionVisible="companionVisible"
        :AttIdInfo="AttIdInfo"
        @close="close"
        />
  
          <!-- 연차 요약 -->
          <div class="summary-box">

            <table>
                <tr>
                    <th>총연차</th>
                    <th>사용연차</th>
                    <th>남은연차</th>
                </tr>
                <tr>
                    <td>
                        {{ summary.attCnt  }}
                    </td>
                    <td>
                        {{  summary.useAttCnt }}
                    </td>
                    <td>
                        {{ summary.leftAttCnt  }}
                    </td>
                </tr>
            </table>
          </div>
  
          <!-- 리스트 테이블 -->
          <table class="att-table">
            <thead>
              <tr>
                <th>번호</th>
                <th>연차종류</th>
                <th>사번</th>
                <th>사원명</th>
                <th>시작일</th>
                <th>종료일</th>
                <th>결재자</th>
                <th>승인상태</th>
                <th>반려</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in attendanceList.attendanceList" :key="item.id" @click="() => AttendanceStatus(item)"
                >
                <td>{{ item.id }}</td>
                <td>{{ item.reqType }}</td>
                <td>{{ item.number }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.reqSt }}</td>
                <td>{{ item.reqEd }}</td>
                <td>{{ item.appType }}</td>
                <td>{{ item.reqStatus }}</td>
                <td v-if="item.reqStatus === '반려'" style="width: 100px;">
                    <button @click.stop="() =>CompanionReason(item.id)">반려사유</button>
                </td>
                <td v-else style="width: 100px;">
                    -
                </td>
              </tr>
            </tbody>
          </table>

                <!-- 페이징 영역 -->
      <div class="paging_area">
        <Pagination
            :totalItems="attendanceList?.attendanceRequestCnt"
            :items-per-page="5"
            :max-pages-shown="5"
            :onClick="Pagesearch"
            v-model="cPage"
         />
      </div>
  
        </div>
      </div>
    </div>


  </template>
  
  <style scoped>

    .icon-home::before {
    content: '🏠';
    margin-right: 5px;
    }

    .Location {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    font-size: 14px;
    }

    .btn_set.home,
    .btn_set.refresh {
    margin-right: 10px;
    font-weight: bold;
    text-decoration: none;
    color: #333;
    }

    .btn_nav {
    margin-right: 8px;
    text-decoration: none;
    color: #555;
    }

    .btn_nav.bold {
    font-weight: bold;
    }

    .btn_set.refresh {
    margin-left: auto;
    }




  .conTitle {
    height: 110px;
    border: 1px solid #ccc;
    padding-left: 30px;
    padding-right: 10px;
    background-color: 	#fafaf9;
  }

  .conTitleSub {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .search-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
  }
  .search-bar input[type="date"],
  .search-bar select {
    height: 25px;
    padding: 2px 6px;
  }
  .btn {
    padding: 4px 10px;
    border: none;
    cursor: pointer;
    border-radius: 3px;
  }
  .btn.red {
    background-color: #007bff;
    color: #fff;
  }

  .btn.blue {
    background-color: #28a745;
    color: #fff;
  }
  .summary-box {
    display: flex;
    justify-content: flex-start;
    gap: 40px;
    padding: 10px 0;
    font-weight: bold;
  }
  .summary-box div {
    font-size: 14px;
  }
  .att-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
  }
  .att-table th,
  .att-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }
  .att-table th {
    background-color: #f5f5f5;
  }

  .icon-refresh::before {
  content: '🔄';
    }


  /* 테이블 전체 스타일 */
table {
    width: 1240px;
    border-collapse: collapse;
    margin: 0 auto;
    margin-top: 15px;
    border: 2px solid #ccc; /* 테두리 추가 */
}

/* 테이블 헤더 스타일 */
th {
    background: #e9ecef;
    font-weight: bold;
    text-align: center;
    border: 2px solid #ccc;
    padding: 12px;
    white-space: nowrap; /* 텍스트 줄바꿈 방지 */
}

/* 테이블 셀 스타일 */
td {
    border: 2px solid #ddd;
    padding: 12px;
    text-align: center;
    white-space: nowrap;
}

.att-table tr:hover {
    background-color: #f0f0f0;
    cursor: pointer;
  }

  </style>
  