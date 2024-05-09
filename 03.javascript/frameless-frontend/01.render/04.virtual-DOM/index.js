import getTodos from './getTodos.js'
import todosView from './view/todos.js'
import counterView from './view/counter.js'
import filtersView from './view/filters.js'
import applyDiff from './applyDiff.js'

import registry from './registry.js'

registry.add('todos', todosView)
registry.add('counter', counterView)
registry.add('filters', filtersView)

const state = {
  todos: getTodos(),
  currentFilter: 'All'
}

const render = () => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector('.todoapp')
    const newMain = registry.renderRoot(main, state) //step2) 재갱신된 state를 가지고 main DOM으로부터 파생된 virtual DOM을 만든다.
    applyDiff(document.body, main, newMain) //step3) diff algorithm으로 real DOM과 virutal DOM을 비교해 바뀐 DOM만 변경함.

	//step4) render()
  })
}

window.setInterval(() => {
  state.todos = getTodos()
  render()
}, 1000) //step1) 1초마다 state를 재갱신 함.

render()
