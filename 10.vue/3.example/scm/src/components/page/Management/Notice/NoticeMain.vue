<script setup>
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useModalStore } from '../../../../stores/modalState';
import NoticeModal from './NoticeModal.vue';
import Pagination from '../../../common/Pagination.vue';
import { inject, watch } from 'vue';
import { useQuery } from '@tanstack/vue-query';

const route = useRoute();
// const noticeList = ref();
const modalState = useModalStore();
const noticeId = ref(0);
const cPage = ref(1);

const injectedValue = inject('selectValue');
const flag = inject('prFlag');

const searchList = async () => {
    flag.value && (cPage.value = 1);
    const param = new URLSearchParams({
        // ...route.query,
        ...injectedValue.value,
        pageSize: 5,
        currentPage: cPage.value,
    });
    flag.value && (flag.value = false);

    const result = await axios.post('/api/management/noticeListBody.do', param);

    return result.data;

    // axios.post('/api/management/noticeListBody.do', param).then(res => {
    //     noticeList.value = res.data;
    // });
};

const {
    data: noticeList,
    isLoading,
    isSuccess,
    refetch,
} = useQuery({
    queryKey: ['noticeList', injectedValue], // 필수항목
    queryFn: searchList,
    // staleTime: 1000 * 60,
    // gcTime: 1000 * 60,
    // refetchInterval: 1000 * 10,
});

const handlerModal = id => {
    noticeId.value = id;
    modalState.setModalState();
};

const onPostSuccess = () => {
    modalState.setModalState();
    searchList();
};

// onMounted(() => {
//     searchList();
// });

// // watch(() => route.query, searchList);
// watch(injectedValue, searchList);
</script>

<template>
    <div class="divNoticeList">
        <NoticeModal
            v-if="modalState.modalState"
            :id="noticeId"
            @modalClose="noticeId = $event"
            @postSuccess="onPostSuccess"
        />
        현재 페이지: {{ cPage }} 총 개수: {{ noticeList?.noticeCnt }}
        <table>
            <colgroup>
                <col width="10%" />
                <col width="50%" />
                <col width="30%" />
                <col width="10%" />
            </colgroup>

            <thead>
                <tr>
                    <th scope="col">번호</th>
                    <th scope="col">제목</th>
                    <th scope="col">작성일</th>
                    <th scope="col">작성자</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="isSuccess">
                    <template v-if="noticeList.noticeCnt > 0">
                        <tr
                            v-for="notice in noticeList.noticeList"
                            :key="notice.noticeId"
                            @click="handlerModal(notice.noticeId)"
                        >
                            <td>{{ notice.noticeId }}</td>
                            <td>{{ notice.title }}</td>
                            <td>{{ notice.createdDate.substr(0, 10) }}</td>
                            <td>{{ notice.author }}</td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr>
                            <td colspan="4">일치하는 검색 결과가 없습니다</td>
                        </tr>
                    </template>
                </template>
                <template v-if="isLoading">로딩중...</template>
            </tbody>
        </table>
        <Pagination
            :totalItems="noticeList?.noticeCnt"
            :items-per-page="5"
            :max-pages-shown="5"
            :onClick="refetch"
            v-model="cPage"
        />
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
</style>
