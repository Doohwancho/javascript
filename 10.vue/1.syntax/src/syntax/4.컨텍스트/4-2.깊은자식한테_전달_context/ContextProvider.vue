<script setup>
import { provide, ref } from 'vue';
import ContextReceiver from './ContextReceiver.vue';

const theme = ref('light');

// provide: 'theme'라는 키로 하위 컴포넌트에 데이터를 제공합니다.
// Q. react는 부모가 자식한테 데이터 전달할 떄 props로 전달했는데, vue는 provide로 전달하고 inject로 받나? 파라미터로 받는게 아니라?
// A. 
provide('theme', theme);

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
}
</script>

<template>
  <div>
    <h2>4. 컨텍스트 (Parent: provide)</h2>
    <button @click="toggleTheme">Toggle Theme</button>
    <p>
      <p>
        <ContextReceiver />
      </p>
    </p>
  </div>
</template>