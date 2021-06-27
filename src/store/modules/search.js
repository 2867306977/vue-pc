import { reqSearchGoodsList } from "../../api/search";
const state = {
  //需要保存的数据
  trademarkList: [],
  goodsList: [],
  attrsList: [],
  //分页需要的数据
  total: 0,
};
//存储只读计算属性
const getter = {};
//间接更新方法,通常使用发送请求 异步方法
const actions = {
  async searchGoodsList({ commit }, options) {
    try {
      //发送请求获取数据
      const res = await reqSearchGoodsList(options);
      //触发mutations更新数据
      commit("SEARCH_GOODS_LIST", res);
    } catch (error) {
      console.log(error);
    }
  },
};
const mutations = {
  SEARCH_GOODS_LIST(state, res) {
    state.trademarkList = res.trademarkList;
    state.goodsList = res.goodsList;
    state.attrsList = res.attrsList;
    state.total = res.total;
  },
};
export default {
  namespaced: true,
  state,
  getter,
  actions,
  mutations,
};
