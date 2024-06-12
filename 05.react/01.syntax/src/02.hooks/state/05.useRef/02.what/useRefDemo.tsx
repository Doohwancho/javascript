import React from "react";

//case1) dom width read value without re-rendering component 때 사용

//props와는 다르게, 딱 해당 DOM의 성질만 re-render 없이 보냄
//이 예제의 경우, 부모 컴포넌트 DOM의 성질만 자식 컴포넌트한테 보냄(w/out re-render)

export const UseRefDemo = () => {
  const containerElementRef = React.useRef(null);
  const [message, setMessage] = React.useState(
    "Click button to get container width"
  );

  const calculateContainerWidth = () => {
    if(containerElementRef.current) {
      console.log(containerElementRef.current);
      setMessage(`Container width: ${containerElementRef.current.clientWidth}px`);
    }
  };

  return (
    // 1. 이 컨테이너에 대한 정보를 Ref에 담아서
    <div className="container" ref={containerElementRef}> 
      <h2>{message}</h2>
      
      {/* 2. 자식 컴포넌트한테 보냄 */}
      <button onClick={calculateContainerWidth}>
        Calculate container width
      </button>
    </div>
  );
};
