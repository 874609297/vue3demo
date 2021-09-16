<template>
    <div class="goods-Item" @click="shopInfo(product.id)">
        <img :src="product.cover_url" alt="">
        <div class="goods-info">
            <p>{{product.title}}</p>
            <p class="price"><small>￥</small>{{product.price}}</p>
            <span class="collect">
            </span>
        </div>
    </div>
</template>

<script>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
export default {
    name:'GoodsListItem',
    props:{
       product:Object,
       default(){
           return [];
       }
    },
    setup(){
        const router = useRouter()
        const shopInfo = (id)=>{
            router.push({path:'/detail',query:{id:id}})
        }
        return{
            shopInfo
        }
    }
}
</script>

<style lang="scss">
    .goods-Item{
        position: relative;
        width: 46%;
        padding-bottom: 40px;
        img{
            width: 100%;
            border-radius: 5px;
        }
        .goods-info{
            font-size: 12px;
            position: absolute;
            bottom: 5px;
            left: 0;
            right: 0;
            overflow: hidden;
            text-align: center;
            p{
                overflow: hidden;
                text-align: center;
                margin-bottom: 3px;
            }
            .price{
                color: red;
                margin-right: 20px;
            }
        }
    }
</style>