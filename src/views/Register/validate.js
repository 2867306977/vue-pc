import { extend } from "vee-validate";
import { passwordReg, phoneReg, codeReg } from "../../utils/regs";
// 定义表单校验规则
extend("phoneRequired", {
  validate(value) {
    return !!value;
  },
  message: "手机号不能为空", // 校验失败提示的错误信息
  computesRequired: true, // 必要的
});

extend("phone", {
  validate(value) {
    // console.log(value);
    return phoneReg.test(value);
  },
  message: "请输入合法手机号", // 校验失败提示的错误信息
});

extend("passwordRequired", {
  validate(value) {
    return !!value;
  },
  message: "密码不能为空",
  computesRequired: true,
});

extend("password", {
  validate(value) {
    return passwordReg.test(value);
  },
  message: "请输入合法密码",
});

extend("rePasswordRequired", {
  validate(value) {
    return !!value;
  },
  message: "确认密码不能为空",
  computesRequired: true,
});

extend("rePassword", {
  validate(rePassword, { password }) {
    // console.log(args);返回的是一个{password:xxx}
    // 获取到密码
    return rePassword === password;
  },
  message: "两次密码输入不一致",
  params: ["password"], // 声明接受参数
});

extend("codeRequired", {
  validate(value) {
    return !!value;
  },
  message: "手机验证码不能为空",
  computesRequired: true,
});

extend("code", {
  validate(value) {
    // console.log(args); 返回的是一个["code"]
    return codeReg.test(value);
  },
  message: "验证码输入不正确",
});

extend("isChecked", {
  validate(isChecked) {
    // value就是校验的值
    return isChecked; // 返回值true校验成功，反之校验失败
  },
  message: "请勾选同意尚品汇用户协议", // 校验失败提示的错误信息
  computesRequired: true,
});
