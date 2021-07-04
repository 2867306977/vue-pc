import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./styles/reset.css";
import "./styles/comment.css";
//引入mock使其生效
import "./mock";
import "./styles/iconfont.css";
//引入懒加载插件
import VueLazyLoad from "vue-lazyload";
Vue.config.productionTip = false;
//引入图片
import error from "./assets/error.jpeg";
import loading from "./assets/loading.gif";

//安装懒加载插件
//在使用vue-lazyload插件时，v-lazy='src'中的src一定要使用data里面的变量，不能写真实的图片路径，这样会报错导致没有效果，
//因为vue的自定义指令必须对应data中的变量或者是数字
Vue.use(VueLazyLoad, {
  preLoad: 1.3, //图片预加载高度比例
  error: error, //加载失败图片
  loading: loading, //加载中图片
  attempt: 1, //加载次数
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
