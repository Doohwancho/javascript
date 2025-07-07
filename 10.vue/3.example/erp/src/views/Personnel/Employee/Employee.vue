<script setup>
import EmployeeSearchBar from '../../../components/page/personnel/employee/EmployeeSearchBar.vue';
import axios from 'axios';
import { inject, onMounted, onUnmounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Pagination from '../../../components/common/Pagination.vue';
import EmployeeModal from '../../../components/page/personnel/employee/EmployeeModal.vue';
import router from '../../../router';
import { useQuery } from '@tanstack/vue-query';

const route = useRoute();
//const personnelList = ref([]);
const cPage = ref(1);
const isModalOpen = ref(false);
//퇴직에 사용될 것 
const UserDetail = ref({});
//유저 상세보기
const employeeDetail = ref({});

/* 현재 재직상태 변경 */
const chEmplStatus = ref('');

//modal type별 정의 
const modalType = ref('');
const CommonModal = ref(false);

const imgUrl = ref('');

//Id, jobGrade props로 넘기기 
const employeeId = ref('');
const jobGradeCode = ref('');


//등록 정보창을 수정창에서 바꾸는 게아니라 등록 -> 등록 갈때 값들 초기값을 갱신하기 위해
const regeResign = ref(false);

//provice 값 
const EmployeesearchParams = inject('EmployeesearchParams');

//1. 인사 관리 리스트 조회  
const personnelSearchList = async() => {

    const param = {
        ...EmployeesearchParams.value,
        pageSize: 5,
        currentPage: cPage.value,
    };

    const result = await axios
        .post(`/api/personnel/employeeListBody`, param, {
            headers: {
                'Content-Type': 'application/json', // JSON 형식으로 전송
            },
        })
        return result.data;


};

//조회 useQuery 사용해서 
const {data: personnelList, refetch} = useQuery ({
    queryKey: ['personnelList',EmployeesearchParams, cPage],
    queryFn: personnelSearchList,
})



//개인 조회 
const checkPerson = async (personnel) => {
    
    employeeId.value =  personnel.employeeId;
    jobGradeCode.value =  personnel.jobGradeCode;
    modalType.value = 'update';
    isModalOpen.value = true;

}

//2. 재직자, 퇴직자의 따른 재 검색 
const GetEmplStatus = val => {
    chEmplStatus.value = val;
};

const OnEmplStatus = () => {

    // //F W 재직 상태에 따라서 값 변경
    // router.push({
    //     path: route.path,
    //     query: { ...route.query, emplStatus: chEmplStatus.value},
    // });

    // console.log(chEmplStatus.value);

    // //다시 재 검색
    // if(cPage.value !== 1){
    //     cPage.value =1;
    // }
    // personnelSearchList()

};

//3. 퇴직 모달창 열기 
const Onretire = (personnel) => {

    modalType.value = 'retire'
    UserDetail.value = '';


    const param = JSON.parse(JSON.stringify(personnel));

/*     AxiosRequest('employeeDetailBody', param, UserDetail);
 */

    axios
        .post(`/api/personnel/employeeDetailBody`, param, {
            headers: {
                'Content-Type': 'application/json', // JSON 형식으로 전송
            },
        })
        .then(res => {
            UserDetail.value = res.data;
            isModalOpen.value = true;
        })
        .catch(err => {
            console.error('에러 발생:', err);
        });

}

//모달창에서 상위컴포넌트에서 모달창 열리게하기
const OpenRetireModal = (val, ComModal) => {
     modalType.value = 'retire'

    /*     AxiosRequest('employeeDetailBody', param, UserDetail);
    */
    const param = {
        employeeId: val.employeeId,
        jobGradeCode: val.jobGradeCode
    };

    axios
        .post(`/api/personnel/employeeDetailBody`, param, {
            headers: {
                'Content-Type': 'application/json', // JSON 형식으로 전송
            },
        })
        .then(res => {
            UserDetail.value = res.data;
            isModalOpen.value = true;
        })
        .catch(err => {
            console.error('에러 발생:', err);
        });

}


//퇴직 처리 하기 
const handleRetireInfo = (retireData) => {

  // 예: 개별로 꺼낼 수도 있음
  const { resignationReason, resignationDate, severancePay, salary, employeeId } = retireData;
  
  //퇴직사유나 퇴직급여 입력 유효성 검사 
  if(resignationReason !== '' && severancePay !== '' && resignationDate !== ''){

    //응답형이 @RequestParam임 
    const params = new URLSearchParams();

    params.append('employeeId', employeeId);
    params.append('emplStatus', 'F');
    params.append('resignationReason', resignationReason );
    params.append('resignationDate', resignationDate );
    params.append('severancePay',severancePay  );
    params.append('salary',salary);

    axios
        .post(`/api/personnel/emplStatusUpdate.do`, params)
        .then(res => {
            alert('퇴직 되었습니다.');
            refetch();
            closeModal();
        })
        .catch(err => {
            console.error('에러 발생:', err);
        });
  }else {
    alert("퇴직사유나 퇴직급여를 입력해주세요");
  }

};


//Axios 요청 함수 
const AxiosRequest =  (UrlInfo, param, valueName) => {
    axios
        .post(`/api/personnel/${UrlInfo}`, param, {
            headers: {
                'Content-Type': 'application/json', // JSON 형식으로 전송
            },
        })
        .then(res => {
            valueName.value = res.data;
        })
        .catch(err => {
            console.error('에러 발생:', err);
        });
}

//queryString 제거 
// const NoqueryString = () => {
//     window.location.search && router.replace(window.location.pathname);
// };


//모달 열기 / 모달 창한개로 modalType으로 각각 불러옴 
const ModalOpening = () => {

    modalType.value = 'register';
    isModalOpen.value = true; 
    regeResign.value = !regeResign.value;
}

//등록후 리스트 다시 로드
const searchlist = () => {
    refetch();
}

//모달 닫기 
const closeModal = (val) => {
  isModalOpen.value = val;
};

const closeCommonModal = (val) => {
    CommonModal.value = val;
    refetch();
}


// onMounted(() => {
//     console.log('쿼리 값:', route.query);
//     personnelSearchList();
//     NoqueryString();
// });

computed(() => UserDetail.value.detail?.employeeName || "이름 없음");

//provide를 쓰더라도 결국 cPage옵션을 바꿀려면 어쩔수 없음 
watch(
  () => EmployeesearchParams.value,
  () => {
    cPage.value = 1;
  },
  { deep: true }
);

</script>

<template>

    <!-- 사원 검색 바  -->
    <EmployeeSearchBar
        @ModalOpening="ModalOpening"
        @EmplStatus="GetEmplStatus"
    />

    <!-- 공통 모달  
     modalType 등록인지 수정인지 변수
     employeeId 각 고유값 및 jobGradeCode와 mapper에 필요한 변수
     isModalOpen 열기 닫기 관리하는 boolean 값 

    CommonModal 퇴직 창 열기, 닫기 
    employeeForm를 search바에서 가져오기 떄문에 기본 초기값을 상위에서 정해주고 
    하위에 값을 보내는 형태로
    -->
    <div v-show="isModalOpen">
        <EmployeeModal 

        :modalType="modalType"
        :employeeId="employeeId"
        :jobGradeCode="jobGradeCode"
        :isModalOpen="isModalOpen"

        :CommonModal="CommonModal"
        :UserDetail="UserDetail"
        :regeResign="regeResign"

        @closeModal="closeModal"
        @update-retire-info="handleRetireInfo"
        @OpenRetireModal="OpenRetireModal"
        @closeCommonModal="closeCommonModal"
        @searchlist="searchlist"

        />
    </div> 


    <table>
        <thead>
            <td scope="col">사번</td>
            <td scope="col">사원명</td>
            <td scope="col">부서코드</td>
            <td scope="col">부서명</td>
            <td scope="col">직급</td>
            <td scope="col">입사일자</td>
            <td scope="col">휴직</td>
            <td scope="col">퇴직일자</td>
            <td scope="col">
                퇴직처리
            </td>
        </thead>

        <tr
            v-for="personnel in personnelList?.employeeList"
            :key="personnel.employeeId"
            @click="() => checkPerson(personnel)"
        >
            <td>{{ personnel.number }}</td>
            <td>{{ personnel.employeeName }}</td>
            <td>{{ personnel.departmentCode }}</td>
            <td>{{ personnel.departmentDetailName }}</td>
            <td>{{ personnel.jobGradeDetailName }}</td>
            <td>{{ personnel.regDate }}</td>
            <td>{{ personnel.emplStatus }}</td>
            <td>{{ personnel.resignationDate }}</td>
            <td>               
                <button @click.stop="() => Onretire(personnel)" :disabled="personnel.emplStatus === 'F' || personnel.resignationDate">
                    퇴직처리
                </button>
            </td>
        </tr>
    </table>
    <Pagination
        :totalItems="personnelList?.employeeCnt"
        :items-per-page="5"
        :max-pages-shown="5"
        :onClick="refetch"
        v-model="cPage"
    />
</template>
<style scoped>
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

table tr:hover {
  background-color: #f0f8ff; /* 연한 파란 배경 */
  cursor: pointer; /* 마우스 커서 바꾸기 */
    }  
</style>