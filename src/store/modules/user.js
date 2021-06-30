import { reqLogin } from "../../api/user";
// console.log(JSON.parse(localStorage.getItem("user")));
//存储数据,locationStorage,sessionStorage中查找是否有数据,都没有则初始化数据
const state = JSON.parse(localStorage.getItem("user")) ||
  JSON.parse(sessionStorage.getItem("user")) || {
    name: "",
    nickName: "",
    token: "",
  };
const getter = {};
const actions = {
  async login({ commit }, { phone, password }) {
    const user = await reqLogin({ phone, password });
    commit("LOGIN", user);
    return user;
  },
};
const mutations = {
  LOGIN(state, user) {
    state.name = user.name;
    state.nickName = user.nickName;
    state.token = user.token;
  },
};
export default {
  namespaced: true,
  state,
  getter,
  actions,
  mutations,
};
