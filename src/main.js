import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./styles/reset.css";
import "./styles/comment.css";
//引入mock使其生效
import "./mock";
import "./styles/iconfont.css";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
