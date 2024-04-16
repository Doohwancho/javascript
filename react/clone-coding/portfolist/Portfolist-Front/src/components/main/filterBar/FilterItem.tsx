import { useState } from "react";
import { useQuery } from "react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  selectFieldList,
  selectFieldNum,
} from "../../../modules/atom/portfolio/main";
import { useFieldValue } from "../../../modules/atom/portfolio/search";
import { getField } from "../../../util/api/portfolio/portfolio";
import { NoSelectedArrow, SelectedArrow } from "../../../util/assets";
import { mainColor } from "../../../util/css/color/color";
import { FieldType } from "../../../util/interface/Sign/loginType";
import * as S from "./style";

const FilterItem = () => { //TODO - feat: filter 구현 w/ react-query
  const [text, setText] = useState<string>("");
  const [arrowSelect, setArrowSelect] = useState<boolean>(false);
  const [useField, setUseField] = useRecoilState(useFieldValue);
  const [selectField, setSelectField] = useRecoilState(selectFieldList);
  const fieldNum = useRecoilValue(selectFieldNum);

  const { data: field } = useQuery(["field"], () => getField(), {
    cacheTime: Infinity,
    staleTime: Infinity,
    keepPreviousData: true,
  });

  function UseFieldAdd() {
    if (selectField.length <= 2) {
      setSelectField(selectField?.concat({ id: fieldNum + 1 }));
    }
  }

  function handleClickField(field: FieldType) {
    setText(field.content);
    setArrowSelect(false);
    setUseField(useField?.concat(field.content));

    UseFieldAdd();
  }

  return (
    <>
      <div className="field-item-wrap">
        <div className="filed-wrap">
          <div
            className="category_wrap"
            style={{
              borderBottom:
                text === "" ? "2px solid #C4C4C4" : `2px solid ${mainColor}`,
            }}
            onClick={() => setArrowSelect(!arrowSelect)}
          >
            <p>{text}</p>
            <S.ArrowImg
              src={text === "" ? NoSelectedArrow : SelectedArrow}
              alt="화살표 상태"
              style={
                arrowSelect
                  ? { transform: "rotate(180deg)" } //TODO - knowhow: styled의 dynamic css 활용. 조건에 맞게 animiation 변경. 
                  : { transform: "rotate(0deg)" }
              }
            />
          </div>
          <S.FieldSelectWrap arrowSelect={arrowSelect}>
            <li
              onClick={() => {
                setText("ALL");
                setArrowSelect(false);
              }}
            >
              ALL
            </li>
            {field?.data?.map((field: FieldType) => ( //TODO knowhow: ? 표시는 null일 수 있다는 말. 그러니 null이면 에러 뱉지마~
              <li key={field.id} onClick={() => handleClickField(field)}>
                {field.content}
              </li>
            ))}
          </S.FieldSelectWrap>
        </div>
      </div>
    </>
  );
};

export default FilterItem;
