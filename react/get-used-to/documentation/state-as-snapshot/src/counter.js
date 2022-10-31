import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  function increment() {
    //case1)
    // setNumber(number + 1); //queue(0->1, 0->1, 0->1)

    //solution to case1
    setNumber(s => s+1); //queue multiple state update. queue(x->x+1, x->x+1, x->x+1)
  }

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        //case1) why fail?
        increment();
        increment();
        increment();
        
        //case2) why alert shows 0 not 5?
        // increment();
        // alert(number);
      }}>+3</button>
    </>
  )
}
