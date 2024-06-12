import React from "react";

//Q. what is useReducer?
//A. useState 대체할 수 있는 함수.
//   useState 말고, state update logic과 컴포넌트 분리시키고 싶을 때 쓴다.

//Q. 왜 씀? 
//A. useState()는 setter함수를 업데이트하는 메서드가 compoenent안에 있어야만 하는데, useReducer()를 쓰면, setter함수 업데이트 하는 메서드가 컴포넌트 바깥에 있어도 됨.
//   아래 예제의 경우, userInfoReducer로 setter를 업데이트 메서드가 MyComponent바깥에서 관리되고 있다.

//A. UserState? Action? 뭐지?
//	-> useState의 setter가 useReducer의 dispatch인데, dispatch를 건드리는 컴포넌트 밖으로 분리된 메서드가 userInfoReducer이고, 여기에 들어가는 타입을 정의한게 UserState, Action


//Q. curiousity
//A. lastname 수정해도 미동도 안하는데, name 수정하면 console.log가 찍히네?

interface UserState {
  name: string;
  lastname: string;
}

interface Action {
  type: string;
  payload: any;
}

const actionIds = {
  setName: "setname",
  setLastname: "setlastname",
};

const userInfoReducer = (state: UserState, action: Action): UserState => {
  switch (action.type) {
    case actionIds.setName:
      return {
        ...state,
        name: action.payload,
      };
    case actionIds.setLastname:
      return {
        ...state,
        lastname: action.payload,
      };
    default:
      return state;
  }
};

interface Props {
  name: string;
  dispatch: React.Dispatch<Action>;
}

const EditUsername: React.FC<Props> = React.memo((props) => {
  console.log(
    "Hey I'm only rerendered when name gets updated, check React.memo"
  );

  return (
    <input
      value={props.name}
      onChange={(e) =>
        props.dispatch({ type: actionIds.setName, payload: e.target.value })
      }
    />
  );
});

export const MyComponent = () => {
  const [userInfo, dispatch] = React.useReducer(userInfoReducer, {
    name: "John",
    lastname: "Doe",
  });

  return (
    <>
      <h3>
        {userInfo.name} {userInfo.lastname}
      </h3>
      <EditUsername name={userInfo.name} dispatch={dispatch} />
      <input
        value={userInfo.lastname}
        onChange={(e) =>
          dispatch({ type: actionIds.setLastname, payload: e.target.value })
        }
      />
    </>
  );
};
