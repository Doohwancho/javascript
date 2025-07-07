<script setup>
// defineProps로 부모로부터 받을 props를 정의합니다.
const props = defineProps(['message']);
</script>

<template>
  <p>Message from parent: {{ props.message }}</p>
</template>