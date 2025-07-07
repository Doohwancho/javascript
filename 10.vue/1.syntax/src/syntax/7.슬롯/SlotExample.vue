<script setup>
import BaseCard from './BaseCard.vue';
</script>

// Q. what is slot?
// A. 부모 컴포넌트에서 자식 컴포넌트에 데이터를 전달하는 방법. 
//    데이터를 전달하는게 아니라 html을 전달해줌. 부모로부터. 

<template>
  <div>
    <h2>7. 슬롯 예제</h2>

    <BaseCard>
      <template #header>
        <h3>Card Title</h3>
      </template>

      <p>This is the main content passed to the default slot.</p>
    </BaseCard>

    <BaseCard>
      <p>This card only has default content.</p>
    </BaseCard>
  </div>
</template>