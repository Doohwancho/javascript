import { useQuery } from "react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import { notiBox } from "../../../../modules/atom/header";
import { notificationSelector } from "../../../../modules/selector/user";
import { getNotificationStatus } from "../../../../util/api/mypage";
import { NoNotification, Notification } from "../../../../util/assets";
import { notificationType } from "../../../../util/interface/main/portfolio";
import NotiItem from "./NotiItem";
import * as S from "./style";

const Notiication = () => {
  const [noti, setNoti] = useRecoilState<boolean>(notiBox);

  const token = `Bearer ${localStorage.getItem("access_token_portfolist")}`;
  const notification = useRecoilValue(notificationSelector);

  const { data: notiStatus } = useQuery( //TODO - feat: notification 구현 w/ react-query
    "noti_status",
    () => getNotificationStatus(),
    {
      cacheTime: Infinity, //TODO - library: react query로 요청할 떄, 파라미터에서 cache time, stale time도 지정할 수 있구나 
      staleTime: Infinity,
    }
  );

  return (
    <>
      {token && (
        <S.NotiWrapper> {/* TODO - knowhow: <S. 어쩌구> 가 style 컴포넌트 네이밍 컨벤션인가보네? 쓸만한듯 */}
          <img
            className="noti-img"
            src={
              notiStatus?.data.notification
                ? `${Notification}`
                : `${NoNotification}`
            }
            alt="알림아이콘"
            onMouseOver={() => setNoti(true)}
            onMouseOut={() => setNoti(false)}
          />

          <S.Notification
            noti={noti}
            style={noti ? { height: "fit-content" } : { height: 0 }}
            onMouseOver={() => setNoti(true)}
            onMouseOut={() => setNoti(false)}
          >
            {notification?.length === 0 ? (
              <div className="notification-none">알림이 없습니다.</div>
            ) : (
              <>
                {notification?.map((item: notificationType) => (
                  <NotiItem key={item.id} item={item} />
                ))}
              </>
            )}
          </S.Notification>
        </S.NotiWrapper>
      )}
    </>
  );
};

export default Notiication;
