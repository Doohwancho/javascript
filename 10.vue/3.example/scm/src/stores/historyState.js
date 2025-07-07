import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useHistoryStore = defineStore('history', () => {

    const detailState = ref(false);
    const orderId = ref(0);
    const rendering = ref(false);

    const setDetailState = (id) => {
        if(orderId.value == id){
            detailState.value = false;
            orderId.value = '0';
            return
        }
        detailState.value = true;
        orderId.value = id;
    }

    const mainRendering = () => {
        rendering.value = true;
    }

    const reset = () => {
        rendering.value = false;
    }

    return{
        orderId, detailState, setDetailState
        , rendering, mainRendering, reset
    };
})