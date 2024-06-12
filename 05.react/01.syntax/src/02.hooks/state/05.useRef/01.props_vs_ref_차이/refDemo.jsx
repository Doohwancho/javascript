import React, { useRef } from 'react';

/*
Q. what's ref?

props는 데이터 내려주고 컴포넌트 re-render 시키는거라면,
ref는 주로 DOM객체 접근할 떄 씀. 
ex. <input>에 focus 여부라던지, reading value나 animation trigger같은 DOM 직접적으로 만질때 사용.
ref는 React에서 key와 함께 special props로 취급됨 
그래서 그냥 props처럼 받으면 안되고, .forwardRef() 써서 받아야 함. 

*/

const RefDemo = () => {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus(); //input tag의 포커스 여부 확인용?
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
};

export default RefDemo;