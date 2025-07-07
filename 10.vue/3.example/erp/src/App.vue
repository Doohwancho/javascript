<script setup>
import { RouterView, useRouter } from 'vue-router';
import { provide, ref, watch } from 'vue';
import { useUserInfo } from './stores/userInfo';


//세션 만료후 로그인창으로 이동 하기 

// const userInfo = useUserInfo();
// const router = useRouter();

// let hasLoggedInBefore = false; // 최초 로그인 여부 플래그

// watch(
//   () => userInfo.user?.empId,
//   (newVal) => {
//     const isLoginPage = router.currentRoute.value.path === '/';

//     if (!newVal) {
//       if (hasLoggedInBefore && !isLoginPage) {
//         alert('세션이 만료되었습니다. 다시 로그인 해주세요.');
//       }

//       if (!isLoginPage) {
//         router.push('/');
//       }
//     } else {
//       hasLoggedInBefore = true;
//     }
//   },
//   { immediate: true }
// );

const EmployeesearchParams = ref({});
provide('EmployeesearchParams', EmployeesearchParams);
const PromotionsearchParams = ref({});
provide('PromotionsearchParams', PromotionsearchParams);

</script>

<template>
    <RouterView />
</template>

<style>
body {
    -ms-overflow-style: none;
}
body::-webkit-scrollbar {
    display: none;
}
</style>
