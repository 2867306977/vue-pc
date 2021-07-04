<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cartInfo in cartInfoList" :key="cartInfo.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cartInfo.isChecked"
              @change="changeShopChecked(cartInfo)"
            />
          </li>
          <li class="cart-list-con2">
            <img v-lazy="cartInfo.imgUrl" />
            <div class="item-msg">{{cartInfo.skuName}}</div>
          </li>
          <!-- 单品价格 -->
          <li class="cart-list-con4">
            <span class="price">{{cartInfo.cartPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a @click="decrement(cartInfo)" class="mins">-</a>
            <input autocomplete="off" type="text" :value="cartInfo.skuNum" minnum="1" class="itxt" />
            <a @click="increment(cartInfo)" class="plus">+</a>
          </li>
          <!-- 小计 -->
          <li class="cart-list-con6">
            <span class="sum">{{cartInfo.skuNum*cartInfo.cartPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="delShop(cartInfo)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="allChecked" />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="delCheckedShop">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择
          <span>{{totalNum}}</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">￥{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  reqGetShopCart,
  reqChangeShopChecked,
  reqDelShop,
  reqAddShopCart,
} from "../../api/cart";
export default {
  name: "ShopCart",
  data() {
    return {
      cartInfoList: [],
    };
  },
  async mounted() {
    //发送请求获取购物车列表展示,需要告诉服务器是哪个用户发送的请求,服务器才能返回该用户的购物车数据
    /* 
    用户未登录:
    用户临时id:userTempId,发送请求携带请求头参数:userTempId,
    用户临时id需要客户端自己生成,特点:唯一的
    添加购物车,服务器会把数据添加到这个临时id上
    获取购物车数据,服务器根据这个id,找到这个id上的数据,返回数据

    用户登录:
    1. 通过cookie:
    登录成功,服务器会返回一个cookie,
    当客户端发送请求时,会自动携带这个cookie,cookie相当于用户的唯一标识
    添加购物车,服务器就知道添加到哪个用户上
    获取购物车数据,服务器也就知道获取哪个用户的数据

    2. 通过token:
    登录成功,服务器会返回一个token
    当客户端发送请求时,需要手动携带这个token(位于请求头),相当于用户的唯一标识
    添加购物车，服务器就能知道数据添加给哪个用户
    获取购物车列表，服务器就能知道哪个用户的购物车数据

    总结:cookie会自动携带,而token麻烦点,需要手动携带

    当有userTempId和token时,会自动把userTempId上的数据添加到token上
     */

    //用户未登录:需要在添加购物车时发送请求请求头携带userTempId
    try {
      const cartList = await reqGetShopCart();
      this.cartInfoList = cartList[0].cartInfoList;
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    //切换商品选中状态
    async changeShopChecked(cartInfo) {
      //如果是1 变成0 如果是0 变成1
      // cartInfo.isChecked = cartInfo.isChecked === 1 ? 0 : 1;
      cartInfo.isChecked = 1 - cartInfo.isChecked;
      //发送请求
      try {
        await reqChangeShopChecked(cartInfo.skuId, cartInfo.isChecked);
      } catch (e) {
        console.log(e);
      }
    },
    //删除商品
    async delShop(cartInfo) {
      if (!confirm(`您确定删除该商品吗?`)) return;
      try {
        //发送请求删除
        await reqDelShop(cartInfo.skuId);
        //并删除本地的数据
        this.cartInfoList = this.cartInfoList.filter((cart) => {
          cart.skuId === cartInfo.skuId;
        });
      } catch (e) {
        console.log(e);
      }
    },
    //商品数量操作
    async decrement(cartInfo) {
      if (cartInfo.skuNum <= 1) return;
      cartInfo.skuNum--;

      //发送请求 更新购物车数量数据
      try {
        await reqAddShopCart(cartInfo.skuId, -1);
      } catch (e) {
        console.log(e);
      }
    },
    async increment(cartInfo) {
      //发送请求 更新购物车数量数据
      cartInfo.skuNum++;

      try {
        await reqAddShopCart(cartInfo.skuId, 1);
      } catch (e) {
        console.log(e);
      }
    },
    //删除选中商品
    delCheckedShop() {
      if (!confirm("确定删除这些商品吗")) return;
      //发送请求,遍历删除
      this.cartInfoList.forEach(async (cart) => {
        if (cart.isChecked) {
          try {
            await reqDelShop(cart.skuId);
          } catch (e) {
            console.log(e);
          }
        }
      });
      //遍历所有商品数据,isChecked为true则删除
      this.cartInfoList = this.cartInfoList.filter((cart) => {
        //返回isChecked为false的数据
        return cart.isChecked === 0;
      });
    },
  },
  computed: {
    //总数
    totalNum() {
      //总数是已被选中的 isChecked 1 表示选中的商品, isChecked 0 表示未选中
      return this.cartInfoList
        .filter((cart) => cart.isChecked)
        .reduce((p, c) => {
          return p + c.skuNum;
        }, 0);
    },
    //总价格
    totalPrice() {
      //过滤掉没有被选中的
      return this.cartInfoList
        .filter((cart) => cart.isChecked)
        .reduce((p, c) => {
          return p + c.skuNum * c.cartPrice;
        }, 0);
    },
    //计算所有商品的选中状态,并且该属性需要被修改
    allChecked: {
      get() {
        //遍历cartInfoList 有一个isChecked 是0 那么就返回false
        return +this.cartInfoList.every((cart) => cart.isChecked === 1);
      },
      set(val) {
        //根据val,修改商品列表的所有isChecked值
        // 修改服务器端的数据,需要发送请求,但computed中不能做异步操作,使用watch属性
        this.cartInfoList.forEach((cart) => {
          //注意: isChecked是数字 ,不能为布尔值
          cart.isChecked = +val;
        });
      },
    },
  },
  watch: {
    // 修改服务器端的数据,需要发送请求,但computed中不能做异步操作,使用watch属性
    allChecked() {
      //遍历所有的商品数据 修改每个商品isChecked
      this.cartInfoList.forEach(async (cart) => {
        try {
          await reqChangeShopChecked(cart.skuId, cart.isChecked);
        } catch (e) {
          console.log(e);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 4.1667%;
        }

        .cart-list-con2 {
          width: 25%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }
        .cart-list-con2 {
          width: 46%;
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 12.5%;
        }

        .cart-list-con5 {
          width: 12.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 11.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>