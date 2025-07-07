import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {

    const cartList = ref({});
    const triggerRefresh = ref(false);

    const setCartList = (newList) => {
        cartList.value = newList

    };

    return {
        cartList
        , setCartList
        , triggerRefresh
    }
})
