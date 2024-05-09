import getTodos from './getTodos.js'
import todosView from './view/todos.js'
import counterView from './view/counter.js'
import filtersView from './view/filters.js'

import registry from './registry.js'

registry.add('todos', todosView)
registry.add('counter', counterView)
registry.add('filters', filtersView)

const state = {
  todos: getTodos(),
  currentFilter: 'All'
}


//case1) static rendering
// window.requestAnimationFrame(() => {
//   const main = document.querySelector('.todoapp')
//   const newMain = registry.renderRoot(main, state)
//   main.replaceWith(newMain)
// })

//case2) dynamic rendering
//새 데이터가 있을 때 마다, 가상 루트 노드 만들고, 전체 노드 다시 랜더링 하는 방법. -> very costly -> use virtual DOM to render only parts that are changed!
const render = () => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector('.todoapp')
    const newMain = registry.renderRoot(main, state)
    main.replaceWith(newMain)
  })
}

window.setInterval(() => {
  state.todos = getTodos()
  render()
}, 1000) //renders every second

render()
