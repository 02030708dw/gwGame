<template>
  <Layout>
    <template #top>
      <GameHeader active-title="越南彩" />
    </template>
    <GameHeaderTab :typeTab="typeTab" />
    <GameContent />
    <GameTime />
    <gameFredHill
      @handleId="handleId1D2D3D"
      :backActive="oneActive"
      :TabData="TabDataYueNan"
      :urls="urls1"
    />
    <gameFredHill2
      @handleId="handleIdFredHill"
      :backActive="twoActive"
      :TabData="TabDataTwoYueNan1D"
      :urls="urls2"
    />
    <template #bot>
      <GameFooter />
    </template>
  </Layout>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import { useCommon } from "@/plugins/pinia/common.pinia";
import GameHeader from "@/components/game/gameHeader.vue";
import GameTime from "@/components/game/gameTime.vue";
import Layout from "@/layout/index.vue";
import GameHeaderTab from "@/components/game/gameHeaderTab";
import GameContent from "@/components/game/gameContent";
import GameFooter from "@/components/game/gameFooter";
import gameFredHill from "@/components/game/gameFredHill";
import gameFredHill2 from "@/components/game/gameFredHill2";

// import GameTab from "@/components/keyboard/gameTab";

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

let urls1 = ref("../../static/images/fredHill1.png");
let urls2 = ref("../../static/images/fredHill2.png");
let urls3 = ref("../../static/images/fredHill3M.png");
const storeCommon = useCommon();
const {
  contryId,
  TabData,
  TabDataTaiGuo,
  TabDataYueNan,
  oneActive,
  twoActive,
  threeActive,
  TabDataTwo,
  TabDataAll,
  TabDataTwo1D2D3D,
  TabDataTwo1D2D3DID,
  TabDataTwoYueNan1D
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
</script>

<style scoped lang="scss"></style>
