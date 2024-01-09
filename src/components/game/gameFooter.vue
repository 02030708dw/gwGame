<template>
  <view class="headerStyles">
    <view class="footerleft0">
      <image class="footerleft" src="@/static/images/footerleft.png" />
      <view class="titleLeft">{{ getBalanceF }}</view>
      <u-icon name="arrow-right" color="#999" size="16"></u-icon>
    </view>

    <view class="headerMores">
      <image
        class="headerMoreimage1"
        src="@/static/images/footerq1.png"
        alt=""
        srcset=""
      />
      <image
        class="headerMoreimage1"
        src="@/static/images/footerq2.png"
        alt=""
        srcset=""
      />
      <view v-show="trolleyCount" class="cancel">
        <view @click="$emit('cancel')"> 取消 </view>
      </view>
      <view class="touzhu">
        <up-badge
          class="badge"
          numberType="limit"
          :type="'error'"
          max="99"
          :value="trolleyCount"
        ></up-badge>
        <view @click="$emit('openTrolley')"> 投注 </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { toRef } from "vue";
import { storeToRefs } from "pinia";
import gameListStore from "@/plugins/pinia/gameList";
const props = withDefaults(
  defineProps<{
    count?: number;
  }>(),
  {
    count: 0,
  }
);
defineEmits(["openTrolley", "cancel"]);
const trolleyCount = toRef(props, "count");
const { getBalanceF } = storeToRefs(gameListStore());
</script>

<style scoped lang="scss">
.footerleft0 {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.headerStyles {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 12rpx 20rpx 12rpx 20rpx;
  font-family: PingFangSC-Semibold;
}

.headerTitle {
  font-size: 32rpx;
  color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.titleLeft {
  font-size: 16px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #333333;
}

.headerText {
  margin: 0 10rpx;
}

.headerImg {
  width: 30rpx;
  height: 30rpx;
}

.headerMores {
  display: flex;
  // flex-direction: row;
  justify-content: center;
  align-items: center;
}

.footerleft {
  width: 64rpx;
  height: 50rpx;
  margin-right: 10rpx;
}

.headerMoreimage1 {
  display: flex;
  width: 26px;
  height: 26px;
  margin-right: 30rpx;
}

.cancel {
  width: 60px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  background: #f8f8f8;
  border-radius: 4px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-size: 18px;
  margin-right: 10rpx;
  font-weight: bold;
}

.touzhu {
  width: 76px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  background: #ffb023;
  border-radius: 4px;
  font-size: 22px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #ffffff;
  position: relative;
	margin-right: 10rpx;
  .badge {
    position: absolute;
    right: 0;
    top: -5rpx;
    transform: translate(10px, -10rpx);
  }
}
</style>
