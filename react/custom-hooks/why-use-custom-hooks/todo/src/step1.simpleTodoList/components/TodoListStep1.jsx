import React, { useState } from 'react';

//step1. simple todo app

//특징
//1. component들이 하나에 파일에 몰빵되어 있어서 가독성이 별로 좋지 않다.
//2. List나 버튼같은 컴포넌트는 다른 컴포넌트에서 재사용 가능한데, 모듈화 안시켜놓으니까, 매번 새로 만들어야 함. 재사용한 컴포넌트로 따로 빼서 모듈화 시키자. 

export default function TodoListStep1() {
  const [list, setList] = useState([]);
  const [inputText, setInputText] = useState("");

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
                    const newList = [...list];
                    newList.splice(index, 1);
                    setList(newList);
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
            setList([...list, inputText]);
            setInputText("");
          }}
        >
          Add 
        </button>
      </div>
    </> 
  )
}
