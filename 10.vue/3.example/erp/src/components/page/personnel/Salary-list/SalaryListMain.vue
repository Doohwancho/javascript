<template>
    <SalaryListModal v-if="modal.modalState" />
    <div class="salary-container">
        <div v-if="isSuccess" class="employ-box">
            <div class="employ-item">
                <span class="item-span">사원명</span>
                <input class="employ-input" v-model="employeeInfo.employeeName" type="text">
            </div>
            <div class="employ-item">
                <span class="item-span">직급</span>
                <input class="employ-input" v-model="employeeInfo.jobGradeDetailName" type="text">
            </div>
            <div class="employ-item">
                <span class="item-span">근무연차</span>
                <input class="employ-input" v-model="employeeInfo.workingYear" type="text">
            </div>
        </div>
        <div class="salary-box" v-if="isSuccess && employeeInfo.nationalPension">
            <div class="left-salary">
                <table>
                    <tr>
                        <th>공제항목</th>
                        <td>금액</td>
                    </tr>
                    <tr>
                        <th>국민연금</th>
                        <td>{{ Math.floor(employeeInfo.nationalPension).toLocaleString('ko-KR') }} 원</td>
                    </tr>
                    <tr>
                        <th>건강보험료</th>
                        <td>{{ Math.floor(employeeInfo.healthInsurance).toLocaleString('ko-KR') }} 원</td>
                    </tr>
                    <tr>
                        <th>고용보험</th>
                        <td>{{ Math.floor(employeeInfo.employmentInsurance).toLocaleString('ko-KR') }} 원</td>
                    </tr>
                    <tr>
                        <th>산재보험</th>
                        <td>{{ Math.floor(employeeInfo.industrialAccident).toLocaleString('ko-KR') }} 원</td>
                    </tr>
                </table>
            </div>
            <div class="salary-item">
                <svg-icon @click="modal.setModalState()" class="icon" type="mdi" :path="path" :size="42"></svg-icon>
            </div>
            <div class="right-salary">
                <table>
                    <tr>
                        <th>지급항목</th>
                        <td>금액</td>
                    </tr>
                    <tr>
                        <th>기본급</th>
                        <td>{{ Math.floor(employeeInfo.baseSalary).toLocaleString('ko-KR') }} 원</td>
                    </tr>
                    <tr>
                        <th>비고금액</th>
                        <td>{{ Math.floor(employeeInfo.additionalAmount).toLocaleString('ko-KR') }} 원</td>
                    </tr>
                    <tr>
                        <th>실급여</th>
                        <td>{{ Math.floor(employeeInfo.totalSalary).toLocaleString('ko-KR') }} 원</td>
                    </tr>
                    <tr>
                        <th>연봉</th>
                        <td>{{ Math.floor(employeeInfo.salary).toLocaleString('ko-KR') }} 원</td>
                    </tr>
                </table>
            </div>
        </div>
        <div v-if="isLoading" class="backdrop">
            <div class="spinner"></div>
        </div>
    </div>
</template>
<script setup>
import axios from 'axios'
import { watch } from 'vue'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiHelpCircleOutline } from '@mdi/js'
import { useModalStore } from '../../../../stores/modalState';
import { useQuery } from '@tanstack/vue-query';
const modal = useModalStore()
const path = mdiHelpCircleOutline
const injectedValue = inject('selectValue')
const searchSalary = async () => {
    const param = new URLSearchParams({
        ...injectedValue.value,
    })

    const res = await axios.post('/api/personnel/salaryListDetail.do', param)

    return res.data.salaryListDetail
}

const { data: employeeInfo, isLoading, isSuccess } = useQuery({
    queryKey: ['employeeInfo', injectedValue],
    queryFn: searchSalary,
    // staleTime:1000 * 60,
    // useQuery 자체 캐시
    // gcTime:1000 * 60
})



</script>
<style lang="scss" scoped>
.backdrop {
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
    font-weight: bold;
}

.spinner {
    width: 60px;
    height: 60px;
    border: 6px solid #fff;
    border-top: 6px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.salary-container {
    border: 1px solid #ddd;
}

.employ-box {
    width: 100%;
    display: flex;
    height: 100px;
    justify-content: space-evenly;
    align-items: center;
}

.salary-box {
    width: 100%;
    display: flex;
    margin-top: 10px;
}

.employ-input {
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 5px;
    margin-right: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
    pointer-events: none;
}

.item-span {
    font-size: 13px;
    margin-right: 5px;
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
}

.left-salary {
    border: 1px solid #e7e4e4;
    margin: 0 0 50px 80px;
    flex: 4.5;
    height: calc(60vh);
    overflow: scroll;
    overflow-x: hidden;
    position: sticky;
    top: 50px;
}

.salary-item {
    flex: 1;
    padding: 0 0 0 65px;
}

.icon {
    cursor: pointer;
}


.right-salary {
    border: 1px solid #e7e4e4;
    margin: 0 80px 50px 0;
    flex: 4.5;
    height: calc(60vh);
    overflow: scroll;
    overflow-x: hidden;
    position: sticky;
    top: 50px;
}
</style>