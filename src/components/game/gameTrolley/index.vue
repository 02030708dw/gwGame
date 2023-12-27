<template>
<view>
  <u-popup :show="isBetting" mode="bottom" :round="10">
    <view class="bettingBac">
      <view class="betting">
        <view class="bettingB">
          <view class="bettingNum">20230902-0998 </view>
          <view class="bettingBet"> Bet Details </view>
        </view>
        <view class="bettingClose" @click="handleClose">
          <image src="@/static/images/close.png" mode=""></image>
        </view>
      </view>
      <scroll-view class="mb100" scroll-y="true" :style="`height:  ${height}rpx`" scroll-with-animation="true">
        <view class="bettingList animate__backOutLeft" v-for="item in trolleyTotal as (lotteryHType[number]&{key:string})[]" :key="item.key"
              v-if='trolleyTotal!.length>0'>
          <view class="bettingTit"> [{{item.key}}]</view>
          <view class="bettingTitN"> {{item.betNums.slice(0,4).join('-')}}&nbsp;
            <text class="detailPlay" v-if="item.betNums.length>4" style="color: blue" @click="onDetail(item.betNums)">
              详情
              <div class="detail" v-if="show">

              </div>
            </text>
          </view>
          <view class="bettingInput bettingList2">
            <u-input class="bettingI" border="none" v-model="item.oneBetAmount" placeholder=""></u-input>
            <text class="bettingT">Tmis</text>
            <image class="bettingDel" src="@/static/images/del.png" @click="()=>emits('onTrolleyDel',item)" mode="">
            </image>
          </view>
        </view>
        <view class="noData" v-else>
          暂无历史记录
        </view>
      </scroll-view>
      <view class="edit">
        <view class="l">
          <u-input class="l1" border="none" v-model="total" placeholder="10"></u-input>
          <button class="l2" @click="changeTotal">Tmis</button>
        </view>
        <view class="r">
          <u-input class="r1" border="none"  placeholder="Condinm"></u-input>
        </view>
      </view>
      <game-footer @onBetting="() => emits('onBetFinish',trolleyTotal)"/>
    </view>
  </u-popup>
</view>

</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCommon } from "@/plugins/pinia/common.pinia";
import { useGame } from "@/plugins/pinia/Game.pinia";
import {computed, PropType, ref, toRefs} from "vue";
import type {lotteryHType} from "@/views/game/thailandLottery.vue";
import GameFooter from "@/components/game/gameTrolley/gameFooter.vue";
const props=defineProps({
  trolleyTotal:{
    type:Array as PropType<lotteryHType>
  }
})
const emits=defineEmits<{
  (e:'onBetFinish',data:any):void
  (e:'onTrolleyDel',data:any):void
}>()
const show=ref(false)
const title=ref('详情')
const detailList=ref<number[]>([])
/*const data=computed<(lotteryHType[number]&{key:string})[]>
(()=>props.trolleyTotal?.reduce((pre:lotteryHType,cur:lotteryHType[number])=>{
  let obj={...cur}
  obj.key=cur.gamePlayCode+'-'+cur.gamePlayTypeCode
  pre.push(obj)
  return pre},[]))*/
const storeGame = useGame();
const storeCommon = useCommon();
const height=480
const total=ref(0)
const { isBetting } = storeToRefs(storeGame);
const handleClose = () => storeGame.isBetting = !storeGame.isBetting
const changeTotal = () => {

}
const onDetail = (n:number[]) => {
  show.value=true
  detailList.value=n
}
</script>
<script lang="ts">
export default {
  name:'gameTrolley'
}
</script>
<style scoped lang="scss">
@import url("@/views/game/css/game.scss");
</style>
<style scoped lang="less">
.mb100{
  padding-bottom: 0 !important;
  .noData{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.detailPlay{
  position: relative;
  .detail{
    position: absolute;
  }
}
.edit{
  padding: 26rpx 32rpx;
  display: flex;
  align-items: center;
  background: #fff;
  .l{
    width: 268rpx;
    height: 46rpx;
    background: #FFFFFF;
    border-radius: 8rpx;
    border: 1rpx solid #DEDEDE;
    display: flex;
    align-items: center;
    .l1{
      width: 92rpx;
      height: 24rpx;
      font-size: 24rpx;
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 24rpx;
    }
    .l2{
      font-size: 24rpx;
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 24rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 82rpx;
      height: 46rpx;
      background: #EFEFEF;
      border-radius: 0rpx 8rpx 8rpx 0rpx;
    }
  }
  .r{
    padding: 10rpx 32rpx;
    .r1{
      display: flex;
      text-align: center;
      width: 164rpx;
      height: 46rpx;
      background: #FFFFFF;
      border-radius: 8rpx;
      border: 1rpx solid #DEDEDE;
    }
  }
  margin-bottom: 72rpx;
}
</style>