<script setup>
import ShoppingListMain from '../../components/page/Delivery/ShoppingList/ShoppingListMain.vue';
import ShoppingListSearch from '../../components/page/Delivery/ShoppingList/ShoppingListSearch.vue';
</script>

<template>
  <ContextBox>주문 배송 목록</ContextBox>  
  <ShoppingListSearch />
  <ShoppingListMain />
</template>