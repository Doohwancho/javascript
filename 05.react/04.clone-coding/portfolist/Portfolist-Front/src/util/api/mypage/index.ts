import request from "../common/index";
const token = `Bearer ${localStorage.getItem("access_token_portfolist")}`;

export const getNotification = async () => {
  return await request({
    url: "/user/notification",
    method: "get",
    headers: { Authorization: token },
  });
};

export const patchUserInfo = (
  field: number[],
  name: string,
  introduce: string
) => {
  return request({
    url: "/user/info",
    method: "patch",
    headers: { Authorization: token },
    data: {
      field: field,
      introduce: introduce,
      name: name,
    },
  });
};

export const deleteUser = () => {
  return request({
    url: "/user",
    method: "delete",
  });
};

export const getNotificationStatus = () => {
  return request({
    url: "/user/notification/status", //TODO - Q. notification을 백엔드에서 어떻게 디자인 했을까? putNotification() 도 있는데, 왜 하필 put method?
    headers: { Authorization: token },
    method: "get",
  });
};

export const putNotification = (data: boolean) => {
  return request({
    url: "/user/notification",
    method: "put",
    headers: { Authorization: token },
    data: { notification: data },
  });
};

export const postPasswordCheck = (password: string) => {
  return request({
    url: "/user/password",
    method: "post",
    headers: { Authorization: token },
    data: { now_password: password },
  });
};

export const patchPassword = (now_password: any, new_password: any) => {
  return request({
    url: "/user/password",
    method: "patch", //TODO - knowhow: 비번변경 patch로 잘 처리 했네. 
    headers: { Authorization: token },
    data: {
      now_password: now_password.password,
      new_password: new_password.password,
    },
  });
};
