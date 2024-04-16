import { Arrow } from "../../../util/assets";
import ListItem from "./ListItem";
import * as S from "./style";
import { useRecoilValue } from "recoil";
import { recentPortfolioSelector } from "../../../modules/selector/mainpage";
import { recentPortfolioType } from "../../../util/interface/main/portfolio";
import { useHistory } from "react-router";

const List = () => {
  const recentPorfolio = useRecoilValue(recentPortfolioSelector);
  const history = useHistory();

  return (
    <div className="border-bottom">
      <S.ListWrapper>
        <S.GoWrapper
          onClick={() =>
            history.push(
              "/list?page=0&size=12&field=&sort=date&query=&searchType="
            )
          }
        >
          <p>portfolio</p>
          <button>
            <span>Go</span>
            <img src={Arrow} alt="화살표" />
          </button>
        </S.GoWrapper>
        <S.ListItemWrapper>
          {recentPorfolio?.map((list: recentPortfolioType, index: number) => (
            <ListItem
              key={index} //TODO - knowhow: recoil로 상태관리하는 모든 포트폴리오를 List 컴포넌트가 받되, props로 넘겨주는 건, 바로 1단계 아래 자식에게만, map으로. 
              title={list.title}
              content={list.introduce}
              id={list.portfolio_id}
              url={list.thumbnail}
            />
          ))}
        </S.ListItemWrapper>
      </S.ListWrapper>
    </div>
  );
};

export default List;
