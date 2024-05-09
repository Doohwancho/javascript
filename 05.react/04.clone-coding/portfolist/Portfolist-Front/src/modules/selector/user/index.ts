import { atom, selector } from "recoil";
import { getNotification } from "../../../util/api/mypage";
import { getUser } from "../../../util/api/user/info";
import { notificationType } from "../../../util/interface/main/portfolio";
import { UserInfoType } from "../../../util/interface/user";

export const userInfoValue = atom<UserInfoType | undefined>({
  key: "userInfo",
  default: {
    field: [""],
    introduce: "",
    name: "string",
    profile_img: "string",
    github_user: false,
  },
});

// 마이페이지 유저 정보
export const myInfoSelector = selector<UserInfoType>({
  key: "getUser",
  get: async () => {
    try {
      const res = await getUser();
      return res.data;
    } catch (e) {
      console.log(e);
    }
  },
  set: ({ set }, newValue) => { //TODO - library: recoil에 atom은 getter, selector는 setter의 용도인줄 착각했는데, atom은 그저 인터페이스이고, selector가 getter & setter 둘 다 해당 
    set(userInfoValue, newValue);
  },
});

export const notificationSelector = selector<notificationType[]>({
  key: "notification/get",
  get: async () => {
    try {
      const res = await getNotification(); //TODO - Q. recoil로 서버에 요청보내고 응답받으면 여기 묶인 컴포넌트들 죄다 re-render 일어날테니까, 이 경우엔 react-query 쓰는게 맞지 않나? -> 맞는데, 얘 호출하는걸 react-query씀
      return res.data;
    } catch (e) {
      console.log(e);
    }
  },
});
