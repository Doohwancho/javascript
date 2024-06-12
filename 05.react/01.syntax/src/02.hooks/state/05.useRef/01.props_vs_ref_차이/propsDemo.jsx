//Q. what is props?
//주로 데이터, 값 내려줌. 리렌더링 됨.

// Parent Component
const ParentComponent = () => {
  return <ChildComponent message="Hello, World!" />;
};

// Child Component
const ChildComponent = (props) => {
  return <div>{props.message}</div>;
};

export default ParentComponent;