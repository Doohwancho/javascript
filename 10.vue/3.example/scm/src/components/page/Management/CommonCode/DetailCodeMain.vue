<script setup>
import { useRoute } from 'vue-router';
import { ref,onMounted } from 'vue';
import axios from 'axios';
import { useModalStore } from '../../../../stores/modalStore';

const route = useRoute();
const detailCodeList = ref();
const detailCodeId = ref(0);
const { groupCode } = defineProps(['groupCode']);

const cPage = ref(1);
const modalStore = useModalStore();




const searchList = () => {

    const param ={
        ...route.query,
        pageSize: 5,
        currentPage: cPage.value,
        groupCode: groupCode
    };
    axios.post('/api/management/commonDetailCodeListJson.do', param).then(res => {
        detailCodeList.value = res.data;
    });
}

const handlerUpdate = (id) => {
    detailCodeId.value = id;
    modalStore.open('detailCode');
}


onMounted(() => {
    searchList();
});

watch(() => route.query, searchList);

</script>

<template>
    <div class="commoncode-main">
        <DetailCodeModal 
        v-if="modalStore.isOpen('detailCode')"
        :id="detailCodeId"
        :groupCode="groupCode"
        @modalClose="detailCodeId = $event"
        @postSuccess = "searchList()"
        
        />
        현재 페이지: {{ cPage }} 총 개수 : {{ detailCodeList?.commonDetailCodeCnt	 }}
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
                    <th scope="col">상세코드</th>
                    <th scope="col">상세코드명</th>
                    <th scope="col">상세코드설명</th>
                    <th scope="col">사용여부</th>
                    <th scope="col">비고</th>
                </tr>
            </thead>
            
            <!-- 리스트 내용행 -->
            <tbody>
                <template v-if="detailCodeList">
                    <template v-if="detailCodeList.commonDetailCodeCnt > 0">
                        <tr v-for="detailCode in detailCodeList.commonDetailCode" 
                            :key="detailCode.groupIdx"
                        >
                            <td>{{ detailCode.detailIdx }}</td>
                            <td>{{ detailCode.groupCode }}</td>
                            <td>{{ detailCode.detailCode }}</td>
                            <td>{{ detailCode.detailName }}</td>
                            <td>{{ detailCode.note }}</td>
                            <td>{{ detailCode.useYn }}</td>
                            <td><button
                                 @click="handlerUpdate(detailCode.detailIdx)">
                                 수정</button>
                                </td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr>
                            <td colspan="7">일치하는 검색 결과가 없습니다</td>
                        </tr>
                    </template>
                </template>
            </tbody>
        </table>
            
        <!-- 페이징 처리  -->
        <Pagination 
            :totalItems = "detailCodeList?.commonDetailCodeCnt"
            :items-per-page="5"
            :max-pages-shown="5"
            :onClick="searchList"
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