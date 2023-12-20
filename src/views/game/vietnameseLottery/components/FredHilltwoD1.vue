<template>
  <view
    class="FredHilloneD1"
    :style="{ backgroundImage: `url(${backgroundImage})` }"
  >
    <view class="title"> Fred Hill </view>
    <view class="header" v-if="showHeader">
      <view class="box">
        <view
          class="header-item"
          v-for="item in data2D1"
          @click="changeThreeNum(item)"
          :class="item.checked ? 'header-active' : null"
        >
          {{ item.label }}
        </view>
      </view>
      <view class="line"></view>
    </view>

    <view
      class="num-box"
      :style="{ height: numHeight, paddingTop:  showHeader? '32rpx':'0rpx'  }"
    >
      <view
        class="num-item"
        v-for="item in data2D2"
        @click="changeNum(item)"
        :class="item.checked ? 'num-active' : null"
      >
        {{ item.label }}
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
let arr = [];
for (var i = 0; i < 100; i++) {
  if (i < 10) {
    arr.push("0" + i);
  } else {
    arr.push("" + i);
  }
}
const data2D2 = ref(
  arr.map((item) => {
    return { label: item, id: item, checked: false };
  })
);
const data2D1 = reactive([
  { label: "000", id: "000", checked: true },
  { label: "100", id: 100, checked: false },
  { label: "200", id: 200, checked: false },
  { label: "300", id: 300, checked: false },
  { label: "400", id: 400, checked: false },
  { label: "500", id: 500, checked: false },
  { label: "600", id: 600, checked: false },
  { label: "700", id: 700, checked: false },
  { label: "800", id: 800, checked: false },
  { label: "900", id: 900, checked: false },
]);
const props = defineProps(["backgroundImage", "showHeader"]);
const emits = defineEmits(["changeThreeNum", "changeNum"]);
const numHeight = ref((data2D2.value.length / 5 - 1) * 78 + "rpx"); //计算容器的高
const changeThreeNum = (item: any) => {
  // 点击000-999触发
  data2D1.forEach((item) => (item.checked = false));
  item.checked = true;
  emits("changeThreeNum", item);
};
const changeNum = (item: any) => {
  // 点击下面100个数字触发
  item.checked = !item.checked;
  let arr = data2D2.value
    .filter((item) => item.checked)
    .map((item) => item.label);
  emits("changeNum", arr);
};
</script>
<style scoped lang="scss">
.FredHilloneD1 {
  background-repeat: no-repeat;
  position: relative;
  width: 686rpx;
  height: 808rpx;
  background-size: 100%;
  box-sizing: border-box;
  font-family: PingFangSC, PingFang SC;
  padding-top: 100rpx;
  .title {
    width: 200rpx;
    height: 44rpx;
    font-size: 44rpx;
    font-weight: 600;
    color: #ffffff;
    line-height: 44rpx;
    position: absolute;
    top: 30rpx;
    left: 18rpx;
  }
  .header {
    background-color: #FCF0D4;
    box-sizing: border-box;
    width: 686rpx;
    height: 173rpx;
    padding: 0 28rpx;
    position: relative;
    .box {
      width: 634rpx;
      height: 142rpx;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-content: space-between;
      .header-item {
        width: 114rpx;
        height: 62rpx;
        background: #ffe2b4;
        border-radius: 8rpx;
        font-size: 36rpx;
        font-family: PingFangSC, PingFang SC;
        font-weight: 600;
        color: #ffffff;
        text-align: center;
        line-height: 62rpx;
        transition: 0.3s all linear;
      }
      .header-active {
        background-color: #fdb332;
        color: #fff;
      }
    }
    .line{
      width: 634rpx;
      height: 1rpx;
      background-color: #fdb332;
      position: absolute;
      bottom: 0;
    }
  }
  .num-box {
    width: 686rpx;
    padding: 0 28rpx;
    box-sizing: border-box;
    background-color: #FCF0D4;
    padding-bottom: 32rpx;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
      align-content: space-between;
    .num-item {
      width: 114rpx;
      height: 62rpx;
      background: #ffffff;
      border-radius: 8rpx;
      font-size: 36rpx;
      text-align: center;
      line-height: 62rpx;
      transition: 0.3s all linear;
    }
    .num-active{
        background-color: #FDB332;
        color: #fff;
    }
  }
}
</style>
