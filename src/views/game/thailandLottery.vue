<template>
  <layout>
    <template #top>
      <gameHeader active-title="泰国彩" />
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
      />
      <game-board
        :board-data="boardData1D as boardType[]"
        :active-data="activeData1D"
        :bg="urls3"
        @onCheck="onAddAct1D"
      />
    </view>
    <view v-else-if="TabDataTwo1D2D3DID === 1">
      <game-board
        :board-data="boardData2D as boardType[]"
        :active-data="activeData2D"
        :bg="urls3"
        @onCheck="onAddAct2D"
      />
    </view>
    <view v-else-if="TabDataTwo1D2D3DID === 2">
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
      <gameFooter />
    </template>
  </layout>
  <popup />
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import gameHeader from "@/components/game/gameHeader";
import gameContent from "@/components/game/gameContent";
import gameTime from "@/components/game/gameTime";
import gameFooter from "@/components/game/gameFooter";
import popup from "@/components/game/popup/popup";
import gameFredHill from "@/components/game/gameFredHill";
import gameFredHill2 from "@/components/game/gameFredHill2";
import gameHeaderTab from "@/components/game/gameHeaderTab";
import { useCommon } from "@/plugins/pinia/common.pinia";
import GameBoard from "@/components/game/gameBoard";
import Layout from "@/layout/index.vue";
import use_thailand1d from "@/views/game/composition/thailand/use_thailand1d";
import use_thailand2d from "@/views/game/composition/thailand/use_thailand2d";
import use_thailand3d from "@/views/game/composition/thailand/use_thailand3d";
import GameBoardType from "@/components/game/gameBoardType";
// import {use_thailand1d,use_thailand2d,use_thailand3d} from "@/views/game/composition/thailand";
interface boardType {
  label: string;
  value: number;
}
let urls1 = ref("../../static/images/fredHill1.png");
let urls2 = ref("../../static/images/fredHill2.png");
let urls3 = ref("../../static/images/fredHill3M.png");
const storeCommon = useCommon();
const {
  contryId,
  TabData,
  TabDataTaiGuo,
  oneActive,
  twoActive,
  threeActive,
  TabDataTwo,
  TabDataAll,
  TabDataTwo1D2D3D,
  TabDataTwo1D2D3DID,
} = storeToRefs(storeCommon);

const handleId1D2D3D = (id: number) => {
  storeCommon.TabDataTwoCheckedID = 0;
  storeCommon.TabDataTwo1D2D3DID = id;
  storeCommon.handletabs();
  storeCommon.setTabDataTwo1D2D3D(storeCommon.TabDataTwo1D2D3DID);
  storeCommon.changeBoard(id);
  console.log("选择的ID11111", id);
};

const handleIdFredHill = () => {
  console.log("选择的ID33333", storeCommon.TabDataTwo1D2D3DID);
  // storeCommon.handletabs()
  storeCommon.setTabDataTwo1D2D3D(storeCommon.TabDataTwo1D2D3DID);
};
const handleId = (id: number) => {
  console.log("选择的ID22222", id);
};

/**
 *
 * 类型切换
 */
const typeTab = reactive([
  { label: "动画", id: 1 },
  { label: "直播", id: 2 },
  { label: "视频", id: 3 },
  { label: "新闻", id: 4 },
]);
// keyboard
const { boardData1D, activeData1D,boardData1DType,activeData1DType,onAddAct1D } = use_thailand1d();
const { boardData2D, activeData2D, onAddAct2D } = use_thailand2d();
const {
  boardData3D,
  activeData3D,
  boardSubData3D,
  activeSubData3D,
  onAddActSub3D,
  onAddAct3D,
} = use_thailand3d();
</script>

<style scoped lang="less"></style>
