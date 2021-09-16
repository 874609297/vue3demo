import { createRouter, createWebHistory } from 'vue-router'
import store from '../store';
import { Toast } from 'vant';

const addressEdit = ()=>import('../views/profile/AddressEdit.vue')
const address=()=>import('../views/profile/Address.vue')
const home=()=>import('../views/home/Home.vue');
const profile=()=>import('../views/profile/Profile.vue');
const shopcart=()=>import('../views/shopcart/shopcart.vue');
const detail=()=>import('../views/detail/Detail.vue');
const category=()=>import('../views/category/Categroy.vue');
const register=()=>import('../views/profile/Register.vue');
const login = ()=>import('../views/profile/Login.vue');
const createorder= ()=>import('../views/order/CreateOrder.vue')
const routes = [
  {
    path: "/order",
    name: "Order",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/order/Order"),
    meta: {
      title: "订单详情",
    },
  },
  {
    path: "/orderdetail",
    name: "OrderDetail",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/order/OrderDetail"),
    meta: {
      title: "订单详情",
    },
  },

  {
    path:'/createorder',
    name:'createorder',
    component:createorder,
    meta:{
      title:'订单',
      isAuthRequired:true
    }
  },
  {
    path:'/addressedit',
    name:'addressedit',
    component:addressEdit,
    meta:{
      title:'地址',
      isAuthRequired:true
    }
  },
  {
    path:'/address',
    name:'address',
    component:address,
    meta:{
      title:'地址编辑',
      isAuthRequired:true
    }
  },
  {
    path:'/',
    redirect: '/home',
    name:'DefaultHome',
    meta:{
      title:"首页"
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: home,
    meta:{
      title:"首页"
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component:profile,
    meta:{
      title:"个人中心",
      isAuthRequired:true
    }
  },
  {
    path: '/shopcart',
    name: 'shopcart',
    component:shopcart,
    meta:{
      title:"购物车",
      isAuthRequired:true
    }
  },
  {
    path:'/register',
    name:'/register',
    meta:{
      title:'注册'
    },
    component:register
  },
  {
    path: '/category',
    name: 'category',
    component:category,
    meta:{
      title:"商品分类"
    }
  },
  {
    path: '/detail',
    name: 'detail',
    component:detail,
    meta:{
      title:"商品详情"
    }
  },
  {
    path:'/login',
    name:'login',
    component:login,
    meta:{
      title:"登录",
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
//进入页面前的导航守卫
//isAuthRequired:true 授权访问
router.beforeEach((to, from, next) => {
  // 如果需要授权，但当前状态为假，跳转到 登录页面
  // 判断原元素中的isAuthRequired 和 user下面的isLogin状态是否为false
  if (to.meta.isAuthRequired && store.state.user.isLogin === false) {
    Toast("您还没有登录，请先登录！");
    // 如果没有登录，跳转到 login
    return next("/login");
  } else {
    next(); // 走到这里，证明已登录，直接放行
  }
  document.title = to.meta.title;
});
export default router
