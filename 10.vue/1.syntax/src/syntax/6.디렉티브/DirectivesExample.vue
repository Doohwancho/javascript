<script setup>
import { ref } from 'vue';

// Q. what is directive?
// A. HTML 태그에 "특별한 기능이나 행동"을 지시하는 명령어. v-로 시작함. 
// ex) v-if, v-show, v-bind, v-model, v-on, v-for, v-text, v-html, v-once, v-pre, v-cloak, v-slot, v-memo, v-memo-with-key, v-memo-with-key-and-args, v-memo-with-key-and-args-and-slots, v-memo-with-key-and-args-and-slots-and-props, v-memo-with-key-and-args-and-slots-and-props-and-slots, v-memo-with-key-and-args-and-slots-and-props-and-slots-and-slots, v-memo-with-key-and-args-and-slots-and-props-and-slots-and-slots-and-slots, v-memo-with-key-and-args-and-slots-and-props-and-slots-and-slots-and-slots, v-memo-with-key-and-args-and-slots-and-props-and-slots-and-slots-and-slots-and-slots, v-memo-with-key-and-args-and-slots-and-props-and-slots-and-slots-and-slots-and-slots, v-memo-with-key-and-args-and-slots-and-props-and-slots-and-slots-and-slots-and-slots, v-memo-with-key-and-args-and-slots-and-props-and-slots-and-slots-and-slots-and-slots, v-memo-with-key-and-args-and-slots-and-props-and-slots-and-slots-and-slots-and-slots, v-memo-with-key-and-args-and-slots-and-props-and-slots-and-slots-and-slots-and-slots, v-memo-with-key-and-args-and-slots-and-props-and-slots-and-slots-and-slots-and-slots, v-memo-with-key-and-args-and-slots-and-props-and-slots-and-slots-and-slots-and-slots, v-memo-with-key-and-args-and-slots-and-props-and-slots-and-slots-and-slots-and-slots, v-memo-with-key-and-args-and-slots-and-props-and-slots-and-slots-and-slots-and-slots, v-memo-with-key-and-args-and-slots-and-props-and-slots-and-slots-and-slots-and-slots, v-memo-with-key-and-args-and-slots-and-props-and-slots-and-slots-and-slots-and-slots, v-memo-with-key-and-args-and-slots-and-props-and-slots-and-slots-and-slots-and-slots, v-memo-with-key-and-args-and-slots-and-props-and-slots-and-slots-and-slots-and-slots, v-memo-with-key-and-args-and-slots-and-props

// v-show와 v-if의 차이를 보기 위한 상태
const isVisible = ref(true);

// v-bind(:)로 동적 클래스를 적용하기 위한 상태
const hasError = ref(false);
</script>

<template>
  <div>
    <h2>6. 디렉티브 예제</h2>

    <button @click="isVisible = !isVisible">Toggle Visibility</button>
    
    <p v-if="isVisible">This paragraph uses v-if.</p>

    <p v-show="isVisible">This paragraph uses v-show.</p>
    
    <hr>

    <button @click="hasError = !hasError">Toggle Error Class</button>
    
    <p :class="{ 'error-text': hasError }">
      This text might have an error style.
    </p>

    <form @submit.prevent="alert('Submitted!')">
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<style scoped>
.error-text {
  color: red;
  font-weight: bold;
}
</style>