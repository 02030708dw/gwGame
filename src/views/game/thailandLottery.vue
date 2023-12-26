<template>
  <view>
    <layout>
      <template #top>
        <gameHeader :active-title="routes.name as string" />
      </template>
      <gameHeaderTab :typeTab="typeTab" />
      <gameContent />
      <gameTime :ac="gameAwardConfig"/>
<!--      {{playTypeData}}-->
      <game-board-type
          :board-data="playTypeData as boardType[]"
          :bg="urls1"
          :active-data="activeDataPlayType"
          @onCheck="onAddActType"
          active-color="#FFB023"
      />
      <view v-if="playType === 0">
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
      <view v-else-if="playType === 1">
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
      <view v-else-if="playType === 2">
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
    <game-trolley :trolley-total="trolleyShow" @on-bet-finish="onBetting"/>
  </view>
</template>

<script setup lang="ts">
//#region
import {computed, reactive, ref, toRaw} from "vue";
import gameHeader from "@/components/game/gameHeader";
import gameContent from "@/components/game/gameContent";
import gameTime from "@/components/game/gameTime";
import gameFooter from "@/components/game/gameFooter";
import gameHeaderTab from "@/components/game/gameHeaderTab";
import GameBoard from "@/components/game/gameBoard";
import Layout from "@/layout/index.vue";
import use_thailand1d from "@/views/game/composition/thailand/use_thailand1d";
import use_thailand2d from "@/views/game/composition/thailand/use_thailand2d";
import use_thailand3d from "@/views/game/composition/thailand/use_thailand3d";
import GameBoardType from "@/components/game/gameBoardType";
import {onLoad} from "@dcloudio/uni-app";
import gameTrolley from '@/components/game/gameTrolley/index.vue'
import {post, UrlType} from "@/api";
import use_thailandPlayType from "@/views/game/composition/thailand/use_thailandPlayType";

