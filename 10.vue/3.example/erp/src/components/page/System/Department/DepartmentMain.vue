<template>
    <div>
        <DepartmentModal v-if="modal.modalState" :detailCode="detailCode" @modalClose="detailCode = $event"
            @saveSuccess="onSaveSuccess" />
        <table>
            <colgroup>
                <col width="50%" />
                <col width="50%" />
            </colgroup>

            <thead v-if="isSuccess">
                <tr>
                    <th scope="col">부서코드</th>
                    <th scope="col">부서명</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="isSuccess">
                    <template v-if="dpList.departmentCnt > 0">
                        <tr v-for="dp in dpList.departmentList" :key="dp.detailCode
                            " @click="handlerModal(dp.detailCode)">
                            <td>{{ dp.detailCode }}</td>
                            <td>{{ dp.detailName }}</td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr>
                            <td colspan="2">일치하는 검색 결과가 없습니다</td>
                        </tr>
                    </template>
                </template>
            </tbody>
            <div v-if="isLoading" class="backdrop">
                <div class="spinner"></div>
            </div>
        </table>
        <Pagination v-if="isSuccess" :totalItems="dpList?.departmentCnt" :items-per-page="5" :max-pages-shown="10"
            :onClick="refetch" v-model="cPage" />
    </div>
</template>
<script setup>
import axios from 'axios';
import { useModalStore } from '../../../../stores/modalState';
import { inject, watch } from 'vue';
import { useQuery } from '@tanstack/vue-query';

const modal = useModalStore()
const detailCode = ref("")
const cPage = ref(1)
const injectedValue = inject('selectValue')

const searchDp = async () => {
    const param = {
        ...injectedValue.value,
        pageSize: 5,
        currentPage: cPage.value
    }

    const res = await axios.post('/api/system/departmentListBody', param)

    return res.data
}

const { data: dpList, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ['departMentList', cPage.value, injectedValue],
    queryFn: searchDp,
    // staleTime:1000 * 60,
    // useQuery 자체 캐시
    // gcTime:1000 * 60
})

const handlerModal = (code) => {
    detailCode.value = code
    modal.setModalState()
}

const onSaveSuccess = () => {
    modal.setModalState()
    searchDp()
}


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

table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0px 0px 0px;
    font-size: 18px;

    th,
    td {
        padding: 8px;
        border: 1px solid #ddd;
        text-align: center;
    }

    th {
        background: #f4f4f4;
        font-weight: bold;
    }

    /* 테이블 올렸을 때 */
    tbody tr:hover {
        background-color: #d3d3d3;
        opacity: 0.9;
        cursor: pointer;
    }
}
</style>