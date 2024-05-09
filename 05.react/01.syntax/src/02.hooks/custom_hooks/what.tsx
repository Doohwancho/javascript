import React from "react";

// takeaway1
// 03-useDebounce 에서 이리저리 흩어진 것들을 useUserCollection()에 깔끔하게 묶은 것

// takeaway2
// 여러 hooks 들을 객체안에 담아서 반환하고 가져다 씀. 마치 import하는 것과 비슷한 구조인 듯.


// takeaway3
// 03-Debounce 대비, useEffect()에 debounce를 dependency를 넣어서 render() 후 500ms 뒤에 한번 useEffect()발동시키는게 아니라, 이젠 render이 될 때마다 useEffect()를 실행시킴


const useUserCollection = () => {
  const [filter, setFilter] = React.useState("");
  const [userCollection, setUserCollection] = React.useState([]);

  const loadUsers = () => {
    fetch(`https://jsonplaceholder.typicode.com/users?name_like=${filter}`)
      .then((response) => response.json())
      .then((json) => setUserCollection(json));
  };

  return { userCollection, loadUsers, filter, setFilter };
};

export const MyComponent = () => {
  const { userCollection, loadUsers, filter, setFilter } = useUserCollection();

  React.useEffect(() => {
    loadUsers();
  }, [filter]);

  return (
    <div>
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      <ul>
        {userCollection.map((user, index) => (
          <li key={index}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};
