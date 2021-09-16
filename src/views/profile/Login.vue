<template>
    <div>
         <van-nav-bar title="登录" left-text="返回" left-arrow @click-left="onClickLeftBack">
         <template #right>
         <van-icon name="search" size="18" />
         </template>
         </van-nav-bar>
         <div class="" style="margin-top:50px">
             <div class="" style="text-align:center">
                 <van-image
                    round
                    width="10rem"
                    height="10rem"
                    src="https://img.yzcdn.cn/vant/cat.jpeg"
                    />                  
             </div>
         </div>
         <div>
             <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field
                v-model="email"
                name="邮箱"
                label="邮箱"
                placeholder="邮箱"
                :rules="[{ required: true, message: '请填写邮箱' }]"
                        />
                <van-field
                v-model="password"
                type="password"
                name="密码"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
                />
            </van-cell-group>
            <div style="margin: 16px;">
                <div class="login-link" @click="$router.push('/register')">
                    立即注册
                </div>
                <van-button round block type="primary" native-type="submit">
                提交
                </van-button>
            </div>
          </van-form>         
         </div>
    </div>
</template>

<script>
  import { Toast } from 'vant';
  import { Notify } from 'vant';
  import {useRouter} from 'vue-router' 
  import {ref,reactive,toRefs} from 'vue'
  import {login} from '../../network/user'
  import  { useStore }  from 'vuex'
  export default {
    name:'login',
    components:{Notify},
    setup() {
      let store=useStore()
      const router=useRouter();
      const onClickLeftBack=()=>{
        router.go(-1);
      }
       const userinfo = reactive({
            email:"",
            password:"",
    });
        const onSubmit = () => {
      login(userinfo).then((res) => {
        window.localStorage.setItem("token",res.access_token);
        store.commit("setIsLogin", true);
        Toast.success("登录成功");
        userinfo.email = "";
        userinfo.password = "";
        setTimeout(() => {
          router.push('/home')
        }, 500);
        
      });
    };

      return{
        onClickLeftBack,
        onSubmit,
        ...toRefs(userinfo)
      }
    },
    methods: {

    },
}
</script>

<style >
    .login-link{
        font-size: 14px;
        margin-bottom: 20px;
        color: lightblue;
        display: inline-block;
        text-align: left;
    }
</style>







