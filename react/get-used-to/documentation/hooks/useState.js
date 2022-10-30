import { useState } from 'react';


//case1) component끼리 독립적
function MyButton() {
  const [count, setCount] = useState(0); //count라는 변수에 0으로 initialized, setCount()가 setter

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}



export default function MyApp() {
  return (
    <div>
      <h1>Counters that update separately</h1>
      <MyButton /> //얠 클릭하면 hook의 count가 +1되는데, 아래 버튼은 +1이 안됨. 왜? 각 컴포넌트마다 훅 다른 메모리에 관리하니까.
      <MyButton />
    </div>
  );
}


//case2) components들이 share함. 왜? call by reference
function MyButton({ count, onClick }) {
  return (
    <button onClick={onClick}>
      Clicked {count} times
    </button>
  );
}


export default function MyApp() {
  const [count, setCount] = useState(0); //hook side MyApp() to share data together

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Counters that update together</h1>
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
    </div>
  );
}