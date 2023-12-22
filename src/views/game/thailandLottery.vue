<template>
  <view>
    <layout>
      <template #top>
        <gameHeader :active-title="routes.name as string" />
      </template>
      <gameHeaderTab :typeTab="typeTab" />
      <gameContent />
      <gameTime />
      <gameFredHill
          @handleId="handleId1D2D3D"
          :backActive="oneActive"
          :TabData="TabDataTaiGuo"
          :urls="urls1"
      />
      <!--    <gameFredHill2
            @handleId="handleIdFredHill"
            :backActive="twoActive"
            :TabData="TabDataTwo1D2D3D"
            :urls="urls2"
          />-->
      <view v-if="TabDataTwo1D2D3DID === 0">
        <game-board-type
            :board-data="boardData1DType"
            :bg="urls2"
            :active-data="activeData1DType"
            @onCheck="onAddAct1DType"
        />
        <game-board
            :board-data="boardData1D as boardType[]"
            :active-data="activeData1D"
            :bg="urls3"
            @onCheck="onAddAct1D"
        />
      </view>
      <view v-else-if="TabDataTwo1D2D3DID === 1">
        <game-board-type
            :board-data="boardData2DType"
            :bg="urls2"
            :active-data="activeData2DType"
            @onCheck="onAddAct2DType"
        />
        <game-board
            :board-data="boardData2D as boardType[]"
            :active-data="activeData2D"
            :bg="urls3"
            @onCheck="onAddAct2D"
        />
      </view>
      <view v-else-if="TabDataTwo1D2D3DID === 2">
        <game-board-type
            :board-data="boardData3DType"
            :bg="urls2"
            :active-data="activeData3DType"
            @onCheck="onAddAct3DType"
        />
        <game-board
            :board-data="boardData3D as boardType[]"
            :active-data="activeData3D"
            :active-sub-data="activeSubData3D"
            :board-sub-data="boardSubData3D"
            @on-sub-check="onAddActSub3D"
            :bg="urls3"
            @onCheck="onAddAct3D"
        />
      </view>
      <template #bot>
        <gameFooter :count="count"/>
      </template>
    </layout>
    <game-trolley :trolley-total="trolleyShow"/>
  </view>
</template>

<script setup lang="ts">
//#region
import {computed, onMounted, reactive, ref, toRaw, watch, watchEffect} from "vue";
import { storeToRefs } from "pinia";
import gameHeader from "@/components/game/gameHeader";
import gameContent from "@/components/game/gameContent";
import gameTime from "@/components/game/gameTime";
import gameFooter from "@/components/game/gameFooter";
import gameFredHill from "@/components/game/gameFredHill";
import gameHeaderTab from "@/components/game/gameHeaderTab";
import { useCommon } from "@/plugins/pinia/common.pinia";
import GameBoard from "@/components/game/gameBoard";
import Layout from "@/layout/index.vue";
import use_thailand1d from "@/views/game/composition/thailand/use_thailand1d";
import use_thailand2d from "@/views/game/composition/thailand/use_thailand2d";
import use_thailand3d from "@/views/game/composition/thailand/use_thailand3d";
import GameBoardType from "@/components/game/gameBoardType";
import {onLoad} from "@dcloudio/uni-app";
import gameTrolley from '@/components/game/gameTrolley/index.vue'
//#endregion
interface boardType {
  label: string;
  value: number;
}
export declare type lotteryHType={gamePlayCode: number, gamePlayTypeCode: string, oneBetAmount: number, betNums: number[]}[]
type Routes=Partial<Record<'code'|'gameId'|'name'|'type'|'vndArea', string|null>>
const routes=ref<Routes>({})
const lotteryHistory=reactive(new Map([
    ['1d',ref<lotteryHType>([])],
    ['2d',ref<lotteryHType>([])],
    ['3d',ref<lotteryHType>([])],
]))
const playTypeSet=ref<number>(0)
// keyboard
const { boardData1D, activeData1D,boardData1DType
  ,activeData1DType,onAddAct1D,onAddAct1DType} = use_thailand1d('1d',lotteryHistory,playTypeSet);
const { boardData2D, activeData2D,
  boardData2DType,onAddAct2DType,
  activeData2DType,
  onAddAct2D } = use_thailand2d();
const {
  boardData3DType,onAddAct3DType,
  boardData3D,
  activeData3D,
  boardSubData3D,
  activeSubData3D,
  activeData3DType,
  onAddActSub3D,
  onAddAct3D,
} = use_thailand3d();
const count=computed(()=>{
  return [...lotteryHistory.values()].map(it=>toRaw(it.value)).flat().reduce((pre,cur)=>{
    pre+=cur['betNums']?cur['betNums'].length:0
    return pre
  },0)
})
const trolleyShow=computed(()=>[...lotteryHistory.values()].map(it=>toRaw(it.value)).flat())
//#region
let urls1 = ref("../../static/images/fredHill1.png");
let urls2 = ref("../../static/images/fredHill2.png");
let urls3 = ref("../../static/images/fredHill3M.png");
const storeCommon = useCommon();
const {TabData, TabDataTaiGuo, oneActive, TabDataTwo1D2D3DID} = storeToRefs(storeCommon);
const handleId1D2D3D = (id: number) => {
  storeCommon.TabDataTwoCheckedID = 0;
  storeCommon.TabDataTwo1D2D3DID = id;
  storeCommon.handletabs();
  storeCommon.setTabDataTwo1D2D3D(storeCommon.TabDataTwo1D2D3DID);
  storeCommon.changeBoard(id);
  playTypeSet.value=id
  console.log("选择的ID11111", id);
};
const handleId = (id: number) => {
  console.log("选择的ID22222", id);
};
const typeTab = reactive([
  { label: "动画", id: 1 },
  { label: "直播", id: 2 },
  { label: "视频", id: 3 },
  { label: "新闻", id: 4 },
]);
//#endregion
onLoad((options)=>{
  routes.value=options as Routes
})
onMounted(()=>{
 /* for (const value of lotteryHistory.keys()) {
    console.log(toRaw(lotteryHistory.get(value).value)); // Access the reactive value using .value
  }*/
  // console.log([...lotteryHistory.values()].map(it=>toRaw(it.value)))
})
watchEffect(()=>{
  let d=lotteryHistory
  console.log(d)
})
</script>

<style scoped lang="less"></style>
