<template>
  <view class="billing-details">
    <gameHeader :showContent="!showHeaderContent" activeTitle="账变纪录" />
    <SearchDatePicker @selectedDates="onSelectedDates" />

    <view class="bill" v-for="item in 10">
      <text class="top">2000/10/02 01:10</text>
      <view class="center">
        <text> [+] 奖金派送</text>
        <text>+3.2</text>
      </view>
      <view class="bottom">
        <text>可用余额</text>
        <text>4,999,020.2</text>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import gameHeader from "@/components/game/gameHeader.vue";
import SearchDatePicker from "@/components/SearchDatePicker.vue";
import { ref } from "vue";
const showHeaderContent = ref(true);
const onSelectedDates = (dates: string) => {
  console.log(dates);
};
</script>
<style scoped lang="scss">
.billing-details {
  .bill {
    width: 686rpx;
    height: 204rpx;
    background: #ffffff;
    border-radius: 24rpx;
    margin: 20rpx auto 0;
    box-sizing: border-box;
    padding: 32rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .top {
      color: #c1c1c1;
    }
    .center {
      font-size: 36rpx;
      display: flex;
      justify-content: space-between
    }
    .bottom {
      color: #c1c1c1;
      display: flex;
      justify-content: space-between
    }
  }
}
</style>