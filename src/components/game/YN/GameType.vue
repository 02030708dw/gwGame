<template>
  <view class="game-type">
    <view
      class="type-item"
      v-for="item in typeList"
      @click="cutGameType(item)"
      :class="item.checked ? 'type-active' : ''"
      :key="item.gamePlayTypeName"
    >
      {{ item.gamePlayTypeName }}
    </view>
  </view>
</template>
<script setup lang="ts">
const props =defineProps(["typeList"])
const emits = defineEmits(["cutGameType"]);
const cutGameType = (item: any) => {
  props.typeList.forEach((item:any)=>item.checked=false)
  item.checked=true
  emits("cutGameType", item);
};
</script>
<style scoped lang="scss">
.game-type {
  margin-top: 32rpx;
  width: 686rpx;
  height: 62rpx;
  display: flex;
  box-sizing: border-box;
  padding:0 20rpx;
  justify-content: space-between;
  .type-item {
    transition: all 0.3s linear;
    background-color: #ffe2b4;
    width: 158rpx;
    height: 62rpx;
    text-align: center;
    font-size: 36rpx;
    line-height: 62rpx;
    box-shadow: 0rpx 4rpx 4rpx 0rpx #da900c;
  }
  .type-active {
    background-color: #ffb023;
  }
}
</style>
