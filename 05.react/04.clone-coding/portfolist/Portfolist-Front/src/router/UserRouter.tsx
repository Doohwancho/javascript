import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  Login,
  Main,
  PortfolioDatail,
  PortfolioList,
  SignUp,
  PortfolioMake,
  Token,
  MyPage,
  MypageModify,
  UserPage,
  EmailAuth,
  EmailAuthFail,
  PortfolioModify,
} from "../components";
import ScrollToTop from "../components/common/scrollToTop/ScrollToTop";

const UserRouter = () => {
  return (
    <BrowserRouter>
      <ScrollToTop /> {/* TODO - knowhow: loadingbar, alert message modal, scroll to top 밑에 페이지 spa로 전환하네?  */}
      <Switch>
        <Route path="/" component={Main} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/sign-up" component={SignUp} exact />
        <Route path="/list" component={PortfolioList} exact />
        <Route path="/portfolio" component={PortfolioDatail} exact />
        <Route path="/login-github" component={Token} exact />
        <Route path="/my-page" component={MyPage} exact />
        <Route path="/my-page-modify" component={MypageModify} exact />
        <Route path="/user-page/:userId" component={UserPage} exact />
        <Route path="/portfolio-make" component={PortfolioMake} exact />
        <Route path="/portfolio-modify" component={PortfolioModify} exact />
        <Route path="/sign/emailauth" component={EmailAuth} exact />
        <Route path="/sign/emailauthfail" component={EmailAuthFail} exact />
      </Switch>
    </BrowserRouter>
  );
};

export default UserRouter;
