import React from "react";
import { useDebounce } from 'use-debounce';


//Q. what does this code do?
//A. ajax로 받아온 list가 있는데,
//   input안에 알파벳 입력하면, 그 알파벳 위주로 filter(우선순위 sorting)해줌.


//Q. what is useDebounce()?
//A. debounce는 간단하게 설명하자면 특정 시간이 지난 후에 한 번만 이벤트가 실행되도록 하는 것


//Q. structure
//A. useState()로 input값을 filter에 받아온걸로 ajax 요청함
//   ajax요청해서 받아온 list를 userColection에 저장 후 보여주는데, ajax 요청을 useEffect로 함. useEffect는 render()될 떄마다 발동하니까, 500ms 후에 딱 한번 발동시키기 위해서 useDebounce를 씀.

export const MyComponent = () => {
  const [filter, setFilter] = React.useState("");
  const [debouncedFilter] =   useDebounce(filter, 500);
  const [userCollection, setUserCollection] = React.useState([]);

  // Load full list when the component gets mounted and filter gets updated
  React.useEffect(() => {
    fetch(`https://swapi.dev/api/people?search=${filter}`)
      .then((response) => response.json())
      .then((json) => setUserCollection(json.results));
  }, [debouncedFilter]); //debounceFilter?

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
