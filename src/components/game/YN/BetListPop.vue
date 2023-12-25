<template>
  <u-popup :show="show" :round="10" mode="bottom" @close="close">
    <view class="bet-box">
      <view class="top">
        <text style="font-size: 24rpx; color: #333">20230902-0292</text>
        <text class="title">Bet Details</text>
        <image
          class="close"
          src="/src/static/images/close.png"
          @click="close"
        />
      </view>
      <scroll-view scroll-y="true" class="scroll-view">
        
        <view class="item" v-for="(item,index) in list" v-if="list.length">
          <text style="width: 214rpx; font-size: 24rpx">[{{ item.label }}:{{ item.num.join(',') }}]</text>
          <text style="width: 52rpx; font-size: 28rpx; color: #00cd6a">{{ item.sum }}</text>
          <view class="tmis-box">
            <input type="text" />
            <text class="tmis" style="width: 82rpx; height: 44rpx">Tmis</text>
          </view>
          <image
            src="/src/static/images/del.png"
            style="width: 44rpx; height: 44rpx"
            @click="del(item.id)"
          />
        </view>
      </scroll-view>
      <view class="condinm-box">
        <view class="condinm-tmis">
          <input type="text" placeholder="123" />
          <text>Tmis</text>
        </view>
        <view class="condinm">Condinm</view>
      </view>
      <view class="bottom">
        <image
          src="@/static/images/footerleft.png"
          style="width: 64rpx; height: 52rpx; margin-right: 20rpx"
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
        <view class="btn">投注</view>
      </view>
    </view>
  </u-popup>
</template>
<script setup lang="ts">
const props = defineProps(["show", "list"]);
const emits = defineEmits(["close","del"]);
const close = () => {
  emits("close");
  console.log(props.list)
};
const del=(id:string)=>{
    emits('del',id)
}
</script>
<style lang="scss" scoped>
.bet-box {
  animation: bet-box 0.3s linear forwards;
  background-color: #fff;
  width: 750rpx;
  height: 750rpx;
  .top {
    height: 96rpx;
    box-sizing: border-box;
    padding: 32rpx;
    display: flex;
    align-items: center;
    .title {
      font-size: 32rpx;
      color: #ffb023;
      margin-left: 72rpx;
    }
    .close {
      width: 32rpx;
      height: 32rpx;
      margin-left: 226rpx;
    }
  }
  .scroll-view {
    background-color: #f9f9f9;
    height: 470rpx;
    box-sizing: border-box;
    padding: 32rpx;
    .item {
      background-color: #fff;
      margin-bottom: 16rpx;
      height: 92rpx;
      border-radius: 16rpx;
      box-sizing: border-box;
      padding: 0 30rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .tmis-box {
        width: 228rpx;
        height: 44rpx;
        border-radius: 8rpx;
        border: 1rpx solid #dedede;
        display: flex;
        input {
          width: 146rpx;
          height: 44rpx;
        }
        .tmis {
          line-height: 44rpx;
          text-align: center;
          width: 82rpx;
          height: 44rpx;
          background-color: #efefef;
          font-size: 24rpx;
          color: #333;
        }
      }
    }
  }
  .condinm-box {
    height: 104rpx;
    box-sizing: border-box;
    padding: 0 32rpx;
    display: flex;
    align-items: center;
    .condinm-tmis {
      box-sizing: border-box;
      width: 268rpx;
      height: 46rpx;
      background: #ffffff;
      border-radius: 8rpx;
      border: 1rpx solid #dedede;
      display: flex;
      input {
        font-size: 24rpx;
        width: 186rpx;
        height: 46rpx;
      }
      text {
        width: 82rpx;
        height: 46rpx;
        background-color: #efefef;
        color: #333;
        font-size: 24rpx;
        text-align: center;
        line-height: 46rpx;
      }
    }
    .condinm {
      text-align: center;
      box-sizing: border-box;
      width: 164rpx;
      height: 46rpx;
      line-height: 46rpx;
      border-radius: 8rpx;
      border: 1rpx solid #dedede;
      font-size: 24rpx;
      font-weight: 400;
      color: #333333;
      margin-left: 48rpx;
    }
  }
  .bottom {
    width: 750rpx;
    position: absolute;
    bottom: 0;
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
    }
  }
}
</style>
