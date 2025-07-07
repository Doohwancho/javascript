<script setup>
import axios from 'axios';
import { ref, onMounted, onUnmounted, reactive } from 'vue';
import { useModalStore } from '../../../../stores/modalState';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';

// 우편번호
const postcode = ref('');
const modalState = useModalStore();
const roadAddress = ref('');
const queryClient = useQueryClient();

const isScriptLoaded = ref(false); // 스크립트 로딩 상태를 추적하는 변수
const saveData = reactive({
    bank: '',
    bank_account: '',
    biz_num: '',
    client_name: '',
    detail_addr: '',
    email: '',
    memo: '',
    person: '',
    person_ph: '',
    ph: '',
});

// 다음 우편번호 스크립트 로드
const loadDaumPostcodeScript = () => {
    const script = document.createElement('script');
    script.src =
        '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.onload = () => {
        isScriptLoaded.value = true; // 스크립트가 로드되면 isScriptLoaded를 true로 설정
    };
    document.head.appendChild(script);
};

onMounted(() => {
    loadDaumPostcodeScript();
});

const execDaumPostcode = () => {
    if (isScriptLoaded.value && window.daum && window.daum.Postcode) {
        new daum.Postcode({
            oncomplete: data => {
                postcode.value = data.zonecode;
                roadAddress.value = data.address;
            },
        }).open();
    } else {
        console.error('Daum Postcode 스크립트가 로드되지 않았습니다.');
    }
};

// 전화번호 포맷팅 함수
function formatPhoneNumber(phone) {
    return phone.replace(/^(\d{3})(\d{4})(\d{4})$/, '$1-$2-$3');
}

// 사업자 번호 포맷팅 함수
function formatBizNumber(bizNum) {
    return bizNum.replace(/^(\d{3})(\d{4})(\d{4})$/, '$1-$2-$3');
}

// 계좌번호 포맷팅 함수
function formatBankAccount(account) {
    return account.replace(/^(\d{3})(\d{3})(\d{6})$/, '$1-$2-$3');
}

const emit = defineEmits(['modalClose', 'postSuccess']);

// 저장 함수
const saveClient = async () => {
    // ✅ 유효성 검사
    if (!saveData.client_name || saveData.client_name.trim() === '') {
        alert('거래처명을 입력해주세요.');
        return;
    }

    if (!saveData.biz_num || saveData.biz_num.trim() === '') {
        alert('사업자등록번호를 입력해주세요.');
        return;
    }

    if (!saveData.person || saveData.person.trim() === '') {
        alert('담당자명을 입력해주세요.');
        return;
    }

    if (!saveData.person_ph || saveData.person_ph.trim() === '') {
        alert('담당자 연락처를 입력해주세요.');
        return;
    }

    if (!saveData.ph || saveData.ph.trim() === '') {
        alert('회사 전화번호를 입력해주세요.');
        return;
    }

    if (!roadAddress.value || !postcode.value) {
        alert('주소 검색을 완료해주세요.');
        return;
    }

    const param = {
        ISBN: '',
        addr: roadAddress.value,
        bank: saveData.bank,
        bank_account: saveData.bank_account,
        biz_num: saveData.biz_num,
        client_name: saveData.client_name,
        detail_addr: saveData.detail_addr,
        email: saveData.email,
        memo: saveData.memo,
        person: saveData.person,
        person_ph: saveData.person_ph,
        ph: saveData.ph,
        zip: postcode.value,
    };
    const result = await axios.post(
        '/api/business/client-list/insertClientListBody.do',
        param
    );
    return result;
};

const { mutate: saveClientMutate } = useMutation({
    mutationKey: ['saveClient'],
    mutationFn: saveClient,
    onSuccess: result => {
        if (result.data.result === 'success') {
            modalState.setModalState();
            queryClient.invalidateQueries({ queryKey: ['clientList'] });
        }
    },
});
</script>

