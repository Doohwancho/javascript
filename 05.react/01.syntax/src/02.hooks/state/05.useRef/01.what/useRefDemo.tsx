import React from "react";


//Q. what is useRef?
//A. create mutable object that will keep the same reference between the renders.
//   ** mutable value does not re-render UI when it changes.**

//  clicking button won't re-render UI, like setState does.
//
//  It is useful for storing the reference to the DOM node from JAX.
//  for example, button에 useRef 묶으면, btn.current.click() 사용 가능.
//  DOM node를 직접 조작할 때 사용.

export const UseRefDemo = () => {
  const containerElementRef = React.useRef(null);
  const [message, setMessage] = React.useState(
    "Click button to get container width"
  );

  const calculateContainerWidth = () => {
    if(containerElementRef.current) {
      setMessage(`Container width: ${containerElementRef.current.clientWidth}px`);
    }
  };

  return (
    <div className="container" ref={containerElementRef}>
      <h2>{message}</h2>
      <button onClick={calculateContainerWidth}>
        Calculate container width
      </button>
    </div>
  );
};
