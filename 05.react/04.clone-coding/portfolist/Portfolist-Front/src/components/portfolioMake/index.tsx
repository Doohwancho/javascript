import { Footer, Header } from "..";
import * as S from "./style";
import TitleContainer from "./titleContainer/TitleContainer";
import MoreInfoContainer from "./moreInfoContainer/MoreInfoContainer";
import ImageContainerList from "./imageContainerList/ImageContainerList";
import LicenseContainer from "./licenseContainer/LicenseContainer";
import BannerContainer from "./bannerContainer/BannerContainer";
import FileLinkContainer from "./fileLinkContainer/FileLinkContainer";
import PrecautionsContainer from "./precautionsContainer/PrecautionsContainer";
import { useRecoilValue } from "recoil";
import { portfolioMakeList } from "../../modules/atom/portfolioPost";
import { portfolioMakeSubmit } from "../../util/api/portfolio/portfolioPost";
import OptionContainer from "./optionContainer/OptionContainer";
import { ToastError, ToastSuccess } from "../../hook/toastHook";
import { useHistory } from "react-router";
import { useMutation, useQueryClient } from "react-query";
import { AxiosError } from "axios";

const PortfolioMake = () => {
  const portfolioMakeArr = useRecoilValue(portfolioMakeList);

  const history = useHistory();
  const queryClient = useQueryClient();

  const { mutate: portfolioAddHandle } = useMutation(
    () => portfolioMakeSubmit(portfolioMakeArr),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("portfolio_list"); //TODO - library: 포폴이 post되었으니, portfolio_list 를 가르키는 react-query를 다시 re-fetch해서 re-render!
        ToastSuccess("포트폴리오가 작성되었습니다.");
        setTimeout(() => {
          history.push("/");
        }, 1500);
      },
      onError: (error: AxiosError) => {
        if (error?.response?.status === 404) {
          ToastError("빠진 항목을 모두 채워주세요");
        } else {
          ToastError("포트폴리오 작성에 실패했습니다.");
        }
      },
    }
  );

  return (
    <>
      <Header />
      <S.MainContainer>
        <PrecautionsContainer /> {/* 주의사항을 적는 Text 컴포넌트 */}
        <OptionContainer /> {/* 분야랑 공개 비공개 설정 컴포넌트 */}
        <TitleContainer /> {/* 제목 컴포넌트 */}
        <MoreInfoContainer /> {/*이메일이나 깃허브 넣는 컴포넌트*/}
        <ImageContainerList /> {/* 자신의 경험을 넣을 수 있는 이미지 리스트 */}
        <LicenseContainer /> {/* 자격증을 넣을 수 있는 리스트 */}
        <FileLinkContainer /> {/*파일이나 링크를 넣을 수 있는 컴포넌트 */}
        <BannerContainer /> {/* 이미지 배너 선택하는 컴포넌트 */}
        <S.FinshButton onClick={() => portfolioAddHandle()}>
          작성완료
        </S.FinshButton>
      </S.MainContainer>
      <Footer />
    </>
  );
};

export default PortfolioMake;
