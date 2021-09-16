<template>
    <div class="tab-control">
        <div :class="{active:currentIndex==index}" @click="itemClick(index)" v-for="(item,index) in titles" :key="index" class="tab-control-item">
            <span >
                {{item}}
            </span>
        </div>
    </div>
</template>

<script>
import {ref} from 'vue' 
export default {
    name:'TabControl',
    props:{
        titles:{
            type:Array,
            default(){
                return [];
            }
        }
    },
    setup(props,{emit}) {
        let currentIndex = ref(0);
        const itemClick=(index)=>{
            currentIndex.value=index;
            emit('tabClick',index)
        }
        return{
            currentIndex,
            itemClick,
        }
    }
}
</script>

<style lang="scss">
    .tab-control{
        z-index: 10;
        height: 40px;
        line-height: 40px;
        display: flex;
        text-align: center;
        font-size: 14px;
        background-color:white ;
        width: 100%;
        // 让此选项卡固定 及下拉时选项卡停住的属性
       
        .tab-control-item{
            flex: 1;
            span{
                padding: 5px;
            }
        }
        .active{
                color: green;
                span{
                    border-bottom: 3px solid green;
                }
            }
    }
</style>