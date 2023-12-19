<template>
  <view class="billing-details">
    <gameHeader :showContent="!showHeaderContent" activeTitle="账变纪录" />
    <SearchDatePicker @selectedDates="onSelectedDates" />

    <view class="bill"> </view>
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
const items = ref([
  { value: "4", position: "left", color: "1", name: "2", type: "3" },
  { value: "4", position: "left", color: "1", name: "2", type: "3" },
  { value: "4", position: "left", color: "1", name: "2", type: "3" },
  { value: "4", position: "left", color: "1", name: "2", type: "3" },
  { value: "4", position: "left", color: "1", name: "2", type: "3" },
]);
</script>
<style scoped lang="scss">
.billing-details {
  .bill {
    width: 686rpx;
    height: 204rpx;
    background: #ffffff;
    border-radius: 24rpx;
    margin:20rpx auto 0;
    box-sizing: border-box;
    border:  1px solid #000;
    padding: 32rpx;
  }
}
</style>
