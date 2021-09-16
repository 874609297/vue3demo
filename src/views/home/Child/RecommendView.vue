<template>
    <div class="recommend">
        <div class="recommend-Item" v-for="item in recommends.slice(0,4)" :key=item.id>
            <a href="" @click.prevent="goShopInfo(item.id)">
                <img :src="item.cover_url" alt="">
            </a>
            <div>{{item.title}}</div>
        </div> 
    </div>
</template>


<script>
import {useRouter} from 'vue-router'
export default {
    name:'Recommend',
    props:{
        recommends:{
            type:Array
        }
    },
    setup() {
        const router = useRouter();
        const goShopInfo=(id)=>{
            router.push({path:'/detail',query:{id:id}})
        }
        return{
            goShopInfo
        }
    }
}
</script>
<style lang="scss">
    .recommend{
       width: 100%;
       display: flex;
       text-align: center;
       padding: 15px 0 30px ;
       border-bottom: 8px solid #eee;
       font-size:12px ;
    }
    .recommend-Item{
        flex: 1;
        img{
            width: 70px;
            height: 70px;
            margin-bottom:10px ;
        }
    }
</style>