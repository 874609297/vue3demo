<template>
  <div>
    <van-nav-bar title="购物车" left-text="返回" left-arrow @click-left="onClickLeftBack">
         <template #right>
         <van-icon name="search" size="18" />
         </template>
         </van-nav-bar>
    <div class="cart-box">
      <div class="cart-body">
        <van-checkbox-group
          ref="checkboxGroup"
          v-model="result"
          @change="groupChange"
        >
          <van-swipe-cell
            :right-width="50"
            :key="index"
            v-for="(item, index) in list"
          >
            <div class="good-item">
              <!--选中购物车中商品的ID-->
              <van-checkbox :name="item.id" />
              <div class="good-img">
                <img :src="item.goods.cover_url" />
              </div>
              <div class="good-desc">
                <div class="good-title">
                  <span>{{ item.goods.title }}</span>
                  <span>仅剩:{{ item.goods.stock }}</span>
                </div>
                <div class="good-btn">
                  <div class="price">
                    <small>￥</small>{{ item.goods.price + ".00" }}
                  </div>
                  <van-stepper
                    integer
                    :min="1"
                    :max="item.goods.stock"
                    :model-value="item.num"
                    :name="item.id"
                    async-change
                    @change="onChange"
                  />
                </div>
              </div>
            </div>
            <template #right>
              <van-button
                square
                icon="delete"
                type="danger"
                class="delete-button"
                @click="deleteGood(item.id)"
              />
            </template>
          </van-swipe-cell>
        </van-checkbox-group>
      </div>
      <van-submit-bar
        class="submit-all"
        :price="total * 100"
        @submit="onSubmit"
        button-text="结算"
      >
        <van-checkbox @click="allCheck" v-model="checkAll">全选</van-checkbox>
      </van-submit-bar>

      <div class="empty" v-if="!list.length">
        <img
          src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcdn.shejipi.com%2Fwp-content%2Fuploads%2F2016%2F07%2F%E8%B4%AD%E7%89%A9%E8%BD%A6%EF%BC%8Bapp.jpg&refer=http%3A%2F%2Fcdn.shejipi.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1634364514&t=bc4768d559c6602aa4dd0a2ed7ce2ea3"
          class="empty-cart"
          alt="空购物车"
        />
        <div class="title">购物车空空如也</div>
        <van-button round color="#1baeae" type="primary" block @click="goTo"
          >前往选购</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import {
  reactive,
  toRefs,
  onMounted,
  computed,
} from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { Toast } from "vant";
import {
  getCart,
  checkedCart,
  deleteCart,
  modifyCart,
  deleteCartItem,
} from "../../network/cart";
export default ({
  name: "App",
  setup() {
    const router = useRouter();
    const store = useStore();
    // 数据模型，状态
    const state = reactive({
      list: [],
      result: [], // 选中的id 数组
      checkAll: false,
    });
    const onClickLeftBack=()=>{
        router.go(-1);
      }
    //前往home
    const goTo = () => {
      router.push({ path: "/category" });
    };
    //结算
    const onSubmit = () => {
      // 判断结果长度是否为空，来确定是否选择了商品
      if (state.result.length == 0) {
        // 轻提示
        Toast.fail("未选择商品！");
        return;
      } else {
        // 进入订单支付页面
        router.push({ path: "/createorder" });
      }
    };
    const total = computed(() => {
      //
      let sum = 0;
      // 首先过滤购物车中所有商品，用includes方法查找result里面有没有item这个值，存在则为真，
      //filter  过滤购物车中所有商品，     includes  选中，
      state.list
        .filter((item) => state.result.includes(item.id))
        .forEach((item) => {
          sum += parseInt(item.num) * parseFloat(item.goods.price);
        });
      return sum;
    });
    //全选
    const allCheck = () => {
      state.checkAll = !state.checkAll;
      if (!state.checkAll) {
        state.result = state.list.map((item) => item.id);
        state.checkAll = true;
      } else {
        state.result = [];
        state.checkAll = false;
      }
    };
    //复选框
    const groupChange = (result) => {
      //列表数目  等于  全选 保持一直
      if (result.length == state.list.length) {
        state.checkAll = true;
      } else {
        state.checkAll = false;
      }
      state.result = result; // 选中的 id 数组
      // 改变数据表中选中状态
      checkedCart({ cart_ids: result });
    };
    //删除
    const deleteGood = (id) => {
      deleteCartItem(id).then((res) => {
        init(); // 重新初始化
        store.dispatch("updateCart"); //改变Vue中的状态数量
      });
    };
    //改变购物车数量
    const onChange = (value, detail) => {
      // 加一个轻提示，防止异步处理程序还未加载完另一个请求又来了，造成死锁
      Toast.loading({ message: "请稍后...", forbidClick: true });
      modifyCart(detail.name, { num: value }).then((res) => {});
      // 将在 onMounted 中的 list 中的 num 也要改
      state.list.forEach((item) => {
        if (item.id == detail.name) {
          item.num = value;
        }
      });
      Toast.clear();
    };
    const init = () => {
      // 轻提示
      Toast.loading({ message: "加载中...", forbidClick: true });
      getCart("include=goods").then((res) => {
        state.list = res.data;
        // 选中的购物车列表，只留下 id 数组 , n代表的是里面的每一个购物车到的参数， item遍历的时候只留下里面的id
        state.result = res.data
          .filter((n) => n.is_checked == 1)
          .map((item) => item.id);
      });
    };
    onMounted(() => {
      init();
    });

    return {
      ...toRefs(state),
      goTo,
      onChange,
      groupChange,
      allCheck,
      onSubmit,
      deleteGood,
      total,
      onClickLeftBack
    };
  },
});
</script>
<style lang="scss" scoped>
.cart-box {
  .cart-body {
    margin: 60px 0 100px 0;
    padding-left: 10px;
    .good-item {
      display: flex;
      .good-img {
        img {
          width: 100px;
          height: auto;
        }
      }
      .good-desc {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        padding: 20px;
        .good-title {
          display: flex;
          justify-content: space-between;
        }
        .good-btn {
          display: flex;
          justify-content: space-between;
          .price {
            font-size: 16px;
            color: red;
            line-height: 28px;
          }
          .van-icon-delete {
            font-size: 20px;
            margin-top: 4px;
          }
        }
      }
    }
    .delete-button {
      width: 50px;
      height: 100%;
    }
  }
  .empty {
    width: 50%;
    margin: 0 auto;
    text-align: center;
    margin-top: 200px;
    .empty-cart {
      width: 150px;
      margin-bottom: 20px;
    }
    .van-icon-smile-o {
      font-size: 50px;
    }
    .title {
      font-size: 16px;
      margin-bottom: 20px;
    }
  }
  .submit-all {
    margin-bottom: 50px;
    .van-checkbox {
      margin-left: 0px;
    }
    .van-submit-bar__text {
      margin-right: 10px;
    }
    .van-submit-bar__button {
      background: red;
    }
  }
  .van-checkbox__icon--checked .van-icon {
    background-color: red;
    border-color: red;
  }
}
</style>