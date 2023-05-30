---\
Objective

modularize react concepts


---\
Fields

a. get-used-to\
b. build react from scratch\
c. component-based-programming :white_check_mark:\
d. hooks\
e. state\
g. starter template :white_check_mark:\
y. steal\
z. module\
zz. playground

x. styled component\
x. redux\
x. react-query




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
d-9. useDebugValue :white_check_mark:

d-x. useImperativeHandle\
d-x. useLayoutEffect\


e-1. useState - example:gallary.js :white_check_mark:\
e-2. state as snapshot :white_check_mark:\
e-x. state management

g-1. [react,ts,eslint,vite,jest-dom](https://www.youtube.com/watch?v=cchqeWY0Nak&t=3s&ab_channel=CodingGarden) :white_check_mark:


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
y-f. [hello-developer](https://github.com/imkdw/hdev_client)
