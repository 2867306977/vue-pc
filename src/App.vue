<template>
  <div>
    <!-- 判断是否需要显示头部和底部 -->
    <Header v-if="!$route.meta.isHide" />
    <router-view />
    <Footer v-if="!$route.meta.isHide" />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="less">
</style>
