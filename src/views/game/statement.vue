<template>
  <view class="profit">
    <gameHeader :showContent="!showHeaderContent" activeTitle="盈亏报表" />
    <SearchDatePicker @selectedDates="onSelectedDates" />
    <view class="synthesize">
      <text>盈亏查询</text>
      <text>{{ total }}</text>
    </view>
    <view class="profit-item" v-for="item in timeItems"> 
      <text>{{ item.title }}</text>
      <text>{{ item.value }}</text>
    </view>
  </view>
</template>
<script setup lang="ts">
import gameHeader from "@/components/game/gameHeader.vue";
import SearchDatePicker from "@/components/SearchDatePicker.vue";
import { ref, computed } from "vue";
const showHeaderContent = ref(true);
const timeItems = ref([
  { title: "2000/3/15", value: 0.8 },
  { title: "2000/3/15", value: 3.2 },
  { title: "2000/3/15", value: -3.7 },
  { title: "2000/3/15", value: 4.7 },
]);
const total = computed(() => {
  return timeItems.value.reduce((total, item) => total + item.value, 0);
});
const onSelectedDates = (dates: string) => {
  console.log(dates);
};
</script>
<style scoped lang="scss">
.profit {
  background-color: #F9F9F9;
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
</style>
