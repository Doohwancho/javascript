<script setup>
import { onMounted, ref, watch } from 'vue';
import SalaryManageSearch from '../../../components/page/personnel/salary-manage/SalaryManageSearch.vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import Pagination from '../../../components/common/Pagination.vue';
import router from '../../../router';


const SalaryList = ref([]);
const route = useRoute();
const cPage = ref(1);
const dPage = ref(1);

const DetailSalaryList = ref([]);
const showDetail = ref(false);

const selectedEmployeeName = ref('');

const SalarySearchList = () => {

    const param = {
        ...route.query,
        pageSize: 5,
        currentPage: cPage.value,
    };
    showDetail.value = false;
    
    axios
        .post(`/api/personnel/salaryListBody`, param, {
            headers: {
                'Content-Type': 'application/json', // JSON 형식으로 전송
            },
        })
        .then(res => {
            SalaryList.value = res.data;
        })
        .catch(err => {
            console.error('에러 발생:', err);
        });


};

//queryString 제거 
const NoqueryString = () => {
    window.location.search && router.replace(window.location.pathname);
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



//급여 계산
 const saveSalaryDate = (SalaryDate) => {

        if(confirm("급여 계산을 하시겠습니까?") && SalaryDate.length > 0){

            const params = new URLSearchParams();
            params.append('paymentDate', SalaryDate);

            axios
                .post(`/api/personnel/salarySave.do`, params)
                .then(res => {
                    SalarySearchList();
                })
                .catch(err => {
                    console.error('에러 발생:', err);
                });

        }else {
            alert("년월을 선택해주세요 ");
        }

 }
  

//단일 지급 
  const PaymentStatusUpdate = (baseSal, Id) => {


    const params = new URLSearchParams();

    params.append('salaryId', Id);
    params.append('baseSalary', baseSal);

    axios
        .post(`/api/personnel/paymentStatusUpdate.do`, params)
        .then(res => {
            if (confirm("지급 하시겟습니까?")) {
            // 확인 누른 경우
            SalarySearchList();
            } else {
            // 취소 누른 경우
            console.log("error");
            }

        })
        .catch(err => {
            console.error('에러 발생:', err);
        });
};
  
//일괄 지급 
  const allPaymentStatusUpdate = (searchMonth) => {

    if (confirm("일괄 지급 하시겟습니까?")) {

        if(SalaryList.value.salaryList.length > 0 && route.query.searchPaymentMonth === searchMonth){
            const params = new URLSearchParams();

            params.append('paymentDate', route.query.searchPaymentMonth);

            axios
                .post(`/api/personnel/allPaymentStatusUpdate.do`, params)
                .then(res => {
                  alert("지급 완료");
                  SalarySearchList();
                })
                .catch(err => {
                    console.error('에러 발생:', err);
                });
        }else {
            alert("급여 연월을 검색후 진행주세요.");
        }

        SalarySearchList();

    } else {
    // 취소 누른 경우
    console.log("error");
    }

    
  };

    //상세 보기
    const DetailSalary = (employeeName) => {

        if(selectedEmployeeName.value != employeeName){
          selectedEmployeeName.value = employeeName;
        }

        dPage.value = 1;

        const param = {
            searchEmployeeName: selectedEmployeeName.value,
            pageSize: 5,
            currentPage: dPage.value,
        };

        axios
        .post(`/api/personnel/salaryListBody`, param, {
            headers: {
                'Content-Type': 'application/json', // JSON 형식으로 전송
            },
        })
        .then(res => {
            DetailSalaryList.value = res.data;
            showDetail.value = true;
        })
        .catch(err => {
            console.error('에러 발생:', err);
        });
    }

    //상세 보기
    const PageDetailSalary = (page) => {

          dPage.value = page;

          const param = {
              searchEmployeeName: selectedEmployeeName.value,
              pageSize: 5,
              currentPage: dPage.value,
          };

          axios
          .post(`/api/personnel/salaryListBody`, param, {
              headers: {
                  'Content-Type': 'application/json', // JSON 형식으로 전송
              },
          })
          .then(res => {
              DetailSalaryList.value = res.data;
              showDetail.value = true;
          })
          .catch(err => {
              console.error('에러 발생:', err);
          });
    }
  
  watch(() => route.query, () => {
    cPage.value = 1;
    SalarySearchList();
    });

  onMounted(() => {
    SalarySearchList();
  });

  </script>

<template>
    
      <SalaryManageSearch 
        @allPaymentStatusUpdate="allPaymentStatusUpdate"
        @saveSalaryDate="saveSalaryDate"
      />
      <table class="promotion-table" style="max-width: 1300px;">
        <thead>
          <tr>
            <th>해당년월</th>
            <th>부서명</th>
            <th>직급</th>
            <th>사원명</th>
            <th>사번</th>
            <th>연봉</th>
            <th>기본급</th>
            <th>국민연금</th>
            <th>건강보험</th>
            <th>산재보험</th>
            <th>고용보험</th>
            <th>비고금액</th>
            <th>실급여</th>
            <th>퇴직금</th>
            <th>지급</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="List in SalaryList.salaryList" :key="List.salaryId" @click="() => DetailSalary(List.employeeName)">
                <td>{{ List.paymentDate }}</td>
                <td>{{ List.departmentDetailName }}</td>
                <td>{{ List.jobGradeDetailName }}</td>
                <td>{{ List.employeeName }}</td>
                <td>{{ List.employeeNumber }}</td>
                <td>{{ List.salary }}</td>
                <td>{{ List.baseSalary }}</td>
                <td>{{ List.nationalPension }}</td>
                <td>{{ List.healthInsurance }}</td>
                <td>{{ List.baseSalary }}</td>
                <td>{{ List.employmentInsurance }}</td>
                <td></td>
                <td>{{ List.totalSalary }}</td>
                <td>{{ List.serverancePay }}</td>
                <td>
                    <button :disabled="List.paymentStatus === 1" @click.stop="() => PaymentStatusUpdate(List.baseSalary, List.salaryId)">
                        지급
                    </button>
                </td>
          </tr>
        </tbody>
      </table>
  
      <!-- 페이징 영역 -->
      <div class="paging_area">
        <Pagination
            :totalItems="SalaryList?.salaryCnt"
            :items-per-page="5"
            :max-pages-shown="5"
            :onClick="SalarySearchList"
            v-model="cPage"
         />
      </div>
  
      <!-- 상세 정보 영역 -->
      <div v-if="showDetail" class="search-box">
        <h3>상세보기</h3>
        <table class="promotion-table">
        <thead>
          <tr>
            <th>해당년월</th>
            <th>부서명</th>
            <th>직급</th>
            <th>사원명</th>
            <th>사번</th>
            <th>연봉</th>
            <th>기본급</th>
            <th>국민연금</th>
            <th>건강보험</th>
            <th>산재보험</th>
            <th>고용보험</th>
            <th>비고금액</th>
            <th>실급여</th>
            <th>퇴직금</th>
            <th>지급</th>
          </tr>
        </thead>
        <tbody>
        <tr v-for="List in DetailSalaryList.salaryList" :key="List.salaryId">
                <td>{{ List.paymentDate }}</td>
                <td>{{ List.departmentDetailName }}</td>
                <td>{{ List.jobGradeDetailName }}</td>  
                <td>{{ List.employeeName }}</td>
                <td>{{ List.employeeNumber }}</td>
                <td>{{ List.salary }}</td>
                <td>{{ List.baseSalary }}</td>
                <td>{{ List.nationalPension }}</td>
                <td>{{ List.healthInsurance }}</td>
                <td>{{ List.baseSalary }}</td>
                <td>{{ List.employeeInsurance }}</td>
                <td></td>
                <td>{{ List.totalSalary }}</td>
                <td>{{ List.serverancePay }}</td>  
          </tr>
        </tbody>
      </table>  
        <Pagination
            :totalItems="DetailSalaryList?.salaryCnt"
            :items-per-page="5"
            :max-pages-shown="5"
            :onClick="PageDetailSalary"
            v-model="dPage"
      />
      </div>
  </template>
    
<style scoped>
  .promotion-container {
    padding: 20px;
    font-family: 'Pretendard', sans-serif;
    color: #333;
  }
  
  .page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  margin-bottom: 15px;
  font-family: 'Pretendard', sans-serif;
}

