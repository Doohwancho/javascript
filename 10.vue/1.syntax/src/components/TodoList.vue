<script setup>
import { ref, onMounted } from 'vue';

// 1. 'updateTotal' 이벤트를 정의합니다.
const emit = defineEmits(['updateTotal']);

let id = 0;
const newTodo = ref('');
const todos = ref([
  { id: id++, text: 'Learn Vue Basics', completed: true },
  { id: id++, text: 'Build a Project', completed: false },
]);

function addTodo() {
  if (newTodo.value.trim() === '') return;
  todos.value.push({ id: id++, text: newTodo.value, completed: false });
  newTodo.value = '';
  // 2. 할 일이 추가된 후, 현재 총개수를 이벤트로 보냅니다.
  emit('updateTotal', todos.value.length);
}

function removeTodo(todo) {
  todos.value = todos.value.filter((t) => t !== todo);
  // 3. 할 일이 삭제된 후, 현재 총개수를 이벤트로 보냅니다.
  emit('updateTotal', todos.value.length);
}

// 4. 컴포넌트가 처음 화면에 나타났을 때 초기 개수를 보냅니다.
onMounted(() => {
  emit('updateTotal', todos.value.length);
});
</script>

<template>
  <h2>Vue To-Do List</h2>
  <form @submit.prevent="addTodo">
    <!-- v-model은 양방향 바인딩을 해준다. -->
    <!-- 1. newTodo 변수의 값을 <input> 창에 보여줍니다 (단방향). -->
    <!-- 2. 사용자가 <input> 창에 글자를 입력하면, 그 내용이 자동으로 newTodo 변수에 업데이트됩니다 (단방향, 반대).-->
    <!-- 이처럼 데이터와 화면 요소가 서로를 업데이트하는 것을 양방향 바인딩이라고 부릅니다. todo.completed와 연결된 체크박스도 마찬가지입니다. --> 
    <input v-model="newTodo" placeholder="Add a new to-do...">
    <button type="submit">Add</button>
  </form>
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      <!-- 이처럼 데이터와 화면 요소가 서로를 업데이트하는 것을 양방향 바인딩이라고 부릅니다. todo.completed와 연결된 체크박스도 마찬가지입니다. --> 
      <input type="checkbox" v-model="todo.completed">
      <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
      <button @click="removeTodo(todo)" class="remove-btn">Remove</button>
    </li>
  </ul>
</template>

<style scoped>
/* 스타일은 이전과 동일합니다. */
h2 { color: #42b883; }
form { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
input[type="text"] { flex-grow: 1; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; }
button { padding: 0.5rem 1rem; border: none; background-color: #42b883; color: white; border-radius: 4px; cursor: pointer; }
button:hover { background-color: #33a06f; }
ul { list-style-type: none; padding: 0; }
li { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0; border-bottom: 1px solid #eee; }
li span { flex-grow: 1; }
.completed { text-decoration: line-through; color: #888; }
.remove-btn { background-color: #e53e3e; font-size: 0.8rem; padding: 0.2rem 0.5rem; }
.remove-btn:hover { background-color: #c53030; }
</style>