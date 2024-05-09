import React, { useState } from 'react';

//goal of custom hook
//하나의 컴포넌트에 useState나 함수등이 여러개 쓰이는걸 하나로 묶어 모듈화 하기 위해 사용한다. 

export const userInputTodoStep3 = () => {
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

    return {
        list,
        inputText,
        setInputText,
        deleteItem,
        createItem,
    }
}