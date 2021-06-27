// 封装一个请求方法 设置拦截器
import axios from "axios";
import NProgress from "nprogress";
//引入css样式
import "nprogress/nprogress.css";

//通过将其设置为false来关闭加载微调器
NProgress.configure({ showSpinner: false });

const status = {
  401: "未授权",
  403: "禁止访问",
  404: "找不到资源",
  505: "服务器错误",
};
//创建一个axios实例
const request = axios.create({
  baseURL: "/mock", //基础路径: 公共的路径
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
request.interceptors.request.use(
  //接收config,返回config
  config => {
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
    NProgress.done();
    //response.data.code不是200也返回失败的promise
    return response.data.data;
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
