<script setup lang="ts" name="tabnav">
defineEmits<{
  (e:'onSelect',d:any):void
}>()
interface btnG{
  t:string
  i:number
  d:boolean
}
withDefaults(defineProps<{
  img:string
  title:string,
  path:string
  btns?:btnG[]
}>(),{
  btns:()=>[
      {d: false, i: 0, t: "动画"},
      {d: false, i: 1, t: "直播"},
      {d: false, i: 2, t: "视频"},
      {d: false, i: 3, t: "新闻"},
  ]
})
</script>

<template>
<view @click="$emit('onSelect',{title,path})">
  <view class="t">
    <img :src="img"/>
    <text>{{title}}</text>
  </view>
  <view class="selectTab">
    <view class="li" @click.stop="$emit('onSelect',{title:title+item.i,path})" v-for="item in btns" :key="item.i">
      {{item.t}} </view>
  </view>
</view>
</template>

<style scoped lang="less">
.t{
  margin: 32rpx;
  margin-bottom: 10rpx;
  height: 218rpx;
  border: solid 1px red;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  >text{
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
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding: 20rpx 32rpx;
  .li {
    background-color: #FCEFD5;
    width: 20%;
    height: 60rpx;
    text-align: center;
    line-height: 60rpx;
    border-radius: 8px;
    color: #333;
    font-size: 28rpx;
  }
}
</style>