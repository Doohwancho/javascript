import React from "react";
import { Suspense } from "react";
import ReactDOM from "react-dom";
import { BarLoader } from "react-spinners";
import { RecoilRoot } from "recoil";
import App from "./App";
import "./index.css";
import { mainColor } from "./util/css/color/color";
import styled from "@emotion/styled";

/* TODO - knowhow: directory 구조가 다음과 같음

```
1. components: common + 페이지별 큰 덩어리 자식 컴포넌트 별로 묶음
2. hook: custom hooks 
3. module: atom(getter) + selector(setter) for recoil
4. router: page 보내주는 라우터 
5. util
  1. api 
    - 모든 get/post/put/patch 요청 w/ axios 
    - jwt access token, refresh token 첨부해서 보내고, response intercept해서 http status에 맞게 에러 핸들링 포함 
    - 왜 react-query 안씀?
  2. assets 
    - font / icon / image 로 구분함 
    - index.ts로 전부 묶어 export
  3. css 
    - 컬러 + 페이지 별로 구분함
    - emotion이랑 styled 동시에 쓰네? 하나만 쓰지 왜.. 번들 사이즈 우짤껴?
  4. interface for ts 
    - 페이지 별로 쓰이는 타입 한 페이지에 모두 모아둠
```
*/


const Flex = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
ReactDOM.render(
  <RecoilRoot>
    <Suspense
      fallback={
        <Flex> {/** TODO - knowhow: 로딩바 가운데 정렬 */}
          <BarLoader color={mainColor} height="4px" width="100px" /> {/** TODO - library: loading bar를 리엑트에서 제공하네? 맨 처음 spa가 js 로딩 속도 길 때, 로딩바역할도 해줌 */}
        </Flex>
      }
    >
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Suspense>
  </RecoilRoot>,
  document.getElementById("root")
);
