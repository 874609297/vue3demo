<template>
    <div>
         <van-nav-bar title="我的" left-text="返回" left-arrow @click-left="onClickLeftBack">
         <template #right>
         <van-icon name="search" size="18" />
         </template>
         </van-nav-bar>
         <div class="user-box">
      <div class="user-info">
        <div class="info">
          <img src="../../../src/assets/img/logo.png" />
          <div class="user-desc">
            <span>昵称：{{ user.name }}</span>
            <span>登录名：{{ user.email }}</span>
            <span class="name">打小就看王勇行</span>
          </div>
        </div>
      </div>

      <ul class="user-list">
        <li class="van-hairline--bottom" >
          <span>我的收藏</span>
          <van-icon name="arrow" />
        </li>
        <li class="van-hairline--bottom" @click="goTo('/order')">
          <span>我的订单</span>
          <van-icon name="arrow" />
        </li>
        <li class="van-hairline--bottom">
          <span>账号管理</span>
          <van-icon name="arrow" />
        </li>
        <li class="van-hairline--bottom" @click="goTo('/address')">
          <span>地址管理</span>
          <van-icon name="arrow" />
        </li>
        <li class="van-hairline--bottom" >
          <span>关于我们</span>
          <van-icon name="arrow" />
        </li>
      </ul>
    </div>
         <div style="margin-top:15px;margin:15px">
            <van-button type="primary" round block @click="outLg">退出登录</van-button>
         </div>
         <div>
         </div>
    </div>
</template>

<script>
  import { Toast } from 'vant';
  import {useRouter} from 'vue-router' 
  import {logout,getUser } from '../../network/user'
  import {onMounted, toRefs,reactive} from 'vue'
  import {  useStore } from 'vuex';
  export default {
    name:'profile',
    components:{Toast},
    
    setup() {
      const router=useRouter();
      const store = useStore();
      const onClickLeftBack=()=>{
        router.go(-1);
      }
      const outLg=()=>{
        logout().then(res=>{
          if(res.status=="204"){
            Toast.success('退出成功');
            window.localStorage.setItem("token","");
            store.commit('setIsLogin', false)
            setTimeout(()=>{
              router.push('/login');
            },500)
          }
        })
      }
      const state = reactive({
      user: {},
    });
    onMounted(() => {
      getUser().then((res) => {
        state.user = res;
      });
    });

    const goTo = (r,query)=>{
      router.push({path:r,query:query||{}})
    }
      return{
        onClickLeftBack,
        outLg,
        ...toRefs(state),
        goTo
      }
    }, 
}
</script>

<style lang="scss" scoped>
#box {
  background: #fcfcfc;
  height: 100vh;
}
.user-box {
  .user-header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    width: 100%;
    height: 44px;
    line-height: 44px;
    padding: 0 10px;
    color: #252525;
    background: #fff;
    border-bottom: 1px solid #dcdcdc;
    .user-name {
      font-size: 14px;
    }
  }
  .user-info {
    width: 94%;
    margin: 10px;
    height: 115px;
    background: linear-gradient(90deg, #31c7a7, #a1c7c7);
    box-shadow: 0 2px 5px #269090;
    border-radius: 6px;
    margin-top: 50px;
    text-align: left;
    .info {
      position: relative;
      display: flex;
      width: 100%;
      height: 100%;
      // padding: 25px 20px;

      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin-top: 4px;
      }
      .user-desc {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        line-height: 20px;
        font-size: 14px;
        color: #fff;
        span {
          color: #fff;
          font-size: 14px;
          padding: 2px 0;
        }
      }
      .account-setting {
        position: absolute;
        top: 10px;
        right: 20px;
        font-size: 13px;
        color: #fff;
        .van-icon-setting-o {
          font-size: 16px;
          vertical-align: -3px;
          margin-right: 4px;
        }
      }
    }
  }
  .user-list {
    padding: 0 8px;
    margin-top: 40px;
    li {
      padding-left: 5px;
      padding-right: 5px;
      height: 40px;
      line-height: 40px;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      .van-icon-arrow {
        margin-top: 13px;
      }
      margin: 20px 0 !important;
      background: #ffffff;
      border-radius: 3px;
    }
  }
}
</style>