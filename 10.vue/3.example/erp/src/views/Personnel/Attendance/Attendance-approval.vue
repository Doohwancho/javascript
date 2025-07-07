<script setup>
import axios from 'axios';
import { onMounted, ref, watch } from 'vue';
import AttendanceApprovalModal from '../../../components/page/personnel/Attendance/AttendanceApprovalModal.vue';

const searchStDate = ref('');
const searchEdDate = ref('');
const searchNumber = ref('');
const searchName = ref('');
const searchReqStatus = ref('');

const AttendanceList = ref([]);
const cPage = ref(1);


const visible = ref(false);

//reqId
const AttId = ref('');

//승인 상태 
const DetailRestatus = ref('');

const searchList = () => {

    cPage.value = 1;

    //페이지 1로 초기화 
    const form = new URLSearchParams();

    form.append('searchNumber', searchNumber.value);
    form.append('searchName', searchName.value);
    form.append('searchStDate', searchStDate.value);
    form.append('searchEdDate', searchEdDate.value);
    form.append('searchReqStatus', searchReqStatus.value);

    form.append('pageSize', 5);
    form.append('currentPage', cPage.value);

    axios
        .post(`/api/personnel/attendanceList.do`, form)
        .then(res => {
            AttendanceList.value = res.data;
        })
        .catch(err => {
            console.error('에러 발생:', err);
        });
};

const PagesearchList = () => {

//페이지 1로 초기화 
const form = new URLSearchParams();

form.append('searchNumber', searchNumber.value);
form.append('searchName', searchName.value);
form.append('searchStDate', searchStDate.value);
form.append('searchEdDate', searchEdDate.value);
form.append('searchReqStatus', searchReqStatus.value);

form.append('pageSize', 5);
form.append('currentPage', cPage.value);

axios
    .post(`/api/personnel/attendanceList.do`, form)
    .then(res => {
        AttendanceList.value = res.data;
    })
    .catch(err => {
        console.error('에러 발생:', err);
    });
};




//modal에서 상위 컴포넌트 리스트 재조회 
const ListSearch = () => {
    searchList();
}

const OpenApprovalModal = (id, status) => {
    AttId.value = id;
    DetailRestatus.value = status;  
    visible.value = true;    
}

const CloseModal = () => {
  visible.value = false;
}

onMounted(() => {
    searchList();
});
</script>

<template>
    <div id="wrap_area">
        <div id="container">
            <ul>
                <li class="contents">
                    <div class="content">
                        <!-- 위치 정보 -->
                        <div class="location-bar">
                            <div class="path">
                                <span class="icon-home">🏠</span>
                                <span class="divider">/</span>
                                <span>인사/급여</span>
                                <span class="divider">/</span>
                                <span class="current">근태 조회 및 승인</span>
                            </div>
                            <button class="refresh-btn" @click="refresh">
                                <i class="icon-refresh" />
                            </button>
                        </div>
                        

                        <AttendanceApprovalModal v-if="visible"
                         :visible="visible"
                         :AttId="AttId"
                         :DetailRestatus="DetailRestatus"
                         @CloseModal="CloseModal"
                         @ListSearch="ListSearch"
                        />

                        <!-- 검색 영역 -->
                        <p class="conTitle">
                            <span class="titleText">근태 조회 및 승인</span>
                            <span class="searchBox">
                                기간
                                <input type="date" v-model="searchStDate" />
                                ~
                                <input type="date" v-model="searchEdDate" />
                                사번
                                <input type="text" v-model="searchNumber" />
                                사원명
                                <input type="text" v-model="searchName" />
                                승인 상태
                                <select v-model="searchReqStatus">
                                    <option value="">전체</option>
                                    <option value="검토 대기">검토 대기</option>
                                    <option value="승인 대기">승인 대기</option>
                                    <option value="승인">승인</option>
                                    <option value="반려">반려</option>
                                </select>
                                <a
                                    class="btnType red"
                                    href="#"
                                    @click.prevent="searchList"
                                    ><span>검색</span></a
                                >
                            </span>
                        </p>

                        <!-- 테이블 영역 -->
                        <table class="tbl">
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
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="(
                                        item, idx
                                    ) in AttendanceList.attendanceList"
                                    :key="AttendanceList.id"
                                    @click="() =>OpenApprovalModal(item.id, item.reqStatus)"
                                >
                                    <td>{{ item.id }}</td>
                                    <td>{{ item.reqType }}</td>
                                    <td>{{ item.number }}</td>
                                    <td>{{ item.name }}</td>
                                    <td>{{ item.reqSt }}</td>
                                    <td>{{ item.reqEd }}</td>
                                    <td>{{ item.appType }}</td>
                                    <td>{{ item.reqStatus }}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div
                            class="paging_area"
                            style="display: flex; justify-content: center"
                        >
                            <Pagination
                                :totalItems="AttendanceList?.attendanceRequestCnt
                                "
                                :items-per-page="5"
                                :max-pages-shown="5"
                                :onClick="PagesearchList"
                                v-model="cPage"
                            />
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
/* 기본 구조 */
#wrap_area {
    padding: 20px;
    font-family: 'Segoe UI', sans-serif;
}

.Location {
    margin-bottom: 10px;
}

.Location .btn_set,
.Location .btn_nav {
    margin-right: 10px;
}

.conTitle {
    background: #f5f5f5;
    padding: 10px;
    border-radius: 6px;
    margin-bottom: 20px;
}

.titleText {
    display: block;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 8px;
}

.searchBox {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 6px;
    font-size: 14px;
}

/* input, select 공통 */
input[type='text'],
input[type='date'],
select {
    height: 28px;
    padding: 4px 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

/* 버튼 */
.btnType.red {
    background: #007bff;
    color: white;
    padding: 6px 14px;
    text-decoration: none;
    border-radius: 4px;
    font-weight: bold;
}

.btnType.red:hover {
    background: linear-gradient(to bottom, #d83a3a 0%, #b32b2b 100%);
}

/* 테이블 스타일 */
.tbl {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
    margin-top: 10px;
}

.tbl th,
.tbl td {
    border: 1px solid #ccc;
    padding: 8px 10px;
    text-align: center;
}

.tbl th {
    background-color: #f0f0f5;
    font-weight: bold;
}

.location-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    font-size: 14px;
}

.path {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #333;
}

.icon-home {
    font-size: 16px;
}

.divider {
    color: #999;
}

.current {
    font-weight: bold;
}

.refresh-btn {
    width: 28px;
    height: 28px;
    background-color: #007bff;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.refresh-btn img {
    width: 16px;
    height: 16px;
}

.refresh-btn .icon-refresh::before {
    content: '🔄'; /* 또는 원하는 이모지 */
    font-size: 16px;
}

ul {
    list-style: none;
    padding-left: 0; /* 필요 시 들여쓰기 제거 */
    margin: 0;
}

table tr:hover {
    background-color: #f0f8ff; /* 연한 파란 배경 */
    cursor: pointer; /* 마우스 커서 바꾸기 */
}
</style>
