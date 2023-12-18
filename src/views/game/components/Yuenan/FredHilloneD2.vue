<template>
    <view
      class="FredHilloneD1"
      :style="{ backgroundImage: `url(${backgroundImage})` }"
    >
      <view class="title"> Fred Hill </view>
      <view
        class="fred-item"
        v-for="item in fredList"
        @click="change(item)"
        :style="{ width: `${itemWidth}` }"
        :class="activeNumber.includes(item.id)?'item-active':null"
      >
        {{ item.label }}
      </view>
  
      <view
        class="fred-item"
        v-for="item in row - (fredList.length % row ? fredList.length % row : row)"
        style="visibility: hidden"
        :style="{ width: `${itemWidth}` }"
      ></view>
    </view>
  </template>
  <script setup lang="ts">
  // 背景颜色,数据,这个组件有num个子元素
  const props = defineProps(["backgroundImage", "fredList", "row", "itemWidth","activeNumber"]);
  const emits = defineEmits(["change"]);
  const change = (item: object) => {
    emits("change", item);
  };
  </script>
  <style scoped lang="scss">
  .FredHilloneD1 {
    width: 686rpx;
    height: 286rpx;
    box-sizing: border-box;
    background-size: 100% 100%;
    padding: 114rpx 32rpx 32rpx 28rpx;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;
    position: relative;
    .title {
      width: 200rpx;
      height: 44rpx;
      font-size: 44rpx;
      font-family: PingFangSC, PingFang SC;
      font-weight: 600;
      color: #ffffff;
      line-height: 44rpx;
      position: absolute;
      top: 30rpx;
      left: 18rpx;
    }
    .fred-item {
      background-color: #fff;
      height: 62rpx;
      border-radius: 8rpx;
      box-shadow: inset 0rpx -4rpx 0rpx 0rpx rgba(75, 75, 75, 0.5);
      text-align: center;
      line-height: 62rpx;
      transition: 0.3s all linear;
    }
    .item-active{
        background-color: #00CD6A;
        color: #fff;
    }
  }
  </style>
  