<script setup>
import { ref, onMounted, watch } from 'vue';

const count = ref(0);
const data = ref(null);

// onMounted: 컴포넌트가 처음 마운트된 후 한 번 실행됩니다.
// (React: useEffect(..., []))
onMounted(() => {
  console.log('Component has been mounted!');
  // 예: 초기 데이터 API 호출
  data.value = 'Initial data loaded.';
});

// watch: 특정 데이터(count)의 변경을 감지하고 실행됩니다.
// (React: useEffect(..., [count]))
watch(count, (newCount, oldCount) => {
  console.log(`Count changed from ${oldCount} to ${newCount}`);
  data.value = `Data updated based on count: ${newCount}`;
});
</script>

<template>
  <div>
    <h2>2. 생명주기 (onMounted, watch)</h2>
    <p>Count: {{ count }}</p>
    <p>Data: {{ data }}</p>
    <button @click="count++">Increment Count</button>
  </div>
</template>