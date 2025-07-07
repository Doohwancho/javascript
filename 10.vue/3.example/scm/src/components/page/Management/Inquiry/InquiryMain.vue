<script setup>
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useModalStore } from '../../../../stores/modalState';
import InquiryModal from './InquiryModal.vue';
import { useUserInfo } from '../../../../stores/userInfo';
import { inject } from 'vue';
import { useQuery } from '@tanstack/vue-query';

const modalState = useModalStore();
const inquiryId = ref(0);
const cPage = ref(1);

const userInfo = useUserInfo();

const injectedValue = inject('selectValue');
const flag = inject('prFlag');

const searchList = async () => {
    flag.value && (cPage.value = 1);
    const param = new URLSearchParams({
        ...injectedValue.value,
        pageSize: 5,
        currentPage: cPage.value,
        userType: userInfo.user.userType,
    });

    const result = await axios.post(
        '/api/management/inquiryListBody.do',
        param
    );

    return result.data;
};

const { data: inquiryList, refetch } = useQuery({
    queryKey: ['inquiryList', injectedValue], // 필수항목
    queryFn: searchList,
});

const handlerModal = id => {
    inquiryId.value = id;
    modalState.setModalState();
};

const onPostSuccess = () => {
    modalState.setModalState();
    refetch();
};
</script>
<template>
    <div>
        <InquiryModal
            v-if="modalState.modalState"
            :id="inquiryId"
            @postSuccess="onPostSuccess"
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
