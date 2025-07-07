<script setup>
import { ref, reactive } from 'vue';

// ref: 문자열, 숫자 등 단일 값을 위한 반응형 상태
const message = ref('Hello Vue!');

// reactive: 객체나 배열을 위한 반응형 상태
const user = reactive({
  name: 'Doohwan',
  age: 30
});

function changeUser() {
  message.value = 'State changed!';
  user.name = 'Cho';
  user.age++;
}
</script>

<template>
  <div>
    <h2>1. 상태 관리 (ref, reactive)</h2>
    <p>Message: {{ message }}</p>
    <p>User: {{ user.name }}, Age: {{ user.age }}</p>
    <button @click="changeUser">Change State</button>
  </div>
</template>