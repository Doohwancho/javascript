//html + js
const getTodoElement = todo => {
  const {
    text,
    completed
  } = todo

  return `
  <li ${completed ? 'class="completed"' : ''}>
    <div class="view">
      <input
        ${completed ? 'checked' : ''}
        class="toggle"
        type="checkbox">
      <label>${text}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${text}">
  </li>`
}

const getTodoCount = todos => {
  const notCompleted = todos
    .filter(todo => !todo.completed)

  const { length } = notCompleted
  if (length === 1) {
    return '1 Item left'
  }

  return `${length} Items left`
}

//Q. what is rendering?
//A. view = f(state)
export default (targetElement, state) => {
  const {
    currentFilter, //'All'
    todos // [{text: 'todo1', completed: false}, {text: 'todo2', completed: true}]
  } = state

  const element = targetElement.cloneNode(true) //true: deep copy, immutable object

  const list = element.querySelector('.todo-list')
  const counter = element.querySelector('.todo-count')
  const filters = element.querySelector('.filters')

  list.innerHTML = todos.map(getTodoElement).join('')
  counter.textContent = getTodoCount(todos)

  Array
    .from(filters.querySelectorAll('li a'))
    .forEach(a => {
      if (a.textContent === currentFilter) {
        a.classList.add('selected')
      } else {
        a.classList.remove('selected')
      }
    })

  return element
}
