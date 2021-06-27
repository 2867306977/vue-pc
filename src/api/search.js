// 搜索发送请求
// import axios from "axios";
import request from "../utils/request";
export const reqSearchGoodsList = options => {
  return request({
    method: "POST",
    url: "/list",
    //options是个对象
    data: options,
  });
};
