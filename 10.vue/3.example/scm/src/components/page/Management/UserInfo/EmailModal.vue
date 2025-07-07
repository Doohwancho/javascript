<script setup>
import { onMounted, ref } from 'vue';
import { useModalStore2 } from '../../../../stores/modalState';
import axios from 'axios';
import Swal from 'sweetalert2';

const modalState2 = useModalStore2();
const { email } = defineProps(['email']);
const emit = defineEmits([`changeSuccess`]);
const chageEmail = ref();
const emailCheck = ref(false);

const checkEmail = () => {
    const emailRules =
        /^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (!emailRules.test(chageEmail.value)) {
        Swal.fire('이메일 형식이 맞지 않습니다!', '', 'warning');
        return;
    }
    axios
        .post('/api/check_emailJson.do', {
            email: chageEmail.value,
        })
        .then(res => {
            if (res.data === 0) {
                Swal.fire('사용가능한 이메일 입니다.', '', 'success');
                emailCheck.value = true;
            } else {
                Swal.fire('중복된 이메일이 존재합니다!', '', 'warning');
            }
        });
};

const changeEmail = () => {
    if (!emailCheck.value) {
        Swal.fire('이메일 중복체크를 진행해 주세요!', '', 'warning');
        return;
    }
    emit('changeSuccess', chageEmail.value);
};

onMounted(() => (chageEmail.value = email));
</script>
<template>
    <Teleport to="body">
        <div class="backdrop">
            <div class="container">
                <div>
                    <h2 style="text-align: center">이메일 변경</h2>
                    <table>
                        <tr>
                            <th>변경할 이메일</th>
                            <td><input type="text" v-model="chageEmail" /></td>
                            <td>
                                <button @click="checkEmail">중복 확인</button>
                            </td>
                        </tr>
                    </table>
                    <div class="button_area">
                        <button class="button" @click="changeEmail">
                            이메일 변경
                        </button>
                        <button
                            @click="
                                modalState2.modalState2 =
                                    !modalState2.modalState2
                            "
                            class="button"
                        >
                            닫기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>
<style lang="scss" scoped>
.backdrop {
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    flex-flow: row wrep;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10;
    font-weight: bold;
}

label {
    display: flex;
    flex-direction: column;
}

input[type='text'] {
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
}
input {
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
    width: 210px;
}
select {
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
    width: 230px;
}

.Abutton {
    width: 120px;
    text-align: center;
    margin-left: 20px;
}

.big_input {
    width: 480px;
}

.button_area {
    width: 100%;
    display: flex;
    justify-content: center;
}

.container {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    position: relative;
    width: 550px;
    height: 250px;
    display: flex;
    justify-content: center;
}

img {
    width: 100px;
    height: 100px;
}

.img-label {
    margin-top: 10px;
    padding: 6px 25px;
    background-color: #ccc;
    border-radius: 4px;
    color: rgba(0, 0, 0, 0.9);
    cursor: pointer;

    &:hover {
        background-color: #45a049;
        color: white;
    }

    &:active {
        background-color: #3e8e41;
        box-shadow: 0 2px #666;
        transform: translateY(2px);
    }
}

.button-box {
    text-align: right;
    margin-top: 10px;
}
.button {
    background-color: #3bb2ea;
    border: none;
    color: white;
    padding: 10px 22px;
    text-align: right;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 12px;
    box-shadow: 0 4px #999;
    transition: 0.3s;

    &:hover {
        background-color: #45a049;
    }

    &:active {
        background-color: #3e8e41;
        box-shadow: 0 2px #666;
        transform: translateY(2px);
    }
}
table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
}

th {
    background: #f4f4f4;
    text-align: center;
}
</style>
