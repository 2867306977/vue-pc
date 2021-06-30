// 封装一个请求方法 设置拦截器
import axios from "axios";
import NProgress from "nprogress";
import getUserTempId from "./uuid";
NProgress.configure({ showSpinner: false });
const status = {
  401: "未授权",
  403: "禁止访问",
  404: "找不到资源",
  505: "服务器错误",
};
//创建一个axios实例
const request = axios.create({
  baseURL: "/api", //基础路径: 公共的路径
  headers: {}, //公共的请求头
  timeout: 10000, //请求超时,中断请求
});
/*
  设置拦截器

  发送请求工作流程：
    触发请求拦截器的回调
      设置公共的请求参数
    发送请求
    触发响应拦截器的回调
      处理响应结果
    触发then/catch的回调
*/
//外面的js只解析一次, 但是一刷新就会重新解析,所以需要把id存储到storage上
// const uuid = uuidv4();
//触发请求拦截器
request.interceptors.request.use(
  //接收config,返回config
  config => {
    // config.headers.xxx = xxx 发送请求携带请求头
    //userTempId是服务器规定的
    // const uuid = uuidv4();//不能在这个地方定义id,因为请求会发送多次,然后每次id都不一样
    config.headers.userTempId = getUserTempId();
    //进度条开始
    NProgress.start();
    // console.log(config); //{url: "/api/product/getBaseCategoryList", method: "get".....}
    return config; //必须返回请求配置对象,响应时知道响应到那个地址
  },
  () => {
    console.log("请求回调失败");
  }
);
request.interceptors.response.use(
  //接收response
  response => {
    // console.log(response.data);
    //response.data.code不是200也返回失败的promise
    NProgress.done();
    if (response.data.code === 200) {
      return response.data.data;
    } else {
      return Promise.reject(response.data.message);
    }
  },
  e => {
    /* 
    分两种失败情况:
    响应回来了 但是是失败:4xx,5xx response有值
    响应没有回来: 网络错误,网络超时, 没有response值
     */
    // console.dir(e);
    //初始化
    let message = "未知错误,请及时联系管理员";
    if (e.response) {
      //有response值,则判断status状态码
      /* 
       401: '未授权',
      403: '禁止访问',
      404: '资源找不到',
      500: '服务器内部错误'
       */
      message = status[e.response.status];
    } else {
      if (e.message.indexOf("timeout") > -1) {
        message = "网络超时,请检查网络";
      }
    }
    return Promise.reject(message);
  }
);
export default request;
