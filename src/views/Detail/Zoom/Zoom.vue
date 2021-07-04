<template>
  <div class="spec-preview">
    <img v-lazy="img.imgUrl" :alt="img.imgName" />
    <div class="event" @mousemove="handleMove"></div>
    <div class="big">
      <img v-lazy="img.imgUrl" :alt="img.imgName" :style="{left:bigImgLeft,top:bigImgTop}" />
    </div>
    <div class="mask" :style="{left:maskLeft,top:maskTop}"></div>
  </div>
</template>

<script>
// 鼠标移动事件触发太频繁 利用函数节流来优化
import { throttle } from "lodash";
export default {
  name: "Zoom",
  props: {
    img: {
      // 报错: type check failed for prop "img". Expected Object, got Undefined
      //因为一上来img是没有数据的
      type: Object,
      //解决: 初始化数据 给个默认值
      // Props with type Object/Array must use a factory function to return the default value.
      //props中Object/Array类型定义默认值是必须是工厂函数形式
      default: () => ({}),
    },
  },
  data() {
    return {
      maskLeft: 0,
      maskTop: 0,
      bigImgTop: 0,
      bigImgLeft: 0,
    };
  },
  methods: {
    // throttle(需要节流的回调, [wait:需要节流的毫秒。], options);
    handleMove: throttle(function (e) {
      //计算出mask距离左上角的位置
      // mask 200  中图 400 大图 800
      //maskLeft = 当前鼠标的位置 - mask宽度 / 2
      //maskTop = 当前鼠标的位置 - mask宽度 / 2
      let left = e.offsetX - 100;
      let top = e.offsetY - 100;
      //判断边界值
      if (left < 0) {
        left = 0;
      }
      if (left > 200) {
        left = 200;
      }
      if (top < 0) {
        top = 0;
      }
      if (top > 200) {
        top = 200;
      }

      //计算大图移动的距离 它们比例是2:1
      this.bigImgLeft = -2 * left + "px";
      this.bigImgTop = -2 * top + "px";

      this.maskLeft = left + "px";
      this.maskTop = top + "px";
    }, 1000 / 60),
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>