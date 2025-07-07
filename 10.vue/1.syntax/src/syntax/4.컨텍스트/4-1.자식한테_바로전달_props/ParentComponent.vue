<script setup>
import { ref } from 'vue';
import ChildComponent from './ChildComponent.vue';

const messageForChild = ref("Hello from parent!");
</script>

<template>
  <div>
    <ChildComponent :message="messageForChild" />
  </div>
</template>