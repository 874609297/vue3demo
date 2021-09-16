<template>
  <div class="address-box">
    <van-nav-bar title="登录" left-text="返回" left-arrow @click-left="onClickLeftBack">
         <template #right>
         <van-icon name="search" size="18" />
         </template>
         </van-nav-bar>
    <div
      v-show="list.length == 0"
      style="margin-top: 200px; text-align: center"
    >
      还没有地址信息，去添加吧！
    </div>

    <div class="address-item">
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
      />
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from "vue";
import { getAddressList } from "@/network/address";
import { useRoute, useRouter } from "vue-router";
export default {

  setup() {
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      chosenAddressId: "1",
      list: [],
    });
    const onClickLeftBack=()=>{
        router.go(-1);
      }
    onMounted(() => {
      getAddressList().then((res) => {
        // 如果data长度为0的话
        if (res.data.length == 0) {
          // 初始化空数组list
          satae.list = [];
          return;
        }
        // 不为空, map遍历数据
        state.list = res.data.map((item) => {
          return {
            // 过滤数据
            id: item.id,
            name: item.name,
            tel: item.phone,
            // 省市县地址信息保存到一个变量address中
            address: `${item.province} ${item.city} ${item.county} ${item.address}`,
            // 判断是否为默认地址
            isDefault: !!item.is_default,
          };
        });
      });
    });
    const onAdd = () => {
      router.push({ path: "/addressedit", query: { type: "add" } });
    };

    const onEdit = (item) => {
      router.push({
        path: "/addressedit",
        query: { type: "edit", addressId: item.id },
      });
    };

    return {
      ...toRefs(state),
      onAdd,
      onEdit,
      onClickLeftBack
    };
  },
};
</script>

<style lang="scss">

</style>
