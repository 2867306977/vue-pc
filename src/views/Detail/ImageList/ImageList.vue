<template>
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(img,index) in imgList" :key="img.id">
        <!-- 更新父组件的currentImgIndex值 -->
        <!-- 点击图片 给当前图片添加类名,使用:class="{}" 当前点击的图片下标===index-->
        <img
          :src="img.imgUrl"
          :alt="img.imgName"
          @click="$emit('update:currentImgIndex',index)"
          :class="{active:currentImgIndex === index}"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "ImageList",
  props: {
    imgList: {
      type: Array,
      required: true,
    },
    currentImgIndex: {
      type: Number,
      required: true,
    },
  },
  //因为图片数据一上来是没有的所以使用监视属性,一旦数据发生变化就new Swiper
  watch: {
    imgList() {
      this.$nextTick(() => {
        // 等页面更新完成在触发回调，只触发一次
        this.swiper = new Swiper(this.$refs.swiper, {
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          slidesPerView: 5, //一行显示5个
          slidesPerGroup: 2, //2个一组
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>