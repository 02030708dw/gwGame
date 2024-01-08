<template>
  <view>
    <layout>
      <template #top>
        <gameHeader :active-title="routes.name!"
                    :country-name="routes.countryName!"
                    @change-country-name="onGameSelect"
                    :show-content="true"/>
      </template>
      <gameHeaderTab :typeTab="typeTab" :ac="gameAwardConfig"/>
      <gameContent/>
      <gameTime :ac="gameAwardConfig" @open-award="openAward"
                :lock-board-time="gameConfig.sealingTime" v-model:lock="lockStatus"/>
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
            :dis-btn="Boolean(!activeData1DType.length)"
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
            :dis-btn="Boolean(!activeData2DType.length)"
            cla-type="gameBoard2D"
            :board-data="boardData2D as boardType[]"
            :active-data="activeData2D"
            :bg="urls3"
            @onCheck="onAddAct2D"
        />
      </view>
      <view v-else-if="playType === 2">
        <game-board-play
            :board-data="boardData3DType as boardType[]"
            :bg="urls2"
            :active-data="activeData3DType"
            @onCheck="onAddAct3DType"
        />
        <game-board3-d
            :board-data="boardData3D as boardType[]"
            :dis-btn="Boolean(!activeData3DType.length)"
            :active-data="activeData3D"
            :active-sub-data="activeSubData3D"
            :board-sub-data="boardSubData3D as any[]"
            @on-sub-check="onAddActSub3D"
            :bg="urls3"
            @onCheck="onAddAct3D"
        />
      </view>
      <template #bot>
        <gameFooter :count="count"  @open-trolley="onOpenTrolley"/>
      </template>
    </layout>
    <game-trolley
        :trolley-total="trolleyShow"
                  :ac="gameAwardConfig"
                  ref="gameTrolleyRef"
                  @onchange-total="changeTotal"
                  @on-bet-finish="onBetting" @onTrolleyDel="TrolleyDel"/>
  </view>
</template>

<script setup lang="ts">
//#region
import {computed, nextTick, onUnmounted, reactive, Ref, ref, toRaw, watch} from "vue";
import gameHeader from "@/components/game/gameHeader";
import gameContent from "@/components/game/gameContent";
import gameTime from "@/components/game/gameTime/index.vue";
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
import {post, post2, UrlType} from "@/api";
import use_thailandPlayType from "@/views/game/composition/thailand/use_thailandPlayType";
import {useGame} from "@/plugins/pinia/Game.pinia";
import GameBoard3D from "@/components/game/gameBoard3D";
import GameBoardPlay from "@/components/game/gameBoardPlay";
import useGameNavigate from "@/hooks/useGameNavigate";
import gameListStore from "@/plugins/pinia/gameList";
import {storeToRefs} from "pinia";
import useFetch from "@/hooks/useFetch";
//#endregion
interface boardType {
  label: string;
  value: number;
}
export type cgType='all'|'sin'
export type lotteryHType = { gamePlayCode: number, gamePlayTypeCode: string, oneBetAmount: number, betNums: number[],rate:number,winAmount:number}[]
type Routes = Partial<Record<'code' | 'gameId' | 'name' | 'type' | 'vndArea'|'countryName', string | null>>
const routes = ref<Routes>({})
const gameConfig = ref<GameInfo>({gameId: "", gameName: "", gamePlayAndTypeListRespList: [], sealingTime: ""})
const gameAwardConfig = ref<AwardNum>({
  afterThree: "",
  countdown: "",
  end: "",
  firstThree: "",
  gameCode: "",
  head: "",
  lastAwardPeriod: "",
  awardPeriod: "",
})
const lockStatus=ref<boolean>(false)
const lotteryHistory = reactive(new Map([
  ['1d', ref<lotteryHType>([])],
  ['2d', ref<lotteryHType>([])],
  ['3d', ref<lotteryHType>([])],
]))
const {getBalance} = gameListStore()
// @ts-ignore
const gameTrolleyRef = ref<InstanceType<typeof gameTrolley>|null>(null)
// type
const {
  playType,
  playTypeData,
  activeDataPlayType,
  playTypeCode,
  onAddActType
} = use_thailandPlayType(gameConfig.value.gamePlayAndTypeListRespList)
// keyboard
const {
  boardData1D, activeData1D, boardData1DType
  , activeData1DType, onAddAct1D, onAddAct1DType
} = use_thailand1d('1d', lotteryHistory, playTypeCode,lockStatus);
const {
  boardData2D, activeData2D,
  boardData2DType, onAddAct2DType,
  activeData2DType,
  onAddAct2D
} = use_thailand2d('2d', lotteryHistory, playTypeCode,lockStatus);
const {
  boardData3DType, onAddAct3DType,
  boardData3D,
  activeData3D,
  boardSubData3D,
  activeSubData3D,
  activeData3DType,
  onAddActSub3D,
  onAddAct3D,
} = use_thailand3d('3d', lotteryHistory, playTypeCode,lockStatus);
const count = computed(() => {
  return [...lotteryHistory.values()].map(it => toRaw(it.value)).flat().reduce((pre, cur) => {
    pre += cur['betNums'] ? cur['betNums'].length : 0
    return pre
  }, 0)
})
/*const trolleyShow = computed(() => [...lotteryHistory.values()].map(it => toRaw(it.value)).flat()
    .reduce((pre: lotteryHType, cur: lotteryHType[number]) => {
      let obj: lotteryHType[number] & { key?: string } = {...cur}
      obj.key = cur.gamePlayCode + '-' + cur.gamePlayTypeCode
      if (cur.betNums.length === 0) {
        pre.splice(0, 1)
      }
       pre.push(obj)
      return pre
    }, []))*/
