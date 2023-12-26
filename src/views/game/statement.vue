<template>
  <view class="profit">
    <gameHeader :showContent="!showHeaderContent" activeTitle="盈亏报表" />
    <SearchDatePicker @selectedDates="onSelectedDates" />
    <view class="synthesize">
      <text>盈亏查询</text>
      <text>{{ total }}</text>
    </view>
    <view class="profit-items">
      <view class="profit-item" v-for="item in timeItems" :key="item.day">
        <text>{{ item.day }}</text>
        <text>{{ item.profitAmount }}</text>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import gameHeader from "@/components/game/gameHeader.vue";
import SearchDatePicker from "@/components/SearchDatePicker.vue";
import { ref, computed, onBeforeMount } from "vue";
import { get } from "@/api";

const showHeaderContent = ref(true);
interface TimeItem {
  day: string;
  betAmount: number;
  awardAmount: number;
  profitAmount: number;
}
const timeItems = ref([]);
const total = computed(() => {
  return timeItems.value.reduce((total, item) => total + item.profitAmount, 0);
});
const onSelectedDates = (dates: string) => {
  console.log(dates);
};

const fetchData = async () => {
  try {
    const res = await get({ url: "/gameRecords/member/statistics" });
    timeItems.value = res.resultSet.map((item: TimeItem) => ({
      ...item,
      day: formatDate(item.day),
    }));
  } catch (err) {
    console.error("Error fetching data:", err);
  }
};

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  return new Intl.DateTimeFormat("zh-CN", options).format(new Date(dateString));
};

onBeforeMount(() => {
  fetchData();
});
</script>
<style scoped lang="scss">
body {
  background-color: #f9f9f9;
  .profit {
    background-color: #f9f9f9;
    .synthesize {
      width: 622rpx;
      box-sizing: border-box;
      margin: 32rpx auto 0;
      color: #bcbcbc;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .profit-item {
      width: 686rpx;
      height: 100rpx;
      background: #ffffff;
      border-radius: 24rpx;
      box-sizing: border-box;
      margin: 20rpx auto 0;
      padding: 32rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 36rpx;
    }
  }
}
</style>
