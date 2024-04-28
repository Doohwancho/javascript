import React from "react";


//Q. what is useMemo?
//A. 재사용된(memoized) 값을 반환하는 훅이다. 이 훅은 데이터의 많은 가공이 필요할 때 적합하다.
//  처음 렌더링 때에 실행되고, 이후 re-render 시엔 캐시된 데이터 반환



//Q. what is useCallback?
//A. useMemo 와 비슷한 Hook 입니다. useMemo 는 특정 결과값을 재사용 할 때 사용하는 반면, useCallback 은 특정 함수를 새로 만들지 않고 재사용하고 싶을때 사용합니다.


interface Props {
  onReset: () => void;
}

const ResetValue: React.FC<Props> = React.memo((props) => {
  console.log(
    "Hey I'm only rendered the first time, check React.memo + callback"
  );

  return <button onClick={props.onReset}>Reset value</button>;
});

export const MyComponent = () => {
  const [username, setUsername] = React.useState("John");
  const [lastname, setLastname] = React.useState("Doe");

  //before
  //const resetNameCallback = () => {setUsername('');}

  //useCallback()가 없으면, resetNameCallback은 매번 새로운 함수를 생성한다. -> console.log()가 input이 바껴서 render()될 떄마다 찍힌다.


  //after
  const resetNameCallback = React.useCallback(() => setUsername(""), []);

  return (
    <>
      <h3>
        {username} {lastname}
      </h3>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      <input value={lastname} onChange={(e) => setLastname(e.target.value)} />
      <ResetValue onReset={resetNameCallback}>Reset name</ResetValue>
    </>
  );
};
