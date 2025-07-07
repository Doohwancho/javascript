<template>
    <div class="divNoticeList">
        <NoticeModal v-if="modal.modalState" :id="noticeId" @modalClose="noticeId = $event"
            @postSuccess="onPostSuccess" />
        <table>
            <colgroup>
                <col width="10%" />
                <col width="50%" />
                <col width="30%" />
                <col width="10%" />
            </colgroup>

            <thead v-if="isSuccess">
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
                        <tr v-for="notice in noticeList.noticeList" :key="notice.notiSeq"
                            @click="handlerModal(notice.notiSeq)">
                            <td>{{ notice.notiSeq }}</td>
                            <td>{{ notice.notiTitle }}</td>
                            <td>{{ notice.notiDate }}</td>
                            <td>{{ notice.loginId }}</td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr>
                            <td colspan="7">일치하는 검색 결과가 없습니다</td>
                        </tr>
                    </template>
                </template>

                <div v-if="isLoading" class="backdrop">
                    <div class="spinner"></div>
                </div>

            </tbody>
        </table>
        <Pagination v-if="isSuccess" :totalItems="noticeList?.noticeCnt" :items-per-page="5" :max-pages-shown="10"
            :onClick="refetch" v-model="cPage" />
    </div>
</template>

<script setup>
import axios from 'axios';
import { inject, watch } from 'vue';
import { useModalStore } from '../../../../stores/modalState';
import { useQuery } from '@tanstack/vue-query';

const modal = useModalStore();
const noticeId = ref(0);
const cPage = ref(1);

const injectedValue = inject('selectValue')

const searchList = async () => {
    const param = new URLSearchParams({
        ...injectedValue.value,
        pageSize: 5,
        currentPage: cPage.value,
    });

    const response = await axios.post(
        '/api/system/noticeListBody.do',
        param
    );

    return response.data
};


const { data: noticeList, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ['noticeList', cPage.value, injectedValue],
    queryFn: searchList,
    // staleTime:1000 * 60,
    // useQuery 자체 캐시
    // gcTime:1000 * 60
})

const handlerModal = id => {
    noticeId.value = id;
    modal.setModalState();
};

const onPostSuccess = () => {
    modal.setModalState();
    searchList();
};

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
