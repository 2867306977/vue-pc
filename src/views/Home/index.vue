<template>
  <div>
    <TypeNav />
    <!--列表-->
    <ListContainer />
    <!--今日推荐-->
    <TodayRecommend />
    <!-- 商品排行 -->
    <Rank />
    <!-- 猜你喜欢 -->
    <Like />
    <!--楼层-->
    <!-- 当有数据时才会加载渲染Floor组件 -->
    <Floor v-for="floor in floors" :key="floor.id" :floor="floor" />
    <!--商标-->
    <Brand />
  </div>
</template>

<script>
import { reqGetFloors } from "../../api/home.js";
import TypeNav from "../../components/TypeNav";
import ListContainer from "./ListContainer";
import Brand from "./Brand";
import Floor from "./Floor";
import Like from "./Like";
import Rank from "./Rank";
import TodayRecommend from "./TodayRecommend";
export default {
  name: "Home",
  components: {
    TypeNav,
    ListContainer,
    Brand,
    Floor,
    Like,
    Rank,
    TodayRecommend,
  },
  data() {
    return {
      floors: [],
    };
  },
  mounted() {
    reqGetFloors()
      .then((res) => {
        this.floors = res;
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
</script>

<style>
</style>