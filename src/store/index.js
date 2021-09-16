import { createStore } from "vuex";

// 状态管理; 文件拆分； 引入拆分的文件
// import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";
  const store = createStore({
  state:{
    user: {
      isLogin: window.localStorage.getItem("token") ? true : false,
    },
    // 状态管理保存用户购物车的数量
    cartCount: 0, // 购物车数量
  },
  mutations:{
    setIsLogin(state, payload) {
      state.user.isLogin = payload
  },
  addCart(state,playload){
    state.cartCount = playload.count
  }
  },
  actions,
  getters,
});
export default store