import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ListThumbnailHandle } from "../../../hook/listThumbnail";
import { monthPortfolioSelector } from "../../../modules/selector/mainpage";
import { Crwon } from "../../../util/assets";
import * as S from "./style";

const MonthPortfolio = () => {
  const monthPortfolio = useRecoilValue(monthPortfolioSelector);
  return (
    <div className="border-bottom">
      <S.MonthWrapper>
        {/* TODO - Q. why not use styled for img, h2, p, div, etc?
         * 
         * 1. perhaps the img, p, and h2 elements are styled using a global CSS stylesheet, which applies styles to these elements across the entire application
         * 2. css가 간단한거면, 굳이 styled까지 쓸 필요 없다는 의견. MonthWrapper나 Content같은 굵직한 css + ui component만 styled로 만들고, 나머지 짜잘이들은 regular css로 만들면 굵직이와 짜잘이 구분 가능.
         * 
         */}
        <img
          className="crwon-icon"
          src={Crwon}
          alt="이달의 포트폴리오 강조 아이콘"
        />
        <Link
          to={`/portfolio?id=${monthPortfolio?.id}`}
          className="img-wrapper"
        >
          <img
            src={ListThumbnailHandle(monthPortfolio?.thumbnail)}
            alt="이달의 포트폴리오 이미지"
          />
        </Link>
        <S.Content>
          <h2>이달의 포트폴리오</h2>
          <p className="introduce">
            여러분들이 선택한 touching 중 이달의 포트폴리오입니다.
          </p>
          <p className="user-introduce">
            {monthPortfolio?.name}님의 포트폴리오 입니다.
          </p>
          <div className="user-content">
            <p>{monthPortfolio?.title}</p>
            <p>{monthPortfolio?.introduce}</p>
          </div>
        </S.Content>
      </S.MonthWrapper>
    </div>
  );
};

export default MonthPortfolio;
