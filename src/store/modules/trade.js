import { reqGetTrade } from "../../api/order";
const state = {
  tradeNo: "",
  totalNum: 1,
  totalAmount: 1,
  detailArrayList: [],
  paymentWay: "ONLINE",
  userAddressList: [
    {
      consignee: "老胡",
      id: 1,
      isDefault: "1",
      phoneNum: "13011111111",
      userAddress: "广东省深圳市宝安区后瑞洗脚城",
    },
    {
      consignee: "芳芳",
      id: 2,
      isDefault: "0",
      phoneNum: "15011111111",
      userAddress: "广东省深圳市宝安区后瑞洗脚城",
    },
    {
      consignee: "小罗",
      id: 3,
      isDefault: "0",
      phoneNum: "18011111111",
      userAddress: "广东省深圳市宝安区后瑞洗脚城",
    },
  ],
};
const getter = {};
const actions = {
  async getTrade({ commit }) {
    const res = await reqGetTrade();
    commit("GET_TRADE", res);
  },
};
const mutations = {
  GET_TRADE(state, res) {
    state.tradeNo = res.tradeNo;
    state.totalAmount = res.totalAmount;
    state.totalNum = res.totalNum;
    state.detailArrayList = res.detailArrayList;
    state.orderComment = res.orderComment;
  },
};
export default {
  namespaced: true,
  state,
  getter,
  actions,
  mutations,
};
