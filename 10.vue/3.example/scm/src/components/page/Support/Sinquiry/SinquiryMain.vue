<script setup>
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useModalStore } from '../../../../stores/modalState';
import { useUserInfo } from '../../../../stores/userInfo';
import SinquiryModal from './SinquiryModal.vue';

const route = useRoute();
const inquiryList = ref();
const modalState = useModalStore();
const inquiryId = ref(0);
const cPage = ref(1);

const userInfo = useUserInfo();

const searchList = () => {
    const param = new URLSearchParams({
        ...route.query,
        pageSize: 5,
        currentPage: cPage.value,
        userType: userInfo.user.userType,
    });

    axios.post('/api/management/inquiryListBody.do', param).then(res => {
        inquiryList.value = res.data;
    });
};

const handlerModal = id => {
    inquiryId.value = id;
    modalState.setModalState();
};

const onPostSuccess = () => {
    modalState.setModalState();
    searchList();
};

onMounted(() => {
    searchList();
});
watch(() => route.query, searchList);
</script>
<template>
    <div>
        <SinquiryModal
            v-if="modalState.modalState"
            :id="inquiryId"
            @postSuccess="onPostSuccess"
            @modalClose="inquiryId = $event"
        />
        <table>
            <colgroup>
                <col width="10%" />
                <col width="15%" />
                <col width="30%" />
                <col width="20%" />
                <col width="10%" />
                <col width="15%" />
            </colgroup>
            <thead>
                <tr>
                    <th scope="col">문의 번호</th>
                    <th scope="col">카테고리</th>
                    <th scope="col">문의 제목</th>
                    <th scope="col">문의 날짜</th>
                    <th scope="col">답변 상태</th>
                    <th scope="col">작성자 아이디</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="inquiryList">
                    <template v-if="inquiryList.inquiryCnt > 0">
                        <tr
                            v-for="list in inquiryList.inquiry"
                            :key="list.inquiryId"
                            @click="handlerModal(list.inquiryId)"
                        >
                            <td>{{ list.inquiryId }}</td>
                            <td>{{ list.category }}</td>
                            <td>{{ list.title }}</td>
                            <td>{{ list.createdDate.substr(0, 10) }}</td>
                            <td>{{ list.ansState }}</td>
                            <td>{{ list.author }}</td>
                        </tr>
                    </template>
                </template>
            </tbody>
        </table>
        <Pagination
            :totalItems="inquiryList?.inquiryCnt"
            :items-per-page="5"
            :max-pages-shown="5"
            :onClick="searchList"
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
