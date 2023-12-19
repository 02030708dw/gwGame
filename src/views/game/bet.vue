<style scoped lang="scss">
.bet {
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
      background: #ffffff;
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
        .state{
          // margin-left: 10rpx;
        }
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
<template>
  <view class="bet">
    <gameHeader :showContent="!showHeaderContent" activeTitle="投注记录" />
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
    <!-- 日期选择 -->
    <SearchDatePicker @selectedDates="onSelectedDates" />
    <view class="record-box">
      <view class="record-item" v-for="item in pageTabs[activeTab].dataList">
        <view class="left">
          <text class="name">{{ item.name }}</text>
          <text class="time">{{ item.date }}</text>
        </view>

        <view class="right">
          <text class="state" v-if="item.status==0" style="color: #aeaeae;">未开奖</text>
          <text class="state" v-if="item.status==1" >未中奖</text>
          <text class="state" v-if="item.status==2" style="color: red;">中奖</text>
          <text class="detail" @click="redirect(item)">详情</text>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import gameHeader from "@/components/game/gameHeader.vue";
import SearchDatePicker from "@/components/SearchDatePicker.vue";
import { ref } from "vue";
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

const redirect=({name,date,status}:any)=>{
  // 跳转详情
  uni.navigateTo({
	url: `betDetails?name=${name}&date=${date}&status=${status}`
});
}
const pageTabs = ref([
  {
    title: "泰国彩",
    dataList: [
      { name: "name", date: "2009", status: 1 },
      { name: "name", date: "2011", status: 0 },
      { name: "name", date: "2013", status: 2 },
      { name: "name", date: "2015", status: 2 },
    ],
  },
  {
    title: "越南彩",
    dataList: [
      { name: "yuenan1", date: "532332", status: 2 },
      { name: "yuenan2", date: "122133", status: 1 },
      { name: "yuenan3", date: "122133", status: 0 },
    ],
  },
  {
    title: "菲律宾彩",
    dataList: [{ name: "feilvbin", date: "53232", status: 2 }],
  },
  {
    title: "xxxx彩",
    dataList: [{ name: "4", date: "5", status: 1 }],
  },
]);
</script>
