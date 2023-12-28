<template>
  <view class="gameTime">
    <view class="l">
      <text class="l1">{{ t }}</text>
      <text class="l2">{{ ac.lastAwardPeriod }}</text>
    </view>
    <view class="m">
      <view class="m1">
        {{ ac.head + '|' + ac.firstThree.split(',').join(' ') + '|' + ac.afterThree.split(',').join(' ') + '|' + ac.end }}
      </view>
      <view class="m2">{{ ac.period }}</view>
    </view>
    <div class="imgArr">
      <img :src="l.url" v-for="l in imgArr" :key="l.type" @click="btnGroup(l.type)">
    </div>
  </view>
</template>

<script setup lang="ts">
import del from '@/static/images/gameTime/del.png'
import cal from '@/static/images/gameTime/cal.png'
import his from '@/static/images/gameTime/his.png'
import {computed, onMounted, onUnmounted, ref, toRef, watchEffect} from "vue";
const props = defineProps<{
  ac: AwardNum
}>();
const imgArr=[
  {url:del,type:'del'},
  {url:cal,type:'cal'},
  {url:his,type:'his'},
]
const timer = ref<number>(360)
let timerId: null | number = null
onMounted(() => {
  timerId = setInterval(() => {
    timer.value -= 1
  }, 1000)
})
const t = computed(() => {
  let time: string;
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
onUnmounted(() => clearInterval(timerId!))
watchEffect(() => {
  let countdown = toRef(props.ac, 'countdown')
  timer.value = Number(countdown.value)
})
const btnGroup = (i:string) => {
  console.log(i)
}
</script>

<style scoped lang="scss">
$gCol:#bababa;
.gameTime{
  margin-top: 30rpx;
  display: grid;
  grid-template-columns: 154rpx 1fr 128rpx;
  .l{
    display: flex;
    flex-direction: column;
    .l1{
      width: 130rpx;
      height: 48rpx;
      font-size: 35rpx;
      font-family: PingFangSC, PingFang SC;
      font-weight: 600;
      color: #FEB02D;
      line-height: 48rpx;
    }
    .l2{
      width: 130rpx;
      height: 28rpx;
      font-size: 20rpx;
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      color: $gCol;
      line-height: 28rpx;
    }
  }
  .m{
    border-left: $gCol 1rpx solid;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    justify-self: flex-start;
    padding-left: 24rpx;
    .m1{
      height: 24rpx;
      font-size: 24rpx;
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 24rpx;
    }
    .m2{
      height: 24rpx;
      font-size: 24rpx;
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      color: $gCol;
      line-height: 24rpx;
    }
  }
  .imgArr{
    align-self: end;
    >img{
      width: 31rpx;
      height: 31rpx;
      &:nth-child(2){
        padding: 0 16rpx;
      }
    }
  }
}
</style>
