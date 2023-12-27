<template>
  <view class="bet">
    <gameHeader :showContent="!showHeaderContent" activeTitle="投注记录" />
    <view class="tabs">
      <!-- 彩种分类 -->
      <text class="tabs-item">全部</text>
      <!-- 文字下滑线 -->
      <!-- <text
        class="line"
        :style="{
          left:
            (750 / pageTabs.length) * activeTab +
            750 / pageTabs.length / 2 -
            28 +
            'rpx',
        }"
      ></text> -->
    </view>
    <!-- 日期选择 -->
    <SearchDatePicker @selectedDates="onSelectedDates" />

    <!-- 投注列表 -->
    <view class="record-box">
      <view class="record-item" v-for="item in pageTabs">
        <view class="left">
          <text class="name">{{ item.gameName }}</text>
          <text class="time">{{ item.createdAt }}</text>
        </view>

        <view class="right">
          <text class="state" v-if="item.status == 0" style="color: #aeaeae"
            >未开奖</text
          >
          <text class="state" v-if="item.status == 1">未中奖</text>
          <text class="state" v-if="item.status == 2" style="color: red"
            >中奖</text
          >
          <text class="detail" @click="redirect(item)">详情</text>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import gameHeader from "@/components/game/gameHeader.vue";
import SearchDatePicker from "@/components/SearchDatePicker.vue";
import { ref, onBeforeMount } from "vue";
import { get } from "@/api";

const showHeaderContent = ref(true); //显示下拉导航
const onSelectedDates = (dates: string) => {
  // 打印选择的日期
  console.log(dates);
};

const activeTab = ref(0); //当前选中的彩种

const changeTab = (index: number) => {
  console.log(index);
  activeTab.value = index;
};

const redirect = ({orderNo}: any) => {
  // 跳转详情
  uni.navigateTo({
    url: `betDetails?orderNo=${orderNo}`,
  });
};
const pageTabs = ref([
  {
    createdAt: "2023-12-27 02:43:16",
    gameName: "泰国官彩",
    gamePlayId: "104",
    period: "20240101-001",
    betAmount: 300,
    winAmount: 0,
    awardNum: null,
    status: 0,
    betNum: '["0","1","2","3"]',
    orderNo: "th_20240101-0011703644995430",
  },
]);

// 调用接口获取数据
const fetchData = async () => {
  try {
    const data = await get({
      url: "/gameRecords/order/search",
    });
    console.log("🚀  data:", data);
    pageTabs.value = data.resultSet.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

onBeforeMount(() => {
  fetchData();
});
</script>
<style scoped lang="scss">
body {
  background-color: #f9f9f9;
}
.bet {
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
  .record-box {
    padding: 0 32rpx;
    box-sizing: border-box;
    .record-item {
      margin-top: 20rpx;
      width: 686rpx;
      height: 148rpx;
      background: #fff;
      border-radius: 24rpx;
      box-sizing: border-box;
      padding: 32rpx;
      display: flex;
      justify-content: space-between;
      font-family: PingFangSC, PingFang SC;
      .left {
        display: flex;
        flex-direction: column;
        .name {
          font-size: 36rpx;
          font-weight: 600;
          color: #333333;
          line-height: 36rpx;
        }
        .time {
          font-size: 32rpx;
          font-weight: 400;
          color: #c1c1c1;
          margin-top: 10rpx;
        }
      }
      .right {
        display: flex;
        align-items: center;
        .detail {
          margin-left: 10rpx;
          width: 108rpx;
          height: 84rpx;
          background: #ffb023;
          border-radius: 16rpx;
          text-align: center;
          color: #fff;
          line-height: 84rpx;
          font-size: 32rpx;
        }
      }
    }
  }
}
</style>
