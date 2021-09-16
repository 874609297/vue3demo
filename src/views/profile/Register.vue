<template>
    <div>
         <van-nav-bar title="用户注册" left-text="返回" left-arrow @click-left="onClickLeftBack">
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
                v-model="name"
                name="用户名"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
                        />
                <van-field
                v-model="email"
                name="用户名"
                label="电子邮箱"
                placeholder="电子邮箱"
                :rules="[{ required: true, message: '请填写正确的邮箱格式' }]"
                        />
                <van-field
                v-model="password"
                type="password"
                name="密码"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
                />
                <van-field
                v-model="password_confirmation"
                type="password"
                name="确认密码"
                label="确认密码"
                placeholder="确认密码"
                :rules="[{ required: true, message: '请填写一致密码' }]"
                />
            </van-cell-group>
            <div style="margin: 16px;">
                <div class="login-link" @click="$router.push('/login')">
                    已有帐号，立即登录
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
  import {register} from '../../network/user'
export default {
    name:'profile',
    components:{Notify},
    setup() {
      const router=useRouter()
      const onClickLeftBack=()=>{
        router.go(-1);
      }
       const userinfo = reactive({
            name: "",
            password: "",
            password_confirmation: "",
            email: "",
    });
      const onSubmit = (values) => {
        if(userinfo.password!=userinfo.password_confirmation){
            Notify({ type: 'danger', message: '两次密码不一致' });
        }else{
            register(userinfo).then((res)=>{
                if(res.status === 201){
                    Toast.success('注册成功！');
                    userinfo.name = '';
                    userinfo.password = '';
                    userinfo.password_confirmation = '';
                    userinfo.email = '';
                    setTimeout(()=>{
                        router.push('/login')
                    },1000)
                }
            })
        }
    };

      return{
        onClickLeftBack,
        onSubmit,
        ...toRefs(userinfo)
      }
    }
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