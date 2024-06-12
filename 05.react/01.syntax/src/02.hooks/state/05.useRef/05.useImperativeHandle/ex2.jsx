import React, { useRef, useImperativeHandle } from "react";

/*
    Q. why use forwardRef?
    A. 그냥 ref를 건내주면 props마냥 (ref) 이렇게 받으면 문법에러. 반드시 .forwardRef((props, ref)) 로 받아야 함.

    Q. what's this code?
    A. forwardRef를 쓰면, parent button에서 자식 컴포넌트(child button)의 함수를 실행시킬 수도 있네?
*/

const Parent = () => {
  const childRef = useRef(null);
  return (
    <div>
      <button
        onClick={() => {
          childRef.current.handleFunc(); //부모 컴포넌트에서 자식 컴포넌트 안 함수 실행 가능 using .forwardRef + useImperativeHandle()
        }}
      >Parent Button</button>
      <Children ref={childRef} />
    </div>
  );
};
const Children = React.forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    handleFunc() {
      console.log("hello world");
    },
  }));

  return <button ref={ref}>child button</button>;
});

export default Parent;
