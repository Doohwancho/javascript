<script setup>
import axios from 'axios';
import { inject, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import SupplierInfoModal from './SupplierInfoModal.vue';
import { useModalStore } from '../../../../stores/modalState';
import { useQuery } from '@tanstack/vue-query';

const modalState = useModalStore();

const cPage = ref(1);
const supplyId = ref(0);
const supplierDetail = ref();
const gridFlag = ref('none');
const cPageDetail = ref(1);
const selectedRowIndex = ref(null);

const injectedValue = inject('selectValue');
const flag = inject('prFlag');

const searchList = async () => {
    supplierDetail.value = '';
    flag.value && (cPage.value = 1);
    const param = new URLSearchParams({
        ...injectedValue.value,
        pageSize: 5,
        currentPage: cPage.value,
        searchOption:
            injectedValue.value &&
            injectedValue.value.searchKeyword !== undefined
                ? injectedValue.value.searchOption
                : 'searchSupplier',
    });
    flag.value && (flag.value = false);

    const result = await axios.post(
        '/api/management/supplierListBody.do',
        param
    );

    return result.data;
};

const { data: supplierInfoList, refetch } = useQuery({
    queryKey: ['supplierInfoList', injectedValue], // 필수항목
    queryFn: searchList,
});

const openModal = id => {
    supplyId.value = id;
    modalState.modalState = !modalState.modalState;
};

const onPostSuccess = () => {
    modalState.modalState = !modalState.modalState;
    refetch();
};

// 선택된 행이 하이라이트되는지 확인하는 함수
const isHighlighted = index => {
    return selectedRowIndex.value === index;
};
const openGrid = id => {
    selectedRowIndex.value = selectedRowIndex.value === id ? null : id;
    if (gridFlag.value !== 'none') {
        if (gridFlag.value === id) {
            gridFlag.value = 'none';
            supplierDetail.value = '';
            cPageDetail.value = 1;
        } else {
            gridFlag.value = id;
            searchDetailList(id);
        }
    } else {
        gridFlag.value = id;
        searchDetailList(id);
    }
};

const searchDetailList = id => {
    const param = new URLSearchParams({
        supplyId: id,
        currentPage: cPageDetail.value,
        pageSize: 5,
    });
    axios.post('/api/management/supplierDetailBody.do', param).then(res => {
        supplierDetail.value = res.data;
    });
};
</script>
<template>
    <div>
        <SupplierInfoModal
            v-if="modalState.modalState"
            :id="supplyId"
            @modalClose="supplyId = $event"
            @postSuccess="onPostSuccess"
        />
        <table>
            <colgroup>
                <col width="15%" />
                <col width="10%" />
                <col width="20%" />
                <col width="30%" />
                <col width="10%" />
                <col width="15%" />
            </colgroup>
            <thead>
                <tr>
                    <th>납품업체명</th>
                    <th>담당자명</th>
                    <th>담당자 연락처</th>
                    <th>주소</th>
                    <th>거래상태</th>
                    <th>비고</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="supplierInfoList">
                    <template v-if="supplierInfoList.supplierCnt > 0">
                        <tr
                            v-for="supplierInfo in supplierInfoList.supplier"
                            :key="supplierInfo.supplyId"
                            :class="{
                                highlight: isHighlighted(supplierInfo.supplyId),
                            }"
                        >
                            <td @click="openGrid(supplierInfo.supplyId)">
                                {{ supplierInfo.name }}
                            </td>
                            <td @click="openGrid(supplierInfo.supplyId)">
                                {{ supplierInfo.manager }}
                            </td>
                            <td @click="openGrid(supplierInfo.supplyId)">
                                {{ supplierInfo.phone }}
                            </td>
                            <td @click="openGrid(supplierInfo.supplyId)">
                                {{ supplierInfo.address }}
                            </td>
                            <td @click="openGrid(supplierInfo.supplyId)">
                                {{ supplierInfo.tradeState }}
                            </td>
                            <td>
                                <button
                                    @click="openModal(supplierInfo.supplyId)"
                                >
                                    수정
                                </button>
                            </td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr>
                            <td colspan="6">일치하는 검색 결과가 없습니다</td>
                        </tr>
                    </template>
                </template>
            </tbody>
        </table>
        <Pagination
            :totalItems="supplierInfoList?.supplierCnt"
            :items-per-page="5"
            :max-pages-shown="5"
            :onClick="refetch"
            v-model="cPage"
        />
        <template v-if="supplierDetail">
            <table>
                <colgroup>
                    <col width="20%" />
                    <col width="20%" />
                    <col width="20%" />
                    <col width="20%" />
                    <col width="20%" />
                </colgroup>
                <thead>
                    <tr>
                        <th>납품업체명</th>
                        <th>제품분류</th>
                        <th>제품번호</th>
                        <th>제품명</th>
                        <th>납품 단가</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="supplierDetail.productCnt > 0">
                        <tr
                            v-for="list in supplierDetail.productList"
                            :key="list.productId"
                        >
                            <td>{{ list.supplyName }}</td>
                            <td>{{ list.detailName }}</td>
                            <td>{{ list.productNumber }}</td>
                            <td>{{ list.name }}</td>
                            <td>{{ list.sellPrice }}</td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr>
                            <td colspan="4">일치하는 검색 결과가 없습니다</td>
                        </tr>
                    </template>
                </tbody>
            </table>
            <Pagination
                :totalItems="supplierDetail?.productCnt"
                :items-per-page="5"
                :max-pages-shown="5"
                :onClick="() => searchDetailList(gridFlag)"
                v-model="cPageDetail"
            />
        </template>
    </div>
</template>
<style lang="scss" scoped>
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
        cursor: pointer;
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

.highlight {
    background-color: #b8b8b8;
}
</style>
