import { useReducer } from "react";

//reducer는 상태에 if/switch case 분기쳐서 로직 달리 적용해야 할 때 쓰면 유용하다
const internalReducer = ({ count }, { type, payload }) => {
  switch (type) {
    case "increment":
      return {
        count: Math.min(count + 1, payload.max)
      };
    case "decrement":
      return {
        count: Math.max(0, count - 1)
      };
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
};

function useCounter({ initial, max }, reducer = internalReducer) {
  const [{ count }, dispatch] = useReducer(reducer, { count: initial });

  const handleIncrement = () => {
    dispatch({ type: "increment", payload: { max } });
  };

  const handleDecrement = () => {
    dispatch({ type: "decrement" });
  };

  return {
    count,
    handleIncrement,
    handleDecrement
  };
}

useCounter.reducer = internalReducer;
useCounter.types = {
  increment: "increment",
  decrement: "decrement"
};

export { useCounter };
