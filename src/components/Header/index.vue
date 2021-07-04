<template>
  <div class="header">
    <div class="header-top">
      <div class="header-content w">
        <div class="header-content-left">
          <span>
            尚品汇欢迎您！
            <div v-if="!name" style="display:inline-block">
              <router-link to="/login" class="login">登录</router-link>
              <router-link to="/register">免费注册</router-link>
            </div>
            <div v-else style="display:inline-block">
              <span>{{name}}</span>
              <button class="logout" @click="handleLogout">退出登录</button>
            </div>
          </span>
        </div>
        <ul class="header-content-right">
          <li>
            <router-link to="/center">我的订单</router-link>
          </li>
          <li>
            <router-link to="/shopCart">我的购物车</router-link>
          </li>
          <li>
            <router-link to="/">我的尚品汇</router-link>
          </li>
          <li>
            <router-link to="/">尚品汇会员</router-link>
          </li>
          <li>
            <router-link to="/">企业采购</router-link>
          </li>
          <li>
            <router-link to="/">关注尚品汇</router-link>
          </li>
          <li>
            <router-link to="/">合作招商</router-link>
          </li>
          <li>
            <router-link to="/">商家后台</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="header-bottom w">
      <div class="header-bottom-logo">
        <img src="./logo.png" alt="logo" @click="$router.history.push('/')" />
      </div>
      <div class="header-bottom-search">
        <!-- 取消默认行为不然会跳转 -->
        <form @submit.prevent="toSearch">
          <input type="text" v-model="keyword" />
          <button>搜索</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Header",
  data() {
    return {
      keyword: "",
    };
  },
  // mounted() {
  //   console.log(this.$route.query);
  // },
  methods: {
    ...mapActions("user", ["logout"]),
    toSearch() {
      const keyword = this.keyword.trim();
      const location = {
        name: "Search",
        query: this.$route.query,
      };
      //如果keyword有值就添加
      if (keyword) {
        // 这里传了params,那么需要配置路由,params参数必须定义 :xxx
        location.params = { keyword };
      }
      this.$router.history.push(location);
    },
    //退出登录
    async handleLogout() {
      //清除localStorage数据 及本地数据
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");
      //发送请求退出登录 告诉服务器清除数据
      await this.logout();
      this.$router.history.push("/");
    },
  },
  computed: {
    ...mapState("user", ["name"]),
  },
};
</script>

<style lang="less">
.header-top {
  padding: 5px 0;
  background-color: #eaeaea;
}
.header-content {
  display: flex;
  justify-content: space-between;
}
.header-content-left {
  .login {
    border-right: 1px solid #333;
    padding-right: 5px;
    margin-right: 5px;
  }
}
.header-content-right {
  display: flex;
  justify-content: space-between;
  li {
    border-right: 1px solid #333;
    padding-right: 10px;
    margin-right: 10px;
    &:last-child {
      border: none;
      padding: 0;
      margin: 0;
    }
  }
}
.header-bottom {
  display: flex;
  justify-content: space-between;
  .header-bottom-logo {
    padding: 20px;
  }
}
.header-bottom-search {
  display: flex;
  align-items: center;
  input {
    box-sizing: border-box;
    width: 490px;
    height: 32px;
    padding: 0px 4px;
    border: 2px solid #ea4a36;
    outline: none;
  }
  button {
    height: 32px;
    width: 68px;
    background-color: #ea4a36;
    border: none;
    color: #fff;
    font-size: 12px;
  }
}
// .logout {

// }
</style>