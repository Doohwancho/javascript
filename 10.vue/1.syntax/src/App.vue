<script setup>
import { ref } from 'vue';
import Counter from './components/Counter.vue';
import TodoList from './components/TodoList.vue';

// 1. 자식들로부터 받은 데이터를 저장할 상태 변수를 만듭니다.
const latestCount = ref(0);
const totalTodos = ref(0);

// 2. Counter 자식이 보낸 'countChanged' 이벤트를 처리할 함수
function handleCountChange(newCount) {
  console.log(`Received new count from child: ${newCount}`);
  latestCount.value = newCount;
}

// 3. TodoList 자식이 보낸 'updateTotal' 이벤트를 처리할 함수
function handleTodoUpdate(newTotal) {
  console.log(`Received new total from child: ${newTotal}`);
  totalTodos.value = newTotal;
}
</script>

<template>
  <main>
    <div class="card status">
      <h2>App Status (Parent)</h2>
      <p>Total To-Do items: <strong>{{ totalTodos }}</strong></p>
      <p>Latest counter value from child: <strong>{{ latestCount }}</strong></p>
    </div>

    <div class="card">
      <Counter @countChanged="handleCountChange" />
    </div>

    <div class="card">
      <TodoList @updateTotal="handleTodoUpdate" />
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 600px;
  margin: 2rem auto;
  font-family: sans-serif;
}

.card {
  border: 1px solid #ddd;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.status {
  background-color: #f0f8ff;
  border-left: 5px solid #42b883;
}
.status h2 {
    margin-top: 0;
}
.status p {
    margin: 0.5rem 0;
}
</style>