<script setup>
// 1. 위에서 만든 스토어를 가져옵니다.
import { useCounterStore } from './stores/counterStore';

// 2. 스토어 인스턴스를 생성하여 사용합니다.
const store = useCounterStore();
</script>

<template>
  <div>
    <h2>9. Pinia 예제</h2>
    <p>Current Count: {{ store.count }}</p>
    <p>Double Count: {{ store.doubleCount }}</p>

    <button @click="store.increment">Increment</button>
  </div>
</template>