<template>
  <view class="gameAnimation-container">
    <view class="countdown">
      <view class="next">{{ ac.lastAwardPeriod }}</view>
      <view class="time">
        <!-- 显示小时、分钟和秒 -->
        <view class="time-part">{{ countdownFormatted.hours }}</view>
        <view class="time-part">{{ countdownFormatted.minutes }}</view>
        <view class="time-part">{{ countdownFormatted.seconds }}</view>
      </view>
    </view>
    <view class="period">{{ ac.awardPeriod }}</view>

    <view class="main">
      <view v-for="info in awardInfo" :key="info.key" class="child">
        <text class="left">{{ info.chinese }}</text>
        <text class="right">{{ formatData(props.ac[info.key]) }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect, onMounted, onUnmounted } from "vue";

const props = defineProps<{
  ac: {
    lastAwardPeriod: string; // 下一期
    awardPeriod: string; //这一期
    countdown: number; // 这是剩余时间的时间戳
    head: string;
    firstThree: string;
    afterThree: string;
    end: string;
  };
}>();
// 格式化倒计时
const formatCountdown = (countdown: number) => {
  const hours = Math.floor(countdown / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((countdown % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(countdown % 60)
    .toString()
    .padStart(2, "0");
  return { hours, minutes, seconds };
};

// 响应式的倒计时
const countdown = ref(props.ac.countdown);
const countdownFormatted = computed(() => formatCountdown(countdown.value));

// 更新倒计时
const updateCountdown = () => {
  if (countdown.value > 0) {
    countdown.value--;
  }
};

// 每秒更新倒计时
watchEffect((onInvalidate) => {
  const interval = setInterval(updateCountdown, 1000);
  onInvalidate(() => clearInterval(interval));
});

// 定义中文名称和字段
const awardInfo = ref([
  { key: "head", chinese: "头奖" },
  { key: "firstThree", chinese: "前三" },
  { key: "afterThree", chinese: "后三" },
  { key: "end", chinese: "二位" },
]);
const formatData = (data: string) => {
  return data.replace(" ", "-");
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
      color: #05101a;

      .time-part {
        position: relative;
        float: left;
        width: 70rpx;
        height: 60rpx;
        text-align: center;
        background-color: #2f3430;
        margin-right: 20px;
        color: white;
        font-size: 20px;

        &:not(:last-child)::after {
          content: ":";
          display: block;
          position: absolute;
          right: -20px;
          font-weight: bolder;
          font-size: 18px;
          width: 20px;
          height: 100%;
          top: 0;
        }
      }

      .time-separator {
        padding: 0 2px;
        color: #fff;
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
