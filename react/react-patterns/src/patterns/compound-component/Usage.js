import React from "react";
import { Counter } from "./Counter";

function Usage() {
  const handleChangeCounter = (count) => {
    console.log("count", count);
  };

  //props drilling 문제 해결하는 방법. Counter 하위 컴포넌트가 여러개인 경우.
  return (
    <Counter onChange={handleChangeCounter}>
      <Counter.Decrement icon="minus" /> 
      <Counter.Label>Counter</Counter.Label>
      <Counter.Count max={10} />
      <Counter.Increment icon="plus" />
    </Counter>
  );
}

export { Usage };
