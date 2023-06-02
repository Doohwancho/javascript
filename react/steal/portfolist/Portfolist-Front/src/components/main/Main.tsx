import { Header, Banner, MonthPortfolio, News, Footer } from "../index";
import FilterBar from "./filterBar/FilterBar";
import Introduce from "./introduce/Introduce";
import List from "./portList";
import * as S from "./style";

const Main = () => {
  const token = localStorage.getItem("access_token_portfolist");

  return (
    <S.MainWrapper>
      <Header />
      <Banner />
      <FilterBar />
      <List />
      <MonthPortfolio />
      <Introduce />
      {token && <News />} { /* TODO - knowhow: 로그인 한 회원에게만 보이는 컴포넌트는, 이렇게 처리*/}
      <Footer />
    </S.MainWrapper>
  );
};

export default Main;
