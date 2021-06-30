import request from "../utils/request";
export const reqAddShopCart = (skuId, skuNum) => {
  return request({
    method: "POST",
    url: `/cart/addToCart/${skuId}/${skuNum}`,
  });
};
export const reqGetShopCart = () => {
  return request({
    method: "GET",
    url: `/cart/cartList`,
  });
};
export const reqChangeShopChecked = (skuID, isChecked) => {
  return request({
    method: "GET",
    url: `cart/checkCart/${skuID}/${isChecked}`,
  });
};
export const reqDelShop = skuId => {
  return request({
    method: "DELETE",
    url: `/cart/deleteCart/${skuId}`,
  });
};
