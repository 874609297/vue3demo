<template>
    <div class="goods">
        <goods-list-item :product="item" v-for="(item,index) in goods" :key="index"></goods-list-item>
    </div>
</template>

<script>
import GoodsListItem from '../goods/GoodsListItem.vue'
export default {
    name:'GoodsList',
    components:{GoodsListItem},
    props:{
        goods:{
            type:Array,
            default(){
                return [];
            }
        }
    }
}
</script>

<style lang="scss">
    .goods{
        display: flex;
        flex-wrap:wrap  ;
        justify-content: space-around;
        padding: 5px;
    }
</style>