import React, { useState } from 'react';

//step2. refactor 단계

//특징
//1. onClick 안에 있던 로직을 함수로 뺐다.

export default function TodoListStep2() {
  const [list, setList] = useState([]);
  const [inputText, setInputText] = useState("");

  const deleteItem = (index) => {
    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
  }

  const createItem = () => {
    setList([...list, inputText]);
    setInputText("");
  }

  return (
    <>
      <div>
        <h1>Todo List</h1>
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
