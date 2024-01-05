<template>
  <view class="billing-details">
    <gameHeader :showContent="!showHeaderContent" activeTitle="账变纪录" />
    <SearchDatePicker @selectedDates="onSelectedDates" />

    <view v-if="memberAccount.resultSet !== '该会员无账变记录'">
      <view
        class="bill"
        v-for="(item, index) in memberAccount.resultSet"
        :key="index"
      >
        <text class="top">{{ item.createdAt }}</text>
        <view class="center">
          <text>{{ getTypeDescription(item.type) }}</text>
          <text>{{ item.changeAmt }}</text>
        </view>
        <view class="bottom">
          <text>可用余额</text>
          <text>{{ item.afterBlanace }}</text>
        </view>
      </view>
    </view>

    <view v-else>
      <text class="text">{{ memberAccount.resultSet }}</text>
    </view>
  </view>
</template>
<script setup lang="ts">
import gameHeader from "@/components/game/gameHeader.vue";
import SearchDatePicker from "@/components/SearchDatePicker.vue";
import { ref, onBeforeMount } from "vue";
import { get } from "@/api";

const showHeaderContent = ref(true);
const onSelectedDates = (dates: string) => {
  console.log(dates);
};
const memberAccount = ref({});

// 调用接口获取数据
const fetchData = async () => {
  try {
    const data = await get({
      url: "/gameRecords/memberWalletRecord",
    });
    memberAccount.value = data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// 将数字类型转换为对应的描述
const getTypeDescription = (type: number) => {
  const types = {
    1: "[-] 投注扣款",
    2: "[+] 奖金派发",
    3: "[+] 商户钱包转至游戏钱包",
    4: "[-] 游戏钱包转至商户钱包",
    5: "[-] 系统撤单",
  };
  return types[type] || "未知类型";
};

onBeforeMount(() => {
  fetchData();
});
</script>
<style scoped lang="scss">
.billing-details {
  background-color: #f9f9f9;
  height: 100vh;
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
      justify-content: space-between;
    }
    .bottom {
      color: #c1c1c1;
      display: flex;
      justify-content: space-between;
    }
  }

  .text {
    box-sizing: border-box;
    padding: 32rpx;
    font-size: 32rpx;
    display: flex;
    justify-content: space-between;
    display: block;
    text-align: center;
  }
}
</style>