.breadcrumb {
  display: flex;
  align-items: center;
  color: #1f2d3d;
}

.breadcrumb .icon-home::before {
  content: '🏠'; /* 또는 아이콘 폰트 사용 시 대체 */
  margin-right: 5px;
}

.breadcrumb .divider {
  margin: 0 5px;
  color: #888;
}

.breadcrumb .section,
.breadcrumb .current {
  color: #333;
  font-weight: 500;
}

.refresh-btn {
  border: 1px solid #ddd;
  background: #fff;
  padding: 5px 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.refresh-btn:hover {
  background: #f5f5f5;
}

.refresh-btn .icon-refresh::before {
  content: '🔄'; /* 또는 아이콘 폰트 */
}

  .section-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 15px;
  }
  
  .search-box {
    border: 1px solid #ddd;
    padding: 15px;
    border-radius: 6px;
    margin-bottom: 20px;
    background-color: #fafafa;
  }
  
  .filters {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-bottom: 10px;
  }
  
  .filters label {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  
  .date-filter {
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: flex-end;
  }
  
  input,
  select {
    height: 28px;
    padding: 2px 6px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .btn.search {
    background: #007bff;
    color: white;
    border: none;
    padding: 5px 12px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .promotion-table {
    margin: 0 auto;
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  }
  
  .promotion-table thead {
    background-color: #f0f0f0;
  }
  
  .promotion-table th,
  .promotion-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }
  
  .promotion-table tbody tr:hover {
    background-color: #f9f9f9;
  }
</style>
  