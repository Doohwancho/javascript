<script setup>
import { inject } from 'vue';

// inject: 상위 컴포넌트에서 제공한 'theme' 데이터를 주입받습니다.
const theme = inject('theme');
</script>

<template>
  <div class="receiver">
    <h4>Child Component (inject)</h4>
    <p>The current theme is: <strong>{{ theme }}</strong></p>
  </div>
</template>

<style scoped>
.receiver {
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>