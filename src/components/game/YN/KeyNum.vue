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
            v-for="(item,index) in data2D1"
            :key="item.id"
            @click="changeThreeNum(item)"
            :class="item.checked ? 'header-active' : null"
          >
            {{ item.label }}
            <text class="radius"
            v-if="
            (numList.slice(100*index,100*index+100)).reduce((count:any, item:any)=>{
              return item.checked ? count + 1 : count;
            },0)
            "
            >
              {{ (numList.slice(100*index,100*index+100)).reduce((count:any, item:any)=>{
              return item.checked ? count + 1 : count;
            },0) }}
            </text>
          </view>
        </view>
        <view class="line"></view>
      </view>
      <view
        class="num-box"
        :style="{ height: numHeight, paddingTop: showHeader ? '32rpx' : '0rpx' }"
      >
        <view
          class="num-item"
          v-for="(item, index) in numList.slice(numScope - 100, numScope)"
          @click="
            () => {
              unlock ? changeNum(item) : (item.checked = false);
              move(index);
            }
          "
          :key="item.id"
          :class="item.checked ? 'num-active' : null"
          :animation="animationIndex == index ? animationData : null"
        >
          {{ item.label }}
        </view>
      </view>
    </view>
  </template>
  <script setup lang="ts">
  //属性值showHeader如果不传,显示按钮00-99的数字,如果传递true则开启000-999选项
  import { ref, reactive, } from "vue";
  //   背景颜色-是否显示3位可选数字-限制选可以选的有几个-键盘是否锁住
  const props = defineProps([
    "backgroundImage",
    "showHeader",
    "astrict",
    "unlock",
    "numList"
  ]);
  const emits = defineEmits(["changeSelectNum", "changeNum",]);
  let newvalue=[
    {id:1,name:'aaa'},
    {id:2,name:'bbb'},
    {id:3,name:'ccc'},
    {id:4,name:'ddd'}
  ]
  let oldvalue=[
    {id:1,name:'aaa'},
    {id:2,name:'bbb'},
    {id:4,name:'ddd'}
  ]

 
  const data2D1 = reactive([
    { label: "000", id: 100, checked: true },
    { label: "100", id: 200, checked: false },
    { label: "200", id: 300, checked: false },
    { label: "300", id: 400, checked: false },
    { label: "400", id: 500, checked: false },
    { label: "500", id: 600, checked: false },
    { label: "600", id: 700, checked: false },
    { label: "700", id: 800, checked: false },
    { label: "800", id: 900, checked: false },
    { label: "900", id: 1000, checked: false },
  ]);
  const numScope = ref(100);
  const numHeight = ref((100 / 5 - 1) * 78 + "rpx"); //计算容器的高
  const changeThreeNum = (item: any) => {
    animationIndex.value=-1
    // 点击000-999触发
    data2D1.forEach((item) => (item.checked = false));
    item.checked = !item.checked;
    numScope.value = item.id;
    // emits("changeSelectNum", item);
  };
  
  const animationIndex = ref(-1);
  const animationData = ref({});
  const animation = uni.createAnimation({
    duration: 100,
    timingFunction: "ease",
    delay: 0,
  });
  
  const move = (index: number) => {
    animationIndex.value = index;
    animation.scale(0.9, 0.9).step();
    animation.scale(1.2, 1.2).step();
    animation.scale(0.95, 0.95).step();
    animation.scale(1.05, 1.05).step();
    animation.scale(0.98, 0.98).step();
    animation.scale(1, 1).step();
    animationData.value = animation.export();
  };
  const changeNum = (item: any) => {
    // 点击下面100个数字触发
    if (item.checked) {
      // 如果为选中,则取消选中
      item.checked = false;
    } else {
      // 如果没有选中,不可以直接选中,先判断是否有选中数量的限制
      if (props.astrict) {
        // 如果选中的数量等于设置的限制数量,则不能再让键盘选中,反之则选中
        props.numList.filter((item:any) => item.checked).length == props.astrict
          ? null
          : (item.checked = !item.checked);
      } else {
        // 如果已经选中则取消选中
        item.checked = !item.checked;
      }
    }
    emits(
      "changeNum",
      props.numList.filter((item:any) => item.checked)
    );
  };
  </script>
  <style scoped lang="scss">
  .FredHilloneD1 {
    background-repeat: no-repeat;
    position: relative;
    width: 686rpx;
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
      background-color: #fcf0d4;
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
          font-weight: 600;
          color: #ffffff;
          text-align: center;
          line-height: 62rpx;
          transition: 0.3s all linear;
          position: relative;
          .radius{
            width: 30rpx;
            height: 30rpx;
            background-color: #f56c6c;
            border-radius: 30rpx;
            position: absolute;
            font-size: 24rpx;
            line-height: 30rpx;
            text-align: center;
            right: -15rpx;
            top: -15rpx;
          }
        }
        .header-active {
          background-color: #fdb332;
          color: #fff;
        }
      }
      .line {
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
      background-color: #fcf0d4;
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
      .num-active {
        background-color: #fdb332;
        color: #fff;
      }
    }
  }
  </style>
  