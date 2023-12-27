<template>
  <view class="city" :style="{ backgroundImage: `url(${backgroundImage})` }">
    <view class="content">
      <scroll-view scroll-x="true" class="scroll">
        <view class="date">
          <text class="date-item" v-for="item in list"
            >{{ item.date }}({{ item.week }})</text
          >
        </view>
        <view class="box">
          <view class="item" v-for="item in list">
            <view
              class="text"
              v-for="val in item.city"
              :key="val.gameId"
              @click="clickCity(val)"
              :class="active==val.gameId?'active':null"
              >{{ val.name }}</view
            >
            <view
              class="text"
              v-for="v in 3 - item.city.length"
              style="visibility: hidden"
            ></view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import {ref} from 'vue'
const active=ref("")
const props = defineProps(["backgroundImage", "list"]);
const emits=defineEmits(['change'])
const clickCity = (val: any) => {
  props.list.forEach((item:any)=>{
    item.city.forEach((val:any)=>val.checked=false)
  })
  active.value=val.gameId
  val.checked=true
  emits('change',val)
};
</script>
<style lang="scss" scoped>
.city {
  background-size: 100%;
  background-repeat: no-repeat;
  height: 408rpx;
  box-sizing: border-box;
  padding-top: 82rpx;
  .content {
    width: 100%;
    height: 326rpx;
    background-color: #fcf0d4;
    .date {
      padding: 0 28rpx;
      box-sizing: border-box;
      width: 1400rpx;
      height: 62rpx;
      background-color: #f4d5a4;
      display: flex;
      justify-content: space-between;
      .date-item {
        width: 180rpx;
        height: 62rpx;
        line-height: 62rpx;
        text-align: center;
        font-size: 32rpx;
        font-weight: 400;
        color: #fff;
      }
    }
    .box {
      width: 1400rpx;
      box-sizing: border-box;
      padding: 28rpx;
      //   .item {
      //     box-shadow: inset 0rpx -4rpx 0rpx 0rpx #da900c,
      //       inset 0rpx 4rpx 4rpx 0rpx #ffc660;
      //   }
      display: flex;
      justify-content: space-between;
      .item {
        width: 180rpx;
        height: 218rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .text {
        transition: all linear 0.2s;
          width: 180rpx;
          height: 62rpx;
          font-size: 32rpx;
          line-height: 62rpx;
          text-align: center;
          background: #fff;
          border-radius: 8rpx;
          color: #333;
          box-shadow: inset 0 -0.125rem 0 0 rgba(75, 75, 75, 0.5);
        }
        .active {
          background: #ffb023;
          box-shadow: inset 0rpx -4rpx 0rpx 0rpx #da900c,
            inset 0rpx 4rpx 4rpx 0rpx #ffc660;
          border-radius: 8rpx;
          color: #fff;
        }
      }
    }
  }
}
</style>
