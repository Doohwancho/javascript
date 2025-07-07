<template>
    <teleport to="body">
        <div class="backdrop">
            <div class="container">
                <dt>
                    <strong>부서관리</strong>
                </dt>
                <table>
                    <tbody>
                        <tr>
                            <th>부서코드<span class='font_red'>*</span></th>
                            <td>
                                <input type="text" name="detailCode" v-model="dpDetail.detailCode">
                            </td>
                        </tr>
                        <tr>
                            <th>부서명<span class='font_red'>*</span></th>
                            <td>
                                <input type="text" name="detailName" v-model="dpDetail.detailName">
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="button-box">
                    <button type="button" @click="detailCode ? departMentUpdate() : departMentSave()">{{ detailCode
                        ? '수정' : '등록'
                    }}</button>
                    <button type="button" @click="setModalState">취소</button>
                </div>

            </div>
        </div>
    </teleport>
</template>
<script setup>
import axios from 'axios';
import { onUnmounted } from 'vue';
import Swal from "sweetalert2";
import { useModalStore } from '../../../../stores/modalState';
import { useMutation, useQuery, useQueryClient  } from '@tanstack/vue-query';
const { detailCode } = defineProps(['detailCode'])
const dpDetail = ref({})
const oldDetailCode = ref("")
const emit = defineEmits(['modalClose', 'saveSuccess'])
const { setModalState } = useModalStore()
const queryClient = useQueryClient()


const searchDetail = async () => {
    const res = await axios.post('/api/system/departmentDetailBody', { detailCode })
    return res.data.detail
}

const { data: queryData, isSuccess } = useQuery({
    queryKey: ['dpDetail', detailCode],
    queryFn: searchDetail,
    staleTime: 1000 * 60 * 5,
    enabled: !!detailCode
})

watchEffect(() => {
    if (isSuccess && queryData.value) {
        dpDetail.value = { ...queryData.value }
        oldDetailCode.value = queryData.value.detailCode
    }
})


const dpSave = async () => {
    if (!checkNotEmpty()) {
        return
    }
    const param = new URLSearchParams(dpDetail.value)
    return await axios.post('/api/system/departmentSave', param)
}

const { mutate: departMentSave } = useMutation({
    mutationKey: ['dpSave'],
    mutationFn: dpSave,
    onSuccess: result => {
        if (result.data.result === "success") {
            Swal.fire({
                icon: "success",
                title: `${result.data.message}`,
                confirmButtonText: "확인",
            }).then((res) => {
                if (res.isConfirmed) {
                    setModalState()
                    queryClient.invalidateQueries({ queryKey: ["departMentList"] })
                }
            })
        } else {
            Swal.fire({
                icon: "error",
                title: `${result.data.message}`,
                confirmButtonText: "확인",
            }).then((res) => {
                if (res.isConfirmed) {
                    setModalState()
                    queryClient.invalidateQueries({ queryKey: ["departMentList"] })
                }
            })
        }
    }
})

const dpUpdate = async () => {
    if (!checkNotEmpty()) {
        return
    }
    const param = new URLSearchParams({
        oldDetailCode: oldDetailCode.value,
        newDetailCode: dpDetail.value.detailCode,
        detailName: dpDetail.value.detailName
    })
    return await axios.post('/api/system/departmentUpdate', param)
}

const { mutate: departMentUpdate } = useMutation({
    mutationKey: ['dpUpdate'],
    mutationFn: dpUpdate,
    onSuccess: result => {
        if (result.data.result === "success") {
            Swal.fire({
                icon: "success",
                title: `${result.data.message}`,
                confirmButtonText: "확인",
            }).then((res) => {
                if (res.isConfirmed) {
                    setModalState()
                    queryClient.invalidateQueries({ queryKey: ["departMentList"] })
                    queryClient.invalidateQueries({ queryKey: ["noticeDetail", id], exact:true })
                }
            })
        } else {
            Swal.fire({
                icon: "error",
                title: `${result.data.message}`,
                confirmButtonText: "확인",
            }).then((res) => {
                if (res.isConfirmed) {
                    setModalState()
                    queryClient.invalidateQueries({ queryKey: ["departMentList"] })
                }
            })
        }
    }
})


const checkNotEmpty = () => {
    const fields = [
        { id: 'detailCode', message: '부서코드를 입력해주세요.' },
        { id: 'detailName', message: '부서명을 입력해주세요.' }
    ];

    for (let i = 0; i < fields.length; i++) {
        const { id, message } = fields[i];
        const value = dpDetail.value[id];

        if (!value || value.trim() === "") {
            Swal.fire(message, "", "warning").then(() => {
                focusInput(i); // input 포커스 함수
            });
            return false; // 검증 실패 시 종료
        }
    }

    return true
};

onUnmounted(() => {
    emit('modalClose', 0)
})

</script>
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
    z-index: 1;
    font-weight: bold;
}

input[type='text'] {
    width: 90%;
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
}

.container {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    position: relative;
    width: 400px;
}

dt {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    background-color: #3498db;
    color: white;
    padding: 10px;
    /* 텍스트와 배경 사이 간격 추가 */
    border-radius: 6px;
    /* 둥근 모서리 효과 */
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
}

th {
    background: #f4f4f4;
    text-align: center;
}

.font_red {
    color: #fe1414;
}

.button-box {
    text-align: right;
    margin-top: 10px;
}

button {
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
</style>