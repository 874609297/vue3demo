<template>
    <div>
        <van-nav-bar title="分类页面" left-text="返回" left-arrow @click-left="onClickLeftBack">
        <template #right>
        <van-icon name="search" size="18" />
        </template>
        </van-nav-bar>
        <div id="mainBox">
          <div class="orderTab">
            <van-tabs v-model="active" @click="tabClick">
            <van-tab title="销量排行"></van-tab>
            <van-tab title="价格排行"></van-tab>
            <van-tab title="评分排行"></van-tab>
           </van-tabs>         
          </div>
          <div class="leftmenu">
            <van-collapse v-model="activeName" accordion>
            <van-collapse-item v-for="(item,index) in categories" 
            :key="index" :title="item.name"
            :name="item.name"
            >
            <van-sidebar v-model="active">
            <van-sidebar-item 
            @click="getGoods(sub.id)"
            v-for="(sub,index) in item.children" 
            :key="index" 
            :title="sub.name"/>
            </van-sidebar>
            </van-collapse-item>
            </van-collapse>         
            
          </div>

          <div class="goodslist">
            <div class="content">
            <van-card
            @click="itemClick(item.id)"
            v-for="(item,index) in ShowGoods"
            :key="index"
            :num="item.comments_count"
            :price="item.price"
            :desc="item.updated_at"
            :title="item.title"
            :thumb="item.cover_url"
            /> 
            </div>         
          </div>
        </div>
    </div>
</template>


<script>
import { Sidebar, SidebarItem ,Collapse, CollapseItem} from 'vant';
import { ref , reactive,onMounted,computed,watchEffect} from 'vue';
import {useRouter,useRoute} from 'vue-router'
import {getCategroyData,getCategroyGoods} from '../../network/categroy'
import BScroll from 'better-scroll';

export default {
    name:'categroy',
    components:{Sidebar, SidebarItem,Collapse, CollapseItem},
    setup(){
      const active=ref(0);
      const activeName=ref(0)
      const categories=ref([]);
      let bscroll = reactive({});
      const route = useRoute()
      //当前排序条件
      let currentOrder = ref('sales');
      //当前分类的id
      let current = ref(0);
      //数据模型
      const goods =reactive({
        sales:{page:0,list:[]},
        price:{page:0,list:[]},
        comments_count:{page:0,list:[]}
      })
      //设置显示数据的计算属性
      const ShowGoods =computed(()=>{
        return goods[currentOrder.value].list;
      })
      //初始化数据
      const init=()=>{
        //销量
        getCategroyGoods('sales',current.value).then((res)=>{
          goods.sales.list= res.goods.data
        })
        //价格
        getCategroyGoods('price',current.value).then((res)=>{
          goods.price.list= res.goods.data
        })
        //评论
        getCategroyGoods('comments_count',current.value).then((res)=>{
          goods.comments_count.list= res.goods.data
        })
      }
      onMounted(()=>{
        getCategroyData().then((res)=>{
          categories.value=res.categories
        })
        getCategroyGoods('sales',current.value).then((res)=>{
          goods.sales.list= res.goods.data;
        });
        bscroll = new BScroll(document.querySelector(".goodslist"),{
          probeType:3,
          click:true,
          pullUpLoad:true,  //上拉加载更多
        });
        bscroll.on('pullingUp',()=>{
          bscroll && bscroll.refresh();
          bscroll.finishPullUp();
          bscroll.refresh();
        })
      });
      // watchEffect(()=>{
      //     nextTick(()=>{
      //       //重新计算高度
      //       bscroll && bscroll.refresh();
      //     })
      //   });
      //排序选项卡
      const tabClick=(index)=>{
        let orders=['sales','price','comments_count'];
        currentOrder.value=orders[index];
        getCategroyGoods(currentOrder.value,current.value).then((res)=>{
          goods[currentOrder.value].list= res.goods.data
        });
        // nextTick(()=>{
        //     //重新计算高度
        //     bscroll && bscroll.refresh();
        //   })
      }
      //通过分类得到商品
      const getGoods=(cid)=>{
        current.value=cid;
        init()
      }
      const router = useRouter()
      const onClickLeftBack=()=>{
        router.go(-1);
      }
      //商品详情
      const itemClick=(id)=>{
         router.push({path:'/detail',query:{id:id}})
      }
      return {
        onClickLeftBack,
        active,
        categories,
        activeName,
        tabClick,
        currentOrder,
        getGoods,
        current,
        ShowGoods,
        bscroll,
        itemClick
      }
    },
}
</script>

<style lang="scss">
  #mainBox{
    display: flex;
    .orderTab{
      height: 50px;
      flex: 1;
      z-index: 9;
      float: right;
      top: 45px;
      right: 0;
      left: 130px;
    }
    .leftmenu{
      position: fixed;
      top: 95px;
      left: 0;
      width: 130px;
      height: 200px;
    }
    .goodslist{
      flex: 1;
      height: 200px;
      position: absolute;
      top: 100px;
      left: 130px;
      right: 0;
      height: 100vh;
      padding: 10px;
    }
  }
</style>