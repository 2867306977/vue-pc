<template>
  <div class="controls">
    <!-- 表单需要失去焦点或者按回车校验获取 -->
    <input
      autocomplete="off"
      class="itxt"
      :value="currentValue"
      @blur="handleBlur"
      @keyup.enter="handleBlur"
    />
    <!-- 添加样式 -->
    <a href="javascript:" :class="{plus:true,disabled:currentValue >= max}" @click="increment">+</a>
    <a href="javascript:" :class="{mins:true,disabled:currentValue <= min}" @click="decrement">-</a>
  </div>
</template>

<script>
export default {
  name: "InputControl",
  props: {
    min: {
      type: Number,
      default: 1,
    },
    max: {
      type: Number,
      default: 10,
    },
    value: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      //定义当前组件表单的value 不能和父组件传递过来的值冲突
      currentValue: 1,
    };
  },
  methods: {
    handleBlur(e) {
      //失去焦点更新数据
      this.currentValue = e.target.value;
    },
    increment() {
      //判断临界值
      if (this.currentValue > this.max) return;
      this.currentValue++;
    },
    decrement() {
      if (this.currentValue < this.min) return;
      this.currentValue--;
    },
  },
  //监视currentValue值 发生变化就进行判断校验
  //通过校验才赋值更新数据
  watch: {
    //监视的属性方法中会传入newvalue,oldvalue
    currentValue(currentValue, oldValue) {
      //判断输入的内容并校验修正
      let value = +currentValue;
      // 1. 小于最小值, 大于最大值
      if (value <= this.min) {
        value = this.min;
      }
      if (value > this.max) {
        value = this.max;
      }
      //内容不能为非数字 如果是非数字等于之前的值
      if (Number.isNaN(value)) {
        value = oldValue;
      }
      this.currentValue = value;
      //需要把更新的数据更新到父组件中
      this.$emit("input", value);
    },
  },
};
</script>

<style lang="less" scoped>
.controls {
  width: 48px;
  position: relative;
  float: left;
  margin-right: 15px;

  .itxt {
    width: 38px;
    height: 37px;
    border: 1px solid #ddd;
    color: #555;
    float: left;
    border-right: 0;
    text-align: center;
  }

  .plus,
  .mins {
    width: 15px;
    text-align: center;
    height: 17px;
    line-height: 17px;
    background: #f1f1f1;
    color: #666;
    position: absolute;
    right: -8px;
    border: 1px solid #ccc;
  }

  .mins {
    right: -8px;
    top: 19px;
    border-top: 0;
    cursor: pointer;
  }

  .plus {
    right: -8px;
    cursor: pointer;
  }
  .disabled {
    color: #c0c4cc;
    cursor: not-allowed;
  }
}
</style>