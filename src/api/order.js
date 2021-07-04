// /api/order/auth/trade
import request from "../utils/request";
export const reqGetTrade = () => {
  return request({
    method: "GET",
    url: "/order/auth/trade",
  });
};
///api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder = ({
  tradeNo,
  consignee,
  consigneeTel,
  deliveryAddress,
  orderComment,
  orderDetailList,
}) => {
  return request({
    method: "POST",
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data: {
      consignee,
      consigneeTel,
      deliveryAddress,
      paymentWay: "ONLINE",
      orderComment,
      orderDetailList,
    },
  });
};
///api/payment/weixin/createNative/{orderId}
export const reqGetOrderPayment = orderId => {
  return request({
    method: "GET",
    url: `/payment/weixin/createNative/${orderId}`,
  });
};
export const reqQueryPayStatus = orderId => {
  return request({
    method: "GET",
    url: `/payment/weixin/queryPayStatus/${orderId}`,
  });
};
