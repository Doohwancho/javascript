<template>
    <teleport to="body">
        <div class="backdrop">
            <div class="container">
                <dt>
                    <strong>보험료율(근로자 부담)</strong>
                    <svg-icon @click="setModalState" class="icon" type="mdi" :path="path" :size="27"></svg-icon>
                </dt>
                <table>
                    <tbody>
                        <tr>
                            <th>국민연금</th>
                            <td>
                                <input type="text" value="4.5%">
                            </td>
                        </tr>
                        <tr>
                            <th>건강보험</th>
                            <td>
                                <input type="text" value="3.43%">
                            </td>
                        </tr>
                        <tr>
                            <th>고용보험</th>
                            <td>
                                <input type="text" value="0.8%">
                            </td>
                        </tr>
                        <tr>
                            <th>산재보험</th>
                            <td>
                                <input type="text" value="1.56%">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </teleport>
</template>
<script setup>
import { useModalStore } from '../../../../stores/modalState';
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiClose } from '@mdi/js'
const { setModalState } = useModalStore()
const path = mdiClose

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
    padding: 8px;
    font-size: 17px;
    font-weight: 550;
    margin-top: 5px;
    margin-bottom: 5px;
    margin-right: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
    pointer-events: none;
}

.container {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    position: relative;
    width: 400px;
}

.icon {
    cursor: pointer;
}


dt {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    background-color: #3498db;
    display: flex;
    color: white;
    padding: 10px;
    /* 텍스트와 배경 사이 간격 추가 */
    border-radius: 6px;
    /* 둥근 모서리 효과 */
    justify-content: space-between;
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
</style>