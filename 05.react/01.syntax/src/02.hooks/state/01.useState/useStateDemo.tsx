import React from "react";


interface UserInfo {
  name: string;
  lastname: string;
}

export const MyComponent: React.FC = () => {

  //case1) basic
  const [myName, setMyName] = React.useState('John Doe'); //[변수명, setter method 명]
  //'John Doe'로 myName 변수를 initialize

  //setMyName()에 input 값 넣어주면, 실시간으로 myName 값이 바뀜
  //.useState()는 변수안 데이터가 바뀔 때, 상태관리를 굳이 backend, db까지 안찍고 client layer에서 관리, 해결하려고 쓰는 듯?

  //Q. what is useState?
  //A. when data changes, re-render the UI




  //case2) example I made
  const [count, setCount] = React.useState(0);


  //case3) use-state with object
  const [userInfo, setUserInfo] = React.useState<UserInfo>({
    name: "John",
    lastname: "Doe",
  });

  return (
    <>
	  {/*  case1 */}
      <h4>{myName}</h4>
      <input
        value={myName}
		  onChange={(e) => setMyName(e.target.value)} />

	  <br/>

	  {/*  case2 */}
	  <button onClick={() => setCount(count + 1)}>
		{count}
	  </button>

	  <br/>

	  {/*  case3 */}
	  <>
      <h4>
        {userInfo.name} {userInfo.lastname}
      </h4>
      <input
        value={userInfo.name}
        onChange={(e) =>
          setUserInfo({
            ...userInfo,
            name: e.target.value,
          })
        }
      />
      <input
        value={userInfo.lastname}
        onChange={(e) =>
          setUserInfo({
            ...userInfo,
            lastname: e.target.value,
          })
        }
      />
    </>
    </>
  );
};
