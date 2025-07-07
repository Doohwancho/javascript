// React의 Redux Toolkit이나 Zustand 스토어와 유사한 역할을 합니다.
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

// 1. 'counter'라는 이름으로 스토어를 정의합니다.
export const useCounterStore = defineStore('counter', () => {
  // 2. State: ref()로 상태를 정의합니다.
  const count = ref(0);

  // 3. Getters: computed()로 계산된 상태를 정의합니다.
  const doubleCount = computed(() => count.value * 2);

  // 4. Actions: function으로 상태를 변경하는 로직을 정의합니다.
  function increment() {
    count.value++;
  }

  return { count, doubleCount, increment };
});