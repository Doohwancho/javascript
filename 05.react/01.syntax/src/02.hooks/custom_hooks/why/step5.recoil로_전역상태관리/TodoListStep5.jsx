
import { ListCreateStep5 } from "./ListCreateStep5";
import ListStep5 from "./ListStep5";

//step5. 전역 상태관리 사용 이유

//특징
//1. local state말고 global state 쓰는 이유
//    - useInputTodoStep5 컴포넌트를 ListStep5 컴포넌트와 ListCreateStep5 컴포넌트가 써도, 이젠 상태가 전역에서 recoil로 관리되기 때문에, useState안에 상태가 호출할 떄마다 리셋되던 문제 해결
//    - 만약 local state 썼다면 custom-hook이 아닌, 이 파일에서 useState 선언하고 props로 내려줘야 하는데, 코드가 장황해져 가독성 떨어진다.
//    - prop drilling problem 해결 가능
//2. presentational component
//    - 하나에 컴포넌트 안에 다 우겨넣으면 가독성 말아먹는데, todo 컴포넌트 안에 List와 ListCreate 컴포넌트로 잘 나눠놓고, 
//    - 각 컴포넌트 안에서 쓰는 hook, 로직담은 함수, API 호출 함수 들을 custom hook으로 잘 모듈화 시켰고, 
//    - 공통으로 셰어되는 상태를 전역 상태관리로 묶어서 관리한다
//    - 컴포넌트 코드 들은 짧아야 한다. 로직같은건 다 hook으로 빼고. 조건부 렌더링 붙고 로직 붙으면 가독성이 심각하게 떨어지기 시작하니까. 
//3. props를 쓰는 기준
//    - props 여러개 가지는 컴포넌트: 범용으로 사용되는 컴포넌트, UI
//    - props 적거나 없어야 하는 컴포넌트: 특정 목적성을 위해 제작된 컴포넌트 (custom hook 안에서 상태, 로직함수 일괄괸리.)

//presentational component
export default function TodoListStep5() {
  
  return (
    <>
      <div>
        <h1>Step5. Todo List</h1>
        <h2>recoil 전역상태관리를 써서 이젠 잘 된다!</h2>
        <ListStep5 />
        <ListCreateStep5 />
      </div>
    </> 
  )
}