//#endregion
interface boardType {
  label: string;
  value: number;
}
export type lotteryHType={gamePlayCode: number, gamePlayTypeCode: string, oneBetAmount: number, betNums: number[]}[]
type Routes=Partial<Record<'code'|'gameId'|'name'|'type'|'vndArea', string|null>>
const routes=ref<Routes>({})
const gameConfig=ref<GameInfo>({gameId: "", gameName: "", gamePlayAndTypeListRespList: [], sealingTime: ""})
const gameAwardConfig=ref<AwardNum>({afterThree: "", countdown: "", end: "", firstThree: "", gameCode: "", head: "", lastAwardPeriod: "", period: ""})
const lotteryHistory=reactive(new Map([
    ['1d',ref<lotteryHType>([])],
    ['2d',ref<lotteryHType>([])],
    ['3d',ref<lotteryHType>([])],
]))
const playTypeSet=ref<number>(0)
// type
const {playType,playTypeData,activeDataPlayType,playTypeCode,onAddActType}=use_thailandPlayType(gameConfig.value.gamePlayAndTypeListRespList)
// keyboard
const { boardData1D, activeData1D,boardData1DType
  ,activeData1DType,onAddAct1D,onAddAct1DType} = use_thailand1d('1d',lotteryHistory,playTypeCode);
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
const typeTab = reactive([
  { label: "动画", id: 1 },
  { label: "直播", id: 2 },
  { label: "视频", id: 3 },
  { label: "新闻", id: 4 },
]);
const onBetting = (data:any) => {
  post({
    url:'/bet',
    data:{
      awardPeriod:gameAwardConfig.value.lastAwardPeriod,
      gameCode:routes.value.code,
      betInfos:data.map((it:any)=>({
        ...it,sumAmount:it.betNums.length*it.oneBetAmount
      }))
    }
  },UrlType.bet).then(v=>{
    console.log(v)
  }).catch(r=>{
    console.log(r)
  })
}
const getAwardData = async () => {
  const r=await post({
    url:'/getAwardNum',
    data:{
      gameCode:routes.value.code
    }
  }) as any
  gameAwardConfig.value=r.awardNum
}
//#endregion
onLoad(async (options)=>{
  routes.value=options as Routes
  getAwardData()
  const r=await post({
    url:'/gameRecords/gamePlayAndType',
    data:{
      "gameId": routes.value.gameId,
      "merchantId": 1
    }
  }) as any
/*  const r={
    "gameId": "40",
    "gameName": "泰国官彩",
    "gamePlayAndTypeListRespList": [
      {
        "gamePlayList": [
          {
            "gamePlayId": "103",
            "gamePlayName": "1d_头",
            "gamePlayCode": "th_1d_head",
            "winAmount": 2.00,
            "betAmount": 4.00
          },
          {
            "gamePlayId": "104",
            "gamePlayName": "1d_尾",
            "gamePlayCode": "th_1d_end",
            "winAmount": 70.00,
            "betAmount": 75.00
          }
        ],
        "gamePlayTypeName": "1D",
        "gamePlayTypeCode": "th_1d"
      },
      {
        "gamePlayList": [
          {
            "gamePlayId": "105",
            "gamePlayName": "2d_头",
            "gamePlayCode": "th_2d_head",
            "winAmount": 70.00,
            "betAmount": 75.00
          },
          {
            "gamePlayId": "106",
            "gamePlayName": "2d_尾",
            "gamePlayCode": "th_2d_end",
            "winAmount": 70.00,
            "betAmount": 75.00
          },
          {
            "gamePlayId": "107",
            "gamePlayName": "2d_头奖组选",
            "gamePlayCode": "th_2d_head_prize",
            "winAmount": 70.00,
            "betAmount": 75.00
          }
        ],
        "gamePlayTypeName": "2D",
        "gamePlayTypeCode": "th_2d"
      },
      {
        "gamePlayList": [
          {
            "gamePlayId": "110",
            "gamePlayName": "3d_头",
            "gamePlayCode": "th_3d_head",
            "winAmount": 70.00,
            "betAmount": 75.00
          },
          {
            "gamePlayId": "111",
            "gamePlayName": "3d_前三",
            "gamePlayCode": "th_3d_front3",
            "winAmount": 70.00,
            "betAmount": 75.00
          },
          {
            "gamePlayId": "112",
            "gamePlayName": "3d_后三",
            "gamePlayCode": "th_3d_after3",
            "winAmount": 70.00,
            "betAmount": 75.00
          },
          {
            "gamePlayId": "113",
            "gamePlayName": "3d_头奖组选",
            "gamePlayCode": "th_3d_head_prize",
            "winAmount": 70.00,
            "betAmount": 75.00
          }
        ],
        "gamePlayTypeName": "3D",
        "gamePlayTypeCode": "th_3d"
      }
    ],
    "sealingTime": "708148"
  }*/
  gameConfig.value=r
  playTypeData.value=r.gamePlayAndTypeListRespList.map((it:any,i:number)=>({
    label:playTypeData.value[i].label,
    value:playTypeData.value[i].value,
    name:it.gamePlayTypeName,
    code:it.gamePlayTypeCode
  }))
  r.gamePlayAndTypeListRespList.forEach((it,i)=>{
    if (i===0){
      boardData1DType.value=it.gamePlayList.map((it,i2)=>{
        return {
          label:it.gamePlayName,
          value:boardData1DType.value[i2].value,
          gamePlayId:it.gamePlayId,
          gamePlayCode:it.gamePlayCode,
          winAmount:it.winAmount,
          betAmount:it.betAmount
        }
      })
    }else if (i===1){
      boardData2DType.value=it.gamePlayList.map((it,i2)=>{
        return {
          label:it.gamePlayName,
          value:boardData2DType.value[i2].value,
          gamePlayId:it.gamePlayId,
          gamePlayCode:it.gamePlayCode,
          winAmount:it.winAmount,
          betAmount:it.betAmount
        }
      })
    }else {
      boardData3DType.value=it.gamePlayList.map((it,i2)=>{
        return {
          label:it.gamePlayName,
          value:boardData3DType.value[i2].value,
          gamePlayId:it.gamePlayId,
          gamePlayCode:it.gamePlayCode,
          winAmount:it.winAmount,
          betAmount:it.betAmount
        }
      })
    }
  })
})
</script>

<style scoped lang="less"></style>
