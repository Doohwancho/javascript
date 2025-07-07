<script setup>
import { ref, computed } from 'vue';

const firstName = ref('Doohwan');
const lastName = ref('Cho');

// computed: 의존하는 데이터(firstName, lastName)가 바뀔 때만 재계산됩니다.
// 그 외에는 캐시된 값을 반환하여 성능을 최적화합니다.
const fullName = computed(() => {
  console.log('Calculating full name...'); // 의존 데이터 변경 시에만 출력됨
  return `${firstName.value} ${lastName.value}`;
});

const counter = ref(0);
</script>

<template>
  <div>
    <h2>3. 성능 최적화 (computed)</h2>
    <p>First Name: <input v-model="firstName"></p>
    <p>Last Name: <input v-model="lastName"></p>
    <p>Full Name: {{ fullName }}</p>
    <hr>
    <p> unrelated state: {{ counter }} </p>
    <button @click="counter++"> unrelated state button </button>
  </div>
</template>