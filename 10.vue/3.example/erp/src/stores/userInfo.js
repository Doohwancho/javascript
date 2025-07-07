import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserInfo = defineStore(
    'userInfo',
    () => {
        const user = ref();
        async function setUserData(loginInfo) {
            const param = new URLSearchParams(loginInfo);
            const result = await axios.post('/api/loginProc.do', param);
            console.log(result.data.profileImage);
            console.log('help');
            user.value = result.data;
            return result.data.result;
        }

        return { user, setUserData };
    },
    { persist: { storage: sessionStorage } }
);
