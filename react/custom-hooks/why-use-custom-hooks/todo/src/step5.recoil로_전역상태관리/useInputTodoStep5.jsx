import { useRecoilState } from 'recoil';
import { todoListState, todoListInputState } from './store';
import { useEffect } from 'react';

//goal of custom hook
//하나의 컴포넌트에 useState나 함수등이 여러개 쓰이는걸 하나로 묶어 모듈화 하기 위해 사용한다. 

export const userInputTodoStep5 = () => {
    //A. local or global 상태관리 부분
    const [list, setList] = useRecoilState(todoListState); //global하게 상태관리가 안되기 때문에, 여러 컴포넌트들에서 호출하면 값이 리셋됨
    const [inputText, setInputText] = useRecoilState(todoListInputState);
  

    //B. API요청 부분(useEffect | react-query)
    useEffect(() => {
      fetch("https://your-api-endpoint.com/todos")
        .then((response) => response.json())
        .then((json) => setList(json.map((item) => item.title)))
        .catch((error) => console.error('Error fetching data:', error));
    }, []); // Add dependencies here if needed


    //C. 로직 함수 부분
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