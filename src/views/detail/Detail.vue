<template>
    <div>
         <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onClickLeftBack">
         <template #right>
         <van-icon name="search" size="18" />
         </template>
         </van-nav-bar>
         <van-image width="100%"
                    :src="detail.cover_url"
                     />
          <van-card
          style="text-align:left"
          :num="detail.stock"
          :price="detail.price"
          :desc="detail.description"
          :title="detail.title">
          <template #tags>
            <van-tag plain type="danger">新书</van-tag>
            <van-tag plain type="danger">推荐</van-tag>
          </template>
          <template #footer>
                  <van-button type="warning" @click="handleAddCart">加入购物车</van-button>
                  <van-button type="danger"  @click="goToCart">立即购买</van-button>
          </template>
        </van-card>
        <van-tabs v-model:active="activeName">
        <van-tab title="概述" name="a">
          <div class="content" v-html="detail.details">

          </div>
        </van-tab>
        <van-tab title="热评" name="b">内容 2</van-tab>
        <van-tab title="相关图书" name="c">
          <div>
            <goods-list :goods="like_goods">

            </goods-list>
          </div>
        </van-tab>
        </van-tabs>
      </div>
        </template>

<script>
import {getGoodsInfo} from '../../network/shopinfo';
import {useRoute,useRouter} from 'vue-router' ;
import {ref,onMounted,watch, reactive, toRefs} from 'vue';
import GoodsList from '@/components/cotent/goods/GoodsList.vue'
import {addCart} from '../../network/cart'
import {Toast} from 'vant'
import {useStore} from 'vuex'
export default {
    name:'detail',
    components:{Image,GoodsList,Toast},
    setup() {
      const store = useStore()
      let book = reactive({
        detail:{},
        like_goods:[],
        comments:[]
      });
      let activeName= ref(0)
      const route =useRoute()
      const router = useRouter();
      const shopId = ref(route.query.id);
      const onClickLeftBack=()=>{
        router.go(-1);
      }
      onMounted(()=>{
        getGoodsInfo(shopId.value).then((res)=>{
          book.detail = res.goods;
          book.like_goods =  res.like_goods;
        })
      });
       
       const handleAddCart = () => {
       addCart({goods_id:shopId.value,num:"1"}).then((res) => {
        if (res.status == 204 || res.status == 201) {
          Toast.success("添加成功");
          store.dispatch("updateCart");
        } else {
          Toast.success("下手晚了，商品已经没了");
        }
      });
    };
      const goToCart = () => {
      addCart({ goods_id:shopId.value, num: 1 }).then((res) => {
        if (res.status == 204 || res.status == 201) {
          Toast.success("添加成功,显示购物车");
          router.push({ path: "/shopcart" });
        } else {
          Toast.success("下手晚了，商品已经没了");
        }
      })
    };
      return{
        onClickLeftBack,
        shopId,
        ...toRefs(book),
        activeName,
        handleAddCart,
        goToCart
      }
    },
    activated(){
    }
}
</script>
<style>
.content {
  padding: 10px;
  margin-bottom: 50px;
}
.content img {
    max-width: 100%;
    height: auto;
  }
</style>