<template>
    <div>
        <teleport to="body">
            <div class="backdrop">
                <div class="container">
                    <h2>거래처 등록</h2>
                    <table>
                        <tbody>
                            <!-- 사원 -->
                            <tr>
                                <th class="table-header">
                                    거래처<span class="font_red">*</span>
                                </th>
                                <td>
                                    <input
                                        type="text"
                                        v-model="saveData.client_name"
                                    />
                                </td>
                                <th class="table-header">
                                    회사 연락처<span class="font_red">*</span>
                                </th>
                                <td>
                                    <input
                                        type="text"
                                        v-model="saveData.ph"
                                        @input="
                                            saveData.ph = formatPhoneNumber(
                                                saveData.ph
                                            )
                                        "
                                    />
                                </td>
                            </tr>

                            <!-- 제조사 -->
                            <tr>
                                <th class="table-header">
                                    담당자<span class="font_red">*</span>
                                </th>
                                <td>
                                    <input
                                        type="text"
                                        v-model="saveData.person"
                                    />
                                </td>
                                <th class="table-header">
                                    담당자 연락처<span class="font_red">*</span>
                                </th>
                                <td>
                                    <input
                                        type="text"
                                        v-model="saveData.person_ph"
                                        @input="
                                            saveData.person_ph =
                                                formatPhoneNumber(
                                                    saveData.person_ph
                                                )
                                        "
                                    />
                                </td>
                            </tr>

                            <!-- 거래처 -->
                            <tr>
                                <th class="table-header">
                                    우편번호<span class="font_red">*</span>
                                </th>
                                <td>
                                    <div class="postcode-group">
                                        <input
                                            class="post-code"
                                            type="text"
                                            v-model="postcode"
                                        />
                                        <button
                                            @click="execDaumPostcode"
                                            :disabled="!isScriptLoaded"
                                        >
                                            우편번호
                                        </button>
                                    </div>
                                </td>
                                <th class="table-header">
                                    주소<span class="font_red">*</span>
                                </th>
                                <td>
                                    <input type="text" v-model="roadAddress" />
                                </td>
                            </tr>

                            <!-- 메모 -->
                            <tr>
                                <th class="table-header">
                                    상세주소<span class="font_red">*</span>
                                </th>
                                <td>
                                    <input
                                        type="text"
                                        v-model="saveData.detail_addr"
                                    />
                                </td>
                                <th class="table-header">
                                    사업자 번호<span class="font_red">*</span>
                                </th>
                                <td>
                                    <input
                                        type="text"
                                        v-model="saveData.biz_num"
                                        @input="
                                            saveData.biz_num = formatBizNumber(
                                                saveData.biz_num
                                            )
                                        "
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th class="table-header">
                                    은행<span class="font_red">*</span>
                                </th>
                                <td>
                                    <select v-model="saveData.bank">
                                        <option value="" disabled>전체</option>
                                        <option value="신한은행">
                                            신한은행
                                        </option>
                                        <option value="하나은행">
                                            하나은행
                                        </option>
                                        <option value="우리은행">
                                            우리은행
                                        </option>
                                        <option value="기타은행">
                                            기타은행
                                        </option>
                                    </select>
                                </td>
                                <th class="table-header">
                                    계좌번호<span class="font_red">*</span>
                                </th>
                                <td>
                                    <input
                                        type="text"
                                        v-model="saveData.bank_account"
                                        @input="
                                            saveData.bank_account =
                                                formatBankAccount(
                                                    saveData.bank_account
                                                )
                                        "
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th class="table-header">
                                    이메일<span class="font_red">*</span>
                                </th>
                                <td>
                                    <input
                                        type="text"
                                        v-model="saveData.email"
                                    />
                                </td>
                                <th class="table-header">메모</th>
                                <td>
                                    <input
                                        type="text"
                                        v-model="saveData.memo"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="button-container">
                        <button @click="saveClientMutate()">등록</button>
                        <button
                            type="button"
                            @click="modalState.setModalState()"
                        >
                            취소
                        </button>
                    </div>
                </div>
            </div>
        </teleport>
    </div>
</template>

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
}

.container {
    background: white;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    width: 1000px;
    font-size: 14px;
}

h2 {
    font-size: 24px;
    margin-bottom: 20px;
    font-weight: bold;
    text-align: center;
    background-color: #f0f0f0; /* 회색 배경 */
    padding: 10px 0; /* 여백 추가 */
    border-bottom: 2px solid #ccc; /* 제목 아래 선 추가 */
}

table {
    width: 100%;
    border-spacing: 0;
    margin-bottom: 20px;
}

th.table-header {
    background-color: #f0f0f0;
    padding: 12px 15px;
    font-weight: bold;
    border-right: 2px solid #ccc; /* 선 추가 */
    text-align: left;
    width: 150px;
}

td {
    padding: 12px 15px;
}

input[type='text'],
input[type='date'],
select {
    width: 90%;
    padding: 10px;
    margin-top: 5px;
    margin-bottom: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
}

.postcode-group {
    display: flex;
    align-items: center;
    gap: 10px;

    .post-code {
        flex: 1;
        width: auto; // 필요시 너비 자동 조정
    }

    button {
        flex-shrink: 0; // 버튼 크기 줄어들지 않도록
    }
}

button {
    background-color: #3bb2ea;
    border: none;
    color: white;
    padding: 10px 22px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 10px 0;
    cursor: pointer;
    border-radius: 12px;
    box-shadow: 0 4px #999;
    transition: 0.3s;
    width: 110px;
    height: 45px;
    margin: 4px 2px;
}

button:hover {
    background-color: #45a049;
}

button:active {
    background-color: #3e8e41;
    box-shadow: 0 2px #666;
    transform: translateY(2px);
}

.button-box button {
    width: 48%;
}

/* 버튼을 오른쪽 정렬하기 위한 스타일 */
.button-container {
    display: flex;
    justify-content: flex-end; /* 오른쪽 정렬 */
    margin-bottom: 20px;
}

input[type='text']:focus,
input[type='date']:focus,
select:focus {
    border-color: #3bb2ea;
    outline: none;
}

.font_red {
    color: #fe1414;
}
</style>
