import React, {useEffect, useState} from 'react';
import './App.css'; //TODO - 모듈로 적용 안하고 그냥 적용했네? css가 이러면 하위 모듈에 전부 영향가지 않나? -> css module 써서 해당 컴포넌트만 적용하게 바꾸는게 좋다. 
import Container from "react-bootstrap/Container";
import BoardList from "./pages/board-list/BoardList";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom"; //TODO - react router 처리
import BoardRegister from './pages/board-register/BoardRegister';
import BoardView from "./pages/board-view/BoardView";
import BoardEdit from "./pages/board-edit/BoardEdit";
import {Nav, Navbar} from "react-bootstrap";
import Login from "./pages/login/Login";
import SignUp from "./pages/sign-up/SignUp";

// 3rd react-toastify
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "./routes/PrivateRoute";
import {jwtUtils} from "./utils/JwtUtils";
import {useDispatch, useSelector} from "react-redux";
import {setToken} from "./redux/reducers/AuthReducer";
import Home from "./pages/Home";


function App(props: any) {
  const [isAuth, setIsAuth] = useState(false);
  const dispatch = useDispatch(); //redux에서 reducer 함수를 넣어주면 dispatcher 함수를 반환하고, 이 함수는 redux의 상태를 변화시킴. 
  const token = useSelector((state: any) => state.Auth.token); //redux에서 reducer 함수를 넣으면 state에서 보관하는 값을 반환함

  useEffect(() => {
    if (jwtUtils.isAuth(token)) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [token]);

  const logout = () => {
    dispatch(setToken(''));
  }

  return (
    <>
      <BrowserRouter>
        <Container fluid className="p-0">
          <Navbar bg="dark" variant="dark" expand="lg">
            <Link to="/" className="navbar-brand">HOME</Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" /> {/* TODO - navbar, header는 모든 페이지가 같고, 밑에 <main> 부분만 router로 내용 변경하는구나 */}
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto flex-grow-1">
                <Link to="/board-list" className="nav-link">게시판</Link>
                <Link to="/board-register" className="nav-link">글등록</Link>
                <span className="flex-grow-1"></span>
                {
                  isAuth ? <Nav.Link onClick={logout}>로그아웃</Nav.Link> :
                    <Link to="/login" className="nav-link">로그인</Link>
                }

              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Container>
        <Container fluid className="px-3 py-2">
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/board-list" component={BoardList}></Route>
            <PrivateRoute path="/board-register" component={BoardRegister}></PrivateRoute>
            <Route path="/board-view/:id" component={BoardView}></Route>
            <PrivateRoute path="/board-edit/:id" component={BoardEdit}></PrivateRoute>
            <Route path="/login" component={Login}></Route>
            <Route path="/sign-up" component={SignUp}></Route>
          </Switch>
        </Container>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
