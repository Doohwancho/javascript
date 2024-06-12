import { forwardRef, useRef, useEffect, useImperativeHandle } from "react";

//Q. what is useImperativeHandle?
//A. useImperativeHandle is a React hook that customizes the instance value 
// . that is exposed when using ref with forwardRef. 
//   This is particularly useful when you want to expose certain methods 
//   or properties to the parent component while encapsulating the internal implementation details of the child component.

function ChildComponent(props, ref) {
  useImperativeHandle(
    ref,
    () => {
      return {
        getText: () => "useImperativeHandle 테스트", //child component 내부 function을 ref를 통해 부모 component로 보낼 때 useImperativeHandle() 사용 
      };
    },
    []
  );

  return <span>children ref 테스트</span>;
}

const ForwardedChild = forwardRef(ChildComponent);

function ParentComponent() {
  const childRef = useRef(null);

  useEffect(() => {
    console.log(childRef.current?.getText()); // useImperativeHandle 내부 component에서 ref를 통해 보낸 메서드를 부모 컴포넌트에서 사용 가능
  }, []);

  return (
    <div>
      <ForwardedChild ref={childRef} />
    </div>
  );
}

export default ParentComponent;