import { v4 as uuidv4 } from "uuid";
//先读取本地id
let id = localStorage.getItem("userTempId");
export default function getUserTempId() {
  //判断localStorage上id是否存在,不存在就设置一个id
  if (!id) {
    id = uuidv4();
    localStorage.setItem("userTempId", id);
  }
  return id;
}
