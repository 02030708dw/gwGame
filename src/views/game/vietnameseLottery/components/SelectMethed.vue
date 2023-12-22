<template>
    <view
      class="FredHilloneD1"
      :style="{ backgroundImage: `url(${backgroundImage})` }"
    >
      <view class="title"> Fred Hill </view>
      <view
        class="fred-item"
        v-for="item in fredList"
        :key="item.id"
        @click="change(item)"
        :class="item.checked ? 'active-item' : null"
        :style="{ width: `${itemWidth}` }"
      >
        {{ item.label }}
      </view>
  
      <view
        class="fred-item"
        v-for="item in row - (fredList.length % row ? fredList.length % row : row)"
        :key="item"
        style="visibility: hidden"
        :style="{ width: `${itemWidth||'198rpx'}` }"
      ></view>
    </view>
  </template>
  <script setup lang="ts">
  // 背景颜色,数据,这个组件有num个子元素
  import { ref } from 'vue';
  const props = defineProps(["backgroundImage",  "row", "itemWidth"]);
  const emits = defineEmits(["change"]);
  const fredList = ref([
    { label: "头", id: 0, checked: false, sum: 1 },
    { label: "尾", id: 1, checked: false, sum: 1 },
    { label: "头尾", id: 2, checked: false, sum: 2 },
    { label: "包组", id: 3, checked: false, sum: 18 },
    { label: "包组7", id: 4, checked: false, sum: 7 },
  ]);
  const change = (item: any) => {
    item.checked=!item.checked
    emits("change", fredList.value.filter(item=>item.checked));
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
        width: 198rpx;
      background-color: #fff;
      transition: 0.3s all linear;
      height: 62rpx;
      border-radius: 8rpx;
      box-shadow: inset 0rpx -4rpx 0rpx 0rpx rgba(75, 75, 75, 0.5);
      text-align: center;
      line-height: 62rpx;
    }
    .active-item {
      background: #ffb023;
      box-shadow: inset 0rpx -4rpx 0rpx 0rpx #da900c,
        inset 0rpx 4rpx 4rpx 0rpx #ffc660;
      border-radius: 8rpx;
      color: #fff;
    }
  }
  </style>
  