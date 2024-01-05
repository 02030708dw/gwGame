<template>
  <view class="gameAnimation-container">
    <view class="countdown">
      <view class="next">{{ ac.lastAwardPeriod }}</view>
      <view class="time">
        <view
          class="digit"
          v-for="(digit, index) in formattedCountdown"
          :key="index"
        >
          <view class="digit-value">{{ digit }}</view>
        </view>
      </view>
    </view>
    <view class="period">{{ ac.period }}</view>

    <view class="main">
      <view v-for="(item, index) in 5" :key="index" class="child">
        <text class="left">头奖</text>
        <text class="right">123123-123123-123123</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

const props = defineProps({
  ac: Object,
});

// 示例: 假设next是从props.ac中获取的一个值
const next = ref("123123");
// 示例: 假设ac.countdown是一个字符串格式的时间 "07:57"
const formattedCountdown = computed(() => props.ac.countdown.split(""));
// 显示名称映射
const displayNames = {
  firstThree: "一等奖",
  countdown: "倒计时",
  // ...其他映射
};
</script>

<style lang="scss" scoped>
.gameAnimation-container {
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 10rpx;
  margin-bottom: 20rpx;
  .countdown {
    display: flex;
    align-items: center;
    font-size: 28rpx;
    color: #fff;
    background: #05101a;
    padding: 20rpx;

    .next,
    .time {
      color: #fff;
      font-family: "Digital-7 Mono", sans-serif; /* 确保你加载了类似数字时钟的字体 */
    }

    .time {
      display: flex;

      .digit {
        background-color: #fff;
        color: #000;
        margin: 0 4px;
        border-radius: 6px;
        overflow: hidden; /* 隐藏超出部分，用于翻页效果 */
      }

      .digit-value {
        display: block;
        padding: 0 12rpx;
        font-size: 45rpx;
        text-align: center;
      }
    }
  }

  .period {
    width: 100%;
    text-align: center;
    padding: 20rpx 0;
    background: #1e2128;
    color: #fff;
  }

  .main .child:nth-child(even) {
    background-color: #ecf0f1; /* 指定背景色 */
  }
  .main {
    .child {
      padding: 20rpx;
      display: flex;

      .left {
        display: inline-block;
        width: 100rpx;
        text-align: center;
      }

      .right {
        display: block;
        width: 100%;
        text-align: center;
        line-height: 40rpx;
      }
    }
  }
}
</style>
