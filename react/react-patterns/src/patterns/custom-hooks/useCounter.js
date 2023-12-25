import { useState } from "react";

function useCounter(intialeCount) {
  //custom hooks안에 상태, 로직을 담아 꺼내 쓴다.
  const [count, setCount] = useState(intialeCount);

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    setCount((prevCount) => Math.max(0, prevCount - 1));
  };

  return { count, handleIncrement, handleDecrement };
}

export { useCounter };
