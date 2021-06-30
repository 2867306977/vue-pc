import { reqGetGoodsDetail } from "../../api/detail";
const state = {
  goods: {
    categoryView: {},
    spuSaleAttrList: [],
    skuInfo: {
      skuImageList: [],
    },
  },
};
const getter = {};
const actions = {
  //发送请求
  async getGoodsDetail({ commit }, id) {
    try {
      const res = await reqGetGoodsDetail(id);
      commit("GET_GOODS_DETAIL", res);
    } catch (e) {
      console.log(e);
    }
  },
};
const mutations = {
  GET_GOODS_DETAIL(state, res) {
    state.goods = res;
  },
};
export default {
  namespaced: true,
  state,
  getter,
  actions,
  mutations,
};
