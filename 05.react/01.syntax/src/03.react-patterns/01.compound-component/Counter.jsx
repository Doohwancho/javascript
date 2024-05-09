import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { CounterProvider } from "./useCounterContext";
import { Count, Label, Decrement, Increment } from "./components";

function Counter({ children, onChange, initialValue = 0 }) {
  const [count, setCount] = useState(initialValue);

  const firstMounded = useRef(true); 
  //useRef() tracks whether the component has mounted for the first time
  //Unlike state, updating a ref does not trigger a re-render.

  useEffect(() => {
    if (!firstMounded.current) { //If it's not the first render (i.e., firstMounted.current is false), 
      onChange && onChange(count); //it calls the onChange callback
    }
    firstMounded.current = false;
  }, [count, onChange]);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(Math.max(0, count - 1));
  };

  //useCounterContext에 useContext를 약간 mini-global state? 삼아서 여기에 count랑 increment(), decrement() 저장하고, component에서 꺼내 씀 
  return (
    <CounterProvider value={{ count, handleIncrement, handleDecrement }}>
      <StyledCounter>{children}</StyledCounter>
    </CounterProvider>
  );
}

const StyledCounter = styled.div`
  display: inline-flex;
  border: 1px solid #17a2b8;
  line-height: 1.5;
  border-radius: 0.25rem;
  overflow: hidden;
`;

//여기서 .Count, .Label로 지정해주는거구만~
Counter.Count = Count;
Counter.Label = Label;
Counter.Increment = Increment;
Counter.Decrement = Decrement;

export { Counter };
