import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home";
// import Search from "../views/Search";
// import Login from "../views/Login";
// import Register from "../views/Register";
// import Detail from "../views/Detail";
// import AddCartSuccess from "../views/AddCartSuccess";
// import ShopCart from "../views/ShopCart";
// import Center from "../views/Center";
// import Pay from "../views/Pay";
// import PaySuccess from "../views/PaySuccess";
// import Trade from "../views/Trade";
//路由懒加载
//将路由组件打包成单独js,css文件,需要使用时才会加载,
const Home = () => import(/*webpackChunkName:'Home'*/ "../views/Home");
const Search = () => import(/*webpackChunkName:'Search'*/ "../views/Search");
const Login = () => import(/*webpackChunkName:'Login'*/ "../views/Login");
const Register = () =>
  import(/*webpackChunkName:'Register'*/ "../views/Register");
const Detail = () => import(/*webpackChunkName:'Detail'*/ "../views/Detail");
const AddCartSuccess = () =>
  import(/*webpackChunkName:'AddCartSuccess'*/ "../views/AddCartSuccess");
const ShopCart = () =>
  import(/*webpackChunkName:'ShopCart'*/ "../views/ShopCart");
const Center = () => import(/*webpackChunkName:'Center'*/ "../views/Center");
const Pay = () => import(/*webpackChunkName:'Pay'*/ "../views/Pay");
const PaySuccess = () =>
  import(/*webpackChunkName:'PaySuccess'*/ "../views/PaySuccess");
const Trade = () => import(/*webpackChunkName:'Trade'*/ "../views/Trade");

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
  {
    name: "Detail",
    path: "/detail/:id",
    component: Detail,
  },
  //添加到购物车成功
  {
    name: "AddCartSuccess",
    path: "/addCartSuccess",
    component: AddCartSuccess,
    //路由导航守卫
    beforeEnter: (to, from, next) => {
      //to: 去哪个路由的配置对象
      //from: 从哪个路由配置对象来的
      //next 必须调用,不然不会跳转下一个地址
      if (from.name === "Detail") {
        next(); //直接调用跳转到to的路由地址
      } else {
        next(from); //不是的话 从哪来回哪去
      }
    },
  },
  //购物车
  {
    name: "ShopCart",
    path: "/shopCart",
    component: ShopCart,
  },
  //支付页面
  {
    name: "Pay",
    path: "/pay",
    component: Pay,
    beforeEnter: (to, from, next) => {
      //to: 去哪个路由的配置对象
      //from: 从哪个路由配置对象来的
      //next 必须调用,不然不会跳转下一个地址
      if (from.name === "Trade") {
        next(); //直接调用跳转到to的路由地址
      } else {
        next(from); //不是的话 从哪来回哪去
      }
    },
  },
  //支付成功页面
  {
    name: "PaySuccess",
    path: "/paySuccess",
    component: PaySuccess,
    beforeEnter: (to, from, next) => {
      //to: 去哪个路由的配置对象
      //from: 从哪个路由配置对象来的
      //next 必须调用,不然不会跳转下一个地址
      if (from.name === "Pay") {
        next(); //直接调用跳转到to的路由地址
      } else {
        next(from); //不是的话 从哪来回哪去
      }
    },
  },
  //结算页面
  {
    name: "Trade",
    path: "/trade",
    component: Trade,
    beforeEnter: (to, from, next) => {
      //to: 去哪个路由的配置对象
      //from: 从哪个路由配置对象来的
      //next 必须调用,不然不会跳转下一个地址
      if (from.name === "ShopCart") {
        next(); //直接调用跳转到to的路由地址
      } else {
        next(from); //不是的话 从哪来回哪去
      }
    },
  },
  //我的订单
  {
    name: "Center",
    path: "/center",
    component: Center,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
