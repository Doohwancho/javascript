import { useHistory } from "react-router";
import { useRecoilValue } from "recoil";
import { selectFieldList } from "../../../modules/atom/portfolio/main";
import { useFieldValue } from "../../../modules/atom/portfolio/search";
import { Arrow } from "../../../util/assets";
import FilterItem from "./FilterItem";
import * as S from "./style";

const FilterBar = () => {
  const useField = useRecoilValue(useFieldValue);
  const selectField = useRecoilValue(selectFieldList); //TODO knowhow: filter를 statemanagement의 장점을 잘 살려 구현함. re-render 안일어남. 
  const history = useHistory();

  return (
    <>
      <S.FilterWrapper>
        <S.FilterItemWrap>
          <div className="wrapper">
            <span id="field-text">분야</span>
            <div className="filter-wrap">
              {selectField?.map((_: any, index: number) => (
                <FilterItem key={index} />
              ))}
            </div>
          </div>
        </S.FilterItemWrap>
        <S.MoreItem
          onClick={() =>
            history.push(
              `/list?page=0&size=12&field=${useField}&sort=date&query=&searchType=` //TODO Q. backend에서 parameter 어떻게 받아서 처리했을까? pagination w/ size, field, sort, search(query, searchType) 이 다 공존하는디
            )
          }
        >
          <p>보러가기</p>
          <img src={Arrow} alt="더 보러가기 아이콘" />
        </S.MoreItem>
      </S.FilterWrapper>
    </>
  );
};

export default FilterBar;
