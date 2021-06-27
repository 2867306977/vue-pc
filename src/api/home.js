import resquestMock from "../utils/resquestMock";
//定义接口 发送图片请求(模拟)
export const reqGetBanners = () => {
  return resquestMock({
    method: "GET",
    url: "/banners",
  });
};
export const reqGetFloors = () => {
  return resquestMock({
    method: "GET",
    url: "/floors",
  });
};
