import getTodos from './getTodos.js'
import view from './view.js'

const state = {
  todos: getTodos(),
  currentFilter: 'All'
}

const main = document.querySelector('.todoapp')

//static rendering schema
//1. 브라우저 렌더링
//  -> requestAnimationFrame으로 렌더링
//2. 다음 렌더링 대기
//3. 새 가상 노드
//	-> view(main, state)에서 기존 main node를 deep copy
//4. DOM 조작
//	-> deep copy한 node에 state 데이터를 입힘
//5. 브라우저 렌더링


//requestAnimationFrame은 DOM API인데, 이 API는 메인 스레드를 차단하지 않으며, 다음 re repaint가 이벤트 루프에서 스케쥴링 되기 직전에 실행됨.
window.requestAnimationFrame(() => {
  const newMain = view(main, state) //rendering이란, view = f(state)
  main.replaceWith(newMain)
})
