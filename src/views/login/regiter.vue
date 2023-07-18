<template>
  <view class="bacAlipayw">
    <view class="width1" @click="handleJump(item)" :class="item.id == 2 ? 'margin-top-40 bc2' : 'bc1'"
      v-for="item in list" :key="item.id">
      <image :src="item.logo" mode=""></image>
      <view class="fg colorf">{{ item.name }} </view>
    </view>

  </view>
</template>


<script setup lang="ts">
import { ref } from "vue";
const active2 = '../../static/images/bo/Vector2.png';
const active1 = '../../static/images/bo/yunshuc.png';

const list = ref([{
  logo: active2,
  name: "需要物料",
  id: 1,

},
{
  logo: active1,
  name: "需要运输",
  id: 2,

},
])
const handleJump = () => {
  uni.navigateTo({
    url: "/views/ProductionLine/ProductionLine"
  })
}
</script>

<style scoped lang="scss"> @import "./css/regiter.scss";</style>