import React, { useRef, useState, useEffect } from 'react';
const UseRefDemo2 = () => {
    const [count, setCount] = useState(1);

    //case1) 무한루프에 빠짐
    //useState의 값을 증가시키면, 화면이 다시 랜더링 됨 -> 랜더링되면 useState의 값을 증가시킴 무한반복
    // const [renderingCount, setRedneringCount] = useState(1);
   
    // useEffect(() => {
    //   console.log("rendering Count : ", renderingCount);
    //   setRedneringCount(renderingCount + 1);
    // });

    //case2) useRef로 무한 루프 해결 
    //ref 값을 증가시켜도, 화면이 다시 렌더링되지 않음.
    const renderingCount = useRef(1);

    useEffect(() => {
        console.log("renderingCount : ", renderingCount.current);
        ++renderingCount.current;
    });
  
    return (
      <div>
        <div>Count : {count}</div>
        <button onClick={() => setCount(count + 1)}> count up </button>
      </div>
    );
};

export default UseRefDemo2;
