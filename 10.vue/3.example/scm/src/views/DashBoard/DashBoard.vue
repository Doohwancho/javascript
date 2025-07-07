<template>
    <ul class="dashboard-ul">
        <li class="menu-bar">
            <LeftManuBar></LeftManuBar>
        </li>
        <li class="content">
            <template v-if="$route.path !== '/vue'">
                <keep-alive><router-view></router-view></keep-alive>
            </template>
            <template v-else>
                <ContextBox>메인</ContextBox>
                <div class="custom-border">
                    <iframe
                        :ref="el => setIframeRef(el)"
                        :src="'/vue/management/notice'"
                        @load="onIframeLoad"
                    ></iframe>
                </div>
                <template v-if="userInfo.user.userType">
                    <div class="custom-border">
                        <iframe
                            v-for="(iframeSrc, index) in iframeSrcs(
                                userInfo.user.userType
                            )"
                            :key="index"
                            :ref="el => setIframeRef(el)"
                            :src="iframeSrc"
                            @load="onIframeLoad"
                        ></iframe>
                    </div>
                </template>
            </template>
        </li>
    </ul>
</template>

<script setup>
import LeftManuBar from '../../components/common/LeftManuBar.vue';

import ContextBox from '../../components/common/ContextBox.vue';
import { useUserInfo } from '../../stores/userInfo';

const userInfo = useUserInfo();

// 사용자의 iframe src 목록
const iframeSrcs = userType => {
    const ArrIframeSrcs = [];
    if (userType === 'S') {
        ArrIframeSrcs.push(
            '/vue/trade/shopping-orders',
            '/vue/trade/shopping-return-list',
            '/vue/trade/inventory'
        );
    } else if (userType === 'E') {
        ArrIframeSrcs.push('/vue/sales/top-sales', '/vue/sales/performance');
    } else if (userType === 'P') {
        ArrIframeSrcs.push(
            '/vue/tasks/orders-list',
            '/vue/tasks/orders-return-list'
        );
    } else if (userType === 'D') {
        ArrIframeSrcs.push(
            '/vue/delivery/shopping-list',
            '/vue/delivery/shopping-return-list',
            '/vue/delivery/orders-list',
            '/vue/delivery/orders-return-list'
        );
    } else if (userType === 'C') {
        ArrIframeSrcs.push(
            '/vue/mall/products',
            '/vue/mall/cart',
            '/vue/mall/history'
        );
    }
    return ArrIframeSrcs;
};

// iframe 참조 (배열로 관리)
const iframeRefs = ref([]);

// iframe 로드 후 특정 요소를 제거하는 함수
const onIframeLoad = () => {
    iframeRefs.value.forEach(iframe => {
        const iframeDoc =
            iframe.contentDocument || iframe.contentWindow.document;
        if (iframeDoc) {
            const menuBar = iframeDoc.querySelector('.menu-bar');
            if (menuBar) menuBar.remove(); // menubar 요소 제거
        }
    });
};

// 각 iframe 요소를 ref 배열에 추가
const setIframeRef = el => {
    if (el && !iframeRefs.value.includes(el)) {
        iframeRefs.value.push(el);
    }
};
</script>

<style scoped>
.dashboard-ul {
    list-style-type: none;
    display: flex;
    overflow: hidden;
}

.menu-bar {
    float: left;
}

.content {
    float: left;
    padding-left: 50px;
    padding-right: 10%;
    width: 77%;
    flex: 1;
}
.custom-border {
    border: 3px solid #d4af37;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    object-fit: cover;
    width: 99.5%;
    margin-top: 20px;
    margin-bottom: 50px;
}

iframe {
    width: 105%;
    height: 500px;
    border: 0;
    margin-left: 0.5px;
    margin-right: 0.5px;
    margin-top: 20px;
    margin-bottom: 2px;
}
</style>
