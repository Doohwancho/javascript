<template>
    <div class="divManage">
        <ManageModal
            v-if="modal.modalState"
            :id="detail_code"
            @modalClose="detail_code = $event"
            @postSuccess="onPostSuccess"
        />
        <table>
            <thead>
                <tr>
                    <th>계정대분류코드</th>
                    <th>계정대분류명</th>
                    <th>계정세부코드</th>
                    <th>계정세부명</th>
                    <th>구분</th>
                    <th>상세내용</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="accountList">
                    <tr
                        v-for="account in accountList.account"
                        :key="account.detail_code"
                        @click="handlerModal(account.detail_code)"
                    >
                        <td>{{ account.group_code }}</td>
                        <td>{{ account.group_name }}</td>
                        <td>{{ account.detail_code }}</td>
                        <td>{{ account.detail_name }}</td>
                        <td>{{ account.code_type }}</td>
                        <td>{{ account.content }}</td>
                    </tr>
                </template>
                <template v-else>
                    <tr>
                        <td colspan="7">일치하는 검색 결과가 없습니다</td>
                    </tr>
                </template>
            </tbody>
        </table>
        <Pagination
            :totalItems="accountList?.accountCnt"
            :items-per-page="5"
            :max-pages-shown="10"
            :onClick="searchList"
            v-model="cPage"
        />
    </div>
</template>

<script setup>
import axios from 'axios';
import { watch } from 'vue';
import { useModalStore } from '../../../../stores/modalState';
const route = useRoute();
const accountList = ref();
const modal = useModalStore();
const cPage = ref(1);
const detail_code = ref(0);

const searchList = async () => {
    const param = new URLSearchParams({
        ...route.query,
        pageSize: 5,
        currentPage: cPage.value,
    });

    try {
        const response = await axios.post('/api/account/accountList.do', param);
        accountList.value = response.data;
    } catch (e) {
        console.error('Axios Error:', e);
    }
};

const handlerModal = id => {
    detail_code.value = id;
    modal.setModalState();
};

const onPostSuccess = () => {
    modal.setModalState();
    searchList();
};

onMounted(() => {
    searchList();
});

watch(() => route.query, searchList);
</script>

<style lang="scss" scoped>
table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0px 0px 0px;
    font-size: 18px;

    th,
    td {
        border: 1px solid #ddd;
        padding: 10px;
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
