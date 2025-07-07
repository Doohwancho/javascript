<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import WarehouseInfoModal from './WarehouseInfoModal.vue';
import { useModalStore } from '../../../../stores/modalState';


const warehouseInfoList = ref({});
const cPage = ref(1);
const route = useRoute();
const modalState = useModalStore();
const warehouseId = ref(0);


const searchList = () => {
    const {searchKeyword = '', searchTarget = 'warehouseName'} = route.query;
    const param = new URLSearchParams({
        searchKeyword : searchKeyword
        , searchTarget: searchTarget
        , currentPage : cPage.value
        , pageSize: 5
    });
    axios.post('/api/management/warehouseInfoListBody.do', param).then(res => {
        warehouseInfoList.value = res.data;
    });
}

const handlerUpdate = (id) => {
    warehouseId.value = id;
    modalState.setModalState();
}

const onPostSuccess = () =>{
    searchList();
}

onMounted(() => {
    searchList();
})

watch(() => route.query, searchList);

</script>

<template>
    <div>
        <WarehouseInfoModal
        v-if="modalState.modalState"
        :id="warehouseId"
        @postSuccess="onPostSuccess"
        @modalClose="warehouseId = $event"
        />
        현재 페이지: {{ cPage }} 총 개수 : {{ warehouseInfoList.warehouseInfoCnt }}
        <div>
            <table class="col">
                <colgroup>
                    <col width="10%">
                    <col width="10%">
                    <col width="10%">
                    <col width="15%">
                    <col width="15%">
                    <col width="10%">
                    <col width="30%">
                </colgroup>
                
                <!-- 리스트 제목행 -->
                <thead>
                    <tr>
                        <th scope="col">창고코드</th>
                        <th scope="col">창고명</th>
                        <th scope="col">담당자</th>
                        <th scope="col">이메일</th>
                        <th scope="col">전화번호</th>
                        <th scope="col">우편번호</th>
                        <th scope="col">창고위치</th>
                    </tr>
                </thead>
                
                <!-- 리스트 내용행 -->
                <tbody >
                    <template v-if="warehouseInfoList">
                        <template v-if="warehouseInfoList.warehouseInfoCnt > 0">
                            <tr v-for="warehouseInfo in warehouseInfoList.warehouseInfoList">
                                <td>
                                    {{ warehouseInfo.warehouseCode }}
                                </td>
                                <td 
                                class="td-hover"
                                @click="handlerUpdate(warehouseInfo.warehouseId)"
                                >
                                    {{ warehouseInfo.name }}
                                </td>
                                <td>
                                    {{ warehouseInfo.manager }}
                                </td>
                                <td>
                                    {{ warehouseInfo.email }}
                                </td>
                                <td>
                                    {{ warehouseInfo.phone }}
                                </td>
                                <td>
                                    {{ warehouseInfo.zipCode }}
                                </td>
                                <td>
                                    {{ warehouseInfo.address }}
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
            :totalItems = "warehouseInfoList?.warehouseInfoCnt"
            :items-per-page="5"
            :max-pages-shown="5"
            :onClick="searchList"
            v-model="cPage"
        />   
        </div>
    </div>
</template>

<style scoped>
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