const trolleyShow = computed(() => [...lotteryHistory.values()].map(it => toRaw(it.value)).flat())
//#region
let urls1 = ref("../../static/images/fredHill1.png");
let urls2 = ref("../../static/images/fredHill2.png");
let urls3 = ref("../../static/images/fredHill3M.png");
const typeTab = reactive([
  {label: "动画", id: 1},
  {label: "直播", id: 2},
  {label: "视频", id: 3},
  {label: "新闻", id: 4},
]);
const onBetting = (data: any) => {
   if (data.length){
     post({
       url:'/bet',
       data:{
         awardPeriod:gameAwardConfig.value.lastAwardPeriod,
         gameCode:routes.value.code,
         betInfos:change(data).map((it:any)=>({
           ...it,sumAmount:it.betNums.length*it.oneBetAmount
         }))
       }
     },UrlType.bet).then(v=>{
       getBalance()
       uni.showToast({
         icon:'success',
         title:v.resDesc
       })
       clearBet()
       onOpenTrolley()
     }).catch(r=>{
       uni.showToast({
         icon:'error',
         title:r.resDesc
       })
     })
   }else {
     uni.showToast({
       icon:'error',
       title:'无选号'
     })
   }
  function change(arr:any[]){
    arr.forEach((it:any)=>{
      if (it.gameType==='2d'){
        it.betNums=it.betNums.map((it:number)=>it<10?'0'+it:it)
      }else if (it.gameType==='3d'){
        it.betNums=it.betNums.map((it:number)=>it<10?'00'+it:it<100?'0'+it:it)
      }
    })
    return arr
  }
}
const TrolleyDel = (d: any) => {
  const currentD=lotteryHistory.get(d.gameType)
  switch (d.gameType) {
    case '1d':
      currentD?.value.forEach(it=>{
        if (it.gamePlayCode===d.gamePlayCode) {
          if (activeData1DType.value?.length===1)  activeData1D.value=[]
          let dd=boardData1DType.value?.find(it2=>it2.gamePlayCode===it.gamePlayCode).value
          activeData1DType.value.splice(boardData1DType.value?.findIndex(it3=>it3.value===dd),1)
        }
      })
      break;
    case '2d':
      currentD?.value.forEach(it=>{
        if (it.gamePlayCode===d.gamePlayCode) {
          if (activeData2DType.value?.length===1) activeData2D.value=[]
          let dd=boardData2DType.value?.find(it2=>it2.gamePlayCode===it.gamePlayCode).value
          // console.log(origin2DData.value?.findIndex(it3=>it3.value===dd),1)
          /*console.log(origin2DData.value?.findIndex(it3=>it3.value===dd))
          console.log(boardData2DType.value?.findIndex(it3=>it3.value===dd))*/
          // origin2DData.value.splice(origin2DData.value?.findIndex(it3=>it3.value===dd),1)
          activeData2DType.value.splice(boardData2DType.value?.findIndex(it3=>it3.value===dd)-
              activeData2DType.value?.length===2?1:0,1)
        }
      })
      break;
    default :
      currentD?.value.forEach(it=>{
        if (it.gamePlayCode===d.gamePlayCode) {
          if (activeData3DType.value?.length===1) activeData3D.value=[]
          // @ts-ignore
          let dd=boardData3DType.value?.find(it2=>it2!.gamePlayCode===it.gamePlayCode)!.gamePlayId
          activeData3DType.value.splice(activeData3DType.value?.findIndex(it3=>it3.gamePlayId===dd),1)
        }
      })
  }
  /*currentD?.value.splice(currentD?.value
      .findIndex(it=>{
        return it.gamePlayCode===d.gamePlayCode
      }),1)
  lotteryHistory.set(d.gameType,ref(currentD?.value as lotteryHType))*/
}
const changeTotal = (n:any,v:cgType) => {
  if (v==='sin'){
    lotteryHistory.set(n.gameType,ref(lotteryHistory.get(n.gameType)?.value?.map(it=>{
      if (it.gamePlayCode===n.gamePlayCode) it.oneBetAmount=Number(n.oneBetAmount)
      return it
    }) as any))
  }else {
    [...lotteryHistory.keys()].map(it=>{
      lotteryHistory.set(it,ref(lotteryHistory.get(it)?.value?.map(it2=>{
        it2.oneBetAmount=n
        return it2
      }) as any))
    })
  }
}
const clearBet = () => {
  const storeGame = useGame();
  lotteryHistory.set('1d', ref([]))
  lotteryHistory.set('2d', ref([]))
  lotteryHistory.set('3d', ref([]))
  activeData1D.value = []
  boardSubData3D.value.forEach(it=>{
    if (it.temp.length) it.temp=[]
  })
  activeData1DType.value=[]
  activeData2DType.value=[]
  activeData3DType.value=[]
  activeData2D.value = []
  activeData3D.value = []
  storeGame.isBetting=false
}
const getAwardData =  () => {
/*  const r = await post2({
    url: '/getAwardNum',
    data: {
      gameCode: routes.value.code
    }
  })*/
  getGameAward({
    gameCode: routes.value.code
  },v=>{
    gameAwardConfig.value = v.resultSet.awardNum
    if (!gameConfig.value.gameId.length) getKeyBoard()
  }).then((v:any)=>{
    gameAwardConfig.value = v.resultSet.awardNum
    getKeyBoard()
  })
}
async function getKeyBoard() {
  const r = await post({
    url: '/gameRecords/gamePlayAndType',
    data: {
      "gameId": routes.value.gameId,
      "merchantId": 1
    }
  })
  /*    const r={
        resultSet:{
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
        }
      }*/
  gameConfig.value = r.resultSet
  playTypeData.value = r.resultSet.gamePlayAndTypeListRespList.map((it: any, i: number) => ({
    label: playTypeData.value[i].label,
    value: playTypeData.value[i].value,
    name: it.gamePlayTypeName,
    code: it.gamePlayTypeCode
  }))
  r.resultSet.gamePlayAndTypeListRespList.forEach((it: any, i: number) => {
    if (i === 0) {
      boardData1DType.value = it.gamePlayList.map((it: any, i2: number) => {
        return {
          label: it.gamePlayName,
          value: boardData1DType.value[i2].value,
          gamePlayId: it.gamePlayId,
          gamePlayCode: it.gamePlayCode,
          winAmount: it.winAmount,
          betAmount: it.betAmount,
          rate:1
        }
      })
    } else if (i === 1) {
      boardData2DType.value = it.gamePlayList.map((it: any, i2: number) => {
        return {
          label: it.gamePlayName,
          value: boardData2DType.value[i2].value,
          gamePlayId: it.gamePlayId,
          gamePlayCode: it.gamePlayCode,
          winAmount: it.winAmount,
          betAmount: it.betAmount,
          rate:1
        }
      })
      // origin2DData.value=[...boardData2DType.value]
    } else {
      boardData3DType.value = it.gamePlayList.map((it: any, i2: number) => {
        return {
          label: it.gamePlayName,
          value: boardData3DType.value[i2].value,
          gamePlayId: it.gamePlayId,
          gamePlayCode: it.gamePlayCode,
          winAmount: it.winAmount,
          betAmount: it.betAmount,
          rate:1
        }
      })
      // console.log(boardData3DType.value[0]!.gamePlayId)
      // activeData3DType.value=[{gamePlayId:boardData3DType.value[0]!.gamePlayId,value:1}]
      // origin3DData.value=[...boardData3DType.value]
    }
  })
}
//#endregion
onLoad(async (options) => {
  routes.value = options as Routes
  getAwardData()
})
onUnmounted(()=>abort.value=true)
const {getGameAward,abort}=useFetch('/getAwardNum',1000,5)
const {onGameSelect}=useGameNavigate(abort)
const onOpenTrolley = () => gameTrolleyRef.value?.handleToggle()
const openAward = () => {
  abort.value=false
  nextTick(()=>{
    gameConfig.value.gameId=''
  })
  getAwardData()
}
</script>

<style scoped lang="less"></style>
