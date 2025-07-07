<script setup>
import { onMounted, ref} from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const emit = defineEmits([`modalClose`, 'postSuccess']);
const {id, date} = defineProps(['id', 'date']);

const detailList = ref();
const orderReturnDetail = ref();

const searchDetail = () => {
    const data = {
        supplyId: id,
        orderReturnDate: date,
        page: 1,
        isFirstLoat: true
    };

    axios.post('/api/delivery/orderReturnDetailListBody.do', data).then(res => {
        detailList.value = res.data; 
        orderReturnDetail.value = res.data.orderReturnDetail;
    });
};

const returnConfirm = () => {
    Swal.fire({
        title: "재고처리 하시겠습니까?",
        icon: "question",
        showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
        confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
        cancelButtonColor: "#d33", // cancel 버튼 색깔 지정
        confirmButtonText: "확인", // confirm 버튼 텍스트 지정
        cancelButtonText: "취소", // cancel 버튼 텍스트 지정
        reverseButtons: false, // 버튼 순서 거꾸로
    }).then((result) => {
        if (result.isConfirmed) {
            updateReturnInventory();
        }
    });
};

const updateReturnInventory = () => {
    const data = orderReturnDetail.value.reduce((acc, list) => {
        acc[list.returnId] = String(list.returnId);
        return acc
    }, {});
    axios.post('/api/delivery//returnProductInventoryUpdateBody.do', data).then(res => {
        if(res.data.result === "success") {
            emit('postSuccess');
            Swal.fire({
                icon: "success",
                title: "재고처리 완료",
                confirmButtonText: "확인",
            });
        } else {
            Swal.fire("재고처리 실패!", "", "error");
        }
    });
};

onMounted(() => {
    id && date && searchDetail(); 
});

</script>

<template>
  <div class="divOrdersReturnListDetail">
    <table>
        <colgroup>
            <col width="5%" />
            <col width="20%" />
            <col width="15%" />
            <col width="10%" />
            <col width="20%" />
            <col width="20%" />
            <col width="10%" />
        </colgroup>
        <thead>
            <tr>
                <th scope="col">No.</th>
                <th scope="col">장비번호</th>
                <th scope="col">장비구분</th>
                <th scope="col">모델번호</th>
                <th scope="col">모델명</th>
                <th scope="col">판매가격</th>
                <th scope="col">수량</th>
            </tr>
        </thead>
        <tbody>
            <template v-if="detailList">
                <tr
                    v-for="(detail, index) in detailList.orderReturnDetail"
                    :key="detail.returnId"
                >
                    <td>{{ index + 1 }}</td>
                    <td>{{ detail.categoryCode }}</td>
                    <td>{{ detail.categoryName }}</td>
                    <td>{{ detail.productNumber }}</td>
                    <td>{{ detail.productName }}</td>
                    <td>{{ detail.sellPrice }}</td>
                    <td>{{ detail.count }}</td>
                </tr>
            </template>
        </tbody>
    </table>
    <div class="button-box">
        <button @click="returnConfirm()">재고 처리</button>
        <button @click="emit('modalClose', '')">닫기</button>
    </div>
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
        background-color: #e0e0e0;
        color: #000;
    }

    /* 테이블 올렸을 때 */
    tbody tr:hover {
        background-color: #d3d3d3;
        opacity: 0.9;
        cursor: pointer;
    }
}

.button-box {
  text-align: center;
  margin-top: 10px;
}

button {
  background-color: #3bb2ea;
  border: none;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 6px;
  box-shadow: 0 2px #999;
  transition: 0.3s;
  margin: 5px;

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
