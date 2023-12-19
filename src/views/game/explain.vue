<template>
  <view class="explain">
    <gameHeader :showContent="!showHeaderContent" activeTitle="玩法说明" />
    <view class="tabs">
      <text
        v-for="(item, index) in pageTabs"
        class="tabs-item"
        @click="changeTab(index)"
        >{{ item.title }}</text>
      <text
        class="line"
        :style="{ left: 187.5 * activeTab + 68 + 'rpx' }"
      ></text>
    </view>

    <view class="explain-box">
      <view class="explain-item" v-for="item in pageTabs[activeTab].dataList">
        <text class="name">{{ item.name }}</text>
        <text class="desc">{{ item.desc }}</text>
        <view class="wire"></view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import gameHeader from "@/components/game/gameHeader.vue";
import { ref } from "vue";
const showHeaderContent = ref(true);
const activeTab = ref(0);
const changeTab = (index: number) => {
  console.log(index);
  activeTab.value = index;
};
const pageTabs = ref([
  {
    title: "泰国彩",
    dataList: [
      { name: "1D-头", desc: "游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明" },
      { name: "1D-尾", desc: "游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明" },
      { name: "1D-头", desc: "游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明" },
      { name: "1D-尾", desc: "游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明" },
    ],
  },
  {
    title: "越南彩",
    dataList: [
      { name: "2D", desc: "游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明" },
      { name: "2D", desc: "游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明" }
  ],
  },
  {
    title: "菲律宾彩",
    dataList: [{ name: "3D", desc: "游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明" }],
  },
  {
    title: "xxxx",
    dataList: [{ name: "4D", desc: "游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明游戏说明" }],
  },
]);
</script>
<style scoped lang="scss">
.explain {
  background-color: #f9f9f9;
  .tabs {
    width: 750rpx;
    height: 100rpx;
    background-color: #fff;
    display: flex;
    align-items: center;
    position: relative;
    .tabs-item {
      font-family: PingFangSC, PingFang SC;
      font-weight: 600;
      font-size: 32rpx;
      text-align: center;
      flex: 1;
    }
    .line {
      width: 56rpx;
      height: 8rpx;
      background: #c2611c;
      border-radius: 4rpx;
      position: absolute;
      top: 76rpx;
      transition: all 0.2s linear;
    }
  }
  .explain-box{
    background-color: #fff;
    width: 686rpx;
    box-sizing: border-box;
    margin: 32rpx auto 0;
    padding: 32rpx;
    padding-bottom: 0;
    .explain-item{
      display: flex;
      flex-direction: column;
      .name{
        font-size: 32rpx;
      }
      .desc{
        font-size: 28rpx;
        color: #A1A1A1;
      }
      .wire{
        width: 100%;
        height: 1rpx;
        background-color: #A1A1A1;
        margin: 64rpx 0;
      }
    }
  }
}
</style>
