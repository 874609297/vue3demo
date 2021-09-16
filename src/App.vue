<template>
  <div id="nav">
    <!-- <router-view v-slot="{ Component }">
    <transition>
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
    </transition>
    </router-view> -->
    <router-view></router-view>
    <van-tabbar route>
    <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item replace to="/category" icon="qr">分类</van-tabbar-item>
    <van-tabbar-item replace to="/shopcart" :badge="$store.state.cartCount" icon="shopping-cart-o">购物车</van-tabbar-item>
    <van-tabbar-item replace to="/profile" icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import { onMounted } from "vue"; 
import { useStore } from "vuex"; 
export default {
  setup() {
    const store = useStore();
    onMounted(() => {
      store.dispatch("updateCart");
    });
  },
};
</script>
<style lang="scss">
// @import "assets/css/base.css";

</style>
