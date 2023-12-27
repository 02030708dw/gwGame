<template>
  <view class="group_4">
    <view class="text-group_4">
      <text lines="1" class="text_17">{{t}}</text>
      <text lines="1" class="text_18">{{ac.lastAwardPeriod}}</text>
    </view>
    <view class="text-wrapper_23">
      <text lines="1" class="text_19">{{ac.head+'|'+ac.firstThree.split(',').join(' ')+'|'+ac.afterThree.split(',').join(' ')+'|'+ac.end}}</text>
      <text lines="1" class="text_20">{{ac.period}}</text>
    </view>
    <image
        src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPnga5914c3289ebb2cd040879c2e539160ae2426c5bb082947a947ebbfb116292db"
        class="icon_4"
    ></image>
    <image
        src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng61ae2a6369a327c034268ddc079d29a5f2f0c87977d00b9586edf3850bf7ec87"
        class="icon_5"
    ></image>
    <image
        src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng904174a74243d96131e3f0a0338665d2fbf4f15bcad43763da2b3c5fc0a9e9c6"
        class="icon_6"
    ></image>
  </view>
</template>

<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref, toRef, watchEffect} from "vue";
const props = defineProps<{
  ac:AwardNum
}>();
const timer=ref<number>(360)
let timerId:null|number=null
onMounted(()=>{
  timerId=setInterval(()=>{
    timer.value-=1
  },1000)
})
const t=computed(()=>{
  let time:string;
  let days = parseInt(timer.value / 60 / 60 / 24);
  let hours = parseInt(timer.value / 60 / 60);
  let minutes = parseInt(timer.value / 60 % 60);
  let seconds = parseInt(timer.value % 60);
 /* if (days > 1) {  //超过一天显示天数
    time = days + "天";
    return time;
  }*/
  //补零
  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  if (timer.value <= 0) {
    time = "活动已结束";
  } else {
    time = hours + ":" + minutes + ":" + seconds + "";
  }
  return time;
})
onUnmounted(()=>clearInterval(timerId!))
watchEffect(()=>{
  let countdown=toRef(props.ac,'countdown')
  timer.value=Number(countdown.value)
})
</script>

<style scoped lang="scss">
.headerTime {
  width: 96%;
  display: flex;
  flex-direction: row;

  margin: 0 auto;
  padding: 30rpx 0;
}
.headerTimeL {
  border-right: 1px solid #f9f9f9;
  width: 25%;
}
.headerTimeC {
  margin-left: 50rpx;
}
.margintop40 {
  margin-top: 30rpx;
}
.headerTimeR {
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  image {
    width: 34rpx;
    height: 34rpx;
  }
  .headerImg {
    margin: 0 30rpx;
  }
}


.group_4 {
  margin-bottom: 2rpx;
  margin-top: 30rpx;
  display: flex;
  flex-direction: row;
}
.text-group_4 {
  margin-bottom: 2rpx;
  display: flex;
  flex-direction: column;
}
.text_17 {
  overflow-wrap: break-word;
  color: rgba(254,176,45,1);
  font-size: 32rpx;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  text-align: center;
  white-space: nowrap;
  line-height: 48rpx;
}
.text_18 {
  overflow-wrap: break-word;
  color: rgba(51,51,51,1);
  font-size: 24rpx;
  font-family: PingFangSC-Regular;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  line-height: 28rpx;
  margin-top: 8rpx;
}
.text-wrapper_23 {
  display: flex;
  flex-direction: column;
  margin: 2rpx 0 4rpx 30rpx;
}
.text_19 {
  overflow-wrap: break-word;
  color: rgba(51,51,51,1);
  font-size: 24rpx;
  font-family: PingFangSC-Regular;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  line-height: 24rpx;
}
.text_20 {
  overflow-wrap: break-word;
  color: rgba(51,51,51,1);
  font-size: 24rpx;
  font-family: PingFangSC-Regular;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  line-height: 24rpx;
  margin: 32rpx 134rpx 0 0;
}
.icon_4 {
  width: 32rpx;
  height: 32rpx;
  margin: 54rpx 0 0 82rpx;
}
.icon_5 {
  width: 32rpx;
  height: 32rpx;
  margin: 54rpx 0 0 32rpx;
}
.icon_6 {
  width: 32rpx;
  height: 32rpx;
  margin: 54rpx 0 0 32rpx;
}
</style>
