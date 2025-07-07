<script setup>
import { useRoute } from 'vue-router';
import { ref,onMounted, inject } from 'vue';
import axios from 'axios';
import { useModalStore } from '../../../../stores/modalStore';
import { useQuery } from '@tanstack/vue-query';

const route = useRoute();
// const commonCodeList = ref();
const commonCodeId = ref(0);

const cPage = ref(1);
const modalStore = useModalStore();
const emit = defineEmits(['openDetail']);
const injectedValue = inject('selectValue');


const searchList = async () => {
    const param ={
        ...injectedValue.value,
        pageSize: 5,
        currentPage: cPage.value,
    };
    const result = await axios.post('/api/management/commonCodeListBody.do', param);

    return result.data;
}

const {
    data: commonCodeList,
    isLoading,
    isSuccess,
    refetch,
} = useQuery({
    queryKey: ['commonCodeList', cPage, injectedValue],
    queryFn: searchList
});

const handlerOpenDetail = (groupCode) => {
    emit('openDetail', groupCode);
}

const handlerUpdate = (id) => {
    commonCodeId.value = id;
    modalStore.open('commonCode');
}




// watch(() => injectedValue.value, searchList);

</script>

<template>
    <div class="commoncode-main">
        <CommonCodeModal 
        v-if="modalStore.isOpen('commonCode')"
        :id="commonCodeId"
        @modalClose="commonCodeId = $event"
        @postSuccess = "searchList()"
        
        />
        현재 페이지: {{ cPage }} 총 개수 : {{ commonCodeList?.commonCodeCnt }}
        <table>
            <colgroup>
                <col width="10%">  <!-- 번호 -->
                <col width="15%">  <!-- 그룹코드 -->
                <col width="20%">  <!-- 그룹코드명 -->
                <col width="15%">  <!-- 그룹코드설명 -->
                <col width="10%">  <!-- 사용여부 -->
                <col width="10%">  <!-- 등록일 -->
                <col width="10%">  <!-- 비고 -->
            </colgroup>
                                            
            <!-- 리스트 제목행 -->
            <thead>
                <tr>
                    <th scope="col">번호</th>
                    <th scope="col">그룹코드</th>
                    <th scope="col">그룹코드명</th>
                    <th scope="col">그룹코드설명</th>
                    <th scope="col">등록일</th>
                    <th scope="col">사용여부</th>
                    <th scope="col">비고</th>
                </tr>
            </thead>
            
            <!-- 리스트 내용행 -->
            <tbody>
                <template v-if="isSuccess">
                    <template v-if="commonCodeList.commonCodeCnt > 0">
                        <tr v-for="commonCode in commonCodeList.commonCode" 
                            :key="commonCode.groupIdx"
                        >
                            <td>{{ commonCode.groupIdx }}</td>
                            <td class="td-hover"
                                @click="handlerOpenDetail(commonCode.groupCode)"
                            >{{ commonCode.groupCode }}</td>
                            <td>{{ commonCode.groupName }}</td>
                            <td>{{ commonCode.note }}</td>
                            <td>{{ commonCode.createdDate.substr(0, 10) }}</td>
                            <td>{{ commonCode.useYn }}</td>
                            <td><button
                                 @click="handlerUpdate(commonCode.groupIdx)">
                                 수정</button>
                                </td>
                        </tr>
                    </template>
                </template>
                <template v-else>
                    <tr>
                        <td colspan="7">일치하는 검색 결과가 없습니다</td>
                    </tr>
                </template>
                <template v-if="isLoading">로딩중...</template>
            </tbody>
        </table>
            
        <!-- 페이징 처리  -->
        <Pagination 
            :totalItems = "commonCodeList?.commonCodeCnt"
            :items-per-page="5"
            :max-pages-shown="5"
            :onClick="refetch"
            v-model="cPage"
        />       
    </div>
</template>

<style scoped>
.commoncode-main{
    min-height: 400px;
}
.td-hover {
    cursor: pointer;
    transition: color 0.3s ease;
    font-weight: bold;
}
.td-hover:hover {
  text-decoration: underline;
  color: #fe1414;
}
table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0px 0px 0px;
    font-size: 18px;
    text-align: left;

    th,
    td {
        padding: 8px;
        text-align: left;
        border-bottom: 1px solid #ddd;
        text-align: center;
    }

    th {
        background-color: #2676bf;
        color: #ddd;
    }

    /* 테이블 올렸을 때 */
    tbody tr:hover {
        background-color: #d3d3d3;
        opacity: 0.9;
    }

}
button {
    text-align: center;
    text-decoration: none;
    display: inline-block;
    border: none;
    color: white;
    width: 70px;
    padding-top: 8px;
    padding-bottom: 8px;
    font-size: 12px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 12px;
    box-shadow: 0 4px #999;
    background-color: #3bb2ea;

    &:hover {
        background-color: #45a049;
    }

    &:active {
        background-color: #3e8e41;
        box-shadow: 0 2px #666;
        transform: translateY(2px);
    }
}
</style>