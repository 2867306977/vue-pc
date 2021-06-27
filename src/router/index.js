import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Search from "../views/Search";
import Login from "../views/Login";
import Register from "../views/Register";

Vue.use(VueRouter);

const routes = [
  {
    name: "Home", // 命名路由
    path: "/",
    component: Home,
    // props() {}
    // children: []
    // redirect: ''
  },
  {
    name: "Search",
    // params参数，路径必须是:xxx写法才行
    // :xxx? 可选的params参数，可以有可以没有
    // :xxx 必填的params参数，必要要有，没有地址重定向到/
    path: "/search/:keyword?",
    component: Search,
  },
  {
    name: "Login",
    path: "/login",
    component: Login,
    // 当当前路由加载了，meta参数就会传入的$route.meta中
    meta: {
      isFooterHide: true,
    },
  },
  {
    name: "Register",
    path: "/register",
    component: Register,
    meta: {
      isFooterHide: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
