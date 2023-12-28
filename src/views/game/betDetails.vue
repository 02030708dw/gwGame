<template>
  <view class="bet-detail">
    <gameHeader :showContent="!showHeaderContent" activeTitle="投注纪录详情" />
    <view class="top">
      <view
        class="triangle"
        :style="{ backgroundColor: backgroundColor }"
      ></view>
      <view
        v-if="statusInfo.text"
        class="info"
        :style="{ color: statusInfo.color }"
        >{{ statusInfo.text }}</view
      >
      <text>订单id: {{ data.orderId }}</text>
      <text>投注时间: {{ data.createdAt }}</text>
    </view>
    <view class="main">
      <text>游戏名称: {{ data.gameName }}</text>
      <text>订单号: {{ data.orderNo }}</text>
      <text>奖期: {{ data.period }}</text>
      <text>投注金额: {{ data.betAmount }}</text>
      <text style="height: 1rpx; background-color: #dedede"></text>
      <text>投注号码:</text>
      <view class="betNum">
        <text>{{ betNumString }}</text>
      </view>
      <text>中奖金额：{{ data.winAmount }}元</text>
      <text>开奖号码:</text>
      <LotteryNumbers :awardNum="data.awardNum" />
    </view>
  </view>
</template>
<script setup lang="ts">
import gameHeader from "@/components/game/gameHeader.vue";
import LotteryNumbers from '@/components/game/LotteryNumbers.vue';
import { useRoute } from "vue-router";
import { ref, computed, onMounted } from "vue";
import { get } from "@/api";

const showHeaderContent = ref(true);

const backgroundColor = computed(() => {
  if (data.value?.status === 0) return "#B5B5B5"; //待开奖
  if (data.value?.status === 1) return "#FF4242"; //中奖
  if (data.value?.status === 2) return "#5E5D5D"; //未中奖
  if (data.value?.status === 3) return "#5E5D5D"; //用户撤单
  if (data.value?.status === 4) return "#5E5D5D"; //后台撤单
});

const statusInfo = computed(() => {
  const statusText = [
    { text: "待开奖", color: "#eee" },
    { text: "中奖", color: "#fff" },
    { text: "未中奖", color: "#fff" },
    { text: "用户撤单", color: "#fff" },
    { text: "后台撤单", color: "#fff" },
  ];

  const status = data.value?.status;
  if (status !== undefined && statusText[status]) {
    return statusText[status];
  }
  return { text: "", color: "transparent" }; // 默认值
});

// 用于存储请求的数据
const data = ref({ betNum: "[]" });

// 使用Vue Router的Composition API
const route = useRoute();

// 获取路由参数并发送请求的函数
const fetchData = async (orderId: string) => {
  try {
    // 修改此处为你的请求方法
    const response = await get({
      url: "/gameRecords/order/getOrder/" + orderId,
    });
    data.value = response.resultSet;
    console.log(data.value);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const betNumArray = computed(() => {
  try {
    const parsed = JSON.parse(data.value.betNum);
    if (Array.isArray(parsed)) {
      return parsed; // 确保parsed是一个数组
    }
  } catch (error) {
    console.error("Error parsing betNum:", error);
  }
  return []; // 默认返回空数组
});
// 将数组转换为字符串
const betNumString = computed(() => {
  if (Array.isArray(betNumArray.value)) {
    return betNumArray.value.join(", "); // 使用逗号分隔
  }
  return ""; // 如果不是数组，返回空字符串
});

// 页面加载时获取orderId并发送请求
onMounted(() => {
  const orderId = route.query.orderId as string;
  if (orderId) {
    fetchData(orderId);
  }
});
</script>
<style scoped lang="scss">
body {
  background-color: #f9f9f9;
}
.bet-detail {
  background-color: #f9f9f9;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  color: #ababab;
  .top {
    font-size: 24rpx;
    width: 686rpx;
    background: #ffffff;
    border-radius: 24rpx;
    box-sizing: border-box;
    margin: 32rpx auto;
    padding: 32rpx;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .triangle {
      width: 230rpx;
      height: 230rpx;
      position: absolute;
      transform: rotateZ(41deg);
      top: -3.96875rem;
      left: 18.03125rem;
    }
    .info {
      width: 100rpx;
      height: 64rpx;
      line-height: 64rpx;
      position: absolute;
      right: 8rpx;
      top: 20rpx;
      transform: rotateZ(41deg);
      color: #aeaeae;
      text-align: center;
      font-size: 30rpx;
    }
  }
  .main {
    // margin-bottom: 100px;
    font-size: 24rpx;
    margin: 20rpx auto;
    width: 686rpx;
    background: #ffffff;
    border-radius: 24rpx;
    box-sizing: border-box;
    padding: 32rpx;
    display: flex;
    flex-direction: column;
    text {
      margin-top: 24rpx;
    }
    textarea {
      font-size: 1rem;
      color: #000;
      margin-top: 24rpx;
      height: 120rpx;
      background-color: #f9f9f9;
      box-sizing: border-box;
      padding: 20rpx;
    }
    .bottom {
      margin-top: 10rpx;
      width: 630rpx;
      height: 128rpx;
      box-sizing: border-box;
      background-color: #f9f9f9;
      display: flex;
      flex-direction: column;
      border-radius: 10rpx;
      .bottom1 {
        border-radius: 16rpx;
        flex: 1;
        display: flex;
        align-items: center;
        text {
          flex: 1;
          margin-top: 0;
          text-align: center;
        }
      }
    }
    .betNum {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      margin-top: 16rpx;
      background-color: #f9f9f9;
      border-radius: 10rpx;
      height: 120rpx;

      text {
        margin: 20rpx 10rpx;
        color: #000;
        font-size: 28rpx;
      }
    }
  }
}
</style>
