<template>
    <div class="search-container">
        <div class="search-box">
            <div>
                <label>계정대분류 : </label>
                <select v-model="searchGroup">
                    <option value="">선택</option>
                    <option value="AC01">온라인매출</option>
                    <option value="AC02">영업매출</option>
                    <option value="AC03">온라인지출</option>
                    <option value="AC04">영업지출</option>
                    <option value="AC05">유동자산</option>
                </select>
            </div>
            <div>
                <label>계정세부명 : </label>
                <input v-model.lazy="searchDetail" placeholder="검색어 입력" />
            </div>
            <div>
                <label>구분 : </label>
                <select v-model="searchCodeType">
                    <option value="">선택</option>
                    <option value="수입">수입</option>
                    <option value="지출">지출</option>
                </select>
            </div>
            <button @click="handleSearch">검색</button>
            <label class="toggle-switch">
                <input
                    type="checkbox"
                    v-model="showInactive"
                    true-value="true"
                    false-value=""
                />
                <span class="slider"></span>
                <span class="status-text">
                    {{ showInactive === 'true' ? '미사용 코드' : '사용 코드' }}
                </span>
            </label>
        </div>
        <div class="register-box">
            <button @click="setModalState">등록</button>
        </div>
    </div>
</template>

<script setup>
import router from '@/router';
import { onMounted } from 'vue';
import { useModalStore } from '../../../../stores/modalState';
const { setModalState } = useModalStore();
const searchGroup = ref('');
const searchDetail = ref('');
const searchCodeType = ref('');
const showInactive = ref(false);

const handleSearch = () => {
    const query = [];
    !searchGroup.value || query.push(`searchGroup=${searchGroup.value}`);
    !searchDetail.value || query.push(`searchDetail=${searchDetail.value}`);
    !searchCodeType.value ||
        query.push(`searchCode_type=${searchCodeType.value}`);
    showInactive.value && query.push('showInactive=true');
    const queryString = query.length > 0 ? `?${query.join('&')}` : '';

    router.push(queryString);
};

onMounted(() => {
    window.location.search && router.replace(window.location.pathname);
});

watch(showInactive, () => {
    handleSearch();
});
</script>

<style lang="scss" scoped>
.toggle-switch {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    margin-left: 10px;

    input {
        display: none;
    }

    .slider {
        position: relative;
        width: 40px;
        height: 20px;
        background-color: #ccc;
        border-radius: 34px;
        transition: 0.4s;
        margin-right: 8px;
    }

    .slider::before {
        content: '';
        position: absolute;
        height: 16px;
        width: 16px;
        left: 2px;
        bottom: 2px;
        background-color: white;
        border-radius: 50%;
        transition: 0.4s;
    }

    input:checked + .slider {
        background-color: #3bb2ea;
    }

    input:checked + .slider::before {
        transform: translateX(20px);
    }

    .status-text {
        font-size: 14px;
        width: 80px; /* 고정 너비 */
        text-align: center;
        display: inline-block;
    }
}
.search-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.search-box {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 12px 15px;
    margin: 10px 0;
}
.register-box {
    display: flex;
    justify-content: flex-end;
}
select,
input {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
}
button {
    width: 70px;
    padding: 8px;
    font-size: 12px;
    cursor: pointer;
    border-radius: 12px;
    box-shadow: 0 4px #999;
    background-color: #3bb2ea;
    color: white;
    border: none;

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
