import { userInputTodoStep4 } from "./useInputTodoStep4";
import ListStep4 from "./ListStep4";

//step4. useState를 쓰는 하나의 컴포넌트를 다른 여러 컴포넌트에서 참조해서 쓰면 상태관리가 안된다

//특징
//<useInputTodoStep4 /> 컴포넌트를 
//<ListStep4 /> 와 <TodoListStep4 /> 컴포넌트가 쓰는데, 
//<useInputTodoStep4 /> 를 호출할 때마다, 안에 useState 상태가 초기화 되어 잘 작동 안하는 문제점이 있음.

export default function TodoListStep4() {
  const {inputText, setInputText, createItem} = userInputTodoStep4();

  return (
    <>
      <div>
        <h1>Step4. Todo List</h1>
        <h2>Todo가 안된다!</h2>
        <h3>useState가 들어있는 컴포넌트를 다른 여러 컴포넌트에서 호출할 때마다 reset되기 때문.</h3>
        <h3>그래서 global state mangement를 쓴다.</h3>
        
        <ListStep4 />

        <input 
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button 
          onClick={() => {
            createItem();
          }}
        >
          Add 
        </button>
      </div>
    </> 
  )
}
