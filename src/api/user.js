import request from "../utils/request";

// 发送手机验证码
export const reqSendCode = phone => {
  return request({
    method: "GET",
    url: `/user/passport/sendCode/${phone}`,
  });
};
export const reqRegister = ({ phone, password, code }) => {
  return request({
    method: "POST",
    url: "/user/passport/register",
    data: {
      phone,
      password,
      code,
    },
  });
};
export const reqLogin = ({ phone, password }) => {
  return request({
    method: "POST",
    url: "/user/passport/login",
    data: {
      phone,
      password,
    },
  });
};
