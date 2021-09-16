<template>

  <div class="home" id="home">
    <van-nav-bar title="图书兄弟" left-text="返回" left-arrow @click-left="onClickLeftBack">
    <template #right>
    <van-icon name="search" size="18" />
    </template>
    </van-nav-bar>


      <div class="wrapper"> 
        <div class="content">
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="blue">
            <van-swipe-item v-for="(item,index) in banner" :key="index">
            <img :src="item.img_url" alt="" class="imgSty">
            </van-swipe-item>
            </van-swipe>
            <recommend-view :recommends="recommends"></recommend-view>
            <tab-control @tabClick="tabClick" :titles="['畅销','新书','精选']"></tab-control>
            <goods-list :goods="showGoods"></goods-list>
        </div>
      </div>

      <back-top @bTop="bTop"></back-top>
    </div>
</template>
<script>
  import GoodsList from '@/components/cotent/goods/GoodsList.vue'
  import TabControl from '@/components/cotent/tabContent/TabControl.vue'
  import RecommendView from './Child/RecommendView.vue'
  import NavBar from '@/components/common/navbar/NavBar.vue'
  import { ref, onMounted, reactive,computed,watchEffect,nextTick } from "vue";
  import {getHomeAllData,getHomeGoods} from '@/network/home'
  import BackTop from '@/components/common/backtop/BackTop.vue'
  import {useRouter} from 'vue-router' 
  import { Toast } from 'vant';
  // 引入滚动
  import BScroll from 'better-scroll';
  export default {
    name:'home',
    components:{NavBar,RecommendView,TabControl,GoodsList,Toast,BackTop},
    setup(){
      const banner = ref([]);
      const recommends=ref([])
      //商品列表数据模型
      const goods=reactive({
        sales:{page:1},list:[],
        new:{page:1,list:[]},
        recommend:{page:1,list:[]}
      });
      let currentType=ref('sales');
      const showGoods=computed(()=>{
        return goods[currentType.value].list;
      });
      let bscroll = reactive({});
      onMounted(()=>{
        Toast.loading({ message: "loading....", forbidClick: true });
        //获取首页全部数据
        getHomeAllData().then(res=>{
          banner.value=res.slides;
          recommends.value=res.goods.data
        })
        //获取选项卡数据
        getHomeGoods('sales	').then(res=>{
          goods.sales.list=res.goods.data
        });
        getHomeGoods('recommend').then(res=>{
           goods.recommend.list=res.goods.data
        });
        getHomeGoods('new').then(res=>{
           goods.new.list=res.goods.data
        });

        //创建better-scroll对象
        
        bscroll = new BScroll(document.querySelector(".wrapper"),{
          probeType:3,
          click:true,
          pullUpLoad:true,  //上拉加载更多
        });

        // 触发滚动事件
        bscroll.on('scroll',(position)=>{
          
        });
        bscroll.on('pullingUp',()=>{
          // document.querySelector(".content").clientHeight
          // bscroll.refresh()
          const page = goods[currentType.value].page+1
          getHomeGoods(currentType.value,page).then((res)=>{
            goods[currentType.value].list.push(...res.goods.data);
            goods[currentType.value].page+=1;
          })
          bscroll.finishPullUp();
          bscroll.refresh();
        })
      });
      const router=useRouter()
      const onClickLeftBack=()=>{
        router.go(-1);
      }
      const tabClick=(index)=>{
            let types = ['sales','new','recommend']
            currentType.value=types[index];
            nextTick(()=>{
            //重新计算高度
            bscroll && bscroll.refresh();
          })
        }
        // 监听任何一个变量
        watchEffect(()=>{
          nextTick(()=>{
            //重新计算高度
            bscroll && bscroll.refresh();
          })
        });
        const bTop=()=>{
          bscroll.scrollTo(0,0,500)
        }
      return{
        banner,
        onClickLeftBack,
        recommends,
        tabClick,
        goods,
        showGoods,
        bTop
     }
    }
  };
</script>

<style>
  #heome{
    height: 100vh;
    position: relative;
  }
  .wrapper{
    position: absolute;
    top: 45px;
    bottom: 50px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
  .imgSty{
    height: 200px;
  }
</style>
