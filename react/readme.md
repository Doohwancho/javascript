---\
Objective

modularize react concepts


---\
Fields

a. get-used-to :white_check_mark:\
b. build react from scratch\
c. component-based-programming :white_check_mark:\
d. hooks :white_check_mark:\
e. state :white_check_mark:\
f. react-query :white_check_mark:\
g. starter template :white_check_mark:\
h. design patterns :white_check_mark:\
i. atomic design pattern\
y. steal\
z. module\
zz. playground

x. styled component\
x. redux




---\
Todos


a-1. tic-tac-toe :white_check_mark:\
a-2. task-tracker:white_check_mark:\
a-3. word-tracker:white_check_mark:\
a-4. github-finder :white_check_mark:\
a-5. react documetnation :soon:\

b-1. goact :white_check_mark:

c-1. [thinking-in-react](https://beta.reactjs.org/learn/thinking-in-react) :white_check_mark:\
c-x. function based component

d-1. useState (basic) :white_check_mark:\
d-2. useEffect (basic) :white_check_mark:\
d-3. useDebounce :white_check_mark:\
d-4. custom hook :white_check_mark:\
d-5. pure-component (useMemo, useCallback) :white_check_mark:\
d-6. useReducer :white_check_mark:\
d-7. useContext (basic) :white_check_mark:\
d-8. useRef :white_check_mark:\
d-9. useDebugValue :white_check_mark:\
d-10. why use custom hook? :white_check_mark:

d-x. useImperativeHandle\
d-x. useLayoutEffect\


e-1. useState - example:gallary.js :white_check_mark:\
e-2. state as snapshot :white_check_mark:\
e-x. state management

f-1. basic react query :white_check_mark:\
f-2. infinite scroll :white_check_mark:

g-1. [react,ts,eslint,vite,jest-dom](https://www.youtube.com/watch?v=cchqeWY0Nak&t=3s&ab_channel=CodingGarden) :white_check_mark:

h-1. compound-component :white_check_mark:\
h-2. control props :white_check_mark:\
h-3. custom hooks pattern :white_check_mark:\
h-4. props getter pattern :white_check_mark:\
h-5. state reducer pattern :white_check_mark:

i-1. [atomic design: theme and button](https://github.com/DesignSystemLab/design-system) :white_check_mark:\
i-2. [atomic design: textarea](https://github.com/DesignSystemLab/design-system) :white_check_mark:\
i-3. [atomic design: radio](https://github.com/DesignSystemLab/design-system) :white_check_mark:\
i-4. [atomic design: checkbox](https://github.com/DesignSystemLab/design-system) :white_check_mark:\
i-5. [atomic design: textInput](https://github.com/DesignSystemLab/design-system) :white_check_mark:\
i-6. [atomic design: box](https://github.com/DesignSystemLab/design-system) :white_check_mark:

y-a-1. react+springboot analyze :white_check_mark:\
y-a-2. react+springboot+mysql on docker-compose :white_check_mark:\

y-b-1. react-ts-bbs setup(node v12 lts) :white_check_mark:\
y-b-2. library - moment.js :white_check_mark:\
y-b-3. library - yup.js :white_check_mark:\
y-b-4. library - formik.js :white_check_mark:\
y-b-5. library - toast.js :white_check_mark:\
y-b-6. ts interface를 각 컴포넌트에 쓰는게 아닌, dto/ 로 따로 빼고 import해서 사용 :white_check_mark:\
y-b-7. react bootstrap(ui framework) 적용 :white_check_mark:\
y-b-8. props.history.push로 뒤로가기 처리 :white_check_mark:\
y-b-9. redux 어떻게 쓰는지 느낌만 파악 :white_check_mark:\
y-b-10. api.ts에서 node_env(prod | local) 에 따라 api endpoint 변경 처리 :white_check_mark:\
y-b-11. api.ts에서 request를 인터셉터해서 jwt token을 헤더에 첨부 :white_check_mark:

y-c-1. App.tsx에 전체 css 적용 + styled로 컴포넌트 모듈식으로 적용 :white_check_mark:\
y-c-2. styled는 styled.form 처럼 미리 만들어진 템플릿의 css를 입히는 식 :white_check_mark:\
y-c-3. config.ts에서 모든 url 관리 후 import 해서 사용 :white_check_mark:\
y-c-4. recoil.ts에서 모든 atom 정의 후, useSetRecoilState()로 setter, useRecoilValue()로 getter :white_check_mark:\
y-c-5. image upload :white_check_mark:\
y-c-6. 단일 image도 컴포넌트로 만들어 넣어줌 :white_check_mark:\
y-c-7. useParam() gets you id from /board/comment/${id} :white_check_mark:\
y-c-8. post submit 직후 loading (spinning bar) 처리 :white_check_mark:\
y-c-9. <Container >에서 flexbox & grid 처리:white_check_mark:

y-d-1. styled component naming convention :white_check_mark:

y-e-1. global style에 rem size 기준 default로 하기 :white_check_mark:\
y-e-2. oauth를 요청해도 accessToken받고 recoil과 sessionStorage에 보관한다. :white_check_mark:\
y-e-3. slider 구현 :white_check_mark:

y-f-1. library: react-responsive library -> useMediaQuery()로 특정 width 이하이면 isMobile로 전환 :white_check_mark:\
y-f-2. library: react-cookie -> useCookie()로 unique addView()만을 위한 수동 쿠키 관리 :white_check_mark:\
y-f-3. feat-bbs: category 처리를 `/boards?category1=${mainCategory}&category2=${subCategory}` 이런식으로 함 :white_check_mark:\
y-f-4. feat-bbs: BoardListPage에 main category, sub category 구분지어 내려주고, getBoard(main_cat, sub_cat) 요청도 구분지어 함 :white_check_mark:\
y-f-5. feat-bbs: 글에 tag 1,2,3 구현 :white_check_mark:\
y-f-6. feat-bbs: client side validation before submit using regex :white_check_mark:\
y-f-7. feat-bbs: client side validation fail시 view 처리 :white_check_mark:\
y-f-8. feat-bbs: board id를 위해 uuid를 썼지만, 굳이? :white_check_mark:\
y-f-9. feat-bbs: 댓글 삭제 후, getBoard() 요청 받아와서 상태관리에 board정보 최신 업데이트 :white_check_mark:\
y-f-10. feat-bbs: 글 추천 시, access token을 같이 보내서 로그인 해야만 추천 가능하도록 구현 :white_check_mark:\
y-f-11. feat-bbs: addView()시, 1유저 1 view를 확실히 하기 위해, useCookie()로 별도 쿠키 관리 하고(macaddress 안쓰는구나) updateView 요청을 따로 빼놓음. :white_check_mark:\
y-f-12. feat-user: user history(bbs/comment) :white_check_mark:\
y-f-13. knowhow: services/ 에 post 관련 async await 함수 전부 모아 관리 :white_check_mark:\
y-f-14. knowhow: URLSearchParams()으로 pages를 route 해준다 :white_check_mark:\
y-f-15. knowhow: prop pass시 key를 쓰는 이유 :white_check_mark:\
y-f-16. knowhow: assets 처리(svg icons) :white_check_mark:


y-g-1. feat: notification 구현 w/ react-query :white_check_mark:\
y-g-2. feat: filter 구현 w/ react-query :white_check_mark:\
y-g-3. feat: 배너의 슬라이더 이렇게 구현했구나 :white_check_mark:\
y-g-4. feat: OAuth github :white_check_mark:\
y-g-5. feat: 대댓글 :white_check_mark:\
y-g-6. knowhow: directory 구조가 다음과 같음 :white_check_mark:\
y-g-7. knowhow: css reset :white_check_mark:\
y-g-8. knowhow: loadingbar, alert message modal, scroll to top 밑에 페이지 spa로 전환하네 :white_check_mark:\
y-g-9. knowhow: 모든 url + http header 처리를 여기서 하네? :white_check_mark:\
y-g-10. knowhow: http request 마다, jwt access token를 local storage에서 꺼내어 첨부 :white_check_mark:\
y-g-11. knowhow: http response 인터셉터 해서 http status에 따라 다르게 처리(w/ toast) :white_check_mark:\
y-g-12. knowhow: 비번변경 patch로 잘 처리 했네. :white_check_mark:\
y-g-13. knowhow: file을 FormData에 담아 보내고, multipart/form-data 로 보내는구나! :white_check_mark:\
y-g-14. knowhow: asset을 font/icon/image로 구분하고 index.ts로 묶음 :white_check_mark:\
y-g-15. knowhow: loadingbar, alert message modal, scroll to top 밑에 페이지 spa로 전환하네? :white_check_mark:\
y-g-16. knowhow: `<S. 어쩌구>` 가 style 컴포넌트 네이밍 컨벤션인가보네? 쓸만한듯 :white_check_mark:\
y-g-17. knowhow - scroll to top 구현 :white_check_mark:\
y-g-18. knowhow: filter를 statemanagement의 장점을 잘 살려 구현함. re-render 안일어남. :white_check_mark:\
y-g-19. knowhow: styled의 dynamic css 활용. 조건에 맞게 animiation 변경. :white_check_mark:\
y-g-20. knowhow: ? 표시는 null일 수 있다는 말. 그러니 null이면 에러 뱉지마~ :white_check_mark:\
y-g-21. knowhow: 로그인 한 회원에게만 보이는 컴포넌트는, 이렇게 처리* :white_check_mark:\
y-g-22. knowhow: form input의 파일확장자 타입을 .jpg, .png, .gif 등 지정 가능하다. :white_check_mark:\
y-g-23. knowhow: access token & refresh token을 local storage에 담는다. 근데 얜 따로 state management 안하네? 굳이 팔 필요 없단건가? :white_check_mark:\
y-g-24. knowhow: inputs, passwordCheck이 바뀔 때마다, 재랜더링 해서 validation check. :white_check_mark:\
y-g-25. library: recoil에 atom은 getter, selector는 setter의 용도인줄 착각했는데, atom은 그저 인터페이스이고, selector가 getter & setter 둘 다 해당 :white_check_mark:\
y-g-26. library: react-toastify displays a brief message or alert that fades in and out of view :white_check_mark:\
y-g-27. library: react query로 요청할 떄, 파라미터에서 cache time, stale time도 지정할 수 있구나 :white_check_mark:\
y-g-28. library: what is queryClient.invalidateQueries() ? :white_check_mark:\
y-g-29. library: 포폴이 post되었으니, portfolio_list 를 가르키는 react-query를 다시 re-fetch해서 re-render! :white_check_mark:\
y-g-30. library: react-query를 useMutation으로 쓰는구나~ onSuccess, onError로 핸들링하고. :white_check_mark:\
y-g-31. library: toast로 성공시 alert modal을 이런식으로 띄우는구나 :white_check_mark:\
y-g-32. Q. 서버와 통신을 axios로 할거면, react-query를 왜 쓴거지? 다른 특수목적으로 썼나? 아니면 일반 http 요청과 구분지을만한 상태가 있나? :white_check_mark:\
y-g-33. Q. notification을 백엔드에서 어떻게 디자인 했을까? putNotification() 도 있는데, 왜 하필 put method? :white_check_mark:\
y-g-34. Q. recoil로 서버에 요청보내고 응답받으면 여기 묶인 컴포넌트들 죄다 re-render 일어날테니까, 이 경우엔 react-query 쓰는게 맞지 않나? -> 맞는데, 얘 호출하는걸 react-query씀 :white_check_mark:\
y-g-35. Q. backend에서 parameter 어떻게 받아서 처리했을까? pagination w/ size, field, sort, search(query, searchType) 이 다 공존하는디 :white_check_mark:\
y-g-36. Q. why not use styled for img, h2, p, div, etc? :white_check_mark:\
y-g-37. Q. react-query에서, diff useQuery() useMutation()? :white_check_mark:\
y-g-38. more: 근데 length만 validation check하는건 너무 부실. regex로 보충 필요. :white_check_mark:

z-a. bbs\
z-a-1. board-list\
z-a-2. board-view\
z-a-3. board-register\
z-a-4. board-edit\
z-a-5. signup\
z-a-6. login

z-b. ecommerce\
z-b-1. 상품 목록/ 상품 상세\
z-b-2. 장바구니\
z-b-3. 검색\
z-b-4. 위시리스트

zz-1. env setup with vite :white_check_mark:\
zz-2. react-router-dom으로 routing 설정 :white_check_mark:\
zz-3. passing props using 'useState' :white_check_mark:\
zz-4. component 계통도 :white_check_mark:\
zz-5. feat: toppings :white_check_mark:\
zz-6. feat: header & 장바구니 아이콘 :white_check_mark:\
zz-7. feat: category :white_check_mark:\
zz-8. feat: cart :white_check_mark:


---\
reference


d. [react-hooks-by-example](https://github.com/Lemoncode/react-hooks-by-example) \
d. [10 react hooks explained](https://www.youtube.com/watch?v=TNhaISOUy6Q&ab_channel=Fireship)

y-b. [react-ts-bbs](https://github.com/eastflag/react-board-typescript) \
y-c. [electric-vapers react ts project](https://github.com/imkdw/toy-project.git) \
y-d. [instagram react ts](https://github.com/imkdw/toy-project) \
y-e. [used-marketplace react ts](https://github.com/imkdw/used-marketplace) \
y-f. [hello-developer](https://github.com/imkdw/hdev_client) \
y-g. [portfolist - front](https://github.com/DSM-Portfolist/Portfolist-Front)
