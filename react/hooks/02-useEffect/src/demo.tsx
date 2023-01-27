import React from "react";


/***************************************8
 * helper component
 */

//case2) useEffect - component-unmount
export const MyChildComponent = () => {
  return <h4>Hello from Child Component</h4>;
};



//case3) useEffect - component-update-render
const MyChildComponent2 = () => {
  const [userInfo, setUserInfo] = React.useState({
    name: "John",
    lastname: "Doe",
  });

  React.useEffect(() => {
    console.log("A. Called right after every render");

    return () => console.log("B. Cleanup function called after every render");
  });

  //버튼 클릭했더니 랜더링 되면서 A.~~가 호출됬다.
  //그리고 userInfo를수정할 때마다, B가 호출되고 다시 render하면서 A가 호출됬다.
  //왜지?
  //A. useEffect()안에 메서드 A는, mount, update 시점 발동되고, useEffect()가 반환하는 메서드 B는, unmount되는 시점에 발동됨.

  return (
    <div>
      <h3>
        {userInfo.name} {userInfo.lastname}
      </h3>
      <input
        value={userInfo.name}
        onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
      />
      <input
        value={userInfo.lastname}
        onChange={(e) => setUserInfo({ ...userInfo, lastname: e.target.value })}
      />
    </div>
  );
};




/*****************************
 * main component
 */

export const MyComponent = () => {

  //case1) useEffect - component-did-onload
  const [username, setUsername] = React.useState("");

  React.useEffect(() => {
    // Simulating async call
    setTimeout(() => {
      setUsername("John");
    }, 1500);
  }, []);


  //useState()로 username을 ''로 초기화 했는데,
  //render되고 1.5초 뒤에 'John'이 username에 들어감.
  //useEffect는 비동기 ajax call할 때 쓰이나?
  //아니. case2를 보니, useEffect()는 lifecycle에 mount되는 시점에 발동하는 메서드 같다.



  //case2) useEffect - component-unmount
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    console.log("The component is just mounted in the DOM"); //페이지 로드되는 도중 lifecycle에서 DOM이 mount되는 시점에 useEffect()가 발동하나 보다.

    return () => {
      console.log("The component is just unmounted from the DOM"); //componentWillUnmount() 시점에 발동되는 메서드
    };
  }, []); //, []을 넣어주면, 처음에만 실행되고, 다시 render되면 실행되지 않는다. 만약 [count] 넣어주면, count가 바뀔 때 마다 useEffect()가 실행된다.




  //case3) useEffect - component-update-render


  //Q. what is useEffect?
  //A. component가 mount, update, delete 되는 시점에 발동하는 메서드

  //Q. what is component lifecycle?
  //1. componentDidMount() -> happens once, when initialize
  //2. componentDidUpdate() -> happens every time when component is changed / updated
  //3. componentWillUnmount() -> happens once, when component is removed from the DOM

  return (
    <>
	  {/* case1 */}
      <h4>{username}</h4>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />

	 <hr />

	 {/* case2 */}
	      <>
			  {visible && <MyChildComponent />} {/* 이런식으로 숨기네?*/}
      <button onClick={() => setVisible(!visible)}>
        Toggle Child Component Visibility
      </button>
    </>

		<hr />

		{/* case3 */}
    <>
      {visible && <MyChildComponent2 />}
      <button onClick={() => setVisible(!visible)}>
        Toggle Child component visibility
      </button>
    </>

    </>
  );
};
