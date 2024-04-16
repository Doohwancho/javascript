import { userInputTodoStep3 } from "./hooks/useInputTodoStep3";

//step3. custom hook을 쓴다

//특징
//useState 같은 여러 react-hook 들과 함수들을 하나믜 모듈로 묶어서 customHooks로 뺐다. 거기서 일괄관리.

export default function TodoListStep3() {
  const {list, inputText, setInputText, deleteItem, createItem} = userInputTodoStep3();

  return (
    <>
      <div>
        <h1>Step3. Todo List</h1>
        <ol>
          {
            list.map((item, index) => {
              return <li key={index}>
                {item}
                <button
                  onClick={() => {
                    deleteItem(index);
                  }}
                  >
                    Delete
                  </button>
                </li>;
            })
          }
        </ol>
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
