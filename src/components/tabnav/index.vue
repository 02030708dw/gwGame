<template>
  <view class="tab-container" @click="$emit('onSelect', { title, path })">
    <view class="t">
      <img :src="img" />
      <text>{{ title }}</text>
    </view>
    <view class="selectTab">
      <view
        class="li"
        @click.stop="$emit('onSelect', { title: title + item.i, path })"
        v-for="item in btns"
        :key="item.i"
      >
        <text>
          {{ item.t }}
        </text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts" name="tabnav">
defineEmits<{
  (e: "onSelect", d: any): void;
}>();
interface btnG {
  t: string;
  i: number;
  d: boolean;
}
withDefaults(
  defineProps<{
    img: string;
    title: string;
    path: string;
    btns?: btnG[];
  }>(),
  {
    btns: () => [
      { d: false, i: 0, t: "动画" },
      { d: false, i: 1, t: "直播" },
      { d: false, i: 2, t: "视频" },
      { d: false, i: 3, t: "新闻" },
    ],
  }
);
</script>

<style scoped lang="less">

.tab-container{
  margin: 32rpx 34rpx;
  background-color: #f8f8f8;
}
.t {
  margin-bottom: 10rpx;
  height: 218rpx;
  border-radius: 32rpx;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
  }

  > text {
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 0;
    left: 0;
    border-radius: 5px;
    line-height: 52rpx;
    font-size: 36rpx;
    color: #fff;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
}
.selectTab {
  width: 688rpx;
  height: 60rpx;
  margin-top: 16rpx;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  .li {
    background-color: #fcefd5;
    width: 20%;
    height: 60rpx;
    text-align: center;
    line-height: 60rpx;
    border-radius: 8px;
    color: #333;
    font-size: 28rpx;

    text {
      overflow-wrap: break-word;
      color: rgba(51, 51, 51, 1);
      font-size: 28rpx;
      font-family: PingFangSC-Regular;
      font-weight: normal;
      text-align: center;
      white-space: nowrap;
      line-height: 28rpx;
    }
  }
}
</style>
