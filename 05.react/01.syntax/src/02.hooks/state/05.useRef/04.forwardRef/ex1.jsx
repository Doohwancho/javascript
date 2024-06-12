import { forwardRef, useRef, useEffect } from "react";

//Q. what is React.forwardRef()?
//A. ref를 넘길 때, props처럼 받는게 아니라, 얘를 써서 받아야 한다.

// 두번째 파라미터로 'ref'를 참조할 수 있게 된다.
function ChildComponent(props, ref) {
  return <span ref={ref}>children ref 테스트</span>;
}

// 'forwardRef'로 감싸기
const ForwardedChild = forwardRef(ChildComponent);

function ParentComponent() {
  const childRef = useRef(null);

  useEffect(() => {
    console.log(childRef.current?.textContent); // 'children ref 테스트'
  }, []);

  return (
    <div>
      <ForwardedChild ref={childRef} />
    </div>
  );
}
export default ParentComponent;
