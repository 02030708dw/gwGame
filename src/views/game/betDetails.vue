<template>
  <view class="bet-detail">
    <gameHeader :showContent="!showHeaderContent" activeTitle="投注纪录详情" />
    <view class="top">
      <view class="triangle" :style="{backgroundColor:backgroundColor}"></view>
      <view class="info" v-if="props.status == 0" style="color: #eee;">未开奖</view>
      <view class="info" v-if="props.status == 1" style="color: #aeaeae">未中奖</view>
      <view class="info" v-if="props.status == 2" style="color: #fff">中奖</view>
      <text>订单编号: 00000067867864981</text>
      <text>投注时间: 2021/09/18</text>
    </view>
    <view class="main">
      <text style="margin-top: 0">XXXX: 00000067867864981</text>
      <text>输入: 00000067867864981</text>
      <text>输入:00000067867864981</text>
      <text>输入文本: 00000067867864981</text>
      <text style="height: 1rpx; background-color: #dedede"></text>
      <text>输入文本:</text>
      <textarea></textarea>
      <text>输入</text>
      <text>输入文本: 0元</text>
      <text>输入文本:</text>
      <view class="bottom">
        <view class="bottom1" style="background-color: #ececec">
          <text v-for="item in 4">xxx</text>
        </view>
        <view class="bottom1">
          <text v-for="item in 4">xxx</text>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import gameHeader from "@/components/game/gameHeader.vue";
import { ref,computed } from "vue";
const showHeaderContent = ref(true);
const props = defineProps(["name", "date", "status"]);
const backgroundColor=computed(()=>{
	if(props.status==0) return '#B5B5B5'
	if(props.status==1) return '#5E5D5D'
	if(props.status==2) return '#FF4242'
})
console.log(props);
</script>
<style scoped lang="scss">
.bet-detail {
  font-size: 24rpx;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  color: #ababab;
  .top {
    width: 686rpx;
    height: 144rpx;
    background: #ffffff;
    border-radius: 24rpx;
    box-sizing: border-box;
    margin: 32rpx auto 0;
    padding: 32rpx;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .triangle {
      width: 230rpx;
      height: 230rpx;
      background-color: #5e5d5d;
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
    margin: 20rpx auto 0;
    width: 686rpx;
    height: 794rpx;
    background: #ffffff;
    border-radius: 24rpx;
    box-sizing: border-box;
    padding: 32rpx;
    display: flex;
    flex-direction: column;
    padding-bottom: 0;
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
  }
}
</style>
