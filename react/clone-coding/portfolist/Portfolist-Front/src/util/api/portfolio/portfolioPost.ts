import request from "../common/index";

const token = `Bearer ${localStorage.getItem("access_token_portfolist")}`;

export const imgFile = (file: any) => {
  const fd = new FormData();
  fd.append("file", file); //TODO - knowhow: file을 FormData에 담아 보내고, multipart/form-data 로 보내는구나! 
  return request({
    url: `/file`,
    method: "post",
    data: fd,
    headers: { Authorization: token, "Content-Type": "multipart/form-data" },
  });
};

export const pdfFile = (file: any) => {
  const fd = new FormData();
  fd.append("file", file);
  return request({
    url: `/pdf`,
    method: "post",
    data: fd,
    headers: { Authorization: token, "Content-Type": "multipart/form-data" },
  });
};

export const portfolioMakeSubmit = (data: any) => {
  return request({
    url: "/portfolio",
    method: "post",
    data: data,
    headers: { Authorization: token },
  });
};
