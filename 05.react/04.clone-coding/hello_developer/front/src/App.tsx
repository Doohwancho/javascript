import { Route, Routes } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import AuthPage from "./pages/Auth/AuthPage";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Loading } from "./components/Common";
import { isLoadingState, loggedInUserState } from "./recoil";
import MainPage from "./pages/Main/MainPage";
import NotFound from "./pages/Error/NotFound";
import VerifyPage from "./pages/Auth/VerifyPage";
import BoardListPage from "./pages/Board/BoardListPage";
import BoardDetailPage from "./pages/Board/BoardDetailPage";
import CreateBoardPage from "./pages/Board/CreateBoardPage";
import UpdateBoardPage from "./pages/Board/UpdateBoardPage";
import ProfilePage from "./pages/User/ProfilePage";
import { useEffect } from "react";
import SearchPage from "./pages/Search/SearchPage";
import { checkLoggedIn } from "./services/AuthService";

function App() {
  const isLoading = useRecoilValue(isLoadingState);
  const setLoggedInUser = useSetRecoilState(loggedInUserState);

  useEffect(() => {
    const checkLoggedInUser = async () => {
      const storageUser = localStorage.getItem("loggedInUser");
      if (!storageUser) {
        return;
      }

      const { accessToken, userId, profileImg, nickname } = JSON.parse(storageUser);

      try {
        await checkLoggedIn(userId, accessToken);
        setLoggedInUser({
          accessToken,
          userId,
          profileImg,
          nickname,
        });
      } catch (err: any) {
        setLoggedInUser({
          userId: "",
          accessToken: "",
          profileImg: "",
          nickname: "",
        });
        localStorage.removeItem("loggedInUser");
      }
    };

    checkLoggedInUser();
  }, [setLoggedInUser]);

  return (
    <>
      <GlobalStyles />
      {isLoading && <Loading />}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/login" element={<AuthPage type="login" />} />
        <Route path="/register" element={<AuthPage type="register" />} />
        <Route path="/verify/:verifyToken" element={<VerifyPage />} />
        <Route path="/notice" element={<BoardListPage currentBoard="notice" />} /> {/* TODO - subCategory를 이런식으로 App.tsx에서 넣어줬구나 */}
        <Route path="/suggestion" element={<BoardListPage currentBoard="suggestion" />} />
        <Route path="/free" element={<BoardListPage currentBoard="free" />} />
        <Route path="/knowledge/*" element={<BoardListPage currentBoard="knowledge" />} />
        <Route path="/qna/*" element={<BoardListPage currentBoard="qna" />} />
        <Route path="/recruitment/*" element={<BoardListPage currentBoard="recruitment" />} />
        <Route path="/boards/add" element={<CreateBoardPage />} />
        <Route path="/boards/:boardId/update" element={<UpdateBoardPage />} />
        <Route path="/boards/:boardId" element={<BoardDetailPage />} />
        <Route path="/users/:userId" element={<ProfilePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
