<script setup>
import { ref } from 'vue';

// 1. 어떤 이벤트를 발생시킬지 정의합니다.
const emit = defineEmits(['countChanged']);

const count = ref(0);

const increment = () => {
  count.value++;
  // 2. 'countChanged' 이벤트를 발생시키고, 현재 count 값을 함께 보냅니다.
  emit('countChanged', count.value);
};
</script>

<template>
  <h2>Simple Counter</h2>
  <p class="count">{{ count }}</p>
  <button @click="increment">Increment</button>
</template>

<style scoped>
/* 스타일은 이전과 동일합니다. */
.count { font-size: 2.5rem; font-weight: bold; text-align: center; margin: 1rem 0; }
button { padding: 0.5rem 1rem; border: none; background-color: #42b883; color: white; border-radius: 4px; cursor: pointer; }
button:hover { background-color: #33a06f; }
</style>