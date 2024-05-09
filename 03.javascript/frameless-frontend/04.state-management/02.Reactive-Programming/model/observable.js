const cloneDeep = x => {
  return JSON.parse(JSON.stringify(x))
}

const freeze = state => Object.freeze(cloneDeep(state))

export default (model, stateGetter) => {
  let listeners = []

  const addChangeListener = cb => {
    listeners.push(cb)
    cb(freeze(stateGetter()))
    return () => {
      listeners = listeners
        .filter(element => element !== cb)
    }
  }

  const invokeListeners = () => {
    const data = freeze(stateGetter()) //이 예제에서는 원본 state를 getter해서 데이터 받아와서
    listeners.forEach(l => l(data)) //리스너에게 데이터를 전달
  }

  const wrapAction = originalAction => { //state manage method를 실행하는데,
    return (...args) => {
      const value = originalAction(...args)
      invokeListeners() //이 때, 해당 state manage method가 실행되고 난 이후에 반드시 같이 실행되어야 하는 관련 메서드들을 여기에 넣어 실행.
      return value
    }
  }

  const baseProxy = {
    addChangeListener
  }

  return Object
    .keys(model)
    .filter(key => {
      return typeof model[key] === 'function'
    })
    .reduce((proxy, key) => {
      const action = model[key]
      return {
        ...proxy,
        [key]: wrapAction(action)
      }
    }, baseProxy)
}
