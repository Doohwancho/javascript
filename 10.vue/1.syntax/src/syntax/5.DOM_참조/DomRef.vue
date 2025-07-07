<script setup>
import { ref, onMounted } from 'vue';

// 1. 템플릿의 ref 속성과 같은 이름으로 ref를 선언합니다.
const myInput = ref(null);

function focusInput() {
  // 3. myInput.value를 통해 실제 DOM 요소에 접근합니다.
  myInput.value.focus();
}

onMounted(() => {
  // 컴포넌트 마운트 후 자동으로 포커스
  focusInput();
});
</script>

<template>
  <div>
    <h2>5. DOM 참조 (Template Ref)</h2>
    <input ref="myInput" type="text" placeholder="I will be focused">
    <button @click="focusInput">Focus Input</button>
  </div>
</template>