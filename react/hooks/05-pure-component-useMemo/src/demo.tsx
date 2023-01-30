import React from "react";


//Q. what is pure-component?
//A. pure component will just make a shallow compare of the props and only render if there were changes


//Q. what is memo?
//A. memo is a higher order component that will prevent a component from re-rendering if its props are the same as the previous render.

//그래서 memo안 console.log()는 <input>가 바뀔 떄마다 실행.


//Q. 근데 왜 이렇게 만든거지?
//
//만약 DisplayUsername = (props:Props) => {} 했다면, props.lastname이 바뀌었어도 props.name이 바뀌었겠지.
//props.name이 바뀔 때에만, props.name이 바뀌고 싶게 만들고 싶어서 저리 만듬.

interface Props {
  name: string;
}

export const DisplayUsername = React.memo((props: Props) => {
  console.log(
    "Hey I'm only rerendered when name gets updated, check React.memo"
  );

  return <h3>{props.name}</h3>;
});

export const MyComponent = () => {
  const [userInfo, setUserInfo] = React.useState({
    name: " John ",
    lastname: "Doe",
  });

  return (
    <>
      <DisplayUsername name={userInfo.name} />
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
  );
};
