// 首页三级分类
// import axios from "axios";
import request from "../utils/request";
export const reqNavData = () => {
  return request({
    method: "GET",
    url: "/product/getBaseCategoryList",
  });
};
