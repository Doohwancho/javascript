const registry = {} //'todos': todosView, 'counter': counterView, 'filters': filtersView

const renderWrapper = component => { //root node의 clone을 받아서 자식 DOM들을 state로 업데이트(렌더링)
  return (targetElement, state) => {
    const element = component(targetElement, state) //순수함수로 작성하고 있기 때문에, 기본 객체에서 상속받을 수 없다. 따라서 구성요소를 wrapping하는 고차 함수(high order function)을 생성해야 한다.

    const childComponents = element
      .querySelectorAll('[data-component]') //.html에 있는 data-component를 찾아서 배열로 반환

    Array
      .from(childComponents)
      .forEach(target => {
        const name = target.dataset.component

        const child = registry[name]
        if (!child) return

        target.replaceWith(child(target, state)) //data-component에서 key가 매치되는 것만 찾아 state를 update
      })

    return element
  }
}

//레지스트리 접근자(Accessor) 메서드
//example) registry.add('todos', todosView)
const add = (name, component) => {
  registry[name] = renderWrapper(component)
}


//app 부팅 함수
//example) const newMain = registry.renderRoot(main, state)
const renderRoot = (root, state) => {
  const cloneComponent = root => {
    return root.cloneNode(true)
  }

  return renderWrapper(cloneComponent)(root, state) //고차함수. cloneComponent라는 함수를 인자로 넘겨준다. 왜? 순수함수로 작성되었기 때문.
}

export default {
  add,
  renderRoot
}
