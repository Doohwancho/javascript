import React from "react";


//Q. what is context api?

//A. share data without passing props. props를 글로벌하게 사용.


//Q. when to use useContext?
//A. 1. 2중, 3중으로 props 넘겨받아야 할 때 사용한다.
//   2. login, logout같이 유저 세션 정보 저장시 좋다.



interface UserContext {
  username: string;
  setUsername: (value: string) => void;
}

const MyContext = React.createContext<UserContext>({
  username: "",
  setUsername: (value) => {},
});



export const MyContextProvider = (props) => {
  const [username, setUsername] = React.useState("John Doe");

  return (
    <MyContext.Provider value={{ username, setUsername }}>
      {props.children}
	 {/* 이 컨텍스트 안에 해당되는 모든 children nodes에 {username, setUsername} 을 공유한다. props로 넘기는 것 없이. */}
    </MyContext.Provider>
  );
};

const MyEditComponent = () => {
  const { username, setUsername } = React.useContext(MyContext);

  const [newUsername, setNewUsername] = React.useState("");

  const handleChange = (e) => {
    setNewUsername(e.target.value);
  };

  return (
    <div>
      <input placeholder={username} onChange={handleChange} />
      <button onClick={() => setUsername(newUsername)}>Save</button>
    </div>
  );
};

export const MyComponent = () => {
  const myContext = React.useContext(MyContext);
  return (
    <>
      <h3>{myContext.username}</h3>
      <MyEditComponent />
    </>
  );
};
