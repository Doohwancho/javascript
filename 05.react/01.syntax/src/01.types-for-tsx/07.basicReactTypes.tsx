import React, { useState } from'react';

type ButtonType1 = {
  //case2) useState의 타입 적용하기 
  setCount: React.Dispatch<React.SetStateAction<number>>,

  //case1) React.ReactNode vs React.JSX.Element 
  //1. ReactNode: 다 받음
  //2. JSX.Element는 React.ReactNode의 서브타입으로, jsx로 만들어진 React Element를 의미
  children: React.JSX.Element //React.ReactNode도 가능 
}

const ButtonComponent1 = ( { setCount, children }: ButtonType1) => {
  setCount(10);

  return (
    <button>
      {children}
    </button>
  )
}

export default function Main() {
    const icon = <i></i>;
    const [count, setCount] = useState(0);
    setCount(1);

    return (
        <ButtonComponent1 setCount={setCount}>
            {icon}
            {/* Click Me // error! - React.JSX.Element는 이걸 accept하지 않는다. */}
        </ButtonComponent1>
    );
}