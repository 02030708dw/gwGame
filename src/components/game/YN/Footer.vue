<template>
  <view class="footer">
    <image
      src="@/static/images/footerleft.png"
      style="width: 64rpx; height: 52rpx;margin-right: 20rpx;"
    />
    <view class="titleLeft">27,973.00</view>
    <u-icon name="arrow-right" color="#999" size="16"></u-icon>
    <image
      src="@/static/images/footerq1.png"
      style="width: 64rpx; height: 64rpx; margin-left: 100rpx"
    />
    <image
      src="@/static/images/footerq2.png"
      style="width: 64rpx; height: 64rpx; margin-left: 16rpx"
    />
    <view class="btn" @click="clickHandle">
      投注
      <view class="radius" v-if="num">{{ num }}</view>
    </view>
  </view>
</template>
<script setup lang="ts">
const props=defineProps(['num'])
const emits=defineEmits(['clickHandle'])
const clickHandle=()=>emits('clickHandle')
</script>
<style lang="scss" scoped>
.footer {
  background-color: #fff;
  position: fixed;
  width: 750rpx;
  height: 96rpx;
  bottom: 0;
  box-sizing: border-box;
  padding: 0 32rpx;
  display: flex;
  align-items: center;
  
  .btn {
    width: 152rpx;
    height: 72rpx;
    background: #ffb023;
    border-radius: 8rpx;
    font-size: 44rpx;
    font-weight: 600;
    color: #ffffff;
    line-height: 72rpx;
    text-align: center;
    margin-left: 32rpx;
    position: relative;
    .radius{
      text-align: center;
      line-height: 30rpx;
      font-size: 24rpx;
      width: 30rpx;
      height: 30rpx;
      color: #fff;
      background-color: #f56c6c;
      border-radius: 30rpx;
      position:absolute;
      right: -18rpx;
      top: -18rpx;
    }
  }
}
</style>
